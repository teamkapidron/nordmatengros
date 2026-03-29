'use client';

// Node Modules
import { memo, useMemo } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from '@repo/ui/lib/recharts';
import { TrendingUp, TrendingDown, Users } from '@repo/ui/lib/icons';

// Hooks
import { useUsers } from '@/hooks/useUsers';

function CustomerRegistrationChart() {
  const { getUserRegistrationGraphDataQuery } = useUsers();

  const customerData = useMemo(() => {
    return getUserRegistrationGraphDataQuery.data?.data ?? [];
  }, [getUserRegistrationGraphDataQuery.data]);

  const chartConfig = {
    newRegistrations: {
      label: 'Nye registreringer',
      color: 'var(--baladi-primary)',
    },
    totalUsers: {
      label: 'Totale brukere',
      color: 'var(--baladi-secondary)',
    },
  };

  const { growthPercent, totalNewRegistrations, totalUsers } = useMemo(() => {
    if (customerData.length < 2) {
      return { growthPercent: 0, totalNewRegistrations: 0, totalUsers: 0 };
    }

    const firstPeriod = customerData[0];
    const lastPeriod = customerData[customerData.length - 1];

    if (!firstPeriod || !lastPeriod) {
      return { growthPercent: 0, totalNewRegistrations: 0, totalUsers: 0 };
    }

    const growth =
      firstPeriod.totalUsers > 0
        ? ((lastPeriod.totalUsers - firstPeriod.totalUsers) /
            firstPeriod.totalUsers) *
          100
        : 0;

    const totalNew = customerData.reduce(
      (sum, item) => sum + item.newRegistrations,
      0,
    );
    const latestTotalUsers = lastPeriod.totalUsers || 0;

    return {
      growthPercent: Math.round(growth),
      totalNewRegistrations: totalNew,
      totalUsers: latestTotalUsers,
    };
  }, [customerData]);

  return (
    <div className="h-full rounded-xl bg-white p-6 shadow-lg ring-1 ring-[var(--baladi-border)]">
      <div className="mb-4">
        <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
          Kunderegistrering
        </h3>
        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
          Spor nye brukerregistreringer og total brukervekst over tid
        </p>
      </div>

      {customerData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--baladi-muted)]">
            <Users className="h-8 w-8 text-[var(--baladi-gray)]" />
          </div>
          <h4 className="mb-2 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
            Ingen registreringsdata ennå
          </h4>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Kunderegistreringsanalyse vil vises her når brukere begynner å
            registrere seg.
          </p>
        </div>
      ) : (
        <>
          {/* Growth Summary */}
          <div className="mb-4 flex items-center justify-between rounded-lg bg-[var(--baladi-light)] p-3">
            <div className="flex items-center gap-3">
              <div className="bg-[var(--baladi-primary)]/10 flex h-10 w-10 items-center justify-center rounded-lg">
                {growthPercent >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-[var(--baladi-success)]" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-[var(--baladi-error)]" />
                )}
              </div>
              <div>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  Brukervekst
                </p>
                <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                  Samlet periodisk vekst
                </p>
              </div>
            </div>
            <div className="text-right">
              <span
                className={`font-[family-name:var(--font-sora)] text-lg font-bold ${
                  growthPercent >= 0
                    ? 'text-[var(--baladi-success)]'
                    : 'text-[var(--baladi-error)]'
                }`}
              >
                {growthPercent >= 0 ? '+' : ''}
                {growthPercent}%
              </span>
            </div>
          </div>

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
                data={customerData}
                margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorNewReg" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={chartConfig.newRegistrations.color}
                      stopOpacity={0.1}
                    />
                    <stop
                      offset="95%"
                      stopColor={chartConfig.newRegistrations.color}
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                  <linearGradient
                    id="colorTotalUsers"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={chartConfig.totalUsers.color}
                      stopOpacity={0.1}
                    />
                    <stop
                      offset="95%"
                      stopColor={chartConfig.totalUsers.color}
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
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
                                    chartConfig.newRegistrations.color,
                                }}
                              />
                              Nye brukere: {data.newRegistrations}
                            </p>
                            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                              <span
                                className="mr-2 inline-block h-2 w-2 rounded-full"
                                style={{
                                  backgroundColor: chartConfig.totalUsers.color,
                                }}
                              />
                              Totale brukere:{' '}
                              {data.totalUsers?.toLocaleString() || 0}
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="newRegistrations"
                  stroke={chartConfig.newRegistrations.color}
                  strokeWidth={2}
                  fill="url(#colorNewReg)"
                  dot={false}
                  activeDot={{ r: 4, fill: chartConfig.newRegistrations.color }}
                  animationBegin={0}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
                <Area
                  type="monotone"
                  dataKey="totalUsers"
                  stroke={chartConfig.totalUsers.color}
                  strokeWidth={2}
                  fill="url(#colorTotalUsers)"
                  dot={false}
                  activeDot={{ r: 4, fill: chartConfig.totalUsers.color }}
                  animationBegin={300}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Chart footer with summary metrics */}
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[var(--baladi-border)] pt-4">
            <div className="bg-[var(--baladi-primary)]/5 rounded-lg p-3">
              <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-primary)]">
                Nye registreringer
              </p>
              <p className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                {totalNewRegistrations.toLocaleString()}
              </p>
            </div>
            <div className="bg-[var(--baladi-secondary)]/5 rounded-lg p-3">
              <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-secondary)]">
                Totale brukere
              </p>
              <p className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                {totalUsers.toLocaleString()}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default memo(CustomerRegistrationChart);
