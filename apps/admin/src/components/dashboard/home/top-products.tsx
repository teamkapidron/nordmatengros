'use client';

// Node Modules
import Link from 'next/link';
import { memo, useMemo } from 'react';
import { Package, ArrowRight } from '@repo/ui/lib/icons';

// Hooks
import { useProductDashboard } from '@/hooks/useProduct';

function TopProducts() {
  const { topProductsQuery } = useProductDashboard();

  const products = useMemo(() => {
    return topProductsQuery.data?.products ?? [];
  }, [topProductsQuery.data]);

  return (
    <div className="h-full rounded-xl bg-white p-6 shadow-lg ring-1 ring-[var(--baladi-border)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
            Topprodukter
          </h3>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Best presterende produkter etter salgsvolum
          </p>
        </div>
        <Link
          href="/dashboard/products"
          className="bg-[var(--baladi-primary)]/10 hover:bg-[var(--baladi-primary)]/20 group flex items-center gap-1 rounded-lg px-3 py-1.5 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-primary)] transition-colors"
        >
          Se alle
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--baladi-muted)]">
            <Package className="h-8 w-8 text-[var(--baladi-gray)]" />
          </div>
          <h4 className="mb-2 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
            Ingen produktdata ennå
          </h4>
          <p className="mb-4 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Toppresterende produkter vil vises her når du har salgsdata.
          </p>
          <Link
            href="/dashboard/products"
            className="hover:bg-[var(--baladi-primary)]/90 inline-flex items-center gap-2 rounded-lg bg-[var(--baladi-primary)] px-4 py-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-white transition-colors"
          >
            <Package className="h-4 w-4" />
            Se produkter
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((product, index) => (
            <div
              key={product.product._id || index}
              className="hover:border-[var(--baladi-primary)]/20 group rounded-lg border border-[var(--baladi-border)] p-4 transition-all duration-200 hover:bg-[var(--baladi-light)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="from-[var(--baladi-primary)]/10 to-[var(--baladi-secondary)]/10 relative flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br">
                    <Package className="h-6 w-6 text-[var(--baladi-primary)]" />
                    <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--baladi-primary)] text-xs font-bold text-white">
                      {index + 1}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      {product.product.name}
                    </div>
                    <div className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                      <span>{product.totalOrders} bestillinger</span>
                      <span>•</span>
                      <span>{product.totalQuantity} enheter solgt</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {products.length > 0 && (
            <div className="mt-4 rounded-lg bg-[var(--baladi-light)] p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                    Viser topp {products.length} produkter
                  </p>
                  <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                    Basert på salgsytelse
                  </p>
                </div>
                <Link
                  href="/dashboard/products"
                  className="hover:text-[var(--baladi-primary)]/80 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-primary)]"
                >
                  Se alle produkter →
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(TopProducts);
