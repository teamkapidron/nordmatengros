'use client';

// Node Modules
import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, ExternalLink } from '@repo/ui/lib/icons';

// Components
import { Separator } from '@repo/ui/components/base/separator';

// Types/Utils
import { formatPrice } from '@/utils/price.util';
import { OrderResponse } from '@/hooks/useOrder/types';

interface OrderItemsProps {
  items: OrderResponse['items'];
}

function OrderItems({ items }: OrderItemsProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[var(--baladi-primary)]/10 flex h-10 w-10 items-center justify-center rounded-full">
            <Package size={18} className="text-[var(--baladi-primary)]" />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
              Bestilte varer
            </h2>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              {totalItems} varer • {formatPrice(totalValue)} kr
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={`${item.productId._id}-${index}`}>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-[var(--baladi-light)]/30 relative h-16 w-16 overflow-hidden rounded-md">
                  <Image
                    src={item.productId.images?.[0] || ''}
                    alt={item.productId.name}
                    fill
                    className="object-contain p-2"
                    sizes="64px"
                  />
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-dark)]">
                      {item.productId.name}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-[var(--baladi-gray)]">
                      {item.productId.categories?.[0] && (
                        <span>
                          Kategori: {item.productId.categories[0].name}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/product/${item.productId.slug}`}
                    className="flex items-center gap-1 text-xs text-[var(--baladi-primary)] transition-colors hover:text-[var(--baladi-primary-dark)]"
                  >
                    <ExternalLink size={12} />
                    Se produkt
                  </Link>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                        Antall:
                      </span>
                      <span className="flex h-6 w-8 items-center justify-center rounded bg-[var(--baladi-light)] font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                        {item.quantity}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                        Pris (eks. mva):
                      </span>
                      <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                        {formatPrice(item.price)} kr
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                        MVA:
                      </span>
                      <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                        {formatPrice(item.vatAmount)} kr
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                        Pris (inkl. mva):
                      </span>
                      <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                        {formatPrice(item.priceWithVat)} kr
                      </span>
                    </div>
                    {item.discount > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                          Rabatt:
                        </span>
                        <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                          -{formatPrice(item.discount)} kr
                        </span>
                      </div>
                    )}
                    {item.bulkDiscount > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                          Mengderabatt:
                        </span>
                        <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                          -{formatPrice(item.bulkDiscount)} kr
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t pt-2">
                    <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                      Totalt per vare:
                    </span>
                    <div className="text-right">
                      <div className="font-[family-name:var(--font-sora)] font-bold text-[var(--baladi-primary)]">
                        {formatPrice(item.totalPrice)} kr
                      </div>
                      <div className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                        Inkl. mva
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t pt-2">
                    <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                      Totalt for {item.quantity} stk:
                    </span>
                    <div className="text-right">
                      <div className="font-[family-name:var(--font-sora)] font-bold text-[var(--baladi-primary)]">
                        {formatPrice(item.totalPrice * item.quantity)} kr
                      </div>
                      <div className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                        Inkl. mva
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {index < items.length - 1 && <Separator className="mt-4" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(OrderItems);
