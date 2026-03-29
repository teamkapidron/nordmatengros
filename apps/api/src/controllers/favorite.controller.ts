// Node Modules
import { Types } from 'mongoose';

// Schemas
import Product from '@/models/product.model';
import Favorite from '@/models/favorite.model';

// Utils
import { sendResponse } from '@/utils/common/response.util';

// Handlers
import { asyncHandler } from '@/handlers/async.handler';
import { ErrorHandler } from '@/handlers/error.handler';

// Types
import type {
  GetFavoritesSchema,
  AddToFavoritesSchemaType,
  RemoveFromFavoritesSchemaType,
} from '@/validators/favourite.validator';
import { UserType } from '@repo/types/user';
import type { Request, Response } from 'express';
import type { FavoriteAggregateType } from '@/types/favourite.types';
import { getPagination } from '@/utils/common/pagination.utils';

export const getUserFavorites = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const userType = req.user?.userType;
    const query = req.query as GetFavoritesSchema['query'];

    const { page, limit } = getPagination(query.page, query.limit);

    const favorites = await Favorite.aggregate<FavoriteAggregateType>([
      { $match: { userId: new Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'productId',
        },
      },
      { $unwind: '$productId' },
      {
        $lookup: {
          from: 'categories',
          localField: 'productId.categories',
          foreignField: '_id',
          as: 'productId.categories',
        },
      },
      {
        $addFields: {
          'productId.price': {
            $cond: {
              if: { $eq: [userType, UserType.INTERNAL] },
              then: '$productId.costPrice',
              else: {
                $cond: {
                  if: { $eq: [userType, UserType.EXTERNAL] },
                  then: '$productId.salePrice',
                  else: 0,
                },
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          product: {
            _id: '$productId._id',
            name: '$productId.name',
            slug: '$productId.slug',
            images: '$productId.images',
            price: '$productId.price',
            shortDescription: '$productId.shortDescription',
            categories: {
              $map: {
                input: '$productId.categories',
                as: 'cat',
                in: {
                  _id: '$$cat._id',
                  name: '$$cat.name',
                  slug: '$$cat.slug',
                },
              },
            },
          },
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: limit * (page - 1) },
      { $limit: limit },
    ]);

    const totalFavorites = await Favorite.countDocuments({ userId });

    sendResponse(res, 200, 'Favorites fetched successfully', {
      favorites,
      totalFavorites,
      page,
      perPage: limit,
      totalPages: Math.ceil(totalFavorites / limit),
    });
  },
);

export const addToFavorites = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const { productId } = req.params as AddToFavoritesSchemaType['params'];

    const product = await Product.findById(productId);
    if (!product) {
      throw new ErrorHandler(404, 'Product not found', 'NOT_FOUND');
    }

    await Favorite.findOneAndUpdate(
      { userId, productId },
      { userId, productId },
      { upsert: true },
    );

    sendResponse(res, 201, 'Product added to favorites');
  },
);

export const removeFromFavorites = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const { productId } = req.params as RemoveFromFavoritesSchemaType['params'];

    await Favorite.findOneAndDelete({
      userId,
      productId,
    });

    sendResponse(res, 200, 'Product removed from favorites');
  },
);
