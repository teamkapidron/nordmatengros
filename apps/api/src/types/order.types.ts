import { SortOrder } from 'mongoose';
import { Order, OrderStatus } from '@repo/types/order';

export interface OrderFilterQuery {
  $or?: {
    'userId.name'?: RegExp;
    'userId.email'?: RegExp;
    'userId.userType'?: RegExp;
    'items.productId.name'?: RegExp;
    'items.productId.sku'?: RegExp;
    'items.productId.barcode'?: RegExp;
  }[];
  status?: OrderStatus;
  createdAt?: {
    $gte?: Date;
    $lte?: Date;
  };
}

export interface OrderRevenueStats {
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
}

export type OrderResponse = Omit<
  Order,
  'userId' | 'shippingAddress' | 'items'
> & {
  userId: {
    _id: string;
    name: string;
    email: string;
    companyName?: string;
    organizationNumber?: string;
  };
  shippingAddress: {
    _id: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: {
    _id: string;
    productId: {
      _id: string;
      name: string;
      sku: string;
      barcode: string;
      weight: number;
      dimensions: {
        length: number;
        width: number;
        height: number;
      };
    };
    quantity: number;
    price: number;
    vatAmount: number;
    priceWithVat: number;
    discount: number;
    bulkDiscount: number;
    totalPrice: number;
  }[];
};
