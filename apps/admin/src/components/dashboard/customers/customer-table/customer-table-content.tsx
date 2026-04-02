'use client';

// Node Modules
import { useRouter } from 'next/navigation';
import React, { memo, useCallback, useMemo } from 'react';
import {
  Eye,
  MapPin,
  CheckCircle,
  User,
  Mail,
  Phone,
  Clock,
  XCircle,
  AlertTriangle,
  Trash2,
} from '@repo/ui/lib/icons';

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/base/table';
import { Button } from '@repo/ui/components/base/button';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

// Hooks
import { useUsers } from '@/hooks/useUsers';

// Types/Utils
import { cn } from '@repo/ui/lib/utils';
import { UserType } from '@repo/types/user';
import { formatDate } from '@repo/ui/lib/date';

function CustomerTableContent() {
  const router = useRouter();

  const { users: usersData, deleteUserMutation } = useUsers();
  const { users } = useMemo(
    () => ({
      users: usersData?.users ?? [],
    }),
    [usersData],
  );

  const handleDeleteUser = useCallback(
    (userId: string) => {
      deleteUserMutation.mutate({ userId });
    },
    [deleteUserMutation],
  );

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-[var(--nordmat-border)]">
      <div className="bg-gradient-to-r from-[var(--nordmat-light)] to-white px-8 py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--nordmat-dark)]">
              Kundeoversikt
            </h2>
            <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--nordmat-gray)]">
              Administrer dine kunder og overvåk deres status og informasjon
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-[var(--nordmat-border)]/30 bg-[var(--nordmat-light)]/50">
              <TableHead className="px-8 py-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--nordmat-dark)]">
                Kundedetaljer
              </TableHead>
              <TableHead className="px-4 py-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--nordmat-dark)]">
                Bedriftsinformasjon
              </TableHead>
              <TableHead className="px-4 py-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--nordmat-dark)]">
                Kontaktinformasjon
              </TableHead>
              <TableHead className="px-4 py-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--nordmat-dark)]">
                Status
              </TableHead>
              <TableHead className="px-4 py-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--nordmat-dark)]">
                Registrert
              </TableHead>
              <TableHead className="px-8 py-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--nordmat-dark)]">
                Handlinger
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((customer) => (
              <TableRow
                key={customer._id}
                className="group border-b border-[var(--nordmat-border)]/30 transition-all duration-200 hover:bg-[var(--nordmat-light)]/30"
              >
                <TableCell
                  onClick={() =>
                    router.push(`/dashboard/customers/${customer._id}`, {
                      scroll: true,
                    })
                  }
                  className="cursor-pointer px-8 py-6"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--nordmat-primary)] to-[var(--nordmat-secondary)] ring-2 ring-[var(--nordmat-primary)]/20 transition-all group-hover:ring-[var(--nordmat-primary)]/40">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div
                        className={`absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white ${
                          customer.isApprovedByAdmin
                            ? 'bg-[var(--nordmat-success)]'
                            : 'bg-[var(--nordmat-warning)]'
                        }`}
                      ></div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-[family-name:var(--font-sora)] font-semibold text-[var(--nordmat-dark)]">
                        {customer.name}
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--nordmat-gray)]">
                          ID: #{customer._id.toUpperCase()}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 transition-all duration-200 hover:scale-105 ${
                            customer.userType === UserType.EXTERNAL
                              ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 ring-blue-600/20'
                              : 'bg-gradient-to-r from-purple-100 to-fuchsia-100 text-purple-800 ring-purple-600/20'
                          }`}
                        >
                          <div
                            className={cn(
                              'h-1.5 w-1.5 rounded-full',
                              customer.userType === UserType.EXTERNAL
                                ? 'bg-blue-600'
                                : 'bg-purple-600',
                            )}
                          ></div>
                          {customer.userType?.toUpperCase() || 'IKKE BESTEMT'}
                        </span>
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-6">
                  <div className="space-y-2">
                    <div className="font-[family-name:var(--font-sora)] font-semibold text-[var(--nordmat-dark)]">
                      {customer.companyName || (
                        <span className="text-[var(--nordmat-gray)] italic">
                          Ikke oppgitt
                        </span>
                      )}
                    </div>
                    {customer.organizationNumber && (
                      <div className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-gray)]">
                        Org: {customer.organizationNumber}
                      </div>
                    )}
                    {customer.address && (
                      <div className="flex items-start gap-1.5">
                        <MapPin className="mt-0.5 h-3 w-3 flex-shrink-0 text-[var(--nordmat-accent)]" />
                        <span className="line-clamp-2 font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-gray)]">
                          {customer.address}
                        </span>
                      </div>
                    )}
                  </div>
                </TableCell>

                <TableCell className="px-4 py-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-[var(--nordmat-primary)]" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-dark)]">
                          {customer.email}
                        </div>
                        <div className="mt-1">
                          {getEmailVerificationBadge(customer.isEmailVerified)}
                        </div>
                      </div>
                    </div>
                    {customer.phoneNumber && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-[var(--nordmat-secondary)]" />
                        <span className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-gray)]">
                          {customer.phoneNumber}
                        </span>
                      </div>
                    )}
                  </div>
                </TableCell>

                <TableCell className="px-4 py-6">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(
                      customer.isApprovedByAdmin,
                      customer.isEmailVerified,
                    )}
                    {getStatusBadge(
                      customer.isApprovedByAdmin,
                      customer.isEmailVerified,
                    )}
                  </div>
                </TableCell>

                <TableCell className="px-4 py-6">
                  <div className="space-y-1">
                    <div className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-dark)]">
                      {formatDate(customer.createdAt, 'MMM d, yyyy')}
                    </div>
                    <div className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-gray)]">
                      {new Date(customer.createdAt).toLocaleDateString(
                        'nb-NO',
                        {
                          weekday: 'short',
                        },
                      )}
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="group/btn flex items-center justify-center rounded-lg p-2 text-[var(--nordmat-gray)] transition-all hover:bg-[var(--nordmat-primary)]/10 hover:text-[var(--nordmat-primary)]"
                      title="Se kundedetaljer"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/dashboard/customers/${customer._id}`);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <ConfirmationDialog
                      trigger={
                        <Button
                          variant="outline"
                          className="group/btn flex items-center justify-center rounded-lg p-2 text-[var(--nordmat-gray)] transition-all hover:bg-red-50 hover:text-red-600"
                          title="Slett kunde"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      }
                      title="Slett kunde"
                      description={`Er du sikker på at du vil slette kunden "${customer.name}"? Denne handlingen kan ikke angres.`}
                      confirmText="Slett"
                      onConfirm={() => handleDeleteUser(customer._id)}
                      isPending={deleteUserMutation.isPending}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3 py-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                      <User className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="mb-1 text-lg font-medium text-gray-900">
                        Ingen bestillinger funnet
                      </p>
                      <p className="text-sm text-gray-500">
                        Bestillinger vil vises her når kunder legger dem inn
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default memo(CustomerTableContent);

