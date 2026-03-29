import { useShallow } from 'zustand/shallow';
import { useCallback, useEffect, useMemo } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useCartStore } from '@/store/cart';
import { useDiscount } from '@/hooks/useDiscount';

import { ProductResponse } from '@/hooks/useProduct/types';

export function useCart() {
  const { user, isAuthenticated } = useAuth();
  const {
    cart,
    cartSummary,
    userCartItems,
    addToCart: addToCartStore,
    removeFromCart: removeFromCartStore,
    clearCart: clearCartStore,
    updateQuantity: updateQuantityStore,
    setUserId,
    setBulkDiscounts,
  } = useCartStore(
    useShallow((state) => ({
      cart: state.cart,
      cartSummary: state.cartSummary,
      userCartItems: state.userCartItems,
      addToCart: state.addToCart,
      removeFromCart: state.removeFromCart,
      clearCart: state.clearCart,
      updateQuantity: state.updateQuantity,
      setUserId: state.setUserId,
      setBulkDiscounts: state.setBulkDiscounts,
    })),
  );
  const { bulkDiscountQuery } = useDiscount();
  const bulkDiscounts = useMemo(() => {
    return bulkDiscountQuery.data?.bulkDiscounts || [];
  }, [bulkDiscountQuery.data]);

  const inCartMap = useMemo(() => {
    if (!user) return new Map<string, boolean>();
    const map = new Map<string, boolean>();
    for (const item of userCartItems) {
      map.set(item.product._id, true);
    }
    return map;
  }, [user, userCartItems]);

  const quantityMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of userCartItems) {
      map.set(item.product._id, item.quantity);
    }
    return map;
  }, [userCartItems]);

  useEffect(() => {
    setUserId(user?._id || null);
    setBulkDiscounts(bulkDiscounts);
  }, [user?._id, setUserId, setBulkDiscounts, bulkDiscounts]);

  const addToCart = useCallback(
    (product: ProductResponse, quantity: number) => {
      if (!isAuthenticated || !user) return;
      addToCartStore(user._id, product, quantity);
    },
    [addToCartStore, user, isAuthenticated],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      if (!isAuthenticated || !user) return;
      removeFromCartStore(user._id, productId);
    },
    [removeFromCartStore, user, isAuthenticated],
  );

  const clearCart = useCallback(() => {
    if (!isAuthenticated || !user) return;
    clearCartStore(user._id);
  }, [clearCartStore, user, isAuthenticated]);

  const getItemQuantity = useCallback(
    (productId: string | undefined) =>
      productId ? (quantityMap.get(productId) ?? 0) : 0,
    [quantityMap],
  );

  const isInCart = useCallback(
    (productId: string) => {
      return inCartMap.get(productId) ?? false;
    },
    [inCartMap],
  );

  const updateQuantity = useCallback(
    (productId: string, newQuantity: number) => {
      if (!isAuthenticated || !user) return;
      updateQuantityStore(user._id, productId, newQuantity);
    },
    [updateQuantityStore, user, isAuthenticated],
  );

  return {
    cart,
    addToCart,
    cartSummary,
    removeFromCart,
    clearCart,
    updateQuantity,
    userCartItems,
    isInCart,
    getItemQuantity,
  };
}
