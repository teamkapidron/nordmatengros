'use client';

// Node Modules
import React, { memo } from 'react';
import { User, Mail, Phone, Calendar, Tag } from '@repo/ui/lib/icons';

// Components
import { Card } from '@repo/ui/components/base/card';

// Hooks
import { useUserDetails } from '@/hooks/useUsers';

// Types/Utils
import { UserType } from '@repo/types/user';
import { formatDate } from '@repo/ui/lib/date';

interface CustomerInfoProps {
  customerId: string;
}

function CustomerInfo(props: CustomerInfoProps) {
  const { customerId } = props;

  const { userDetailsQuery } = useUserDetails(customerId);
  const user = userDetailsQuery.data?.user;

  if (userDetailsQuery.isLoading) {
    return <InfoCardSkeleton />;
  }

  return (
    <Card className="relative overflow-hidden border border-[var(--baladi-border)] bg-gradient-to-br from-white via-[var(--baladi-light)] to-white shadow-lg">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[var(--baladi-secondary)]"></div>
        <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-[var(--baladi-primary)]"></div>
        <div className="absolute right-1/3 top-1/2 h-20 w-20 rounded-full bg-[var(--baladi-accent)]"></div>
      </div>

      <div className="relative">
        <div className="h-1 w-full bg-gradient-to-r from-[var(--baladi-secondary)] via-[var(--baladi-accent)] to-[var(--baladi-primary)]"></div>

        <div className="flex items-center justify-between p-6">
          <div className="space-y-1">
            <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
              Kundeinformasjon
            </h2>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Oversikt over kundens personlige informasjon
            </p>
          </div>
        </div>
      </div>

      <div className="relative px-6 pb-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InfoField
            icon={User}
            label="Fullt navn"
            value={user?.name || 'Ikke oppgitt'}
          />

          <InfoField
            icon={Mail}
            label="E-postadresse"
            value={user?.email || 'Ikke oppgitt'}
          />

          <InfoField
            icon={Phone}
            label="Telefonnummer"
            value={user?.phoneNumber || 'Ikke oppgitt'}
          />

          <InfoField
            icon={Tag}
            label="Kundetype"
            value={
              user?.userType === UserType.INTERNAL
                ? 'Intern'
                : user?.userType === UserType.EXTERNAL
                  ? 'Ekstern'
                  : 'Ikke oppgitt'
            }
          />

          {user?.createdAt && (
            <InfoField
              icon={Calendar}
              label="Registreringsdato"
              value={formatDate(
                new Date(user.createdAt),
                "MMM d, yyyy 'kl.' HH:mm",
              )}
              className="md:col-span-2"
            />
          )}
        </div>
      </div>
    </Card>
  );
}

export default memo(CustomerInfo);

interface InfoFieldProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  className?: string;
}

function InfoField(props: InfoFieldProps) {
  const { icon: Icon, label, value, className = '' } = props;

  return (
    <div className={`group space-y-3 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--baladi-primary)] to-[var(--baladi-secondary)] shadow-sm transition-transform duration-200 group-hover:scale-110">
          <Icon className="h-4 w-4 text-white" />
        </div>
        <label className="font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
          {label}
        </label>
      </div>

      <div className="border-[var(--baladi-border)]/50 group relative overflow-hidden rounded-lg border bg-gradient-to-r from-white to-[var(--baladi-light)] p-3 transition-all duration-200 hover:border-[var(--baladi-border)] hover:shadow-md">
        <div className="from-[var(--baladi-primary)]/5 to-[var(--baladi-secondary)]/5 absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
        <p className="relative font-[family-name:var(--font-dm-sans)] text-[var(--baladi-dark)]">
          {value}
        </p>
      </div>
    </div>
  );
}

function InfoCardSkeleton() {
  return (
    <Card className="bg-white shadow-lg">
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-48 rounded bg-gray-200"></div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gray-200"></div>
                  <div className="h-4 w-20 rounded bg-gray-200"></div>
                </div>
                <div className="h-10 w-full rounded-lg bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
