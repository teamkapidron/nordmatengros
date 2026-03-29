import { Document, Types } from 'mongoose';
import { Order, OrderItem } from '@repo/types/order';

export interface IOrderItem extends Document, OrderItem {
  productId: Types.ObjectId;
}

export interface IOrder extends Document, Order {
  userId: Types.ObjectId;
  items: IOrderItem[];
  shippingAddress?: Types.ObjectId;
}
