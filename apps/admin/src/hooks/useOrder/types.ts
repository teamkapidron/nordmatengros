import { ApiData } from '@/utils/types.util';
import { Order, OrderStatus } from '@repo/types/order';

export enum OrderStatusFilter {
  ALL = 'all',
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export type OrderResponse = Omit<
  Order,
  'userId' | 'shippingAddress' | 'items'
> & {
  userId: {
    _id: string;
    name: string;
    email: string;
    userType: string;
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
      images: string[];
      categories: {
        _id: string;
        name: string;
      }[];
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

export type GetAllOrdersRequest = ApiData<
  {
    page?: string;
    limit?: string;
    status?: OrderStatus;
    search?: string;
    from?: string;
    to?: string;
  },
  {
    orders: OrderResponse[];
    totalOrders: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
  }
>;

export type GetOrderDetailsAdminRequest = ApiData<
  {
    orderId: string;
  },
  {
    order: OrderResponse;
  }
>;

export type UpdateOrderStatusRequest = ApiData<
  {
    orderId: string;
    status: OrderStatus;
  },
  undefined
>;

export type GetOrderStatsRequest = ApiData<
  {
    from?: string;
    to?: string;
  },
  {
    totalOrders: number;
    pendingOrders: number;
    confirmedOrders: number;
    shippedOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;
  }
>;

export type GetOrderRevenueStatsRequest = ApiData<
  {
    from?: string;
    to?: string;
  },
  {
    totalRevenue: number;
    totalCost: number;
    totalProfit: number;
  }
>;

export type GetOrderStatusGraphDataRequest = ApiData<
  {
    from?: string;
    to?: string;
  },
  {
    data: {
      date: string;
      confirmed: number;
      shipped: number;
      delivered: number;
      cancelled: number;
    }[];
  }
>;

export type GetOrderRevenueGraphDataRequest = ApiData<
  {
    from?: string;
    to?: string;
  },
  {
    data: {
      date: string;
      orderCount: number;
      totalRevenue: number;
      totalCost: number;
      totalProfit: number;
    }[];
  }
>;

export type GetRecentOrdersRequest = ApiData<
  {
    from?: string;
    to?: string;
    limit?: string;
  },
  {
    orders: {
      _id: string;
      totalAmount: number;
      createdAt: Date;
      itemsCount: number;
      user: {
        name: string;
      };
    }[];
  }
>;

export type PreviewPickingListRequest = ApiData<
  {
    orderId: string;
  },
  {
    html: string;
  }
>;

export type PreviewFreightLabelRequest = ApiData<
  {
    orderId: string;
  },
  {
    html: string;
  }
>;

export type CancelOrderAdminRequest = ApiData<
  {
    orderId: string;
  },
  undefined
>;

export type DeleteOrderAdminRequest = ApiData<
  {
    orderId: string;
  },
  undefined
>;
