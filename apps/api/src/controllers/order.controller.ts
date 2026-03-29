// Node Modules
import mongoose, { Types } from 'mongoose';

// Schemas
import Order from '@/models/order.model';
import Product from '@/models/product.model';
import Address from '@/models/address.model';
import Inventory from '@/models/inventory.model';
import BulkDiscount from '@/models/bulkDiscount.model';

// Utils
import { formatDate } from '@/utils/common/date.util';
import { sendResponse } from '@/utils/common/response.util';
import { getOrderFiltersFromQuery } from '@/utils/order.utils';
import { getPagination } from '@/utils/common/pagination.utils';
import {
  pickingListTemplate,
  freightLabelTemplate,
} from '@/templates/order.template';
import { getDateMatchStage, fillMissingDates } from '@/utils/common/date.util';
import { sendMail } from '@/utils/common/mail.util';
import { calculateInventoryRestoration } from '@/utils/inventory.utils';

// Handlers
import { asyncHandler } from '@/handlers/async.handler';
import { ErrorHandler } from '@/handlers/error.handler';

// Types
import type { Request, Response } from 'express';
import type {
  PlaceOrderSchema,
  GetUserOrdersSchema,
  GetUserOrderDetailsSchema,
  CancelOrderSchema,

  // Admin
  GetAllOrdersSchema,
  GetOrderDetailsAdminSchema,
  UpdateOrderStatusSchema,
  UpdateOrderDetailsSchema,
  DeleteOrderSchema,
  GetOrderStatsSchema,
  GetOrderRevenueStatsSchema,
  GetOrderStatusGraphDataSchema,
  GetOrderRevenueGraphDataSchema,
  GetRecentOrdersSchema,
  PreviewPickingListSchema,
  PreviewFreightLabelSchema,
} from '@/validators/order.validator';
import {
  OrderCancellationReason,
  OrderItem,
  OrderStatus,
} from '@repo/types/order';
import { UserType } from '@repo/types/user';
import { OrderRevenueStats, OrderResponse } from '@/types/order.types';
import { IInventory } from '@/models/interfaces/inventory.model';

