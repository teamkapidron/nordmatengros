// Node Modules

// Schemas
import Category from '@/models/category.model';

// Utils
import { generateSlug } from '@/utils/common/string.util';
import { sendResponse } from '@/utils/common/response.util';
import { getDateMatchStage } from '@/utils/common/date.util';

// Handlers
import { asyncHandler } from '@/handlers/async.handler';
import { ErrorHandler } from '@/handlers/error.handler';

// Types
import type { Request, Response } from 'express';
import type { CategoryStats } from '@/types/category.types';
import type { HierarchicalCategory } from '@repo/types/category';
import type {
  // User
  GetCategoriesSchema,
  GetCategoriesFlattenedSchema,
  GetCategoryByIdSchema,

  // Admin
  GetAllCategoriesFlattenedSchema,
  GetCategoryStatsSchema,
  CreateCategorySchema,
  UpdateCategorySchema,
  DeleteCategorySchema,
} from '@/validators/category.validator';

export const getCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit } = req.query as GetCategoriesSchema['query'];

    const perPage = parseInt(limit ?? '10', 10);
    const currentPage = parseInt(page ?? '1', 10);

    const filter = { visibleToStore: true };

    const categories = await Category.find(filter)
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 })
      .lean();

    const total = await Category.countDocuments(filter);

    const categoryMap = new Map<string, HierarchicalCategory>();
    const rootCategories: HierarchicalCategory[] = [];

    categories.forEach((category) => {
      const id = category._id.toString();
      const formattedCategory: HierarchicalCategory = {
        _id: id,
        name: category.name,
        slug: category.slug,
        image: category.image,
        isActive: category.isActive,
        visibleToStore: category.visibleToStore,
        children: [],
      };

      categoryMap.set(id, formattedCategory);

      if (!category.parentId) {
        rootCategories.push(formattedCategory);
      }
    });

    categories.forEach((category) => {
      if (category.parentId) {
        const parentId = category.parentId.toString();
        const parent = categoryMap.get(parentId);
        const child = categoryMap.get(category._id.toString());

        if (parent && child) {
          parent.children = parent.children || [];
          parent.children.push(child);
        }
      }
    });

    sendResponse(res, 200, 'Categories fetched successfully', {
      categories: rootCategories,
      total,
      currentPage,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
  },
);

export const getCategoriesFlattened = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit } = req.query as GetCategoriesFlattenedSchema['query'];

    const perPage = parseInt(limit ?? '10', 100);
    const currentPage = parseInt(page ?? '1', 10);

    const filter = { visibleToStore: true };

    const categories = await Category.find(filter)
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .sort({ name: 1 })
      .lean();

    const total = await Category.countDocuments(filter);

    sendResponse(res, 200, 'Categories fetched successfully', {
      categories,
      total,
      currentPage,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
  },
);

export const getCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params as GetCategoryByIdSchema['params'];

    const category = await Category.findById(categoryId);
    if (!category) {
      throw new ErrorHandler(404, 'Category not found', 'NOT_FOUND');
    }

    sendResponse(res, 200, 'Category fetched successfully', { category });
  },
);

export const getAllCategories = asyncHandler(
  async (_: Request, res: Response) => {
    const categories = await Category.find().sort({ createdAt: -1 }).lean();

    const categoryMap = new Map<string, HierarchicalCategory>();
    const rootCategories: HierarchicalCategory[] = [];

    categories.forEach((category) => {
      const id = category._id.toString();
      const formattedCategory: HierarchicalCategory = {
        _id: id,
        name: category.name,
        slug: category.slug,
        image: category.image,
        isActive: category.isActive,
        visibleToStore: category.visibleToStore,
        children: [],
      };

      categoryMap.set(id, formattedCategory);

      if (!category.parentId) {
        rootCategories.push(formattedCategory);
      }
    });

    categories.forEach((category) => {
      if (category.parentId) {
        const parentId = category.parentId.toString();
        const parent = categoryMap.get(parentId);
        const child = categoryMap.get(category._id.toString());

        if (parent && child) {
          parent.children = parent.children || [];
          parent.children.push(child);
        }
      }
    });

    sendResponse(res, 200, 'Categories fetched successfully', {
      categories: rootCategories,
    });
  },
);

export const getAllCategoriesFlattened = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit } =
      req.query as GetAllCategoriesFlattenedSchema['query'];

    const perPage = parseInt(limit ?? '100', 10);
    const currentPage = parseInt(page ?? '1', 10);

    const categories = await Category.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 })
      .lean();

    const total = await Category.countDocuments();

    sendResponse(res, 200, 'Categories fetched successfully', {
      categories,
      total,
      currentPage,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
  },
);

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, slug, image, isActive, visibleToStore, parentId } =
      req.body as CreateCategorySchema['body'];

    let newSlug = slug;
    if (!newSlug) {
      newSlug = generateSlug(name ?? '');
    }

    const category = await Category.create({
      name,
      slug: newSlug,
      image,
      isActive,
      visibleToStore,
      parentId: parentId === '' ? null : parentId,
    });

    sendResponse(res, 201, 'Category created successfully', { category });
  },
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params as UpdateCategorySchema['params'];
    const { name, slug, image, isActive, visibleToStore, parentId } =
      req.body as UpdateCategorySchema['body'];

    const category = await Category.findById(categoryId);
    if (!category) {
      throw new ErrorHandler(404, 'Category not found', 'NOT_FOUND');
    }

    const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
      name,
      slug,
      image,
      isActive,
      visibleToStore,
      parentId,
    });

    sendResponse(res, 200, 'Category updated successfully', {
      category: updatedCategory,
    });
  },
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params as DeleteCategorySchema['params'];

    const category = await Category.findById(categoryId);
    if (!category) {
      throw new ErrorHandler(404, 'Category not found', 'NOT_FOUND');
    }

    await category.deleteOne();

    sendResponse(res, 200, 'Category deleted successfully');
  },
);

export const getCategoryStats = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to } = req.query as GetCategoryStatsSchema['query'];

    const matchStage = getDateMatchStage('createdAt', from, to);

    const [stats] = await Category.aggregate<CategoryStats>([
      { $match: matchStage },
      {
        $facet: {
          totalCategories: [{ $count: 'count' }],
          nestedCategories: [
            { $match: { parentId: { $ne: null } } },
            { $count: 'count' },
          ],
          activeCategories: [
            { $match: { isActive: true } },
            { $count: 'count' },
          ],
          inactiveCategories: [
            { $match: { isActive: false } },
            { $count: 'count' },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          totalCategories: 1,
          nestedCategories: 1,
          activeCategories: 1,
          inactiveCategories: 1,
        },
      },
    ]);

    if (!stats) {
      throw new ErrorHandler(404, 'No stats found', 'NOT_FOUND');
    }

    sendResponse(res, 200, 'Category stats fetched successfully', { stats });
  },
);
