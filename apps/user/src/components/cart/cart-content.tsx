'use client';

// Node Modules
import Link from 'next/link';
import Image from 'next/image';
import React, { memo, useCallback } from 'react';
import { Trash2, ShoppingBag } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { QuantityInput } from '@repo/ui/components/base/quantity-input';

// Hooks
import { useCart } from '@/hooks/useCart';

// Utils
import { formatPrice } from '@/utils/price.util';

function CartContent() {
  const { userCartItems, removeFromCart, updateQuantity, clearCart } =
    useCart();

  const handleQuantityChange = useCallback(
    (productId: string, newQuantity: number) => {
      updateQuantity(productId, newQuantity);
    },
    [updateQuantity],
  );

  const handleRemoveItem = useCallback(
    (productId: string) => {
      removeFromCart(productId);
    },
    [removeFromCart],
  );

  const handleClearCart = useCallback(() => {
    clearCart();
  }, [clearCart]);

  if (!userCartItems || userCartItems.length === 0) {
    return (
      <div className="rounded-lg bg-white p-8 shadow-sm">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--baladi-light)]">
            <ShoppingBag size={32} className="text-[var(--baladi-gray)]" />
          </div>
          <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
            Handlekurven din er tom
          </h3>
          <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
            Utforsk vårt utvalg av autentiske asiatiske og orientalske
            ingredienser
          </p>
          <Button className="mt-4">
            <Link href="/">Fortsett å handle</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--baladi-primary)]">
            <ShoppingBag size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
              Handlekurv
            </h2>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              {userCartItems.length}{' '}
              {userCartItems.length === 1 ? 'vare' : 'varer'} i kurven
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleClearCart}
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <Trash2 size={16} className="mr-2" />
          Tøm kurv
        </Button>
      </div>

      <div className="space-y-4">
        {userCartItems.map((item) => {
          const product = item.product;

          return (
            <div
              key={`${item.userId}-${item.product._id}`}
              className="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href={`/product/${product.slug}`}
                  className="group relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-[var(--baladi-light)]/30"
                >
                  <Image
                    src={product.images?.[0] || ''}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </Link>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link
                        href={`/product/${product.slug}`}
                        className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-dark)] hover:text-[var(--baladi-primary)]"
                      >
                        {product.name}
                      </Link>
                      {product.shortDescription && (
                        <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                          {product.shortDescription}
                        </p>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(product._id)}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                      {product.noOfUnits} enheter per kartong
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                        Antall:
                      </span>
                      <QuantityInput
                        value={item.quantity}
                        onChange={(newQuantity) =>
                          handleQuantityChange(product._id, newQuantity)
                        }
                        min={1}
                        max={product.stock || 99}
                        size="sm"
                      />
                    </div>

                    <div className="space-y-1 text-right">
                      {item.volumeDiscount > 0 && (
                        <div className="space-y-1">
                          <div className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)] line-through">
                            Opprinnelig:{' '}
                            {formatPrice(item.priceWithVat)} kr
                          </div>
                          <div className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-green-600">
                            Bulkrabatt: -
                            {formatPrice(item.volumeDiscount)}{' '}
                            kr
                          </div>
                        </div>
                      )}
                      <div className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-primary)]">
                        {formatPrice(item.totalPaymentItemAmount)} kr
                      </div>
                      <div className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                        {formatPrice(item.pricePerUnit)} kr per enhet
                      </div>
                      {item.volumeDiscount > 0 && (
                        <div className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Bulkrabatt anvendt
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg bg-[var(--baladi-light)]/50 p-6">
        <div className="text-center">
          <h3 className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-dark)]">
            Trenger du noe mer?
          </h3>
          <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
            Utforsk vårt komplette utvalg av asiatiske og orientalske
            ingredienser
          </p>
          <Button variant="outline" className="mt-4">
            <Link href="/">Fortsett å handle</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(CartContent);
