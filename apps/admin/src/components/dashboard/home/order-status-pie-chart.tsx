'use client';

// Node Modules
import { memo, useMemo } from 'react';

// Components
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from '@repo/ui/lib/recharts';

// Hooks
import { useOrderStats } from '@/hooks/useOrder';

function OrderStatusPieChart() {
  const { orderStatsQuery } = useOrderStats();

  const data = useMemo(() => {
    return {
      pending: orderStatsQuery.data?.pendingOrders ?? 0,
      confirmed: orderStatsQuery.data?.confirmedOrders ?? 0,
      shipping: orderStatsQuery.data?.shippedOrders ?? 0,
      delivered: orderStatsQuery.data?.deliveredOrders ?? 0,
      canceled: orderStatsQuery.data?.cancelledOrders ?? 0,
    };
  }, [orderStatsQuery.data]);

  const { total, deliveryRate, pendingRate } = useMemo(() => {
    const total =
      data.pending +
      data.confirmed +
      data.shipping +
      data.delivered +
      data.canceled;

    const deliveryRate = Math.round((data.delivered / total) * 100) || 0;
    const pendingRate = Math.round((data.pending / total) * 100) || 0;

    return { total, deliveryRate, pendingRate };
  }, [data]);

  const orderData = useMemo(() => {
    return [
      {
        status: 'Avventer',
        count: data.pending,
        color: 'var(--nordmat-warning)',
      },
      {
        status: 'Bekreftet',
        count: data.confirmed,
        color: 'var(--nordmat-info)',
      },
      {
        status: 'Sendes',
        count: data.shipping,
        color: 'var(--nordmat-secondary)',
      },
      {
        status: 'Levert',
        count: data.delivered,
        color: 'var(--nordmat-success)',
      },
      {
        status: 'Avbrutt',
        count: data.canceled,
        color: 'var(--nordmat-error)',
      },
    ];
  }, [data]);

  return (
    <div className="h-full rounded-xl bg-white p-4 shadow-lg ring-1 ring-[var(--nordmat-border)]">
      <div className="mb-3">
        <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--nordmat-dark)]">
          Bestillingsstatus fordeling
        </h3>
        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--nordmat-gray)]">
          Oversikt over alle bestillingsstatuser
        </p>
      </div>

      {/* Key Metrics */}
      <div className="mb-3 grid grid-cols-2 gap-3">
        <div className="bg-[var(--nordmat-success)]/10 rounded-md p-2">
          <div className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--nordmat-success)]">
            Leveringsrate
          </div>
          <div className="font-[family-name:var(--font-dm-sans)] text-sm font-bold text-[var(--nordmat-success)]">
            {deliveryRate}%
          </div>
        </div>
        <div className="bg-[var(--nordmat-warning)]/10 rounded-md p-2">
          <div className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--nordmat-warning)]">
            Avventende rate
          </div>
          <div className="font-[family-name:var(--font-dm-sans)] text-sm font-bold text-[var(--nordmat-warning)]">
            {pendingRate}%
          </div>
        </div>
      </div>

      {total === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center text-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--nordmat-muted)]">
            <svg
              className="h-6 w-6 text-[var(--nordmat-gray)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-dark)]">
            Ingen bestillinger ennå
          </p>
          <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-gray)]">
            Bestillingsdata vil vises her når du får bestillinger
          </p>
        </div>
      ) : (
        <div className="relative mb-3 flex h-40 items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={orderData}
                cx="50%"
                cy="50%"
                outerRadius={65}
                innerRadius={0}
                dataKey="count"
              >
                {orderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0]?.payload;
                    const percentage = Math.round((data.count / total) * 100);
                    return (
                      <div className="rounded-lg border border-[var(--nordmat-border)] bg-white p-2 shadow-lg">
                        <p className="font-[family-name:var(--font-dm-sans)] text-xs font-semibold text-[var(--nordmat-dark)]">
                          {data.status}
                        </p>
                        <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-gray)]">
                          {data.count} ({percentage}%)
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Compact Status Breakdown */}
      <div className="space-y-1.5">
        <div className="mb-2 font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--nordmat-dark)]">
          Statusdetaljer
        </div>
        {orderData.map((item, index) => {
          const percentage =
            total > 0 ? Math.round((item.count / total) * 100) : 0;
          return (
            <div
              key={index}
              className="flex items-center justify-between font-[family-name:var(--font-dm-sans)] text-xs"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-[var(--nordmat-dark)]">
                  {item.status}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-[var(--nordmat-dark)]">
                  {item.count}
                </span>
                <span className="text-[var(--nordmat-gray)]">
                  ({percentage}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(OrderStatusPieChart);
