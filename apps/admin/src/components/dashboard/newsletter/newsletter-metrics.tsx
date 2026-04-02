'use client';

// Node Modules
import { memo, useMemo } from 'react';
import { Users, UserX, SendHorizonal } from '@repo/ui/lib/icons';

// Components
import AnimatedCounter from '@repo/ui/components/base/animate-counter';

// Hooks
import { useNewsletter } from '@/hooks/useNewsletter';

function NewsletterMetrics() {
  const { newsLetterStatsQuery } = useNewsletter();

  const metrics = useMemo(() => {
    const data = newsLetterStatsQuery.data;
    return {
      subscribers: data?.subscriberCount ?? 0,
      unsubscribed: data?.unsubscribedSubscribers ?? 0,
      campaignsSent: data?.campaignCount ?? 0,
    };
  }, [newsLetterStatsQuery.data]);

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-[var(--nordmat-border)]">
      <div className="mb-6">
        <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--nordmat-dark)]">
          Nyhetsbrev Ytelse
        </h3>
        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--nordmat-gray)]">
          Spor abonnentengasjement og kampanjeeffektivitet
        </p>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Subscribers Card */}
        <div className="group rounded-xl border border-[var(--nordmat-border)] bg-gradient-to-br from-white to-[var(--nordmat-light)] p-4 transition-all duration-200 hover:shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <div className="bg-[var(--nordmat-success)]/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <Users className="h-5 w-5 text-[var(--nordmat-success)]" />
            </div>
            <div className="bg-[var(--nordmat-success)]/10 rounded-full px-2 py-1">
              <span className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--nordmat-success)]">
                Aktiv
              </span>
            </div>
          </div>

          <div className="mb-2">
            <span className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--nordmat-dark)]">
              <AnimatedCounter value={metrics.subscribers} />
            </span>
          </div>

          <div>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-dark)]">
              Abonnenter
            </p>
            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-gray)]">
              Aktive nyhetsbrev abonnenter
            </p>
          </div>
        </div>

        {/* Unsubscribed Card */}
        <div className="group rounded-xl border border-[var(--nordmat-border)] bg-gradient-to-br from-white to-[var(--nordmat-light)] p-4 transition-all duration-200 hover:shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <div className="bg-[var(--nordmat-error)]/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <UserX className="h-5 w-5 text-[var(--nordmat-error)]" />
            </div>
            <div className="bg-[var(--nordmat-error)]/10 rounded-full px-2 py-1">
              <span className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--nordmat-error)]">
                Inaktiv
              </span>
            </div>
          </div>

          <div className="mb-2">
            <span className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--nordmat-dark)]">
              <AnimatedCounter value={metrics.unsubscribed} />
            </span>
          </div>

          <div>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-dark)]">
              Avmeldt
            </p>
            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-gray)]">
              Brukere som meldte seg av
            </p>
          </div>
        </div>

        {/* Campaigns Sent Card */}
        <div className="group rounded-xl border border-[var(--nordmat-border)] bg-gradient-to-br from-white to-[var(--nordmat-light)] p-4 transition-all duration-200 hover:shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <div className="bg-[var(--nordmat-primary)]/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <SendHorizonal className="h-5 w-5 text-[var(--nordmat-primary)]" />
            </div>
            <div className="bg-[var(--nordmat-primary)]/10 rounded-full px-2 py-1">
              <span className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--nordmat-primary)]">
                Sendt
              </span>
            </div>
          </div>

          <div className="mb-2">
            <span className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--nordmat-dark)]">
              <AnimatedCounter value={metrics.campaignsSent} />
            </span>
          </div>

          <div>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-dark)]">
              Kampanjer
            </p>
            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-gray)]">
              Totale kampanjer sendt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(NewsletterMetrics);
