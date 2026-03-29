import express, { Router } from 'express';

import validate from '@/middlewares/validate.middleware';
import { isAdmin } from '@/middlewares/auth.middleware';

import {
  getAllInventory,
  updateInventory,
  deleteInventory,
  getProductInventory,
  createInventory,
  getInventoryStats,
} from '@/controllers/inventory.controller';

import {
  getAllInventorySchema,
  updateInventorySchema,
  deleteInventorySchema,
  getProductInventorySchema,
  createInventorySchema,
  inventoryStatsSchema,
} from '@/validators/inventory.validator';

const router: Router = express.Router();

router.get('/', isAdmin, validate(getAllInventorySchema), getAllInventory);
router.put(
  '/:inventoryId',
  isAdmin,
  validate(updateInventorySchema),
  updateInventory,
);
router.delete(
  '/:inventoryId',
  isAdmin,
  validate(deleteInventorySchema),
  deleteInventory,
);
router.get(
  '/product/:productId',
  isAdmin,
  validate(getProductInventorySchema),
  getProductInventory,
);
router.post('/', isAdmin, validate(createInventorySchema), createInventory);
router.get(
  '/stats',
  isAdmin,
  validate(inventoryStatsSchema),
  getInventoryStats,
);

export default router;
