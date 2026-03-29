'use client';

// Node Modules
import Link from 'next/link';
import { cn } from '@repo/ui/lib/utils';
import React, { memo, useMemo } from 'react';
import {
  ShoppingCart,
  CreditCard,
  Tag,
  ArrowRight,
  Percent,
  Calculator,
  MapPin,
  Weight,
  Volume,
} from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Separator } from '@repo/ui/components/base/separator';

// Hooks
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

// Utils
import { formatPrice } from '@/utils/price.util';

interface PriceRowProps {
  label: string;
  value: number;
  icon?: React.ReactNode;
  className?: string;
  isTotal?: boolean;
}

const PriceRow = memo(
  ({ label, value, icon, className, isTotal = false }: PriceRowProps) => (
    <div
      className={cn(
        'flex items-center justify-between',
        isTotal ? 'py-3' : 'py-2',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span
          className={cn(
            'font-[family-name:var(--font-dm-sans)]',
            isTotal
              ? 'text-lg font-semibold text-[var(--baladi-dark)]'
              : 'text-sm text-[var(--baladi-gray)]',
          )}
        >
          {label}
        </span>
      </div>
      <span
        className={cn(
          'font-[family-name:var(--font-sora)]',
          isTotal
            ? 'text-xl font-bold text-[var(--baladi-primary)]'
            : 'text-sm font-medium text-[var(--baladi-dark)]',
        )}
      >
        {formatPrice(value)} kr
      </span>
    </div>
  ),
);

interface CartSummaryProps {
  onCheckout?: () => void;
  className?: string;
}

function CartSummary(props: CartSummaryProps) {
  const { onCheckout, className } = props;

  const { isAuthenticated } = useAuth();
  const { userCartItems, cartSummary } = useCart();

  const { totalWeight, totalVolume } = useMemo(() => {
    const totalWeight = userCartItems.reduce(
      (acc, item) => acc + (item.product.weight || 0) * item.quantity,
      0,
    );
    const totalVolume = userCartItems.reduce(
      (acc, item) =>
        acc +
        (item.product.dimensions?.length || 0) *
          (item.product.dimensions?.width || 0) *
          (item.product.dimensions?.height || 0) *
          item.quantity,
      0,
    );

    return { totalWeight, totalVolume };
  }, [userCartItems]);

  const {
    totalPriceWithoutVat,
    totalVatAmount,
    totalVolumeDiscountAmount,
    totalPaymentAmount,
  } = cartSummary;
  const hasDiscount = totalVolumeDiscountAmount > 0;

  if (!isAuthenticated || !userCartItems || userCartItems.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-6', className)}>
      <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--baladi-primary)]/10">
            <ShoppingCart size={18} className="text-[var(--baladi-primary)]" />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
              Bestillingssammendrag
            </h3>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              {userCartItems.length}{' '}
              {userCartItems.length === 1 ? 'vare' : 'varer'} i handlekurven
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <PriceRow
            label="Subtotal (uten MVA)"
            value={totalPriceWithoutVat}
            icon={
              <Calculator size={16} className="text-[var(--baladi-gray)]" />
            }
          />

          <PriceRow
            label="MVA"
            value={totalVatAmount}
            icon={<Percent size={16} className="text-[var(--baladi-gray)]" />}
          />

          {hasDiscount && (
            <PriceRow
              label="Totalrabatt"
              value={-totalVolumeDiscountAmount}
              icon={<Tag size={16} className="text-green-600" />}
              className="text-green-600"
            />
          )}

          <Separator className="my-4" />

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2">
              <Weight size={16} className="text-[var(--baladi-gray)]" />
              <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-gray)]">
                Totalvekt: {totalWeight} kg
              </span>
            </div>
          </div>

          <div className="mt-2 space-y-3">
            <div className="flex items-center gap-2">
              <Volume size={16} className="text-[var(--baladi-gray)]" />
              <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-gray)]">
                Totalvolum: {(totalVolume / 1000000).toFixed(2)} m³
              </span>
            </div>
          </div>

          <PriceRow
            label="Totalt å betale"
            value={totalPaymentAmount}
            icon={
              <CreditCard size={18} className="text-[var(--baladi-primary)]" />
            }
            isTotal
          />
        </div>

        <div className="mt-6 space-y-3">
          {hasDiscount && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
              <div className="flex items-center gap-2">
                <Tag size={16} className="text-blue-600" />
                <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-blue-800">
                  Volumerabatt anvendt på{' '}
                  {formatPrice(totalVolumeDiscountAmount)} kr
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <Button
          size="lg"
          onClick={onCheckout}
          className="w-full font-[family-name:var(--font-dm-sans)] font-semibold shadow-lg"
        >
          <MapPin size={18} className="mr-2" />
          Gå til bestilling
          <ArrowRight size={16} className="ml-2" />
        </Button>

        <Button variant="outline" className="w-full">
          <Link
            href="/"
            className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-primary)] transition-colors hover:text-[var(--baladi-primary-dark)]"
          >
            ← Fortsett å handle
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default memo(CartSummary);
