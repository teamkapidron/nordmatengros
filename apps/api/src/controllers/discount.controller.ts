// Node Modules

// Schemas
import Discount from '@/models/discount.model';
import Product from '@/models/product.model';
import BulkDiscount from '@/models/bulkDiscount.model';

// Utils
import { sendResponse } from '@/utils/common/response.util';

// Handlers
import { asyncHandler } from '@/handlers/async.handler';
import { ErrorHandler } from '@/handlers/error.handler';

// Types
import type {
  CreateDiscountSchema,
  CreateBulkDiscountSchema,
  UpdateDiscountSchema,
  ToggleDiscountActiveSchema,
} from '@/validators/discount.validator';
import type { Request, Response } from 'express';

export const getActiveBulkDiscounts = asyncHandler(
  async (_: Request, res: Response) => {
    const bulkDiscounts = await BulkDiscount.find({ isActive: true });
    sendResponse(res, 200, 'Active bulk discounts fetched successfully', {
      bulkDiscounts,
    });
  },
);

export const getDiscounts = asyncHandler(async (_: Request, res: Response) => {
  const discounts = await Discount.find().populate(
    'productId',
    'name  _id images shortDescription description sku',
  );

  sendResponse(res, 200, 'Discounts fetched successfully', {
    discounts,
  });
});

export const getBulkDiscounts = asyncHandler(
  async (_: Request, res: Response) => {
    const bulkDiscounts = await BulkDiscount.find();
    sendResponse(res, 200, 'Bulk discounts fetched successfully', {
      bulkDiscounts,
    });
  },
);

export const createDiscount = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId, discountValue, validFrom, validTo } =
      req.body as CreateDiscountSchema['body'];

    const product = await Product.findById(productId);
    if (!product) {
      throw new ErrorHandler(404, 'Product not found', 'NOT_FOUND');
    }

    if (product.isActive === false) {
      throw new ErrorHandler(400, 'Product is not active', 'BAD_REQUEST');
    }

    const discount = await Discount.create({
      productId,
      discountValue,
      validFrom: validFrom ? new Date(validFrom) : undefined,
      validTo: validTo ? new Date(validTo) : undefined,
    });

    sendResponse(res, 201, 'Discount created successfully', {
      discount,
    });
  },
);

export const createBulkDiscount = asyncHandler(
  async (req: Request, res: Response) => {
    const { minQuantity, discountPercentage } =
      req.body as CreateBulkDiscountSchema['body'];

    const bulkDiscount = await BulkDiscount.create({
      minQuantity,
      discountPercentage,
    });

    sendResponse(res, 201, 'Bulk discount created successfully', {
      bulkDiscount,
    });
  },
);

export const updateDiscount = asyncHandler(
  async (req: Request, res: Response) => {
    const { discountId } = req.params as UpdateDiscountSchema['params'];
    const { discountValue, validFrom, validTo } =
      req.body as UpdateDiscountSchema['body'];

    const discount = await Discount.findById(discountId);
    if (!discount) {
      throw new ErrorHandler(404, 'Discount not found', 'NOT_FOUND');
    }

    if (discount.isActive === false) {
      throw new ErrorHandler(400, 'Discount is not active', 'BAD_REQUEST');
    }

    const updatedDiscount = await Discount.findByIdAndUpdate(discountId, {
      discountValue,
      validFrom: validFrom ? new Date(validFrom) : undefined,
      validTo: validTo ? new Date(validTo) : undefined,
    });

    sendResponse(res, 200, 'Discount updated successfully', {
      discount: updatedDiscount,
    });
  },
);

export const toggleDiscountActive = asyncHandler(
  async (req: Request, res: Response) => {
    const { discountId } = req.params as ToggleDiscountActiveSchema['params'];

    const response = await Discount.findById(discountId);
    if (!response) {
      throw new ErrorHandler(404, 'Discount not found', 'NOT_FOUND');
    }
    await Discount.findByIdAndUpdate(discountId, {
      isActive: !response.isActive,
    });
    sendResponse(
      res,
      200,
      `Discount made ${response.isActive ? 'inactive' : 'active'} successfully`,
    );
  },
);
