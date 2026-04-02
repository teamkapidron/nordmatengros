'use client';

// Node Modules
import { memo, useMemo } from 'react';
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  TruckIcon,
  XCircle,
  DollarSign,
  TrendingUp,
} from '@repo/ui/lib/icons';

// Components
import AnimatedCounter from '@repo/ui/components/base/animate-counter';

// Hooks
import { useOrderStats } from '@/hooks/useOrder';

// Types/Utils
import { formatPrice } from '@/utils/price.util';

function OrderMetricCards() {
  const { orderStatsQuery, orderRevenueStatsQuery } = useOrderStats();

  const statusStats = useMemo(() => {
    const totalOrders = orderStatsQuery.data?.totalOrders ?? 0;
    const pendingOrders = orderStatsQuery.data?.pendingOrders ?? 0;
    const confirmedOrders = orderStatsQuery.data?.confirmedOrders ?? 0;
    const shippedOrders = orderStatsQuery.data?.shippedOrders ?? 0;
    const deliveredOrders = orderStatsQuery.data?.deliveredOrders ?? 0;
    const cancelledOrders = orderStatsQuery.data?.cancelledOrders ?? 0;

    const pendingPercent =
      totalOrders > 0 ? Math.round((pendingOrders / totalOrders) * 100) : 0;
    const confirmedPercent =
      totalOrders > 0 ? Math.round((confirmedOrders / totalOrders) * 100) : 0;
    const shippedPercent =
      totalOrders > 0 ? Math.round((shippedOrders / totalOrders) * 100) : 0;
    const deliveredPercent =
      totalOrders > 0 ? Math.round((deliveredOrders / totalOrders) * 100) : 0;
    const cancelledPercent =
      totalOrders > 0 ? Math.round((cancelledOrders / totalOrders) * 100) : 0;

    return {
      totalOrders,
      pendingOrders,
      confirmedOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      pendingPercent,
      confirmedPercent,
      shippedPercent,
      deliveredPercent,
      cancelledPercent,
    };
  }, [orderStatsQuery.data]);

  const revenueStats = useMemo(() => {
    const totalRevenue = orderRevenueStatsQuery.data?.totalRevenue ?? 0;
    const totalCost = orderRevenueStatsQuery.data?.totalCost ?? 0;
    const totalProfit = orderRevenueStatsQuery.data?.totalProfit ?? 0;
    const avgOrderValue =
      statusStats.totalOrders > 0 ? totalRevenue / statusStats.totalOrders : 0;
    const profitMargin =
      totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

    return {
      totalRevenue,
      totalCost,
      totalProfit,
      avgOrderValue,
      profitMargin,
    };
  }, [orderRevenueStatsQuery.data, statusStats.totalOrders]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="group relative overflow-hidden rounded-xl border border-[var(--nordmat-border)] bg-gradient-to-br from-white to-[var(--nordmat-primary)]/5 p-6 shadow-md transition-all duration-300 hover:shadow-[var(--nordmat-primary)]/20 hover:shadow-lg">
        <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-[var(--nordmat-primary)]/10 transition-transform duration-300 group-hover:scale-110"></div>

        <div className="relative flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--nordmat-primary)] shadow-lg">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-text-muted)]">
                Totale Bestillinger
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--nordmat-text)]">
                  <AnimatedCounter value={statusStats.totalOrders} />
                </span>
                {statusStats.totalOrders > 0 && (
                  <div className="flex items-center gap-1 rounded-full bg-[var(--nordmat-success)]/10 px-2 py-1">
                    <TrendingUp className="h-3 w-3 text-[var(--nordmat-success)]" />
                    <span className="text-xs font-medium text-[var(--nordmat-success)]">
                      Aktiv
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 border-t border-[var(--nordmat-border)] pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--nordmat-text-muted)]">
              Omsetning Generert
            </span>
            <span className="font-medium text-[var(--nordmat-text)]">
              <AnimatedCounter value={formatPrice(revenueStats.totalRevenue)} />
              kr
            </span>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-xl border border-[var(--nordmat-border)] bg-gradient-to-br from-white to-[var(--nordmat-warning)]/5 p-6 shadow-md transition-all duration-300 hover:shadow-[var(--nordmat-warning)]/20 hover:shadow-lg">
        <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-[var(--nordmat-warning)]/10 transition-transform duration-300 group-hover:scale-110"></div>

        <div className="relative flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--nordmat-warning)] shadow-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-text-muted)]">
                Ventende Bestillinger
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--nordmat-text)]">
                  <AnimatedCounter value={statusStats.pendingOrders} />
                </span>
                <div className="flex items-center gap-1 rounded-full bg-[var(--nordmat-warning)]/10 px-2 py-1">
                  <span className="text-xs font-medium text-[var(--nordmat-warning)]">
                    {statusStats.pendingPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 border-t border-[var(--nordmat-border)] pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--nordmat-text-muted)]">
              Avventer Behandling
            </span>
            <span className="font-medium text-[var(--nordmat-warning)]">
              {statusStats.pendingOrders} bestillinger
            </span>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-xl border border-[var(--nordmat-border)] bg-gradient-to-br from-white to-[var(--nordmat-secondary)]/5 p-6 shadow-md transition-all duration-300 hover:shadow-[var(--nordmat-secondary)]/20 hover:shadow-lg">
        <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-[var(--nordmat-secondary)]/10 transition-transform duration-300 group-hover:scale-110"></div>

        <div className="relative flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--nordmat-secondary)] shadow-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-text-muted)]">
                Bekreftede Bestillinger
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--nordmat-text)]">
                  <AnimatedCounter value={statusStats.confirmedOrders} />
                </span>
                <div className="flex items-center gap-1 rounded-full bg-[var(--nordmat-secondary)]/10 px-2 py-1">
                  <span className="text-xs font-medium text-[var(--nordmat-secondary)]">
                    {statusStats.confirmedPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 border-t border-[var(--nordmat-border)] pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--nordmat-text-muted)]">
              Klar til Frakt
            </span>
            <span className="font-medium text-[var(--nordmat-secondary)]">
              {statusStats.confirmedOrders} bestillinger
            </span>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-xl border border-[var(--nordmat-border)] bg-gradient-to-br from-white to-[var(--nordmat-success)]/5 p-6 shadow-md transition-all duration-300 hover:shadow-[var(--nordmat-success)]/20 hover:shadow-lg">
        <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-[var(--nordmat-success)]/10 transition-transform duration-300 group-hover:scale-110"></div>

        <div className="relative flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--nordmat-success)] shadow-lg">
              <TruckIcon className="h-6 w-6 text-white" />
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-text-muted)]">
                Sendte Bestillinger
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--nordmat-text)]">
                  <AnimatedCounter value={statusStats.shippedOrders} />
                </span>
                <div className="flex items-center gap-1 rounded-full bg-[var(--nordmat-success)]/10 px-2 py-1">
                  <span className="text-xs font-medium text-[var(--nordmat-success)]">
                    {statusStats.shippedPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 border-t border-[var(--nordmat-border)] pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--nordmat-text-muted)]">På Vei</span>
            <span className="font-medium text-[var(--nordmat-success)]">
              {statusStats.shippedPercent} bestillinger
            </span>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-xl border border-[var(--nordmat-border)] bg-gradient-to-br from-white to-[var(--nordmat-info)]/5 p-6 shadow-md transition-all duration-300 hover:shadow-[var(--nordmat-info)]/20 hover:shadow-lg">
        <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-[var(--nordmat-info)]/10 transition-transform duration-300 group-hover:scale-110"></div>

        <div className="relative flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--nordmat-info)] shadow-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-text-muted)]">
                Leverte Bestillinger
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--nordmat-text)]">
                  <AnimatedCounter value={statusStats.deliveredOrders} />
                </span>
                <div className="flex items-center gap-1 rounded-full bg-[var(--nordmat-info)]/10 px-2 py-1">
                  <span className="text-xs font-medium text-[var(--nordmat-info)]">
                    {statusStats.deliveredPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 border-t border-[var(--nordmat-border)] pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--nordmat-text-muted)]">
              Fullført Levering
            </span>
            <span className="font-medium text-[var(--nordmat-info)]">
              {statusStats.deliveredOrders} bestillinger
            </span>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-xl border border-[var(--nordmat-border)] bg-gradient-to-br from-white to-[var(--nordmat-error)]/5 p-6 shadow-md transition-all duration-300 hover:shadow-[var(--nordmat-error)]/20 hover:shadow-lg">
        <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-[var(--nordmat-error)]/10 transition-transform duration-300 group-hover:scale-110"></div>

        <div className="relative flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--nordmat-error)] shadow-lg">
              <XCircle className="h-6 w-6 text-white" />
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-text-muted)]">
                Kansellerte Bestillinger
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--nordmat-text)]">
                  <AnimatedCounter value={statusStats.cancelledOrders} />
                </span>
                <div className="flex items-center gap-1 rounded-full bg-[var(--nordmat-error)]/10 px-2 py-1">
                  <span className="text-xs font-medium text-[var(--nordmat-error)]">
                    {statusStats.cancelledPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 border-t border-[var(--nordmat-border)] pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--nordmat-text-muted)]">
              Refundering Ventende
            </span>
            <span className="font-medium text-[var(--nordmat-error)]">
              {statusStats.cancelledOrders} bestillinger
            </span>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-xl border border-[var(--nordmat-border)] bg-gradient-to-br from-white to-[var(--nordmat-success)]/5 p-6 shadow-md transition-all duration-300 hover:shadow-[var(--nordmat-success)]/20 hover:shadow-lg">
        <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-[var(--nordmat-success)]/10 transition-transform duration-300 group-hover:scale-110"></div>

        <div className="relative flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--nordmat-success)] shadow-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-text-muted)]">
                Total Omsetning
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--nordmat-text)]">
                  <AnimatedCounter
                    value={formatPrice(revenueStats.totalRevenue)}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 border-t border-[var(--nordmat-border)] pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--nordmat-text-muted)]">
              Total Kostnad
            </span>
            <span className="font-medium text-[var(--nordmat-text)]">
              <AnimatedCounter value={formatPrice(revenueStats.totalCost)} />
              kr
            </span>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-xl border border-[var(--nordmat-border)] bg-gradient-to-br from-white to-[var(--nordmat-accent)]/5 p-6 shadow-md transition-all duration-300 hover:shadow-[var(--nordmat-accent)]/20 hover:shadow-lg">
        <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-[var(--nordmat-accent)]/10 transition-transform duration-300 group-hover:scale-110"></div>

        <div className="relative flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--nordmat-accent)] shadow-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-text-muted)]">
                Bruttofortjeneste
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--nordmat-text)]">
                  <AnimatedCounter
                    value={formatPrice(revenueStats.totalProfit)}
                  />
                  kr
                </span>
                {revenueStats.profitMargin > 0 && (
                  <div className="flex items-center gap-1 rounded-full bg-[var(--nordmat-accent)]/10 px-2 py-1">
                    <span className="text-xs font-medium text-[var(--nordmat-accent)]">
                      {revenueStats.profitMargin.toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 border-t border-[var(--nordmat-border)] pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--nordmat-text-muted)]">
              Fortjenestemargin
            </span>
            <span className="font-medium text-[var(--nordmat-accent)]">
              {revenueStats.profitMargin.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(OrderMetricCards);