/*********************** START: User Controllers ***********************/
export const placeOrder = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id;
  const userType = req.user!.userType;
  const {
    items,
    shippingAddressId,
    palletType,
    desiredDeliveryDate,
    customerComment,
  } = req.body as PlaceOrderSchema['body'];

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const shippingAddress = shippingAddressId
      ? await Address.findOne({ _id: shippingAddressId, userId }).session(
          session,
        )
      : await Address.findOne({ userId, isDefault: true }).session(session);
    if (!shippingAddress) {
      throw new ErrorHandler(404, 'Shipping address not found', 'NOT_FOUND');
    }

    const productIds = items.map((i) => i.productId);
    const products = await Product.find({ _id: { $in: productIds } })
      .lean()
      .session(session);
    const inventoryRecords = await Inventory.find({
      productId: { $in: productIds },
      quantity: { $gt: 0 },
    })
      .sort({ expirationDate: 1 }) // use items expiring first
      .session(session);
    const bulkDiscounts = await BulkDiscount.find({
      isActive: true,
    }).session(session);

    let totalAmount = 0;
    const orderItems: OrderItem[] = [];
    const inventoryUpdates: Array<{ _id: string; newQuantity: number }> = [];

    for (const item of items) {
      const product = products.find((p) => p._id.toString() === item.productId);
      if (!product) {
        throw new ErrorHandler(
          404,
          `Product not found: ${item.productId}`,
          'NOT_FOUND',
        );
      }

      if (!product.isActive) {
        throw new ErrorHandler(
          400,
          `Product not available: ${product.name}`,
          'BAD_REQUEST',
        );
      }

      const productInventory = inventoryRecords.filter(
        (inv) => inv.productId.toString() === item.productId,
      );

      const totalStock = productInventory.reduce(
        (sum, inv) => sum + inv.quantity,
        0,
      );

      if (totalStock < item.quantity) {
        throw new ErrorHandler(
          409,
          `Not enough stock for: ${product.name}. Available: ${totalStock}, Requested: ${item.quantity}`,
          'CONFLICT',
        );
      }

      const price =
        userType === UserType.INTERNAL ? product.costPrice : product.salePrice;

      const vatAmount = (product.vat * price) / 100;

      const priceWithVat = price + vatAmount;

      const discount = 0;
      let volumeDiscount = 0;

      if (userType === UserType.EXTERNAL) {
        const bulkDiscount = bulkDiscounts
          .filter((bd) => bd.minQuantity <= item.quantity)
          .sort((a, b) => b.discountPercentage - a.discountPercentage)[0];

        if (bulkDiscount && product.hasVolumeDiscount) {
          volumeDiscount =
            priceWithVat * (bulkDiscount.discountPercentage / 100);
        }
      }

      const itemTotal = priceWithVat - volumeDiscount - discount;

      orderItems.push({
        productId: product._id.toString(),
        quantity: item.quantity,
        price,
        vatAmount,
        priceWithVat,
        discount,
        bulkDiscount: volumeDiscount,
        totalPrice: itemTotal,
      });

      totalAmount += itemTotal * item.quantity;

      // Deduct quantity from inventory using FIFO
      let remainingToDeduct = item.quantity;
      for (const inv of productInventory) {
        if (remainingToDeduct <= 0) break;

        const deductFromThis = Math.min(inv.quantity, remainingToDeduct);
        const newQuantity = inv.quantity - deductFromThis;

        inventoryUpdates.push({
          _id: (inv._id as Types.ObjectId).toString(),
          newQuantity,
        });

        remainingToDeduct -= deductFromThis;
      }
    }

    await Promise.all(
      inventoryUpdates.map((update) =>
        Inventory.findByIdAndUpdate(
          update._id,
          { quantity: update.newQuantity },
          { session },
        ),
      ),
    );

    const order = await Order.create(
      [
        {
          userId,
          items: orderItems,
          totalAmount,
          shippingAddress: shippingAddress._id,
          notes: customerComment,
          desiredDeliveryDate,
          palletType,
        },
      ],
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    const populatedOrder = await Order.findById<OrderResponse>(
      order[0]?._id,
    ).populate([
      { path: 'items.productId', select: 'name images' },
      { path: 'userId', select: 'name email' },
      { path: 'shippingAddress' },
    ]);

    sendMail({
      to: populatedOrder?.userId.email || '',
      subject: 'Bestilling mottatt',
      template: {
        type: 'orderPlaced',
        data: {
          order: populatedOrder,
        },
      },
    }).catch((error) => {
      console.log(error);
    });

    sendResponse(res, 201, 'Order placed successfully', {
      order: populatedOrder,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    if (error instanceof ErrorHandler) {
      throw error;
    }

    throw new ErrorHandler(
      500,
      'Failed to place order. Please try again later.',
      'INTERNAL_SERVER',
    );
  }
});

export const getUserOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const query = req.query as GetUserOrdersSchema['query'];

    const { page, limit, skip } = getPagination(query.page, query.limit);

    const orders = await Order.find({ userId })
      .populate({
        path: 'items.productId',
        select: 'name images categories salePrice',
      })
      .populate('shippingAddress')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrderCount = await Order.countDocuments({ userId });

    sendResponse(res, 200, 'User orders fetched successfully', {
      orders,
      totalOrderCount,
      page,
      perPage: limit,
      totalPages: Math.ceil(totalOrderCount / limit),
    });
  },
);

export const getOrderDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const { orderId } = req.params as GetUserOrderDetailsSchema['params'];

    const order = await Order.findById(orderId);
    if (!order) {
      throw new ErrorHandler(404, 'Order not found', 'NOT_FOUND');
    }

    if (order.userId.toString() !== userId) {
      throw new ErrorHandler(
        403,
        'Not authorized to view this order',
        'UNAUTHORIZED',
      );
    }

    await order.populate([
      {
        path: 'items.productId',
        select: 'name images categories salePrice slug',
        populate: {
          path: 'categories',
          select: 'name',
        },
      },
      { path: 'userId', select: 'name email' },
      { path: 'shippingAddress' },
    ]);

    sendResponse(res, 200, 'Order details fetched successfully', { order });
  },
);

