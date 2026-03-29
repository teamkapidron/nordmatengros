'use client';

// Node Modules
import React, { memo, useState, useCallback, useEffect } from 'react';
import {
  Building,
  Hash,
  MapPin,
  FileText,
  CheckCircle,
  Settings,
} from '@repo/ui/lib/icons';
import { toast } from '@repo/ui/lib/sonner';

// Components
import { Card } from '@repo/ui/components/base/card';
import { Button } from '@repo/ui/components/base/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/base/select';

// Hooks
import { useUserDetails, useUsers } from '@/hooks/useUsers';

// Types/Utils
import { UserType } from '@repo/types/user';
import { formatDate } from '@repo/ui/lib/date';

interface CustomerCompanyInfoProps {
  customerId: string;
}

function CustomerCompanyInfo(props: CustomerCompanyInfoProps) {
  const { customerId } = props;

  const { updateUserMutation } = useUsers();
  const { userDetailsQuery } = useUserDetails(customerId);
  const user = userDetailsQuery.data?.user;

  const [selectedUserType, setSelectedUserType] = useState<
    UserType | undefined
  >(user?.userType);

  useEffect(() => {
    if (user?.userType) {
      setSelectedUserType(user.userType);
    }
  }, [user?.userType]);

  const handleApproveUser = useCallback(() => {
    if (!user?._id || !selectedUserType) return;

    updateUserMutation.mutate(
      {
        userId: user._id,
        isApprovedByAdmin: true,
        userType: selectedUserType,
      },
      {
        onSuccess: () => {
          userDetailsQuery.refetch();
          toast.success('Bruker godkjent', {
            description: 'Bruker er nå godkjent',
          });
        },
      },
    );
  }, [user?._id, selectedUserType, updateUserMutation, userDetailsQuery]);

  const handleUpdateUserType = useCallback(() => {
    if (!user?._id || !selectedUserType) return;

    updateUserMutation.mutate(
      {
        userId: user._id,
        userType: selectedUserType,
      },
      {
        onSuccess: () => {
          userDetailsQuery.refetch();
          toast.success('Kontotype oppdatert', {
            description: 'Kontotype er nå oppdatert',
          });
        },
      },
    );
  }, [user?._id, selectedUserType, updateUserMutation, userDetailsQuery]);

  if (userDetailsQuery.isLoading) {
    return <CompanyInfoSkeleton />;
  }

  return (
    <Card className="relative overflow-hidden border border-[var(--baladi-border)] bg-gradient-to-br from-white via-[var(--baladi-light)] to-white shadow-lg">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[var(--baladi-accent)]"></div>
        <div className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-[var(--baladi-primary)]"></div>
        <div className="absolute right-1/4 top-1/3 h-28 w-28 rounded-full bg-[var(--baladi-secondary)]"></div>
      </div>

      <div className="relative">
        <div className="h-1 w-full bg-gradient-to-r from-[var(--baladi-accent)] via-[var(--baladi-primary)] to-[var(--baladi-secondary)]"></div>

        <div className="flex items-center justify-between p-6">
          <div className="space-y-1">
            <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
              Bedriftsinformasjon
            </h2>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Oversikt over kundens bedriftsdetaljer og kontaktinformasjon
            </p>
          </div>
        </div>
      </div>

      <div className="relative px-6 pb-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <CompanyInfoField
            icon={Building}
            label="Bedriftsnavn"
            value={user?.companyName || 'Ikke oppgitt'}
          />

          <CompanyInfoField
            icon={Hash}
            label="Organisasjonsnummer"
            value={user?.organizationNumber || 'Ikke oppgitt'}
            className="font-mono"
          />

          <CompanyInfoField
            icon={MapPin}
            label="Adresse"
            value={user?.address || 'Ingen adresse oppgitt'}
            className="md:col-span-2"
          />

          <div className="md:col-span-2">
            <div className="border-[var(--baladi-border)]/30 mt-4 rounded-xl border bg-gradient-to-r from-[var(--baladi-light)] to-white p-4">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--baladi-info)] to-blue-600 shadow-sm">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
                  Tilleggsinformasjon
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                <div className="space-y-1">
                  <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-gray)]">
                    Kontotype:
                  </span>
                  <p className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-dark)]">
                    {user?.userType === UserType.INTERNAL
                      ? 'Intern'
                      : user?.userType === UserType.EXTERNAL
                        ? 'Ekstern'
                        : 'Ikke oppgitt'}
                  </p>
                </div>
                {user?.createdAt && (
                  <div className="space-y-1">
                    <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-gray)]">
                      Registrert:
                    </span>
                    <p className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-dark)]">
                      {formatDate(new Date(user.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="border-[var(--baladi-border)]/30 mt-4 rounded-xl border bg-gradient-to-r from-[var(--baladi-light)] to-white p-4">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--baladi-accent)] to-orange-600 shadow-sm">
                  <Settings className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
                  Adminhandlinger
                </h3>
              </div>

              <div className="space-y-4">
                <div className="mt-4 flex flex-col gap-2">
                  <label className="ml-1 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-gray)]">
                    Velg kontotype:
                  </label>
                  <Select
                    value={selectedUserType}
                    onValueChange={(value) =>
                      setSelectedUserType(value as UserType)
                    }
                    disabled={updateUserMutation.isPending}
                  >
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Velg kontotype" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UserType.INTERNAL}>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-[var(--baladi-primary)]"></div>
                          Intern
                        </div>
                      </SelectItem>
                      <SelectItem value={UserType.EXTERNAL}>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-[var(--baladi-secondary)]"></div>
                          Ekstern
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-wrap gap-3">
                  {!user?.isApprovedByAdmin ? (
                    <Button
                      onClick={handleApproveUser}
                      disabled={
                        !selectedUserType || updateUserMutation.isPending
                      }
                      isLoading={updateUserMutation.isPending}
                      className="hover:bg-[var(--baladi-success)]/90 bg-[var(--baladi-success)] text-white"
                      iconLeft={<CheckCircle className="h-4 w-4" />}
                    >
                      Godkjenn bruker
                    </Button>
                  ) : (
                    <Button
                      onClick={handleUpdateUserType}
                      disabled={
                        !selectedUserType ||
                        selectedUserType === user?.userType ||
                        updateUserMutation.isPending
                      }
                      isLoading={updateUserMutation.isPending}
                      className="hover:bg-[var(--baladi-primary)]/90 bg-[var(--baladi-primary)] text-white"
                      iconLeft={<Settings className="h-4 w-4" />}
                    >
                      Oppdater kontotype
                    </Button>
                  )}
                </div>

                {user && (
                  <div className="flex items-center gap-2 text-sm">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        user.isApprovedByAdmin
                          ? 'bg-[var(--baladi-success)]'
                          : 'bg-[var(--baladi-warning)]'
                      }`}
                    ></div>
                    <span className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                      Status:{' '}
                      {user.isApprovedByAdmin
                        ? 'Godkjent'
                        : 'Venter på godkjenning'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default memo(CustomerCompanyInfo);

interface CompanyInfoFieldProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  className?: string;
}

function CompanyInfoField({
  icon: Icon,
  label,
  value,
  className = '',
}: CompanyInfoFieldProps) {
  return (
    <div className={`group space-y-3 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--baladi-accent)] to-orange-600 shadow-sm transition-transform duration-200 group-hover:scale-110">
          <Icon className="h-4 w-4 text-white" />
        </div>
        <label className="font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
          {label}
        </label>
      </div>

      <div className="border-[var(--baladi-border)]/50 group relative overflow-hidden rounded-lg border bg-gradient-to-r from-white to-[var(--baladi-light)] p-3 transition-all duration-200 hover:border-[var(--baladi-border)] hover:shadow-md">
        <div className="from-[var(--baladi-accent)]/5 absolute inset-0 bg-gradient-to-r to-orange-500/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
        <p
          className={`relative font-[family-name:var(--font-dm-sans)] text-[var(--baladi-dark)] ${className.includes('font-mono') ? 'font-mono' : ''}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function CompanyInfoSkeleton() {
  return (
    <Card className="bg-white shadow-lg">
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-48 rounded bg-gray-200"></div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`space-y-3 ${i === 2 ? 'md:col-span-2' : ''}`}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gray-200"></div>
                  <div className="h-4 w-24 rounded bg-gray-200"></div>
                </div>
                <div
                  className={`${i === 2 ? 'h-20' : 'h-10'} w-full rounded-lg bg-gray-200`}
                ></div>
              </div>
            ))}
          </div>
          <div className="h-24 w-full rounded-xl bg-gray-200"></div>
        </div>
      </div>
    </Card>
  );
}
