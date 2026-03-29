import express, { Router } from 'express';

import { isAdmin } from '@/middlewares/auth.middleware';
import validate from '@/middlewares/validate.middleware';

import {
  getCategories,
  getCategoriesFlattened,
  getCategoryById,
  getAllCategories,
  getAllCategoriesFlattened,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryStats,
} from '@/controllers/category.controller';
import {
  getCategoriesSchema,
  getCategoriesFlattenedSchema,
  getCategoryByIdSchema,
  getAllCategoriesSchema,
  getAllCategoriesFlattenedSchema,
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
  getCategoryStatsSchema,
} from '@/validators/category.validator';

const router: Router = express.Router();

router.get('/list', validate(getCategoriesSchema), getCategories);
router.get(
  '/flattened',
  validate(getCategoriesFlattenedSchema),
  getCategoriesFlattened,
);
router.get(
  '/details/:categoryId',
  validate(getCategoryByIdSchema),
  getCategoryById,
);

router.get('/all', isAdmin, validate(getAllCategoriesSchema), getAllCategories);
router.get(
  '/all/flattened',
  isAdmin,
  validate(getAllCategoriesFlattenedSchema),
  getAllCategoriesFlattened,
);
router.post('/', isAdmin, validate(createCategorySchema), createCategory);
router.put(
  '/:categoryId',
  isAdmin,
  validate(updateCategorySchema),
  updateCategory,
);
router.delete(
  '/:categoryId',
  isAdmin,
  validate(deleteCategorySchema),
  deleteCategory,
);
router.get(
  '/stats',
  isAdmin,
  validate(getCategoryStatsSchema),
  getCategoryStats,
);

export default router;