export const cancelOrder = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id;
  const { orderId } = req.params as CancelOrderSchema['params'];

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await Order.findById(orderId).session(session);
    if (!order) {
      throw new ErrorHandler(404, 'Order not found', 'NOT_FOUND');
    }

    if (order.userId.toString() !== userId) {
      throw new ErrorHandler(
        403,
        'Not authorized to cancel this order',
        'UNAUTHORIZED',
      );
    }

    if (
      [
        OrderStatus.SHIPPED,
        OrderStatus.DELIVERED,
        OrderStatus.CANCELLED,
      ].includes(order.status as OrderStatus)
    ) {
      throw new ErrorHandler(
        400,
        'Order cannot be cancelled in current status',
        'BAD_REQUEST',
      );
    }

    const productIds = order.items.map((i) => i.productId);

    const inventoryRecords = await Inventory.find({
      productId: { $in: productIds },
    })
      .sort({ expirationDate: -1 }) // Last expiration date first
      .session(session);

    const inventoryMap = new Map<string, IInventory[]>();

    for (const inventory of inventoryRecords) {
      const productId = inventory.productId.toString();
      if (!inventoryMap.has(productId)) {
        inventoryMap.set(productId, []);
      }
      inventoryMap.get(productId)!.push(inventory);
    }

    const allInventoryOperations: Array<{
      _id: Types.ObjectId;
      newQuantity: number;
    }> = [];

    for (const item of order.items) {
      const productInventory =
        inventoryMap.get(item.productId.toString()) || [];

      if (productInventory.length > 0) {
        const restoreOperations = calculateInventoryRestoration(
          productInventory,
          item.quantity,
        );
        allInventoryOperations.push(...restoreOperations);
      }
    }

    // Execute all inventory updates
    await Promise.all(
      allInventoryOperations.map((operation) =>
        Inventory.findByIdAndUpdate(
          operation._id,
          { quantity: operation.newQuantity },
          { session },
        ),
      ),
    );

    order.status = OrderStatus.CANCELLED;
    order.cancellationReason = OrderCancellationReason.CUSTOMER_CANCELLED;
    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    const populatedOrder = await Order.findById(orderId).populate([
      { path: 'items.productId', select: 'name' },
      { path: 'userId', select: 'name email' },
      { path: 'shippingAddress' },
    ]);

    sendResponse(res, 200, 'Order cancelled successfully', {
      order: populatedOrder,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new ErrorHandler(500, 'Failed to cancel order', 'INTERNAL_SERVER');
  }
});
/****************** END: User Controllers ********************/

/****************** START: Admin Controllers ********************/
export const getAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query as GetAllOrdersSchema['query'];

    const { queryObject, perPage, currentPage, skip } =
      await getOrderFiltersFromQuery(query);

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userId',
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
                email: 1,
                userType: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'addresses',
          localField: 'shippingAddress',
          foreignField: '_id',
          as: 'shippingAddress',
          pipeline: [
            {
              $project: {
                _id: 1,
                addressLine1: 1,
                addressLine2: 1,
                city: 1,
                state: 1,
                postalCode: 1,
                country: 1,
              },
            },
          ],
        },
      },
      { $unwind: '$userId' },
      { $unwind: '$shippingAddress' },
      { $unwind: '$items' },

      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'product',
          pipeline: [
            {
              $lookup: {
                from: 'categories',
                localField: 'categories',
                foreignField: '_id',
                as: 'categories',
                pipeline: [{ $project: { _id: 1, name: 1 } }],
              },
            },
            {
              $project: {
                _id: 1,
                name: 1,
                images: 1,
                categories: 1,
              },
            },
          ],
        },
      },
      { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },
      {
        $set: {
          'items.productId': '$product',
        },
      },

      {
        $group: {
          _id: '$_id',
          userId: { $first: '$userId' },
          shippingAddress: { $first: '$shippingAddress' },
          totalAmount: { $first: '$totalAmount' },
          status: { $first: '$status' },
          desiredDeliveryDate: { $first: '$desiredDeliveryDate' },
          palletType: { $first: '$palletType' },
          notes: { $first: '$notes' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
          cancellationReason: { $first: '$cancellationReason' },
          items: { $push: '$items' },
        },
      },

      { $match: queryObject },
      { $skip: skip },
      { $limit: perPage },
      { $sort: { createdAt: -1 } },
    ]);

    const totalOrders = await Order.countDocuments(queryObject);

    sendResponse(res, 200, 'Orders fetched successfully', {
      orders,
      totalOrders,
      currentPage,
      perPage,
      totalPages: Math.ceil(totalOrders / perPage),
    });
  },
);

