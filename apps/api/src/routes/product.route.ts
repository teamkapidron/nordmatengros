import express, { Router } from 'express';

import validate from '@/middlewares/validate.middleware';
import { addUserToRequest, isAdmin } from '@/middlewares/auth.middleware';

import {
  // User
  getProducts,
  getProductById,
  getProductBySlug,
  quickSearchProducts,
  fullSearchProducts,

  // Admin
  getAllProducts,
  getProductImageUploadUrl,
  getProductByIdAdmin,
  getProductBySlugAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  lowStockProducts,
  topProducts,
  productStats,
} from '@/controllers/product.controller';

import {
  getProductsSchema,
  getProductByIdSchema,
  getProductBySlugSchema,
  quickSearchProductsSchema,
  fullSearchProductsSchema,
  getAllProductsSchema,
  getProductImageUploadUrlSchema,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
  lowStockProductsSchema,
  topProductsSchema,
  productStatsSchema,
} from '@/validators/product.validator';

const router: Router = express.Router();

/* --------------------------START: User Routes -------------------------- */
router.get('/list', addUserToRequest, validate(getProductsSchema), getProducts);
router.get(
  '/details/:productId',
  addUserToRequest,
  validate(getProductByIdSchema),
  getProductById,
);
router.get(
  '/slug/:slug',
  addUserToRequest,
  validate(getProductBySlugSchema),
  getProductBySlug,
);
router.get(
  '/search/quick',
  validate(quickSearchProductsSchema),
  quickSearchProducts,
);
router.get('/search', validate(fullSearchProductsSchema), fullSearchProducts);
/* --------------------------END: User Routes -------------------------- */

/* --------------------------START: Admin Routes -------------------------- */
router.get('/all', isAdmin, validate(getAllProductsSchema), getAllProducts);
router.post(
  '/image-upload-url',
  isAdmin,
  validate(getProductImageUploadUrlSchema),
  getProductImageUploadUrl,
);
router.post('/', isAdmin, validate(createProductSchema), createProduct);
router.get(
  '/admin/details/:productId',
  isAdmin,
  validate(getProductByIdSchema),
  getProductByIdAdmin,
);
router.get(
  '/admin/slug/:slug',
  isAdmin,
  validate(getProductBySlugSchema),
  getProductBySlugAdmin,
);
router.put(
  '/:productId',
  isAdmin,
  validate(updateProductSchema),
  updateProduct,
);
router.delete(
  '/:productId',
  isAdmin,
  validate(deleteProductSchema),
  deleteProduct,
);
router.get(
  '/low-stock',
  isAdmin,
  validate(lowStockProductsSchema),
  lowStockProducts,
);
router.get('/top', isAdmin, validate(topProductsSchema), topProducts);
router.get('/stats', isAdmin, validate(productStatsSchema), productStats);
/* --------------------------END: Admin Routes -------------------------- */

export default router;
