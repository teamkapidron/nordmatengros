'use client';

// Node Modules
import { memo, useMemo } from 'react';
import {
  Users,
  UserCheck,
  Clock,
  UserX,
  ArrowUpRight,
} from '@repo/ui/lib/icons';

// Components
import AnimatedCounter from '@repo/ui/components/base/animate-counter';

// Hooks
import { useUserStats } from '@/hooks/useUsers';

function CustomerMetricCards() {
  const getUserStatsQuery = useUserStats();

  const metrics = useMemo(() => {
    const totalCustomers = getUserStatsQuery.data?.totalUsers ?? 0;
    const approvedCustomers = getUserStatsQuery.data?.approvedUsers ?? 0;
    const pendingCustomers = getUserStatsQuery.data?.pendingUsers ?? 0;
    const unverifiedCustomers = getUserStatsQuery.data?.unverifiedUsers ?? 0;

    return {
      totalCustomers,
      approvedCustomers,
      pendingCustomers,
      unverifiedCustomers,
      approvalRate: Math.round((approvedCustomers / totalCustomers) * 100) ?? 0,
      pendingRate: Math.round((pendingCustomers / totalCustomers) * 100) ?? 0,
      unverifiedRate:
        Math.round((unverifiedCustomers / totalCustomers) * 100) ?? 0,
    };
  }, [
    getUserStatsQuery.data?.totalUsers,
    getUserStatsQuery.data?.approvedUsers,
    getUserStatsQuery.data?.pendingUsers,
    getUserStatsQuery.data?.unverifiedUsers,
  ]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="from-[var(--nordmat-primary)]/5 to-[var(--nordmat-primary)]/10 group relative overflow-hidden rounded-xl border border-[var(--nordmat-border)] bg-gradient-to-br shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <div className="to-[var(--nordmat-primary)]/70 absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[var(--nordmat-primary)]"></div>
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="bg-[var(--nordmat-primary)]/10 border-[var(--nordmat-primary)]/20 flex h-12 w-12 items-center justify-center rounded-xl border backdrop-blur-sm">
              <Users className="h-6 w-6 text-[var(--nordmat-primary)]" />
            </div>
            <div className="text-right">
              <p className="mb-1 font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--nordmat-gray)]">
                Vekstrate
              </p>
              <div className="flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3 text-[var(--nordmat-success)]" />
                <span className="font-[family-name:var(--font-sora)] text-xs font-semibold text-[var(--nordmat-success)]">
                  +12.5%
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-gray)]">
              Totale kunder
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--nordmat-dark)]">
                <AnimatedCounter value={metrics.totalCustomers} />
              </span>
            </div>
          </div>

          <div className="mt-4 border-t border-[var(--nordmat-border)] pt-4">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-gray)]">
                Godkjent
              </span>
              <div className="flex items-center gap-1">
                <span className="font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--nordmat-dark)]">
                  <AnimatedCounter value={metrics.approvedCustomers} />
                </span>
                <span className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-success)]">
                  (<AnimatedCounter value={metrics.approvalRate} />
                  %)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approved Customers Card */}
      <div className="from-[var(--nordmat-success)]/5 to-[var(--nordmat-success)]/10 group relative overflow-hidden rounded-xl border border-[var(--nordmat-border)] bg-gradient-to-br shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <div className="to-[var(--nordmat-success)]/70 absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[var(--nordmat-success)]"></div>
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="bg-[var(--nordmat-success)]/10 border-[var(--nordmat-success)]/20 flex h-12 w-12 items-center justify-center rounded-xl border backdrop-blur-sm">
              <UserCheck className="h-6 w-6 text-[var(--nordmat-success)]" />
            </div>
            <div className="bg-[var(--nordmat-success)]/10 rounded-full px-3 py-1.5">
              <span className="font-[family-name:var(--font-dm-sans)] text-xs font-semibold text-[var(--nordmat-success)]">
                Aktiv
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-gray)]">
              Godkjente kunder
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--nordmat-dark)]">
                <AnimatedCounter value={metrics.approvedCustomers} />
              </span>
            </div>
          </div>

          <div className="mt-4 border-t border-[var(--nordmat-border)] pt-4">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-gray)]">
                Godkjenningsrate
              </span>
              <span className="font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--nordmat-success)]">
                <AnimatedCounter value={metrics.approvalRate} />%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Customers Card */}
      <div className="from-[var(--nordmat-warning)]/5 to-[var(--nordmat-warning)]/10 group relative overflow-hidden rounded-xl border border-[var(--nordmat-border)] bg-gradient-to-br shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <div className="to-[var(--nordmat-warning)]/70 absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[var(--nordmat-warning)]"></div>
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="bg-[var(--nordmat-warning)]/10 border-[var(--nordmat-warning)]/20 flex h-12 w-12 items-center justify-center rounded-xl border backdrop-blur-sm">
              <Clock className="h-6 w-6 text-[var(--nordmat-warning)]" />
            </div>
            <div className="bg-[var(--nordmat-warning)]/10 rounded-full px-3 py-1.5">
              <span className="font-[family-name:var(--font-dm-sans)] text-xs font-semibold text-[var(--nordmat-warning)]">
                Oppmerksomhet
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-gray)]">
              Avventende kunder
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--nordmat-dark)]">
                <AnimatedCounter value={metrics.pendingCustomers} />
              </span>
              <span className="bg-[var(--nordmat-warning)]/10 rounded-full px-2 py-1 font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--nordmat-warning)]">
                Gjennomgang
              </span>
            </div>
          </div>

          <div className="mt-4 border-t border-[var(--nordmat-border)] pt-4">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-gray)]">
                Avventende rate
              </span>
              <span className="font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--nordmat-warning)]">
                <AnimatedCounter value={metrics.pendingRate} />%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Unverified Customers Card */}
      <div className="from-[var(--nordmat-error)]/5 to-[var(--nordmat-error)]/10 group relative overflow-hidden rounded-xl border border-[var(--nordmat-border)] bg-gradient-to-br shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <div className="to-[var(--nordmat-error)]/70 absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[var(--nordmat-error)]"></div>
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="bg-[var(--nordmat-error)]/10 border-[var(--nordmat-error)]/20 flex h-12 w-12 items-center justify-center rounded-xl border backdrop-blur-sm">
              <UserX className="h-6 w-6 text-[var(--nordmat-error)]" />
            </div>
            <div className="bg-[var(--nordmat-error)]/10 flex items-center gap-1 rounded-full px-3 py-1.5">
              <ArrowUpRight className="h-3 w-3 text-[var(--nordmat-error)]" />
              <span className="font-[family-name:var(--font-dm-sans)] text-xs font-semibold text-[var(--nordmat-error)]">
                +7.2%
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-gray)]">
              Uverifiserte kunder
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--nordmat-dark)]">
                <AnimatedCounter value={metrics.unverifiedCustomers} />
              </span>
              <span className="bg-[var(--nordmat-error)]/10 rounded-full px-2 py-1 font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--nordmat-error)]">
                Handling
              </span>
            </div>
          </div>

          <div className="mt-4 border-t border-[var(--nordmat-border)] pt-4">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-gray)]">
                Uverifisert rate
              </span>
              <span className="font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--nordmat-error)]">
                <AnimatedCounter value={metrics.unverifiedRate} />%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CustomerMetricCards);
