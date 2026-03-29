// Node Modules
import { PipelineStage, Types } from 'mongoose';

// Schemas
import Order from '@/models/order.model';
import Product from '@/models/product.model';
import Category from '@/models/category.model';

// Utils
import { getPresignedPostUrl } from '@/lib/s3';
import { generateSlug } from '@/utils/common/string.util';
import { sendResponse } from '@/utils/common/response.util';
import { getDateMatchStage } from '@/utils/common/date.util';
import {
  buildStockPipeline,
  buildStockCountPipeline,
  getProductFilterFromQuery,
  getUserProductFilterFromQuery,
} from '@/utils/product.utils';

// Handlers
import { asyncHandler } from '@/handlers/async.handler';
import { ErrorHandler } from '@/handlers/error.handler';

// Types
import { Visibility } from '@repo/types/product';
import type { Request, Response } from 'express';
import type {
  GetProductsSchema,
  GetProductByIdSchema,
  GetProductBySlugSchema,
  QuickSearchProductsSchema,
  FullSearchProductsSchema,
  GetAllProductsSchema,
  GetProductImageUploadUrlSchema,
  CreateProductSchema,
  DeleteProductSchema,
  UpdateProductSchema,
  LowStockProductsSchema,
  TopProductsSchema,
} from '@/validators/product.validator';
import {
  QuickSearchProduct,
  QuickSearchProductAggregateType,
  ProductStock,
} from '@/types/product.types';
import { UserType } from '@repo/types/user';

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const userType = req.user?.userType;
  const query = req.query as GetProductsSchema['query'];

  const { queryObject, perPage, currentPage } =
    await getUserProductFilterFromQuery(query);

  const pipeline: PipelineStage[] = [
    {
      $match: {
        ...queryObject,
        isActive: true,
        visibility: {
          $in: !userId
            ? [Visibility.EXTERNAL, Visibility.BOTH]
            : userType === UserType.INTERNAL
              ? [Visibility.INTERNAL, Visibility.BOTH]
              : [Visibility.EXTERNAL, Visibility.BOTH],
        },
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'categories',
        pipeline: [
          {
            $project: {
              _id: 1,
              name: 1,
              slug: 1,
            },
          },
        ],
      },
    },
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
        stock: { $sum: '$inventory.quantity' },
        bestBeforeDate: { $min: '$inventory.expirationDate' },
      },
    },
    {
      $project: {
        inventory: 0,
      },
    },
  ];

  if (query.stock === ProductStock.IN_STOCK) {
    pipeline.push({
      $match: {
        stock: { $gt: 0 },
      },
    });
  } else if (query.stock === ProductStock.OUT_OF_STOCK) {
    pipeline.push({
      $match: {
        $or: [{ stock: { $eq: 0 } }, { stock: { $exists: false } }],
      },
    });
  }

  if (userId) {
    pipeline.push(
      {
        $lookup: {
          from: 'favorites',
          localField: '_id',
          foreignField: 'productId',
          as: 'favorite',
          pipeline: [
            {
              $match: {
                userId: new Types.ObjectId(userId),
              },
            },
          ],
        },
      },
      {
        $addFields: {
          isFavorite: { $gt: [{ $size: '$favorite' }, 0] },
        },
      },
      {
        $project: {
          favorite: 0,
        },
      },
      {
        $addFields: {
          price: {
            $cond: [
              { $eq: [userType, UserType.INTERNAL] },
              '$costPrice',
              {
                $cond: [
                  { $eq: [userType, UserType.EXTERNAL] },
                  '$salePrice',
                  0,
                ],
              },
            ],
          },
          hasVolumeDiscount: {
            $cond: [
              {
                $or: [
                  { $eq: [userType, UserType.INTERNAL] },
                  { $not: [userType] },
                ],
              },
              false,
              '$hasVolumeDiscount',
            ],
          },
        },
      },
    );
  } else {
    pipeline.push({
      $addFields: {
        price: 0,
        hasVolumeDiscount: false,
      },
    });
  }

  pipeline.push(
    {
      $project: {
        costPrice: 0,
        salePrice: 0,
      },
    },
    {
      $skip: perPage * (currentPage - 1),
    },
    {
      $limit: perPage,
    },
  );

  const products = await Product.aggregate(pipeline);

  const totalProducts = await Product.countDocuments({
    ...queryObject,
    isActive: true,
    visibility: { $in: [Visibility.EXTERNAL, Visibility.BOTH] },
  });

  sendResponse(res, 200, 'Products fetched successfully', {
    products,
    totalProducts,
    currentPage,
    perPage,
    totalPages: Math.ceil(totalProducts / perPage),
  });
});

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const userType = req.user?.userType;
    const { productId } = req.params as GetProductByIdSchema['params'];

    const pipeline: PipelineStage[] = [
      {
        $match: { _id: new Types.ObjectId(productId) },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories',
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
                slug: 1,
              },
            },
          ],
        },
      },
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
          stock: { $sum: '$inventory.quantity' },
          bestBeforeDate: { $min: '$inventory.expirationDate' },
        },
      },
      {
        $project: {
          inventory: 0,
        },
      },
    ];

    if (userId) {
      pipeline.push(
        {
          $lookup: {
            from: 'favorites',
            localField: '_id',
            foreignField: 'productId',
            as: 'favorite',
            pipeline: [
              {
                $match: {
                  userId: new Types.ObjectId(userId),
                },
              },
            ],
          },
        },
        {
          $addFields: {
            isFavorite: { $gt: [{ $size: '$favorite' }, 0] },
          },
        },
        {
          $project: {
            favorite: 0,
          },
        },
        {
          $addFields: {
            price: {
              $cond: [
                { $eq: [userType, UserType.INTERNAL] },
                '$costPrice',
                {
                  $cond: [
                    { $eq: [userType, UserType.EXTERNAL] },
                    '$salePrice',
                    0,
                  ],
                },
              ],
            },
            hasVolumeDiscount: {
              $cond: [
                {
                  $or: [
                    { $eq: [userType, UserType.INTERNAL] },
                    { $not: [userType] },
                  ],
                },
                false,
                '$hasVolumeDiscount',
              ],
            },
          },
        },
      );
    } else {
      pipeline.push({
        $addFields: {
          price: 0,
          hasVolumeDiscount: false,
        },
      });
    }

    const product = await Product.aggregate(pipeline);

    if (!product) {
      throw new ErrorHandler(404, 'Product not found', 'NOT_FOUND');
    }

    sendResponse(res, 200, 'Product fetched successfully', {
      product: product[0],
    });
  },
);

