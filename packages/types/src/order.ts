export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum OrderCancellationReason {
  CUSTOMER_CANCELLED = 'customer_cancelled',
  ADMIN_CANCELLED = 'admin_cancelled',
  OUT_OF_STOCK = 'out_of_stock',
  OTHER = 'other',
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number; // Sale Price per quantity
  vatAmount: number; // VAT Amount per quantity
  priceWithVat: number; // Price with VAT per quantity
  discount?: number; // Discount per quantity
  bulkDiscount?: number; // Bulk Discount per quantity
  totalPrice: number; // Total Price per quantity (priceWithVat - bulkDiscount - discount)
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress?: string;
  cancellationReason?: OrderCancellationReason;
  notes?: string;
  desiredDeliveryDate?: string;
  palletType?: string;
  createdAt: Date;
  updatedAt: Date;
}
