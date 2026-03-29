import { create } from 'zustand';
import { toast } from '@repo/ui/lib/sonner';
import { persist, createJSONStorage } from 'zustand/middleware';

import { getPricing } from '@/utils/price.util';
import { calculateCartSummary, getUserCartItems } from './utils';

import { CartState, CartStore, CartItem, CART_STORAGE_KEY } from './types';

const initialCartState: CartState = {
  cart: [],
  cartSummary: {
    isEmpty: true,
    uniqueItems: 0,
    totalItems: 0,
    totalPriceWithoutVat: 0,
    totalVatAmount: 0,
    totalPriceWithVat: 0,
    totalVolumeDiscountAmount: 0,
    totalPaymentAmount: 0,
  },
  userCartItems: [],
  bulkDiscounts: [],
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ...initialCartState,

      addToCart: (userId, product, quantity) => {
        if (quantity <= 0) {
          toast.error('Ugyldig antall');
          return;
        }

        if (!userId) {
          toast.error(
            'Du må være innlogget for å legge til varer i handlekurven',
          );
          return;
        }

        const userCart = get().cart.filter((item) => item.userId === userId);
        const otherUsersCart = get().cart.filter(
          (item) => item.userId !== userId,
        );

        const existingItemIndex = userCart.findIndex(
          (item) => item.product._id === product._id,
        );

        const {
          priceWithoutVat,
          vatAmount,
          priceWithVat,
          volumeDiscount,
          netPrice,
          pricePerUnit,
        } = getPricing({
          product,
          quantity,
          bulkDiscounts: get().bulkDiscounts,
        });

        let updatedUserCart: CartItem[];

        if (existingItemIndex !== -1) {
          updatedUserCart = userCart.map((item, index) =>
            index === existingItemIndex
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  priceWithoutVat: priceWithoutVat * quantity,
                  vatAmount: vatAmount * quantity,
                  priceWithVat: priceWithVat * quantity,
                  volumeDiscount: volumeDiscount * quantity,
                  pricePerUnit,
                  totalPaymentItemAmount: netPrice * quantity,
                  updatedAt: new Date(),
                }
              : item,
          );
        } else {
          updatedUserCart = [
            ...userCart,
            {
              userId,
              product,
              quantity,
              priceWithoutVat: priceWithoutVat * quantity,
              vatAmount: vatAmount * quantity,
              priceWithVat: priceWithVat * quantity,
              volumeDiscount: volumeDiscount * quantity,
              pricePerUnit,
              totalPaymentItemAmount: netPrice * quantity,
              addedAt: new Date(),
              updatedAt: new Date(),
            },
          ];
        }

        const newCart = [...otherUsersCart, ...updatedUserCart];
        const newCartSummary = calculateCartSummary(newCart, userId);
        const newUserCartItems = getUserCartItems(newCart, userId);

        set({
          cart: newCart,
          cartSummary: newCartSummary,
          userCartItems: newUserCartItems,
        });
      },

      removeFromCart: (userId, productId) => {
        const newCart = get().cart.filter(
          (item) => !(item.product._id === productId && item.userId === userId),
        );
        const newCartSummary = calculateCartSummary(newCart, userId);
        const newUserCartItems = getUserCartItems(newCart, userId);

        set({
          cart: newCart,
          cartSummary: newCartSummary,
          userCartItems: newUserCartItems,
        });
      },

      clearCart: (userId) => {
        const newCart = get().cart.filter((item) => item.userId !== userId);
        const newCartSummary = calculateCartSummary(newCart, userId);
        const newUserCartItems = getUserCartItems(newCart, userId);

        set({
          cart: newCart,
          cartSummary: newCartSummary,
          userCartItems: newUserCartItems,
        });
      },

      updateQuantity: (userId, productId, newQuantity) => {
        if (newQuantity <= 0) {
          get().removeFromCart(userId, productId);
          return;
        }

        const userCart = get().cart.filter((item) => item.userId === userId);
        const item = userCart.find((item) => item.product._id === productId);
        if (!item) {
          return;
        }

        const {
          priceWithoutVat,
          vatAmount,
          priceWithVat,
          volumeDiscount,
          pricePerUnit,
          netPrice,
        } = getPricing({
          product: item.product,
          quantity: newQuantity,
          bulkDiscounts: get().bulkDiscounts,
        });

        const newCart = userCart.map((item) =>
          item.product._id === productId
            ? {
                ...item,
                quantity: newQuantity,
                priceWithoutVat: priceWithoutVat * newQuantity,
                vatAmount: vatAmount * newQuantity,
                priceWithVat: priceWithVat * newQuantity,
                volumeDiscount: volumeDiscount * newQuantity,
                pricePerUnit,
                totalPaymentItemAmount: netPrice * newQuantity,
                updatedAt: new Date(),
              }
            : item,
        );

        const newCartSummary = calculateCartSummary(newCart, userId);
        const newUserCartItems = getUserCartItems(newCart, userId);

        set({
          cart: newCart,
          cartSummary: newCartSummary,
          userCartItems: newUserCartItems,
        });
      },

      getItemQuantity: (userId, productId) => {
        const userCart = get().cart.filter((item) => item.userId === userId);
        const item = userCart.find((item) => item.product._id === productId);
        return item?.quantity || 0;
      },

      setUserId: (userId) => {
        const state = get();
        if (userId) {
          const newCartSummary = calculateCartSummary(state.cart, userId);
          const newUserCartItems = getUserCartItems(state.cart, userId);

          set({
            cartSummary: newCartSummary,
            userCartItems: newUserCartItems,
          });
        } else {
          set({
            userCartItems: [],
            cartSummary: initialCartState.cartSummary,
          });
        }
      },

      setBulkDiscounts: (bulkDiscounts) => {
        set({ bulkDiscounts });
      },

      _hydrate: () => {},
    }),
    {
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
      }),
      onRehydrateStorage: () => (state) => {
        state?._hydrate();
      },
    },
  ),
);