export const getOrderDetailsAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const { orderId } = req.params as GetOrderDetailsAdminSchema['params'];

    const order = await Order.findById(orderId)
      .populate('userId', 'name email userType')
      .populate({
        path: 'items.productId',
        select: 'name categories images',
        populate: {
          path: 'categories',
          select: 'name',
        },
      })
      .populate('shippingAddress');

    if (!order) {
      throw new ErrorHandler(404, 'Order not found', 'NOT_FOUND');
    }

    sendResponse(res, 200, 'Order details fetched successfully', { order });
  },
);

export const updateOrderStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { orderId } = req.params as UpdateOrderStatusSchema['params'];
    const { status } = req.body as UpdateOrderStatusSchema['body'];

    const order = await Order.findById(orderId);
    if (!order) {
      throw new ErrorHandler(404, 'Order not found', 'NOT_FOUND');
    }

    order.status = status;
    await order.save();

    sendResponse(res, 200, 'Order status updated successfully');
  },
);

export const getOrderStats = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to } = req.query as GetOrderStatsSchema['query'];

    const matchStage = getDateMatchStage('createdAt', from, to);

    const totalOrders = await Order.countDocuments(matchStage);
    const pendingOrders = await Order.countDocuments({
      ...matchStage,
      status: OrderStatus.PENDING,
    });
    const confirmedOrders = await Order.countDocuments({
      ...matchStage,
      status: OrderStatus.CONFIRMED,
    });
    const shippedOrders = await Order.countDocuments({
      ...matchStage,
      status: OrderStatus.SHIPPED,
    });
    const deliveredOrders = await Order.countDocuments({
      ...matchStage,
      status: OrderStatus.DELIVERED,
    });
    const cancelledOrders = await Order.countDocuments({
      ...matchStage,
      status: OrderStatus.CANCELLED,
    });

    sendResponse(res, 200, 'Order stats fetched successfully', {
      totalOrders,
      pendingOrders,
      confirmedOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
    });
  },
);

export const getOrderRevenueStats = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to } = req.query as GetOrderRevenueStatsSchema['query'];

    const matchStage = getDateMatchStage('createdAt', from, to);

    const [revenueStats] = await Order.aggregate<OrderRevenueStats>([
      {
        $match: {
          ...matchStage,
          status: { $ne: OrderStatus.CANCELLED },
        },
      },
      {
        $unwind: '$items',
      },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'productInfo',
        },
      },
      {
        $unwind: '$productInfo',
      },
      {
        $lookup: {
          from: 'bulkdiscounts',
          pipeline: [
            { $match: { isActive: true } },
            { $sort: { minQuantity: -1 } },
          ],
          as: 'bulkDiscounts',
        },
      },
      {
        $addFields: {
          revenue: {
            $multiply: ['$items.priceWithVat', '$items.quantity'],
          },
          cost: {
            $multiply: ['$productInfo.costPrice', '$items.quantity'],
          },
          profit: {
            $multiply: [
              {
                $subtract: [
                  {
                    $subtract: ['$items.price', '$productInfo.costPrice'],
                  },
                  '$items.bulkDiscount',
                ],
              },
              '$items.quantity',
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$revenue' },
          totalCost: { $sum: '$cost' },
          totalProfit: { $sum: '$profit' },
        },
      },
    ]);

    sendResponse(res, 200, 'Order revenue stats fetched successfully', {
      totalRevenue: revenueStats?.totalRevenue ?? 0,
      totalCost: revenueStats?.totalCost ?? 0,
      totalProfit: revenueStats?.totalProfit ?? 0,
    });
  },
);

