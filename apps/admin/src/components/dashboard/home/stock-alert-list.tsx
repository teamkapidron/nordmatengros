'use client';

// Node Modules
import Link from 'next/link';
import { memo, useMemo } from 'react';
import { Package, ArrowRight, TrendingDown, Ban } from '@repo/ui/lib/icons';

// Hooks
import { useProductDashboard } from '@/hooks/useProduct';

type StockAlert = {
  id: string;
  name: string;
  status: 'low' | 'out';
  categories: string[];
};

function StockAlertsList() {
  const { lowStockProductsQuery } = useProductDashboard();

  const { stockAlerts, outOfStockCount, lowStockCount } = useMemo(() => {
    const lowStockData = lowStockProductsQuery.data;
    if (!lowStockData) {
      return { stockAlerts: [], outOfStockCount: 0, lowStockCount: 0 };
    }

    const alerts: StockAlert[] = [];

    if (lowStockData.outOfStockProducts) {
      lowStockData.outOfStockProducts.forEach((product) => {
        alerts.push({
          id: product._id,
          name: product.name,
          status: 'out' as const,
          categories: product.categories?.map((cat) => cat.name),
        });
      });
    }

    if (lowStockData.lowStockProducts) {
      lowStockData.lowStockProducts.forEach((product) => {
        alerts.push({
          id: product._id,
          name: product.name,
          status: 'low' as const,
          categories: product.categories?.map((cat) => cat.name),
        });
      });
    }

    const sortedAlerts = alerts.sort((a, b) => {
      if (a.status === 'out' && b.status === 'low') return -1;
      if (a.status === 'low' && b.status === 'out') return 1;
      return a.name.localeCompare(b.name);
    });

    return {
      stockAlerts: sortedAlerts,
      outOfStockCount: lowStockData.outOfStockCount || 0,
      lowStockCount: lowStockData.lowStockCount || 0,
    };
  }, [lowStockProductsQuery.data]);

  return (
    <div className="h-full rounded-xl bg-white p-6 shadow-lg ring-1 ring-[var(--baladi-border)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
            Lagervarslinger
          </h3>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Produkter som krever umiddelbar oppmerksomhet
          </p>
        </div>
        <Link
          href="/dashboard/inventory"
          className="bg-[var(--baladi-primary)]/10 hover:bg-[var(--baladi-primary)]/20 group flex items-center gap-1 rounded-lg px-3 py-1.5 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-primary)] transition-colors"
        >
          Administrer
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="from-[var(--baladi-error)]/10 to-[var(--baladi-error)]/5 border-[var(--baladi-error)]/20 group relative overflow-hidden rounded-xl border bg-gradient-to-br p-4 transition-all duration-300 hover:shadow-lg">
          <div className="to-[var(--baladi-error)]/70 absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[var(--baladi-error)]"></div>
          <div className="mb-2 flex items-center justify-between">
            <div className="bg-[var(--baladi-error)]/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <Ban className="h-5 w-5 text-[var(--baladi-error)]" />
            </div>
            <div className="bg-[var(--baladi-error)]/10 rounded-full px-2 py-1">
              <span className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-error)]">
                Kritisk
              </span>
            </div>
          </div>
          <div className="mb-1 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-gray)]">
            Utsolgt
          </div>
          <div className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)]">
            {outOfStockCount}
          </div>
        </div>

        <div className="from-[var(--baladi-warning)]/10 to-[var(--baladi-warning)]/5 border-[var(--baladi-warning)]/20 group relative overflow-hidden rounded-xl border bg-gradient-to-br p-4 transition-all duration-300 hover:shadow-lg">
          <div className="to-[var(--baladi-warning)]/70 absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[var(--baladi-warning)]"></div>
          <div className="mb-2 flex items-center justify-between">
            <div className="bg-[var(--baladi-warning)]/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <TrendingDown className="h-5 w-5 text-[var(--baladi-warning)]" />
            </div>
            <div className="bg-[var(--baladi-warning)]/10 rounded-full px-2 py-1">
              <span className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-warning)]">
                Advarsel
              </span>
            </div>
          </div>
          <div className="mb-1 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-gray)]">
            Lavt lager
          </div>
          <div className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)]">
            {lowStockCount}
          </div>
        </div>
      </div>

      {stockAlerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-[var(--baladi-success)]/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <Package className="h-8 w-8 text-[var(--baladi-success)]" />
          </div>
          <h4 className="mb-2 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
            Alle produkter på lager
          </h4>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Alle produktene dine har tilstrekkelige lagernivå. Flott jobbet!
          </p>
        </div>
      ) : (
        <div className="max-h-80 space-y-3 overflow-y-auto">
          {stockAlerts.slice(0, 10).map((alert) => (
            <div
              key={alert.id}
              className="hover:border-[var(--baladi-primary)]/30 group relative overflow-hidden rounded-lg border border-[var(--baladi-border)] bg-white p-3 transition-all duration-300 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 ${getStatusBgColor(alert.status)}`}
                  >
                    {alert.status === 'out' ? (
                      <Ban
                        className="h-4 w-4"
                        style={{ color: getStatusColor(alert.status) }}
                      />
                    ) : (
                      <TrendingDown
                        className="h-4 w-4"
                        style={{ color: getStatusColor(alert.status) }}
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
                      {alert.name}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {alert.categories.slice(0, 2).map((category, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-[var(--baladi-light)] px-2 py-1 font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-gray)]"
                        >
                          {category}
                        </span>
                      ))}
                      {alert.categories.length > 2 && (
                        <span className="rounded-full bg-[var(--baladi-light)] px-2 py-1 font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-gray)]">
                          +{alert.categories.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-2 font-[family-name:var(--font-dm-sans)] text-sm font-semibold transition-all duration-300 ${getStatusBgColor(alert.status)} group-hover:scale-105`}
                    style={{ color: getStatusColor(alert.status) }}
                  >
                    {alert.status === 'out' && <Ban className="h-4 w-4" />}
                    {alert.status === 'low' && (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {getStatusText(alert.status)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {stockAlerts.length > 8 && (
            <div className="mt-3 text-center">
              <Link
                href="/dashboard/inventory"
                className="hover:text-[var(--baladi-primary)]/80 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-primary)]"
              >
                Se {stockAlerts.length - 8} flere varslinger
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(StockAlertsList);

function getStatusColor(status: 'low' | 'out') {
  return status === 'out' ? 'var(--baladi-error)' : 'var(--baladi-warning)';
}

function getStatusBgColor(status: 'low' | 'out') {
  return status === 'out'
    ? 'bg-[var(--baladi-error)]/10'
    : 'bg-[var(--baladi-warning)]/10';
}

function getStatusText(status: 'low' | 'out') {
  return status === 'out' ? 'Utsolgt' : 'Lavt lager';
}
