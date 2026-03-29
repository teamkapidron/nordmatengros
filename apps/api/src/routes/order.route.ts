import express, { Router } from 'express';

import { isAdmin, isAuthenticated } from '@/middlewares/auth.middleware';
import validate from '@/middlewares/validate.middleware';

import {
  // User
  placeOrder,
  getUserOrders,
  getOrderDetails,
  cancelOrder,

  // Admin
  getAllOrders,
  getOrderDetailsAdmin,
  updateOrderStatus,
  getOrderStats,
  getOrderRevenueStats,
  getOrderStatusGraphData,
  getOrderRevenueGraphData,
  getRecentOrders,
  previewPickingList,
  previewFreightLabel,
  cancelOrderAdmin,
  deleteOrderAdmin,
} from '@/controllers/order.controller';

import {
  // User
  placeOrderSchema,
  getUserOrdersSchema,
  getUserOrderDetailsSchema,
  cancelOrderSchema,

  // Admin
  getAllOrdersSchema,
  getOrderDetailsAdminSchema,
  updateOrderStatusSchema,
  getOrderStatsSchema,
  getOrderRevenueStatsSchema,
  getOrderStatusGraphDataSchema,
  getOrderRevenueGraphDataSchema,
  getRecentOrdersSchema,
  previewPickingListSchema,
  previewFreightLabelSchema,
  deleteOrderSchema,
} from '@/validators/order.validator';

const router: Router = express.Router();

/* --------------------------START: User Routes -------------------------- */
router.post('/place', isAuthenticated, validate(placeOrderSchema), placeOrder);
router.get(
  '/my',
  isAuthenticated,
  validate(getUserOrdersSchema),
  getUserOrders,
);
router.get(
  '/details/:orderId',
  isAuthenticated,
  validate(getUserOrderDetailsSchema),
  getOrderDetails,
);
router.post(
  '/:orderId/cancel',
  isAuthenticated,
  validate(cancelOrderSchema),
  cancelOrder,
);
/* --------------------------END: User Routes -------------------------- */

/* --------------------------START: Admin Routes -------------------------- */
router.get('/all', isAdmin, validate(getAllOrdersSchema), getAllOrders);
router.get(
  '/details/admin/:orderId',
  isAdmin,
  validate(getOrderDetailsAdminSchema),
  getOrderDetailsAdmin,
);
router.patch(
  '/status/:orderId',
  isAdmin,
  validate(updateOrderStatusSchema),
  updateOrderStatus,
);
router.get('/stats', isAdmin, validate(getOrderStatsSchema), getOrderStats);
router.get(
  '/stats/revenue',
  isAdmin,
  validate(getOrderRevenueStatsSchema),
  getOrderRevenueStats,
);
router.get(
  '/graph/status',
  isAdmin,
  validate(getOrderStatusGraphDataSchema),
  getOrderStatusGraphData,
);
router.get(
  '/graph/revenue',
  isAdmin,
  validate(getOrderRevenueGraphDataSchema),
  getOrderRevenueGraphData,
);
router.get(
  '/recent',
  isAdmin,
  validate(getRecentOrdersSchema),
  getRecentOrders,
);
router.get(
  '/preview/picking-list/:orderId',
  isAdmin,
  validate(previewPickingListSchema),
  previewPickingList,
);
router.get(
  '/preview/freight-label/:orderId',
  isAdmin,
  validate(previewFreightLabelSchema),
  previewFreightLabel,
);
router.post(
  '/cancel/admin/:orderId',
  isAdmin,
  validate(cancelOrderSchema),
  cancelOrderAdmin,
);
router.delete(
  '/delete/admin/:orderId',
  isAdmin,
  validate(deleteOrderSchema),
  deleteOrderAdmin,
);
/* --------------------------END: Admin Routes -------------------------- */

export default router;
