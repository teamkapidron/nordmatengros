'use client';

// Node Modules
import React, { memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  User,
  Shield,
  CheckCircle,
  Trash2,
} from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

// Hooks
import { useUserDetails, useUsers } from '@/hooks/useUsers';

// Types/Utils
import { formatDate } from '@repo/ui/lib/date';

interface CustomerDetailHeaderProps {
  customerId: string;
}

function CustomerDetailHeader(props: CustomerDetailHeaderProps) {
  const { customerId } = props;
  const router = useRouter();

  const { userDetailsQuery } = useUserDetails(customerId);
  const { deleteUserMutation } = useUsers();
  const user = userDetailsQuery.data?.user;

  const handleDeleteUser = useCallback(() => {
    deleteUserMutation.mutate(
      { userId: customerId },
      {
        onSuccess: () => {
          router.push('/dashboard/customers');
        },
      },
    );
  }, [customerId, deleteUserMutation, router]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br from-[var(--baladi-primary)] via-[var(--baladi-primary)] to-[var(--baladi-secondary)] shadow-lg">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-white/20"></div>
        <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10"></div>
        <div className="absolute top-1/2 right-1/4 h-24 w-24 rounded-full bg-white/5"></div>
      </div>

      <div className="relative border-b border-white/20 px-6 py-4">
        <div className="flex items-center font-[family-name:var(--font-dm-sans)] text-sm">
          <Button
            variant="link"
            onClick={() => router.back()}
            className="flex items-center text-white/80 transition-colors duration-200 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Button>
          <span className="font-medium text-white">Kunder</span>
          <ChevronRight className="mx-3 h-4 w-4 text-white/60" />
          <span className="font-medium text-white">
            #{customerId.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="relative flex flex-col items-start justify-between gap-6 p-6 lg:flex-row lg:items-center">
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-[family-name:var(--font-sora)] text-2xl font-bold tracking-tight text-white lg:text-3xl">
                  {user?.name || 'Laster...'}
                </h1>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-white/80">
                  Kunde ID: {customerId}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {user?.isEmailVerified && getVerificationBadge('email')}
              {user?.isApprovedByAdmin && getVerificationBadge('admin')}
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-white/80">
              Registrert:{' '}
              {user?.createdAt
                ? formatDate(
                    new Date(user.createdAt),
                    "MMM d, yyyy 'kl.' HH:mm",
                  )
                : 'Loading...'}
            </p>
            <div className="flex items-center gap-4 text-sm text-white/80">
              <span>Type: {user?.userType?.toUpperCase() || 'Ukjent'}</span>
              <span>•</span>
              <span>E-post: {user?.email || 'Ikke oppgitt'}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <ConfirmationDialog
            trigger={
              <Button
                variant="destructive"
                className="flex items-center gap-2 bg-red-600/90 text-white transition-all hover:scale-105 hover:bg-red-700/90"
                disabled={deleteUserMutation.isPending}
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Slett kunde</span>
              </Button>
            }
            title="Slett kunde"
            description={`Er du sikker på at du vil slette kunden "${user?.name || 'denne kunden'}"? Denne handlingen kan ikke angres og vil fjerne all data knyttet til kunden.`}
            confirmText={
              deleteUserMutation.isPending ? 'Sletter...' : 'Slett permanent'
            }
            onConfirm={handleDeleteUser}
            isPending={deleteUserMutation.isPending}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[var(--baladi-accent)] via-white/50 to-[var(--baladi-accent)]"></div>
    </div>
  );
}

export default memo(CustomerDetailHeader);

function getVerificationBadge(type: 'email' | 'admin') {
  const badgeClasses =
    'flex items-center gap-1.5 rounded-full px-3 py-1.5 font-[family-name:var(--font-dm-sans)] text-xs font-semibold backdrop-blur-sm';

  if (type === 'email') {
    return (
      <div className={`${badgeClasses} bg-green-100/90 text-green-800`}>
        <CheckCircle className="h-3 w-3" />
        E-post Verifisert
      </div>
    );
  }

  return (
    <div className={`${badgeClasses} bg-blue-100/90 text-blue-800`}>
      <Shield className="h-3 w-3" />
      Admin Godkjent
    </div>
  );
}