export const getProductBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const userType = req.user?.userType;
    const { slug } = req.params as GetProductBySlugSchema['params'];

    const pipeline: PipelineStage[] = [
      {
        $match: { slug },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories',
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
                slug: 1,
              },
            },
          ],
        },
      },
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
          stock: { $sum: '$inventory.quantity' },
          bestBeforeDate: { $min: '$inventory.expirationDate' },
        },
      },
      {
        $project: {
          inventory: 0,
        },
      },
    ];

    if (userId) {
      pipeline.push(
        {
          $lookup: {
            from: 'favorites',
            localField: '_id',
            foreignField: 'productId',
            as: 'favorite',
            pipeline: [
              {
                $match: {
                  userId: new Types.ObjectId(userId),
                },
              },
            ],
          },
        },
        {
          $addFields: {
            isFavorite: { $gt: [{ $size: '$favorite' }, 0] },
          },
        },
        {
          $project: {
            favorite: 0,
          },
        },
        {
          $addFields: {
            price: {
              $cond: [
                { $eq: [userType, UserType.INTERNAL] },
                '$costPrice',
                {
                  $cond: [
                    { $eq: [userType, UserType.EXTERNAL] },
                    '$salePrice',
                    0,
                  ],
                },
              ],
            },
            hasVolumeDiscount: {
              $cond: [
                {
                  $or: [
                    { $eq: [userType, UserType.INTERNAL] },
                    { $not: [userType] },
                  ],
                },
                false,
                '$hasVolumeDiscount',
              ],
            },
          },
        },
      );
    } else {
      pipeline.push({
        $addFields: {
          price: 0,
          hasVolumeDiscount: false,
        },
      });
    }

    const product = await Product.aggregate(pipeline);

    if (!product) {
      throw new ErrorHandler(404, 'Product not found', 'NOT_FOUND');
    }

    sendResponse(res, 200, 'Product fetched successfully', {
      product: product[0],
    });
  },
);

