'use client';

// Node Modules
import React, { memo } from 'react';
import { CheckCircle, Clock, Shield, Mail } from '@repo/ui/lib/icons';

// Components
import { Card } from '@repo/ui/components/base/card';

// Hooks
import { useUserDetails } from '@/hooks/useUsers';

// Types/Utils
import { formatDate } from '@repo/ui/lib/date';

interface CustomerVerificationStatusProps {
  customerId: string;
}

function CustomerVerificationStatus(props: CustomerVerificationStatusProps) {
  const { customerId } = props;

  const { userDetailsQuery } = useUserDetails(customerId);
  const user = userDetailsQuery.data?.user;

  if (userDetailsQuery.isLoading) {
    return <StatusCardSkeleton />;
  }

  return (
    <Card className="relative overflow-hidden border border-[var(--baladi-border)] bg-gradient-to-br from-white via-[var(--baladi-light)] to-white shadow-lg">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[var(--baladi-primary)]"></div>
        <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-[var(--baladi-secondary)]"></div>
      </div>

      <div className="relative">
        <div className="h-1 w-full bg-gradient-to-r from-[var(--baladi-primary)] via-[var(--baladi-accent)] to-[var(--baladi-secondary)]"></div>

        <div className="flex items-center justify-between p-6">
          <div className="space-y-1">
            <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
              Kundeverifisering
            </h2>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Oversikt over kundens verifikasjonsstatus
            </p>
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-1 gap-6 px-6 pb-6 md:grid-cols-2">
        <VerificationStatusCard
          type="email"
          isVerified={user?.isEmailVerified ?? false}
          title="E-post Verifisering"
          subtitle={
            user?.isEmailVerified ? 'E-post bekreftet' : 'Venter på bekreftelse'
          }
          timestamp={user?.createdAt ? new Date(user.createdAt) : undefined}
        />

        <VerificationStatusCard
          type="admin"
          isVerified={user?.isApprovedByAdmin ?? false}
          title="Admin Godkjenning"
          subtitle={
            user?.isApprovedByAdmin
              ? 'Godkjent av administrator'
              : 'Venter på godkjenning'
          }
          timestamp={user?.createdAt ? new Date(user.createdAt) : undefined}
        />
      </div>
    </Card>
  );
}

export default memo(CustomerVerificationStatus);

interface VerificationStatusCardProps {
  type: 'email' | 'admin';
  isVerified: boolean;
  title: string;
  subtitle: string;
  timestamp?: Date;
}

function VerificationStatusCard({
  type,
  isVerified,
  title,
  subtitle,
  timestamp,
}: VerificationStatusCardProps) {
  const iconClasses = 'h-6 w-6';

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-300 hover:shadow-lg ${
        isVerified
          ? 'border-[var(--baladi-success)]/30 hover:border-[var(--baladi-success)]/50 bg-gradient-to-br from-green-50 to-emerald-50'
          : 'border-[var(--baladi-warning)]/30 hover:border-[var(--baladi-warning)]/50 bg-gradient-to-br from-amber-50 to-orange-50'
      }`}
    >
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
          isVerified ? 'bg-green-500/5' : 'bg-amber-500/5'
        }`}
      ></div>

      <div className="relative flex items-start gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110 ${
            isVerified
              ? 'bg-gradient-to-br from-[var(--baladi-success)] to-green-600'
              : 'bg-gradient-to-br from-[var(--baladi-warning)] to-orange-600'
          }`}
        >
          {type === 'email' ? (
            <Mail className={`${iconClasses} text-white`} />
          ) : (
            <Shield className={`${iconClasses} text-white`} />
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-dark)]">
              {title}
            </h3>
            {isVerified ? (
              <CheckCircle className="h-4 w-4 text-[var(--baladi-success)]" />
            ) : (
              <Clock className="h-4 w-4 text-[var(--baladi-warning)]" />
            )}
          </div>

          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            {subtitle}
          </p>

          {timestamp && (
            <p className="text-[var(--baladi-gray)]/80 font-[family-name:var(--font-dm-sans)] text-xs">
              {formatDate(timestamp, "MMM d, yyyy 'kl.' HH:mm")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusCardSkeleton() {
  return (
    <Card className="bg-white shadow-lg">
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-48 rounded bg-gray-200"></div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3 rounded-xl p-4">
              <div className="h-12 w-12 rounded-xl bg-gray-200"></div>
              <div className="h-4 w-32 rounded bg-gray-200"></div>
              <div className="h-3 w-24 rounded bg-gray-200"></div>
            </div>
            <div className="space-y-3 rounded-xl p-4">
              <div className="h-12 w-12 rounded-xl bg-gray-200"></div>
              <div className="h-4 w-32 rounded bg-gray-200"></div>
              <div className="h-3 w-24 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
