import { z } from 'zod';
import { isValidObjectId } from 'mongoose';
import { OrderStatus } from '@repo/types/order';
import { dateRangeSchema, dateSchema } from './schemas/date.schema';

/****************** START: User Validators ********************/
export const placeOrderSchema = z.object({
  body: z.object({
    items: z
      .array(
        z.object({
          productId: z
            .string()
            .refine((val) => val.length > 0, {
              message: 'Product ID is required',
            })
            .refine((val) => isValidObjectId(val), {
              message: 'Invalid product ID format',
            }),
          quantity: z
            .number()
            .int()
            .positive('Quantity must be a positive number')
            .refine((val) => val > 0, { message: 'Quantity is required' }),
        }),
      )
      .min(1, 'At least one item is required'),
    shippingAddressId: z
      .string()
      .refine((val) => isValidObjectId(val), {
        message: 'Invalid address ID format',
      })
      .optional(),
    palletType: z.enum(['EUR', 'Large'], {
      required_error: 'Pallet type is required',
    }),
    desiredDeliveryDate: z.string().optional(),
    customerComment: z.string().optional(),
  }),
});

export const getUserOrdersSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});

export const getUserOrderDetailsSchema = z.object({
  params: z.object({
    orderId: z.string().refine((val) => isValidObjectId(val), {
      message: 'Invalid order ID format',
    }),
  }),
});

export const cancelOrderSchema = z.object({
  params: z.object({
    orderId: z.string().refine((val) => isValidObjectId(val), {
      message: 'Invalid order ID format',
    }),
  }),
});

export type PlaceOrderSchema = z.infer<typeof placeOrderSchema>;
export type GetUserOrdersSchema = z.infer<typeof getUserOrdersSchema>;
export type GetUserOrderDetailsSchema = z.infer<
  typeof getUserOrderDetailsSchema
>;
export type CancelOrderSchema = z.infer<typeof cancelOrderSchema>;
/****************** END: User Validators ********************/

/****************** START: Admin Validators ********************/
export const getAllOrdersSchema = z.object({
  query: z
    .object({
      page: z.string().optional(),
      limit: z.string().optional(),
      status: z.nativeEnum(OrderStatus).optional(),
      search: z.string().optional(),
      from: dateSchema,
      to: dateSchema,
    })
    .superRefine((data, ctx) => {
      if (data.from && data.to) {
        const fromDate = new Date(data.from);
        const toDate = new Date(data.to);
        if (fromDate > toDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'From date cannot be after to date',
            path: ['from'],
          });
        }
      }
    }),
});

export const getOrderDetailsAdminSchema = z.object({
  params: z.object({
    orderId: z
      .string()
      .min(1, 'Order ID is required')
      .refine((val) => isValidObjectId(val), {
        message: 'Invalid order ID format',
      }),
  }),
});

export const updateOrderStatusSchema = z.object({
  params: z.object({
    orderId: z.string().refine((val) => isValidObjectId(val), {
      message: 'Invalid order ID format',
    }),
  }),
  body: z.object({
    status: z.nativeEnum(OrderStatus),
  }),
});

export const updateOrderDetailsSchema = z.object({
  params: z.object({
    orderId: z
      .string()
      .min(1, 'Order ID is required')
      .refine((val) => isValidObjectId(val), {
        message: 'Invalid order ID format',
      }),
  }),
  body: z.object({
    productId: z
      .string()
      .min(1, 'Product ID is required')
      .refine((val) => isValidObjectId(val), {
        message: 'Invalid product ID format',
      }),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
  }),
});

export const deleteOrderSchema = z.object({
  params: z.object({
    orderId: z
      .string()
      .min(1, 'Order ID is required')
      .refine((val) => isValidObjectId(val), {
        message: 'Invalid order ID format',
      }),
  }),
});

export const getOrderStatsSchema = z.object({
  query: dateRangeSchema,
});

export const getOrderRevenueStatsSchema = z.object({
  query: dateRangeSchema,
});

export const getOrderStatusGraphDataSchema = z.object({
  query: dateRangeSchema,
});

export const getOrderRevenueGraphDataSchema = z.object({
  query: dateRangeSchema,
});

export const getRecentOrdersSchema = z.object({
  query: z.object({
    from: dateSchema,
    to: dateSchema,
    limit: z.string().optional(),
  }),
});

export const previewPickingListSchema = z.object({
  params: z.object({
    orderId: z.string().refine((val) => isValidObjectId(val), {
      message: 'Invalid order ID format',
    }),
  }),
});

export const previewFreightLabelSchema = z.object({
  params: z.object({
    orderId: z.string().refine((val) => isValidObjectId(val), {
      message: 'Invalid order ID format',
    }),
  }),
});

export type GetAllOrdersSchema = z.infer<typeof getAllOrdersSchema>;
export type GetOrderDetailsAdminSchema = z.infer<
  typeof getOrderDetailsAdminSchema
>;
export type UpdateOrderStatusSchema = z.infer<typeof updateOrderStatusSchema>;
export type UpdateOrderDetailsSchema = z.infer<typeof updateOrderDetailsSchema>;
export type DeleteOrderSchema = z.infer<typeof deleteOrderSchema>;
export type GetOrderStatsSchema = z.infer<typeof getOrderStatsSchema>;
export type GetOrderRevenueStatsSchema = z.infer<
  typeof getOrderRevenueStatsSchema
>;
export type GetOrderStatusGraphDataSchema = z.infer<
  typeof getOrderStatusGraphDataSchema
>;
export type GetOrderRevenueGraphDataSchema = z.infer<
  typeof getOrderRevenueGraphDataSchema
>;
export type GetRecentOrdersSchema = z.infer<typeof getRecentOrdersSchema>;
export type PreviewPickingListSchema = z.infer<typeof previewPickingListSchema>;
export type PreviewFreightLabelSchema = z.infer<
  typeof previewFreightLabelSchema
>;
/****************** END: Admin Validators ********************/