export const quickSearchProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const { query, limit } = req.query as QuickSearchProductsSchema['query'];

    const maxLimit = parseInt(limit ?? '10', 10);
    const searchFilter = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { slug: { $regex: query, $options: 'i' } },
        { shortDescription: { $regex: query, $options: 'i' } },
        { sku: { $regex: query, $options: 'i' } },
      ],
    };

    const products = await Product.aggregate<QuickSearchProductAggregateType>([
      {
        $match: searchFilter,
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
        $project: {
          _id: 1,
          name: 1,
          images: 1,
          slug: 1,
          shortDescription: 1,
          noOfUnits: 1,
          salePrice: 1,
          categories: {
            name: 1,
            slug: 1,
          },
        },
      },
      {
        $limit: maxLimit,
      },
    ]);

    const formattedProducts: QuickSearchProduct[] = products.map((product) => ({
      _id: product._id,
      name: product.name,
      image: product.images?.[0],
      slug: product.slug,
      noOfUnits: product.noOfUnits,
      salePrice: product.salePrice,
      shortDescription: product.shortDescription,
      categories: product.categories[0] ?? { name: '', slug: '' },
    }));

    sendResponse(res, 200, 'Quick search completed successfully', {
      products: formattedProducts,
    });
  },
);

export const fullSearchProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const { query, page, limit, category, minPrice, maxPrice } =
      req.query as FullSearchProductsSchema['query'];

    const perPage = parseInt(limit ?? '10', 10);
    const currentPage = parseInt(page ?? '1', 10);

    const searchFilter = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { slug: { $regex: query, $options: 'i' } },
        { shortDescription: { $regex: query, $options: 'i' } },
        { sku: { $regex: query, $options: 'i' } },
      ],
    };

    const totalRecords = await Product.countDocuments(searchFilter);

    const products = await Product.find(searchFilter)
      .populate('categories', 'name slug')
      .limit(perPage)
      .skip((currentPage - 1) * perPage);

    sendResponse(res, 200, 'Search completed successfully', {
      products,
      totalRecords,
      totalPages: Math.ceil(totalRecords / perPage),
      page: currentPage,
      perPage,
    });
  },
);

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query as GetAllProductsSchema['query'];

    const { queryObject, perPage, currentPage } =
      await getProductFilterFromQuery(query);

    const products = await Product.aggregate([
      {
        $match: queryObject,
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories',
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
                slug: 1,
              },
            },
          ],
        },
      },
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
          stock: {
            $sum: '$inventory.quantity',
          },
        },
      },
      {
        $project: {
          inventory: 0,
        },
      },
      {
        $skip: perPage * (currentPage - 1),
      },
      {
        $limit: perPage,
      },
    ]);

    const totalProducts = await Product.countDocuments(queryObject);

    sendResponse(res, 200, 'Products fetched successfully', {
      products,
      totalProducts,
      currentPage,
      perPage,
      totalPages: Math.ceil(totalProducts / perPage),
    });
  },
);

export const getProductImageUploadUrl = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug, names, imageCount } =
      req.body as GetProductImageUploadUrlSchema['body'];

    const urls = await Promise.all(
      Array.from({ length: imageCount }).map((_, index) =>
        getPresignedPostUrl(`products/${slug}/images/${names[index]}`),
      ),
    );

    sendResponse(res, 200, 'Product image upload URL fetched successfully', {
      urls,
    });
  },
);

export const getProductByIdAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId } = req.params as GetProductByIdSchema['params'];

    const pipeline: PipelineStage[] = [
      {
        $match: { _id: new Types.ObjectId(productId) },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories',
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
                slug: 1,
              },
            },
          ],
        },
      },
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
          stock: { $sum: '$inventory.quantity' },
          bestBeforeDate: { $min: '$inventory.expirationDate' },
        },
      },
      {
        $project: {
          inventory: 0,
        },
      },
    ];

    const product = await Product.aggregate(pipeline);

    if (!product) {
      throw new ErrorHandler(404, 'Product not found', 'NOT_FOUND');
    }

    sendResponse(res, 200, 'Product fetched successfully', {
      product: product[0],
    });
  },
);

