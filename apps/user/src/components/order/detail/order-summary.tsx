'use client';

// Node Modules
import React, { memo, useMemo } from 'react';
import { Receipt } from '@repo/ui/lib/icons';

// Components
import { Separator } from '@repo/ui/components/base/separator';

// Types/Utils
import { formatPrice } from '@/utils/price.util';
import { OrderResponse } from '@/hooks/useOrder/types';

interface OrderSummaryProps {
  order: OrderResponse;
}

function OrderSummary({ order }: OrderSummaryProps) {
  const {
    subtotal,
    totalVatAmount,
    totalDiscount,
    totalBulkDiscount,
    subtotalWithVat,
    finalTotal,
  } = useMemo(() => {
    const subtotal = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const totalVatAmount = order.items.reduce(
      (sum, item) => sum + item.vatAmount * item.quantity,
      0,
    );

    const totalDiscount = order.items.reduce(
      (sum, item) => sum + (item.discount || 0) * item.quantity,
      0,
    );

    const totalBulkDiscount = order.items.reduce(
      (sum, item) => sum + (item.bulkDiscount || 0) * item.quantity,
      0,
    );

    const subtotalWithVat = order.items.reduce(
      (sum, item) => sum + item.priceWithVat * item.quantity,
      0,
    );

    const finalTotal = order.items.reduce(
      (sum, item) => sum + item.totalPrice * item.quantity,
      0,
    );

    return {
      subtotal,
      totalVatAmount,
      totalDiscount,
      totalBulkDiscount,
      subtotalWithVat,
      finalTotal,
    };
  }, [order.items]);

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-[var(--nordmat-primary)]/10 flex h-8 w-8 items-center justify-center rounded-full">
            <Receipt size={16} className="text-[var(--nordmat-primary)]" />
          </div>
          <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--nordmat-dark)]">
            Bestillingssammendrag
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between font-[family-name:var(--font-dm-sans)]">
            <span className="text-[var(--nordmat-gray)]">
              Subtotal (ekskl. mva)
            </span>
            <span className="font-medium text-[var(--nordmat-dark)]">
              {formatPrice(subtotal)} kr
            </span>
          </div>

          <div className="flex justify-between font-[family-name:var(--font-dm-sans)]">
            <span className="text-[var(--nordmat-gray)]">MVA</span>
            <span className="font-medium text-[var(--nordmat-dark)]">
              {formatPrice(totalVatAmount)} kr
            </span>
          </div>

          <div className="flex justify-between font-[family-name:var(--font-dm-sans)]">
            <span className="text-[var(--nordmat-gray)]">
              Subtotal (inkl. mva)
            </span>
            <span className="font-medium text-[var(--nordmat-dark)]">
              {formatPrice(subtotalWithVat)} kr
            </span>
          </div>

          {totalDiscount > 0 && (
            <div className="flex justify-between font-[family-name:var(--font-dm-sans)]">
              <span className="text-[var(--nordmat-success)]">Rabatt</span>
              <span className="font-medium text-[var(--nordmat-success)]">
                -{formatPrice(totalDiscount)} kr
              </span>
            </div>
          )}

          {totalBulkDiscount > 0 && (
            <div className="flex justify-between font-[family-name:var(--font-dm-sans)]">
              <span className="text-[var(--nordmat-success)]">Mengderabatt</span>
              <span className="font-medium text-[var(--nordmat-success)]">
                -{formatPrice(totalBulkDiscount)} kr
              </span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between">
            <span className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--nordmat-dark)]">
              Totalt å betale
            </span>
            <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--nordmat-primary)]">
              {formatPrice(finalTotal)} kr
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(OrderSummary);