function getStatusIcon(isApproved: boolean, isEmailVerified: boolean) {
  if (isApproved && isEmailVerified) {
    return <CheckCircle className="h-5 w-5 text-[var(--nordmat-success)]" />;
  }
  if (!isEmailVerified) {
    return <XCircle className="h-5 w-5 text-[var(--nordmat-error)]" />;
  }
  return <AlertTriangle className="h-5 w-5 text-[var(--nordmat-warning)]" />;
}

function getStatusBadge(isApproved: boolean, isEmailVerified: boolean) {
  if (isApproved && isEmailVerified) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--nordmat-success)]/10 px-3 py-1.5 text-xs font-semibold text-[var(--nordmat-success)] ring-1 ring-[var(--nordmat-success)]/20">
        <div className="h-1.5 w-1.5 rounded-full bg-[var(--nordmat-success)]"></div>
        Fullstendig Verifisert
      </div>
    );
  }
  if (!isEmailVerified) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--nordmat-error)]/10 px-3 py-1.5 text-xs font-semibold text-[var(--nordmat-error)] ring-1 ring-[var(--nordmat-error)]/20">
        <div className="h-1.5 w-1.5 rounded-full bg-[var(--nordmat-error)]"></div>
        E-post Ikke Verifisert
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--nordmat-warning)]/10 px-3 py-1.5 text-xs font-semibold text-[var(--nordmat-warning)] ring-1 ring-[var(--nordmat-warning)]/20">
      <div className="h-1.5 w-1.5 rounded-full bg-[var(--nordmat-warning)]"></div>
      Venter på Godkjenning
    </div>
  );
}

function getEmailVerificationBadge(isVerified: boolean) {
  if (isVerified) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--nordmat-success)]/10 px-2 py-1 text-xs font-medium text-[var(--nordmat-success)]">
        <CheckCircle className="h-3 w-3" />
        Verifisert
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--nordmat-warning)]/10 px-2 py-1 text-xs font-medium text-[var(--nordmat-warning)]">
      <Clock className="h-3 w-3" />
      Uverifisert
    </span>
  );
}