export const getProductBySlugAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug } = req.params as GetProductBySlugSchema['params'];

    const pipeline: PipelineStage[] = [
      {
        $match: { slug },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories',
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
                slug: 1,
              },
            },
          ],
        },
      },
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
          stock: { $sum: '$inventory.quantity' },
          bestBeforeDate: { $min: '$inventory.expirationDate' },
        },
      },
      {
        $project: {
          inventory: 0,
        },
      },
    ];

    const product = await Product.aggregate(pipeline);

    if (!product) {
      throw new ErrorHandler(404, 'Product not found', 'NOT_FOUND');
    }

    sendResponse(res, 200, 'Product fetched successfully', {
      product: product[0],
    });
  },
);

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const productData = req.body as CreateProductSchema['body'];

    if (!productData.slug) {
      productData.slug = generateSlug(productData.name);
    }

    const product = await Product.create(productData);

    sendResponse(res, 201, 'Product created successfully', { product });
  },
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId } = req.params as UpdateProductSchema['params'];
    const updateData = req.body as UpdateProductSchema['body'];

    const product = await Product.findById(productId);
    if (!product) {
      throw new ErrorHandler(404, 'Product not found', 'NOT_FOUND');
    }

    if (!updateData.slug) {
      updateData.slug = generateSlug(updateData.name);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true },
    );

    sendResponse(res, 200, 'Product updated successfully', {
      product: updatedProduct,
    });
  },
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId } = req.params as DeleteProductSchema['params'];

    const product = await Product.findById(productId);
    if (!product) {
      throw new ErrorHandler(404, 'Product not found', 'NOT_FOUND');
    }

    await Product.findByIdAndDelete(productId);

    sendResponse(res, 200, 'Product deleted successfully');
  },
);

export const lowStockProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const { lowStockThreshold } = req.query as LowStockProductsSchema['query'];

    const stockThreshold = parseInt(lowStockThreshold ?? '5', 10);

    const [
      outOfStockProducts,
      lowStockProducts,
      outOfStockCount,
      lowStockCount,
    ] = await Promise.all([
      Product.aggregate(buildStockPipeline(0)),
      Product.aggregate(buildStockPipeline(stockThreshold)),
      Product.aggregate(buildStockCountPipeline(0)),
      Product.aggregate(buildStockCountPipeline(stockThreshold)),
    ]);

    sendResponse(res, 200, 'Low stock products fetched successfully', {
      outOfStockProducts,
      lowStockProducts,
      outOfStockCount: outOfStockCount[0]?.count ?? 0,
      lowStockCount: lowStockCount[0]?.count ?? 0,
    });
  },
);

export const topProducts = asyncHandler(async (req: Request, res: Response) => {
  const { limit, from, to } = req.query as TopProductsSchema['query'];

  const limitNumber = parseInt(limit ?? '10', 10);
  const matchStage = getDateMatchStage('createdAt', from, to);

  const topProductsResult = await Order.aggregate([
    {
      $match: matchStage,
    },
    {
      $unwind: '$items',
    },
    {
      $group: {
        _id: '$items.productId',
        totalQuantity: { $sum: '$items.quantity' },
        totalOrders: { $sum: 1 },
      },
    },
    {
      $sort: { totalQuantity: -1 },
    },
    {
      $limit: limitNumber,
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    {
      $unwind: '$productDetails',
    },
    {
      $project: {
        _id: 0,
        product: {
          _id: '$productDetails._id',
          name: '$productDetails.name',
          image: '$productDetails.images',
          slug: '$productDetails.slug',
        },
        totalQuantity: 1,
        totalOrders: 1,
      },
    },
  ]);

  sendResponse(res, 200, 'Top products fetched successfully', {
    products: topProductsResult,
  });
});

export const productStats = asyncHandler(async (_: Request, res: Response) => {
  const [totalProducts, totalCategories, activeProducts, activeCategories] =
    await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Product.countDocuments({ isActive: true }),
      Category.countDocuments({ isActive: true }),
    ]);

  sendResponse(res, 200, 'Product stats fetched successfully', {
    totalProducts,
    totalCategories,
    activeProducts,
    activeCategories,
  });
});
