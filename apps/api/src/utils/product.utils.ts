import { PipelineStage, Types } from 'mongoose';

import Category from '@/models/category.model';

import { Visibility } from '@repo/types/product';
import { ProductFilter, UserProductFilter } from '@/types/product.types';
import type {
  GetAllProductsSchema,
  GetProductsSchema,
} from '@/validators/product.validator';

export async function getAllSubCategoryIds(
  categoryId: Types.ObjectId,
): Promise<Types.ObjectId[]> {
  const subCategories = await Category.find({ parentId: categoryId }, '_id');
  const subCategoryIds = subCategories.map((cat) => cat._id as Types.ObjectId);

  const deeperSubCategoryIds = await Promise.all(
    subCategoryIds.map((id) => getAllSubCategoryIds(id)),
  );

  return [categoryId, ...subCategoryIds, ...deeperSubCategoryIds.flat()];
}

export async function getUserProductFilterFromQuery(
  query: GetProductsSchema['query'],
) {
  const { search, page, limit, category, minPrice, maxPrice } = query;

  const perPage = parseInt(limit ?? '10', 10);
  const currentPage = parseInt(page ?? '1', 10);

  const queryObject: UserProductFilter = {};

  if (search) {
    queryObject.$or = [
      { name: new RegExp(search, 'i') },
      { slug: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
    ];
  }

  if (category) {
    const categoryId = new Types.ObjectId(category);
    const subCategoryIds = await getAllSubCategoryIds(categoryId);

    queryObject.categories = { $in: subCategoryIds };
  }

  if (minPrice || maxPrice) {
    queryObject.salePrice = {};

    if (minPrice) {
      queryObject.salePrice.$gte = parseInt(minPrice, 10);
    }

    if (maxPrice && parseInt(maxPrice, 10) !== 0) {
      queryObject.salePrice.$lte = parseInt(maxPrice, 10);
    }
  }

  return {
    queryObject,
    perPage,
    currentPage,
  };
}

export async function getProductFilterFromQuery(
  query: GetAllProductsSchema['query'],
) {
  const { search, page, limit, category, isActive, visibility } = query;

  const perPage = parseInt(limit ?? '10', 10);
  const currentPage = parseInt(page ?? '1', 10);

  const queryObject: ProductFilter = {};

  if (search) {
    queryObject.$or = [
      { name: new RegExp(search, 'i') },
      { slug: new RegExp(search, 'i') },
      { sku: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
      { shortDescription: new RegExp(search, 'i') },
    ];
  }

  if (category) {
    const categoryId = new Types.ObjectId(category);
    const subCategoryIds = await getAllSubCategoryIds(categoryId);

    queryObject.categories = { $in: subCategoryIds };
  }

  if (isActive) {
    queryObject.isActive = isActive === 'true';
  }

  if (visibility) {
    queryObject.visibility = visibility as Visibility;
  }

  return {
    queryObject,
    perPage,
    currentPage,
  };
}

export function buildStockPipeline(stockThreshold: number, limit: number = 5) {
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
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'categories',
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
      $project: {
        name: 1,
        categories: {
          _id: 1,
          name: 1,
        },
        totalStock: 1,
      },
    },
    {
      $limit: limit,
    },
  ];

  return pipeline;
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