export const getOrderStatusGraphData = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to } = req.query as GetOrderStatusGraphDataSchema['query'];

    const matchStage = getDateMatchStage('createdAt', from, to);

    const statusData = await Order.aggregate([
      {
        $match: matchStage,
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            status: '$status',
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.date',
          statuses: {
            $push: {
              status: '$_id.status',
              count: '$count',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          statuses: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    const formattedData = statusData.map((item) => {
      const statusCounts = Object.values(OrderStatus).reduce(
        (acc, status) => {
          acc[status] = 0;
          return acc;
        },
        {} as Record<string, number>,
      );

      item.statuses.forEach((status: { status: string; count: number }) => {
        statusCounts[status.status] = status.count;
      });

      return {
        date: formatDate(item.date),
        ...statusCounts,
      };
    });

    sendResponse(res, 200, 'Order status graph data fetched successfully', {
      data: formattedData,
    });
  },
);

export const getOrderRevenueGraphData = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to } = req.query as GetOrderRevenueGraphDataSchema['query'];

    const matchStage = getDateMatchStage('createdAt', from, to);

    const revenueData = await Order.aggregate([
      {
        $match: {
          ...matchStage,
          status: { $ne: OrderStatus.CANCELLED },
        },
      },
      {
        $unwind: '$items',
      },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'productInfo',
        },
      },
      {
        $unwind: '$productInfo',
      },
      {
        $addFields: {
          revenue: {
            $multiply: ['$items.priceWithVat', '$items.quantity'],
          },
          cost: {
            $multiply: ['$productInfo.costPrice', '$items.quantity'],
          },
          profit: {
            $multiply: [
              {
                $subtract: [
                  {
                    $subtract: ['$items.price', '$productInfo.costPrice'],
                  },
                  '$items.bulkDiscount',
                ],
              },
              '$items.quantity',
            ],
          },
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            orderId: '$_id',
          },
          revenue: { $sum: '$revenue' },
          cost: { $sum: '$cost' },
          profit: { $sum: '$profit' },
        },
      },
      {
        $group: {
          _id: '$_id.date',
          orderCount: { $sum: 1 },
          totalRevenue: { $sum: '$revenue' },
          totalCost: { $sum: '$cost' },
          totalProfit: { $sum: '$profit' },
        },
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          orderCount: 1,
          totalRevenue: 1,
          totalCost: 1,
          totalProfit: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    const completeData = fillMissingDates(revenueData, from, to, 30, 'date', [
      'orderCount',
      'totalRevenue',
      'totalCost',
      'totalProfit',
    ]);

    sendResponse(res, 200, 'Order revenue graph data fetched successfully', {
      data: completeData,
    });
  },
);

export const getRecentOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to, limit } = req.query as GetRecentOrdersSchema['query'];

    const limitNumber = parseInt(limit ?? '10', 10);
    const matchStage = getDateMatchStage('createdAt', from, to);

    const orders = await Order.aggregate([
      { $match: matchStage },
      { $sort: { createdAt: -1 } },
      { $limit: limitNumber },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          itemsCount: { $size: '$items' },
          'user.name': 1,
        },
      },
      {
        $unwind: '$user',
      },
    ]);

    sendResponse(res, 200, 'Recent orders fetched successfully', { orders });
  },
);

export const previewPickingList = asyncHandler(
  async (req: Request, res: Response) => {
    const { orderId } = req.params as PreviewPickingListSchema['params'];

    const order = await Order.findById(orderId)
      .populate([
        {
          path: 'items.productId',
          select: 'name sku barcode weight dimensions',
        },
        { path: 'userId', select: 'name email organizationNumber companyName' },
        {
          path: 'shippingAddress',
          select: 'addressLine1 addressLine2 city state postalCode country',
        },
      ])
      .lean<OrderResponse>();
    if (!order) {
      throw new ErrorHandler(404, 'Order not found', 'NOT_FOUND');
    }

    const pickingList = pickingListTemplate(order);
    sendResponse(res, 200, 'Picking list preview fetched successfully', {
      html: pickingList,
    });
  },
);

export const previewFreightLabel = asyncHandler(
  async (req: Request, res: Response) => {
    const { orderId } = req.params as PreviewFreightLabelSchema['params'];

    const order = await Order.findById(orderId)
      .populate([
        {
          path: 'items.productId',
          select: 'name sku barcode weight dimensions',
        },
        { path: 'userId', select: 'name email' },
        {
          path: 'shippingAddress',
          select: 'addressLine1 addressLine2 city state postalCode country',
        },
      ])
      .lean<OrderResponse>();
    if (!order) {
      throw new ErrorHandler(404, 'Order not found', 'NOT_FOUND');
    }

    const freightLabel = freightLabelTemplate(order);
    sendResponse(res, 200, 'Freight label preview fetched successfully', {
      html: freightLabel,
    });
  },
);

