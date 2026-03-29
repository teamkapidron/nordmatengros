import { ProductResponse } from '@/hooks/useProduct/types';
import { BulkDiscount } from '@repo/types/bulkDiscount';

export const CART_STORAGE_KEY = 'baladi__cart';

export interface CartItem {
  userId: string;
  product: ProductResponse;
  quantity: number;
  priceWithoutVat: number;
  vatAmount: number;
  priceWithVat: number;
  volumeDiscount: number;
  pricePerUnit: number;
  totalPaymentItemAmount: number;
  addedAt: Date;
  updatedAt: Date;
}

export interface CartSummary {
  isEmpty: boolean; // Whether the cart is empty
  uniqueItems: number; // Total number of unique items in the cart
  totalItems: number; // Total number of (products * quantity) in the cart (not unique)
  totalPriceWithoutVat: number; // Total price of the cart (excluding vat)
  totalVatAmount: number; // Total vat of the cart
  totalPriceWithVat: number; // Total price of the cart (including vat)
  totalVolumeDiscountAmount: number; // Total discount of the cart
  totalPaymentAmount: number; // Total price of the cart after adding vat and subtracting discount
}

export interface CartState {
  cart: CartItem[];
  cartSummary: CartSummary;
  userCartItems: CartItem[];
  bulkDiscounts: BulkDiscount[];
}

export interface CartActions {
  addToCart: (
    userId: string,
    product: ProductResponse,
    quantity: number,
  ) => void;

  removeFromCart: (userId: string, productId: string) => void;

  clearCart: (userId: string) => void;

  updateQuantity: (
    userId: string,
    productId: string,
    newQuantity: number,
  ) => void;

  getItemQuantity: (userId: string, productId: string) => number;

  setUserId: (userId: string | null) => void;

  setBulkDiscounts: (bulkDiscounts: BulkDiscount[]) => void;

  _hydrate: () => void;
}

export type CartStore = CartState & CartActions;
