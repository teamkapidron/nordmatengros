import { PipelineStage, Types } from 'mongoose';
import { getPagination } from './common/pagination.utils';
import { GetAllInventorySchema } from '@/validators/inventory.validator';

import { IInventory } from '@/models/interfaces/inventory.model';
import { InventoryFilterQuery, InventoryStatus } from '@/types/inventory.types';

export function getInventoryFilterFromQuery(
  query: GetAllInventorySchema['query'],
) {
  const { page, limit, skip } = getPagination(query.page, query.limit);

  const queryObject: InventoryFilterQuery = {};

  if (query.search) {
    queryObject.$or = [
      { 'product.name': new RegExp(query.search, 'i') },
      { 'product.sku': new RegExp(query.search, 'i') },
      { 'product.barcode': new RegExp(query.search, 'i') },
    ];
  }

  if (query.status) {
    if (query.status === InventoryStatus.IN_STOCK) {
      queryObject.quantity = { $gt: 10 };
    } else if (query.status === InventoryStatus.OUT_OF_STOCK) {
      queryObject.quantity = { $eq: 0 };
    } else if (query.status === InventoryStatus.LOW_STOCK) {
      queryObject.quantity = { $lte: 10 };
    } else if (query.status === InventoryStatus.ALL) {
      queryObject.quantity = { $gte: 0 };
    }
  }

  return { queryObject, page, limit, skip };
}

export function buildStockCountPipeline(stockThreshold: number) {
  const pipeline: PipelineStage[] = [
    {
      $lookup: {
        from: 'inventories',
        localField: '_id',
        foreignField: 'productId',
        as: 'inventory',
      },
    },
    {
      $addFields: {
        totalStock: { $sum: '$inventory.quantity' },
      },
    },
    {
      $match: {
        totalStock: stockThreshold === 0 ? 0 : { $gt: 0, $lte: stockThreshold },
      },
    },
    {
      $count: 'count',
    },
  ];

  return pipeline;
}

export function calculateInventoryRestoration(
  inventoryRecords: IInventory[],
  quantityToRestore: number,
): Array<{ _id: Types.ObjectId; newQuantity: number }> {
  const inventoryOperations: Array<{
    _id: Types.ObjectId;
    newQuantity: number;
  }> = [];
  let remainingToRestore = quantityToRestore;

  for (const record of inventoryRecords) {
    if (remainingToRestore <= 0) break;

    const maxCapacity = record.inputQuantity;
    const currentQuantity = record.quantity;
    const availableSpace = maxCapacity - currentQuantity;

    if (availableSpace > 0) {
      const restoreAmount = Math.min(availableSpace, remainingToRestore);
      const newQuantity = currentQuantity + restoreAmount;

      inventoryOperations.push({
        _id: record._id as Types.ObjectId,
        newQuantity,
      });

      remainingToRestore -= restoreAmount;
    }
  }

  return inventoryOperations;
}
