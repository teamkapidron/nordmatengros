// Node Modules

// Schemas
import Address from '@/models/address.model';

// Utils
import { sendResponse } from '@/utils/common/response.util';
import { getPagination } from '@/utils/common/pagination.utils';

// Handlers
import { asyncHandler } from '@/handlers/async.handler';
import { ErrorHandler } from '@/handlers/error.handler';

// Types
import type {
  GetAddressesSchema,
  GetAddressByIdSchema,
  AddAddressSchema,
  UpdateAddressSchema,
  DeleteAddressSchema,
  SetDefaultAddressSchema,
} from '@/validators/address.validator';
import type { Request, Response } from 'express';

export const getAddresses = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const query = req.query as GetAddressesSchema['query'];

    const { page, limit, skip } = getPagination(query.page, query.limit);

    const addresses = await Address.find({ userId })
      .sort({ isDefault: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalAddresses = await Address.countDocuments({ userId });

    sendResponse(res, 200, 'Addresses fetched successfully', {
      addresses,
      totalAddresses,
      page,
      perPage: limit,
      totalPages: Math.ceil(totalAddresses / limit),
    });
  },
);

export const getAddressDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const { addressId } = req.params as GetAddressByIdSchema['params'];

    const address = await Address.findOne({ _id: addressId, userId });
    if (!address) {
      throw new ErrorHandler(404, 'Address not found', 'NOT_FOUND');
    }

    sendResponse(res, 200, 'Address fetched successfully', { address });
  },
);

export const addAddress = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id;
  const addressData = req.body as AddAddressSchema['body'];

  const addressCount = await Address.countDocuments({ userId });
  const isFirstAddress = addressCount === 0;
  const isDefault = isFirstAddress || addressData.isDefault === true;

  if (isDefault) {
    await Address.updateMany({ userId }, { $set: { isDefault: false } });
  }

  const address = await Address.create({ ...addressData, userId, isDefault });

  sendResponse(res, 201, 'Address added successfully', { address });
});

export const updateAddress = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const updateData = req.body as UpdateAddressSchema['body'];
    const { addressId } = req.params as UpdateAddressSchema['params'];

    const address = await Address.findOne({ _id: addressId, userId });
    if (!address) {
      throw new ErrorHandler(404, 'Address not found', 'NOT_FOUND');
    }

    if (updateData.isDefault === true) {
      await Address.updateMany(
        { userId, _id: { $ne: addressId } },
        { $set: { isDefault: false } },
      );
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      { $set: { ...updateData, isDefault: updateData.isDefault === true } },
      { new: true },
    );

    sendResponse(res, 200, 'Address updated successfully', {
      address: updatedAddress,
    });
  },
);

export const deleteAddress = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const { addressId } = req.params as DeleteAddressSchema['params'];

    const address = await Address.findOne({ _id: addressId, userId });
    if (!address) {
      throw new ErrorHandler(404, 'Address not found', 'NOT_FOUND');
    }

    const wasDefault = address.isDefault;
    if (wasDefault) {
      const anotherAddress = await Address.findOne({
        userId,
        _id: { $ne: addressId },
      });
      if (!anotherAddress) {
        throw new ErrorHandler(
          400,
          'Cannot delete the only default address. Add another address first.',
          'BAD_REQUEST',
        );
      }

      await Address.updateOne(
        { _id: anotherAddress._id },
        { $set: { isDefault: true } },
      );
    }

    await Address.deleteOne({ _id: addressId });

    sendResponse(res, 200, 'Address deleted successfully');
  },
);

export const setDefaultAddress = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const { addressId } = req.params as SetDefaultAddressSchema['params'];

    const address = await Address.findOne({ _id: addressId, userId });
    if (!address) {
      throw new ErrorHandler(404, 'Address not found', 'NOT_FOUND');
    }

    if (address.isDefault) {
      sendResponse(res, 200, 'Address is already set as default', { address });
      return;
    }

    await Address.updateMany({ userId }, { $set: { isDefault: false } });
    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      { $set: { isDefault: true } },
      { new: true },
    );

    sendResponse(res, 200, 'Default address updated successfully', {
      address: updatedAddress,
    });
  },
);
