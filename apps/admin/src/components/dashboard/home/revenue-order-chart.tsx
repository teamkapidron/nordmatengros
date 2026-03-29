'use client';

// Node Modules
import { memo, useMemo } from 'react';

// Components
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from '@repo/ui/lib/recharts';

// Hooks
import { useOrderDashboard } from '@/hooks/useOrder';

function RevenueOrdersChart() {
  const { orderRevenueGraphDataQuery } = useOrderDashboard();

  const revenueData = useMemo(() => {
    return orderRevenueGraphDataQuery.data?.data ?? [];
  }, [orderRevenueGraphDataQuery.data]);

  const chartConfig = {
    orderCount: {
      label: 'Antall bestillinger',
      color: 'var(--baladi-info)',
    },
    totalRevenue: {
      label: 'Inntekt',
      color: 'var(--baladi-success)',
    },
    totalCost: {
      label: 'Kostnad',
      color: 'var(--baladi-warning)',
    },
    totalProfit: {
      label: 'Fortjeneste',
      color: 'var(--baladi-primary)',
    },
  };

  const totalMetrics = useMemo(() => {
    return revenueData.reduce(
      (acc, item) => ({
        orderCount: acc.orderCount + (item.orderCount || 0),
        totalRevenue: acc.totalRevenue + (item.totalRevenue || 0),
        totalCost: acc.totalCost + (item.totalCost || 0),
        totalProfit: acc.totalProfit + (item.totalProfit || 0),
      }),
      {
        orderCount: 0,
        totalRevenue: 0,
        totalCost: 0,
        totalProfit: 0,
      },
    );
  }, [revenueData]);

  return (
    <div className="h-full rounded-xl bg-white p-6 shadow-lg ring-1 ring-[var(--baladi-border)]">
      <div className="mb-4">
        <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
          Daglig inntekt og bestillinger
        </h3>
        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
          Spor inntekt, kostnader, fortjeneste og bestillingsvolum over tid
        </p>
      </div>

      {revenueData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--baladi-muted)]">
            <svg
              className="h-8 w-8 text-[var(--baladi-gray)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <h4 className="mb-2 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
            Ingen inntektsdata ennå
          </h4>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Inntekts- og bestillingsanalyse vil vises her når du begynner å
            motta bestillinger.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap gap-4">
            {Object.entries(chartConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: config.color }}
                />
                <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-dark)]">
                  {config.label}
                </span>
              </div>
            ))}
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="var(--baladi-border)"
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fontSize: 12,
                    fill: 'var(--baladi-gray)',
                    fontFamily: 'var(--font-dm-sans)',
                  }}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fontSize: 12,
                    fill: 'var(--baladi-gray)',
                    fontFamily: 'var(--font-dm-sans)',
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fontSize: 12,
                    fill: 'var(--baladi-gray)',
                    fontFamily: 'var(--font-dm-sans)',
                  }}
                />

                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0]?.payload;
                      return (
                        <div className="rounded-lg border border-[var(--baladi-border)] bg-white p-3 shadow-lg">
                          <p className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[var(--baladi-dark)]">
                            {data.date}
                          </p>
                          <div className="mt-2 space-y-1">
                            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                              <span
                                className="mr-2 inline-block h-2 w-2 rounded-full"
                                style={{
                                  backgroundColor:
                                    chartConfig.totalRevenue.color,
                                }}
                              />
                              Inntekt:{' '}
                              {data.totalRevenue?.toLocaleString() || 0} kr
                            </p>
                            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                              <span
                                className="mr-2 inline-block h-2 w-2 rounded-full"
                                style={{
                                  backgroundColor: chartConfig.orderCount.color,
                                }}
                              />
                              Bestillinger: {data.orderCount || 0}
                            </p>
                            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                              <span
                                className="mr-2 inline-block h-2 w-2 rounded-full"
                                style={{
                                  backgroundColor: chartConfig.totalCost.color,
                                }}
                              />
                              Kostnad: {data.totalCost?.toLocaleString() || 0}{' '}
                              kr
                            </p>
                            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                              <span
                                className="mr-2 inline-block h-2 w-2 rounded-full"
                                style={{
                                  backgroundColor:
                                    chartConfig.totalProfit.color,
                                }}
                              />
                              Fortjeneste:{' '}
                              {data.totalProfit?.toLocaleString() || 0} kr
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="totalRevenue"
                  stroke={chartConfig.totalRevenue.color}
                  fill={chartConfig.totalRevenue.color}
                  fillOpacity={0.1}
                  strokeWidth={2}
                  activeDot={{ r: 4, fill: chartConfig.totalRevenue.color }}
                  animationBegin={0}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="orderCount"
                  stroke={chartConfig.orderCount.color}
                  fill={chartConfig.orderCount.color}
                  fillOpacity={0.1}
                  strokeWidth={2}
                  activeDot={{ r: 4, fill: chartConfig.orderCount.color }}
                  animationBegin={300}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="totalCost"
                  stroke={chartConfig.totalCost.color}
                  fill={chartConfig.totalCost.color}
                  fillOpacity={0.1}
                  strokeWidth={2}
                  activeDot={{ r: 4, fill: chartConfig.totalCost.color }}
                  animationBegin={600}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="totalProfit"
                  stroke={chartConfig.totalProfit.color}
                  fill={chartConfig.totalProfit.color}
                  fillOpacity={0.1}
                  strokeWidth={2}
                  activeDot={{ r: 4, fill: chartConfig.totalProfit.color }}
                  animationBegin={900}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[var(--baladi-border)] pt-4">
            <div className="bg-[var(--baladi-success)]/5 rounded-lg p-3">
              <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-success)]">
                Total inntekt
              </p>
              <p className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                {totalMetrics.totalRevenue.toLocaleString()} kr
              </p>
            </div>
            <div className="bg-[var(--baladi-info)]/5 rounded-lg p-3">
              <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-info)]">
                Total bestillinger
              </p>
              <p className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                {totalMetrics.orderCount.toLocaleString()}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default memo(RevenueOrdersChart);
