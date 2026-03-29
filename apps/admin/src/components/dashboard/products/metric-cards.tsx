'use client';

// Node Modules
import { memo, useMemo } from 'react';
import { Archive, ShoppingBag, TrendingUp, Tag } from '@repo/ui/lib/icons';

// Components
import AnimatedCounter from '@repo/ui/components/base/animate-counter';

// Hooks
import { useProductStats, useProductDashboard } from '@/hooks/useProduct';

function MetricCards() {
  const { productStatsQuery } = useProductStats();
  const { lowStockProductsQuery } = useProductDashboard();

  const stats = useMemo(() => {
    return {
      totalProducts: productStatsQuery.data?.totalProducts ?? 0,
      activeProducts: productStatsQuery.data?.activeProducts ?? 0,
      totalCategories: productStatsQuery.data?.totalCategories ?? 0,
      activeCategories: productStatsQuery.data?.activeCategories ?? 0,
    };
  }, [productStatsQuery.data]);

  const stockStats = useMemo(() => {
    return {
      lowStockCount: lowStockProductsQuery.data?.lowStockCount ?? 0,
      outOfStockCount: lowStockProductsQuery.data?.outOfStockCount ?? 0,
    };
  }, [lowStockProductsQuery.data]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="group relative overflow-hidden rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-blue-500/10" />
        <div className="relative p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 shadow-lg">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-900">
                <AnimatedCounter value={stats.totalProducts} />
              </p>
              <p className="text-sm font-medium text-blue-600">
                Totale Produkter
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">Aktive Produkter</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-blue-900">
                  <AnimatedCounter value={stats.activeProducts} />
                </span>
                <span className="text-xs text-blue-600">
                  (
                  <AnimatedCounter
                    value={
                      stats.totalProducts > 0
                        ? Math.round(
                            (stats.activeProducts / stats.totalProducts) * 100,
                          )
                        : 0
                    }
                  />
                  %)
                </span>
              </div>
            </div>
            <div className="h-2 w-full rounded-full bg-blue-200">
              <div
                className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                style={{
                  width:
                    stats.totalProducts > 0
                      ? `${(stats.activeProducts / stats.totalProducts) * 100}%`
                      : '0%',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-emerald-500/10" />
        <div className="relative p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 shadow-lg">
              <Tag className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-emerald-900">
                <AnimatedCounter value={stats.totalCategories} />
              </p>
              <p className="text-sm font-medium text-emerald-600">
                Totale Kategorier
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-emerald-700">
                Aktive Kategorier
              </span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-emerald-900">
                  <AnimatedCounter value={stats.activeCategories} />
                </span>
                <span className="text-xs text-emerald-600">
                  (
                  <AnimatedCounter
                    value={
                      stats.totalCategories > 0
                        ? Math.round(
                            (stats.activeCategories / stats.totalCategories) *
                              100,
                          )
                        : 0
                    }
                  />
                  %)
                </span>
              </div>
            </div>
            <div className="h-2 w-full rounded-full bg-emerald-200">
              <div
                className="h-2 rounded-full bg-emerald-500 transition-all duration-500"
                style={{
                  width:
                    stats.totalCategories > 0
                      ? `${(stats.activeCategories / stats.totalCategories) * 100}%`
                      : '0%',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-amber-500/10" />
        <div className="relative p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 shadow-lg">
              <Archive className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-amber-900">
                <AnimatedCounter
                  value={stockStats.lowStockCount + stockStats.outOfStockCount}
                />
              </p>
              <p className="text-sm font-medium text-amber-600">
                Varer som Trenger Oppmerksomhet
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-amber-700">Utsolgt</span>
              <span className="text-sm font-semibold text-red-600">
                <AnimatedCounter value={stockStats.outOfStockCount} />
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-amber-700">
                Lav Lagerbeholdning
              </span>
              <span className="text-sm font-semibold text-amber-900">
                <AnimatedCounter value={stockStats.lowStockCount} />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-purple-500/10" />
        <div className="relative p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500 shadow-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-900">
                <AnimatedCounter
                  value={Math.round(
                    (stats.activeProducts / Math.max(stats.totalProducts, 1)) *
                      100,
                  )}
                />
                %
              </p>
              <p className="text-sm font-medium text-purple-600">Aktiv Rate</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-700">Produkthelse</span>
              <span className="text-sm font-semibold text-purple-900">
                {stats.activeProducts > stats.totalProducts * 0.8
                  ? 'Utmerket'
                  : stats.activeProducts > stats.totalProducts * 0.6
                    ? 'Bra'
                    : stats.activeProducts > stats.totalProducts * 0.4
                      ? 'Greit'
                      : 'Trenger Oppmerksomhet'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-700">
                Snitt per Kategori
              </span>
              <span className="text-sm font-semibold text-purple-900">
                <AnimatedCounter
                  value={
                    stats.activeCategories > 0
                      ? Math.round(
                          stats.activeProducts / stats.activeCategories,
                        )
                      : 0
                  }
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(MetricCards);
