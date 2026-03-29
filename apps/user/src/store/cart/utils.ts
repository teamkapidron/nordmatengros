import { CartItem, CartSummary } from './types';

export function calculateCartSummary(
  cart: CartItem[],
  userId: string,
): CartSummary {
  const userCart = cart.filter((item) => item.userId === userId);

  const uniqueItems = userCart.length;

  const totalItems = userCart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPriceWithoutVat = userCart.reduce(
    (sum, item) => sum + item.priceWithoutVat,
    0,
  );

  const totalVolumeDiscountAmount = userCart.reduce(
    (sum, item) => sum + item.volumeDiscount,
    0,
  );

  const totalVatAmount = userCart.reduce(
    (sum, item) => sum + item.vatAmount,
    0,
  );

  const totalPriceWithVat = userCart.reduce(
    (sum, item) => sum + item.priceWithVat,
    0,
  );

  const totalPaymentAmount = userCart.reduce(
    (sum, item) => sum + item.totalPaymentItemAmount,
    0,
  );

  return {
    uniqueItems, // Total number of unique items in the cart
    totalItems, // Total number of (products * quantity) in the cart (not unique)
    totalPriceWithoutVat, // Total price of the cart (excluding vat)
    totalVatAmount, // Total vat of the cart
    totalPriceWithVat, // Total price of the cart (including vat)
    totalVolumeDiscountAmount, // Total volume discount of the cart
    totalPaymentAmount, // Total price of the cart after applying volume discount and vat
    isEmpty: userCart.length === 0, // Whether the cart is empty
  };
}

export function getUserCartItems(cart: CartItem[], userId: string): CartItem[] {
  return cart.filter((item) => item.userId === userId);
}