export const cancelOrderAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const { orderId } = req.params as CancelOrderSchema['params'];

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const order = await Order.findById(orderId).session(session);
      if (!order) {
        throw new ErrorHandler(404, 'Order not found', 'NOT_FOUND');
      }

      if (order.status === OrderStatus.CANCELLED) {
        throw new ErrorHandler(
          400,
          'Order is already cancelled',
          'BAD_REQUEST',
        );
      }

      const productIds = order.items.map((i) => i.productId);

      const inventoryRecords = await Inventory.find({
        productId: { $in: productIds },
      })
        .sort({ expirationDate: -1 }) // Last expiration date first
        .session(session);

      const inventoryMap = new Map<string, IInventory[]>();

      for (const inventory of inventoryRecords) {
        const productId = inventory.productId.toString();
        if (!inventoryMap.has(productId)) {
          inventoryMap.set(productId, []);
        }
        inventoryMap.get(productId)!.push(inventory);
      }

      const allInventoryOperations: Array<{
        _id: Types.ObjectId;
        newQuantity: number;
      }> = [];

      for (const item of order.items) {
        const productInventory =
          inventoryMap.get(item.productId.toString()) || [];

        if (productInventory.length > 0) {
          const restoreOperations = calculateInventoryRestoration(
            productInventory,
            item.quantity,
          );
          allInventoryOperations.push(...restoreOperations);
        }
      }

      // Execute all inventory updates
      await Promise.all(
        allInventoryOperations.map((operation) =>
          Inventory.findByIdAndUpdate(
            operation._id,
            { quantity: operation.newQuantity },
            { session },
          ),
        ),
      );

      order.status = OrderStatus.CANCELLED;
      order.cancellationReason = OrderCancellationReason.ADMIN_CANCELLED;
      await order.save({ session });

      await session.commitTransaction();
      session.endSession();

      sendResponse(res, 200, 'Order cancelled successfully');
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      if (error instanceof ErrorHandler) {
        throw error;
      }
      throw new ErrorHandler(500, 'Failed to cancel order', 'INTERNAL_SERVER');
    }
  },
);

export const deleteOrderAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const { orderId } = req.params as DeleteOrderSchema['params'];

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const order = await Order.findById(orderId).session(session);
      if (!order) {
        throw new ErrorHandler(404, 'Order not found', 'NOT_FOUND');
      }
      if (order.status !== OrderStatus.CANCELLED) {
        const productIds = order.items.map((i) => i.productId);

        const inventoryRecords = await Inventory.find({
          productId: { $in: productIds },
        })
          .sort({ expirationDate: -1 }) // Last expiration date first
          .session(session);

        const inventoryMap = new Map<string, IInventory[]>();

        for (const inventory of inventoryRecords) {
          const productId = inventory.productId.toString();
          if (!inventoryMap.has(productId)) {
            inventoryMap.set(productId, []);
          }
          inventoryMap.get(productId)!.push(inventory);
        }

        const allInventoryOperations: Array<{
          _id: Types.ObjectId;
          newQuantity: number;
        }> = [];

        for (const item of order.items) {
          const productInventory =
            inventoryMap.get(item.productId.toString()) || [];

          if (productInventory.length > 0) {
            const restoreOperations = calculateInventoryRestoration(
              productInventory,
              item.quantity,
            );
            allInventoryOperations.push(...restoreOperations);
          }
        }

        // Execute all inventory updates
        await Promise.all(
          allInventoryOperations.map((operation) =>
            Inventory.findByIdAndUpdate(
              operation._id,
              { quantity: operation.newQuantity },
              { session },
            ),
          ),
        );
      }

      await order.deleteOne({ session });

      await session.commitTransaction();
      session.endSession();

      sendResponse(res, 200, 'Order deleted successfully');
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new ErrorHandler(500, 'Failed to cancel order', 'INTERNAL_SERVER');
    }
  },
);

/****************** END: Admin Controllers ********************/
