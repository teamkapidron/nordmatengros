'use client';

// Node Modules
import Link from 'next/link';
import { memo } from 'react';
import { ShoppingCart, Plus } from '@repo/ui/lib/icons';
import { Badge } from '@repo/ui/components/base/badge';
import { Button } from '@repo/ui/components/base/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@repo/ui/components/base/tooltip';

// Hooks
import { useCart } from '@/hooks/useCart';

// Utils
import { formatPrice } from '@/utils/price.util';

function CartSection() {
  const { cartSummary, userCartItems } = useCart();

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Link
            href="/cart"
            className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-[var(--nordmat-border)] bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-[var(--nordmat-primary)] hover:bg-[var(--nordmat-primary)]/5 hover:shadow-[var(--nordmat-primary)]/20 hover:shadow-lg"
          >
            <ShoppingCart
              size={20}
              className="text-[var(--nordmat-dark)] transition-all duration-300 group-hover:scale-110 group-hover:text-[var(--nordmat-primary)]"
            />

            {cartSummary.uniqueItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full border-2 border-white bg-gradient-to-r from-[var(--nordmat-accent)] to-[var(--nordmat-secondary)] p-0 text-xs font-bold text-white shadow-lg">
                {cartSummary.uniqueItems > 99 ? '99+' : cartSummary.uniqueItems}
              </Badge>
            )}

            {cartSummary.uniqueItems > 0 && (
              <div className="absolute -top-1 -right-1 h-6 w-6 animate-ping rounded-full bg-[var(--nordmat-accent)]/30" />
            )}

            <div className="absolute inset-0 scale-0 rounded-full bg-gradient-to-r from-[var(--nordmat-primary)]/10 to-[var(--nordmat-secondary)]/10 transition-transform duration-300 group-hover:scale-150" />
          </Link>
        </TooltipTrigger>

        <TooltipContent
          side="bottom"
          align="end"
          className="w-80 border-[var(--nordmat-border)] bg-white p-0 shadow-xl"
        >
          {cartSummary.isEmpty ? (
            <EmptyCart />
          ) : (
            <div>
              <div className="border-b border-[var(--nordmat-border)] bg-gradient-to-r from-[var(--nordmat-light)] to-white px-4 py-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--nordmat-dark)]">
                    Handlekurv
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-[var(--nordmat-primary)]/10 font-[family-name:var(--font-dm-sans)] text-xs font-bold text-[var(--nordmat-primary)]"
                  >
                    {cartSummary.uniqueItems}{' '}
                    {cartSummary.uniqueItems === 1 ? 'produkt' : 'produkter'}
                  </Badge>
                </div>
              </div>

              <div className="max-h-48 overflow-y-auto">
                {userCartItems.slice(0, 3).map((item, index) => (
                  <div
                    key={`${item.product._id}-${index}`}
                    className="flex items-center gap-3 border-b border-[var(--nordmat-border)]/50 px-4 py-3 last:border-b-0"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--nordmat-light)]">
                      <span className="font-[family-name:var(--font-sora)] text-xs font-bold text-[var(--nordmat-primary)]">
                        {item.product.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-dark)]">
                        {item.product.name}
                      </p>
                      <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-gray)]">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--nordmat-dark)]">
                        {formatPrice(item.totalPaymentItemAmount)} kr
                      </p>
                    </div>
                  </div>
                ))}

                {userCartItems.length > 3 && (
                  <div className="px-4 py-2 text-center">
                    <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-gray)]">
                      +{userCartItems.length - 3} flere produkter
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-[var(--nordmat-border)] bg-gradient-to-r from-[var(--nordmat-light)]/50 to-white px-4 py-3">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-gray)]">
                    Totalt ({cartSummary.totalItems}{' '}
                    {cartSummary.totalItems === 1 ? 'vare' : 'varer'}):
                  </span>
                  <div className="flex items-baseline">
                    <span className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--nordmat-primary)]">
                      {formatPrice(cartSummary.totalPaymentAmount)}
                    </span>
                    <span className="ml-1 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--nordmat-gray)]">
                      kr
                    </span>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-[var(--nordmat-secondary)] to-[var(--nordmat-accent)] font-[family-name:var(--font-dm-sans)] font-medium shadow-lg hover:from-[var(--nordmat-secondary-dark)] hover:to-[var(--nordmat-accent-dark)] hover:shadow-xl"
                >
                  <Link href="/cart">
                    <ShoppingCart size={16} className="mr-2" />
                    Se handlekurv
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default memo(CartSection);

const EmptyCart = memo(() => (
  <div className="p-6 text-center">
    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--nordmat-light)]">
      <ShoppingCart size={24} className="text-[var(--nordmat-gray)]" />
    </div>
    <h3 className="mb-2 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--nordmat-dark)]">
      Handlekurven er tom
    </h3>
    <p className="mb-4 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--nordmat-gray)]">
      Legg til produkter for å komme i gang med handlingen din.
    </p>
    <Button
      asChild
      size="sm"
      className="bg-gradient-to-r from-[var(--nordmat-primary)] to-[var(--nordmat-secondary)] font-[family-name:var(--font-dm-sans)] font-medium hover:from-[var(--nordmat-primary-dark)] hover:to-[var(--nordmat-secondary-dark)]"
    >
      <Link href="/search">
        <Plus size={16} className="mr-2" />
        Start shopping
      </Link>
    </Button>
  </div>
));
