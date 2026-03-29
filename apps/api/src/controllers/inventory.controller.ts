// Node Modules
import { PipelineStage, Types } from 'mongoose';

// Schemas
import Product from '@/models/product.model';
import Inventory from '@/models/inventory.model';

// Utils
import { sendResponse } from '@/utils/common/response.util';
import { getDateMatchStage } from '@/utils/common/date.util';
import {
  buildStockCountPipeline,
  getInventoryFilterFromQuery,
} from '@/utils/inventory.utils';

// Handlers
import { asyncHandler } from '@/handlers/async.handler';
import { ErrorHandler } from '@/handlers/error.handler';

// Types
import type {
  GetAllInventorySchema,
  UpdateInventorySchema,
  DeleteInventorySchema,
  GetProductInventorySchema,
  CreateInventorySchema,
  InventoryStatsSchema,
} from '@/validators/inventory.validator';
import type { Request, Response } from 'express';

export const getAllInventory = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query as GetAllInventorySchema['query'];

    const { queryObject, page, limit, skip } =
      getInventoryFilterFromQuery(query);

    const inventory = await Inventory.aggregate([
      {
        $group: {
          _id: '$productId',
          quantity: { $sum: '$quantity' },
          expirationDate: { $min: '$expirationDate' },
        },
      },
      {
        $sort: { expirationDate: 1 },
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $unwind: '$product',
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'product.categories',
          foreignField: '_id',
          as: 'product.categories',
        },
      },
      {
        $match: queryObject,
      },
      {
        $project: {
          _id: 1,
          productId: '$_id',
          quantity: 1,
          expirationDate: 1,
          product: {
            _id: 1,
            name: 1,
            sku: 1,
            salePrice: 1,
            categories: { _id: 1, name: 1 },
          },
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    const [totalInventory] = await Inventory.aggregate([
      {
        $group: {
          _id: '$productId',
          quantity: { $sum: '$quantity' },
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $unwind: '$product',
      },
      {
        $match: queryObject,
      },
      {
        $count: 'total',
      },
    ]);

    sendResponse(res, 200, 'Inventory fetched successfully', {
      inventory,
      totalInventory: totalInventory.total ?? 0,
      currentPage: page,
      perPage: limit,
      totalPages: Math.ceil((totalInventory?.total ?? 0) / limit),
    });
  },
);

export const updateInventory = asyncHandler(
  async (req: Request, res: Response) => {
    const { inventoryId } = req.params as UpdateInventorySchema['params'];
    const { quantity, expirationDate } =
      req.body as UpdateInventorySchema['body'];

    const existingInventory = await Inventory.findById(inventoryId);
    if (!existingInventory) {
      throw new ErrorHandler(404, 'Inventory not found', 'NOT_FOUND');
    }

    if (quantity) {
      const diff = quantity - existingInventory.inputQuantity;
      if (existingInventory.quantity + diff < 0) {
        throw new ErrorHandler(
          400,
          'Quantity cannot be less than quantity in stock',
          'BAD_REQUEST',
        );
      }
      existingInventory.quantity += diff;
      existingInventory.inputQuantity += diff;
    }
    
    if (expirationDate) {
      existingInventory.expirationDate = new Date(expirationDate);
    }

    await existingInventory.save();

    sendResponse(res, 200, 'Inventory updated successfully', {
      inventory: existingInventory,
    });
  },
);

export const deleteInventory = asyncHandler(
  async (req: Request, res: Response) => {
    const { inventoryId } = req.params as DeleteInventorySchema['params'];

    await Inventory.findByIdAndDelete(inventoryId);

    sendResponse(res, 200, 'Inventory deleted successfully', {
      message: 'Inventory deleted successfully',
    });
  },
);

export const getProductInventory = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId } = req.params as GetProductInventorySchema['params'];

    const inventory = await Inventory.aggregate([
      {
        $match: { productId: new Types.ObjectId(productId) },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $unwind: '$product',
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'product.categories',
          foreignField: '_id',
          as: 'product.categories',
        },
      },
      {
        $project: {
          _id: 1,
          quantity: 1,
          inputQuantity: 1,
          expirationDate: 1,
          product: {
            _id: '$product._id',
            name: '$product.name',
            sku: '$product.sku',
            salePrice: '$product.salePrice',
            categories: { _id: 1, name: 1 },
          },
        },
      },
      { $sort: { expirationDate: 1 } },
      { $limit: 10 },
    ]);

    const [totalQuantity] = await Inventory.aggregate([
      {
        $match: { productId: new Types.ObjectId(productId) },
      },
      { $group: { _id: null, total: { $sum: '$quantity' } } },
      { $project: { _id: 0, total: 1 } },
    ]);

    const [activeLots] = await Inventory.aggregate([
      {
        $match: {
          productId: new Types.ObjectId(productId),
          quantity: { $gt: 0 },
        },
      },
      { $group: { _id: null, activeLots: { $sum: 1 } } },
      { $project: { _id: 0, activeLots: 1 } },
    ]);

    const [totalValue] = await Inventory.aggregate([
      {
        $match: { productId: new Types.ObjectId(productId) },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $unwind: '$product',
      },
      {
        $addFields: {
          costPriceWithVat: {
            $multiply: [
              '$product.costPrice',
              { $add: [1, { $divide: ['$product.vat', 100] }] },
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalValue: {
            $sum: { $multiply: ['$quantity', '$costPriceWithVat'] },
          },
        },
      },
      { $project: { _id: 0, totalValue: 1 } },
    ]);

    sendResponse(res, 200, 'Inventory fetched successfully', {
      inventory,
      totalQuantity: totalQuantity?.total ?? 0,
      activeLots: activeLots?.activeLots ?? 0,
      totalValue: totalValue?.totalValue ?? 0,
    });
  },
);

export const createInventory = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId, quantity, expirationDate } =
      req.body as CreateInventorySchema['body'];

    const product = await Product.findById(productId);

    if (!product) {
      throw new ErrorHandler(404, 'Product not found', 'NOT_FOUND');
    }

    const expiryDate = new Date(expirationDate);

    const inventory = await Inventory.create({
      productId,
      quantity,
      inputQuantity: quantity,
      expirationDate: expiryDate,
    });

    sendResponse(res, 201, 'Inventory created successfully', {
      inventory,
    });
  },
);

export const getInventoryStats = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query as InventoryStatsSchema['query'];

    const matchStage = getDateMatchStage('createdAt', query.from, query.to);

    const totalInventoryValuePipeline: PipelineStage[] = [
      {
        $match: matchStage,
      },
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $unwind: '$product',
      },
      {
        $addFields: {
          costPriceWithVat: {
            $multiply: [
              '$product.costPrice',
              { $add: [1, { $divide: ['$product.vat', 100] }] },
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalValue: {
            $sum: { $multiply: ['$quantity', '$costPriceWithVat'] },
          },
        },
      },
    ];

    const [[outOfStockCount], [lowStockCount], [totalValue]] =
      await Promise.all([
        Product.aggregate(buildStockCountPipeline(0)),
        Product.aggregate(buildStockCountPipeline(5)),
        Inventory.aggregate(totalInventoryValuePipeline),
      ]);

    sendResponse(res, 200, 'Inventory stats fetched successfully', {
      outOfStockCount: outOfStockCount?.count ?? 0,
      lowStockCount: lowStockCount?.count ?? 0,
      totalInventoryValue: totalValue?.totalValue ?? 0,
    });
  },
);
