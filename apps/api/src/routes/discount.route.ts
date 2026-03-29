import express, { Router } from 'express';

import { isAdmin } from '@/middlewares/auth.middleware';
import validate from '@/middlewares/validate.middleware';

import {
  getActiveBulkDiscounts,
  getDiscounts,
  getBulkDiscounts,
  createDiscount,
  createBulkDiscount,
  updateDiscount,
  toggleDiscountActive,
} from '@/controllers/discount.controller';

import {
  getActiveBulkDiscountsSchema,
  getDiscountsSchema,
  getBulkDiscountsSchema,
  createDiscountSchema,
  createBulkDiscountSchema,
  updateDiscountSchema,
  toggleDiscountActiveSchema,
} from '@/validators/discount.validator';

const router: Router = express.Router();

router.get(
  '/bulk/active',
  validate(getActiveBulkDiscountsSchema),
  getActiveBulkDiscounts,
);

router.get('/all', isAdmin, validate(getDiscountsSchema), getDiscounts);
router.get(
  '/bulk/all',
  isAdmin,
  validate(getBulkDiscountsSchema),
  getBulkDiscounts,
);
router.post('/', isAdmin, validate(createDiscountSchema), createDiscount);
router.post(
  '/bulk',
  isAdmin,
  validate(createBulkDiscountSchema),
  createBulkDiscount,
);
router.put(
  '/:discountId',
  isAdmin,
  validate(updateDiscountSchema),
  updateDiscount,
);
router.delete(
  '/:discountId',
  isAdmin,
  validate(toggleDiscountActiveSchema),
  toggleDiscountActive,
);

export default router;
