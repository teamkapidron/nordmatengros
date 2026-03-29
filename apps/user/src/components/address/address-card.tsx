'use client';

// Node Modules
import { memo, useCallback, useMemo, useState } from 'react';
import {
  MapPin,
  Edit2,
  Star,
  Phone,
  Tag,
  Home,
  Building,
} from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Badge } from '@repo/ui/components/base/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@repo/ui/components/base/alert-dialog';
import UpdateAddressDialog from './update-address-dialog';

// Hooks
import { useAddress } from '@/hooks/useAddress';

// Types
import { Address } from '@repo/types/address';

interface AddressCardProps {
  address: Address;
}

function AddressCard(props: AddressCardProps) {
  const { address } = props;

  const { deleteAddressMutation, setDefaultAddressMutation } = useAddress();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleSetDefault = useCallback(() => {
    if (!address.isDefault) {
      setDefaultAddressMutation.mutate({ addressId: address._id });
    }
  }, [address._id, address.isDefault, setDefaultAddressMutation]);

  const handleDelete = useCallback(() => {
    deleteAddressMutation.mutate({ addressId: address._id });
    setIsDeleteDialogOpen(false);
  }, [address._id, deleteAddressMutation]);

  const fullAddress = useMemo(
    () =>
      [
        address.addressLine1,
        address.addressLine2,
        address.city,
        address.state,
        address.postalCode,
        address.country,
      ]
        .filter(Boolean)
        .join(', '),
    [address],
  );

  const labelConfig = {
    home: {
      icon: <Home className="h-5 w-5 text-white" />,
      gradient: 'from-[var(--baladi-accent)] to-[var(--baladi-accent)]/80',
      bgColor: 'bg-[var(--baladi-accent)]/5',
      textColor: 'text-[var(--baladi-accent)]',
      borderColor: 'border-[var(--baladi-accent)]/20',
    },
    work: {
      icon: <Building className="h-5 w-5 text-white" />,
      gradient: 'from-[var(--baladi-info)] to-[var(--baladi-info)]/80',
      bgColor: 'bg-[var(--baladi-info)]/5',
      textColor: 'text-[var(--baladi-info)]',
      borderColor: 'border-[var(--baladi-info)]/20',
    },
    other: {
      icon: <Tag className="h-5 w-5 text-white" />,
      gradient: 'from-[var(--baladi-success)] to-[var(--baladi-success)]/80',
      bgColor: 'bg-[var(--baladi-success)]/5',
      textColor: 'text-[var(--baladi-success)]',
      borderColor: 'border-[var(--baladi-success)]/20',
    },
  };

  const label = address.label?.toLowerCase() as keyof typeof labelConfig;
  const config = labelConfig[label] || labelConfig.other;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border ${address.isDefault ? 'border-[var(--baladi-accent)]/30 bg-gradient-to-br from-[var(--baladi-accent)]/5 to-[var(--baladi-light)]' : `${config.borderColor} bg-white`} shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
    >
      {address.isDefault && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-[var(--baladi-accent)] to-[var(--baladi-accent)]/80 px-2.5 py-1 font-semibold text-white shadow-sm">
            <Star className="mr-1.5 h-3 w-3" fill="currentColor" />
            Standard
          </Badge>
        </div>
      )}

      <div className="p-6">
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${config.gradient} shadow-sm transition-transform duration-200 group-hover:scale-105`}
            >
              {config.icon}
            </div>
            <div className="min-w-0 flex-1">
              {address.label && (
                <div className="mb-1.5 flex items-center space-x-2">
                  <div
                    className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${config.gradient}`}
                  ></div>
                  <span
                    className={`font-[family-name:var(--font-sora)] text-xs font-medium tracking-wide uppercase ${config.textColor}`}
                  >
                    {address.label}
                  </span>
                </div>
              )}
              <h3 className="line-clamp-2 font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                {address.addressLine1}
              </h3>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-3 rounded-lg border border-[var(--baladi-border)]/50 bg-[var(--baladi-light)] p-3">
            <div className="mt-0.5 rounded-full bg-[var(--baladi-muted)] p-1.5">
              <MapPin className="h-3.5 w-3.5 text-[var(--baladi-gray)]" />
            </div>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed text-[var(--baladi-dark)]">
              {fullAddress}
            </p>
          </div>

          {address.phoneNumber && (
            <div className="flex items-center space-x-3 rounded-lg border border-[var(--baladi-border)]/50 bg-[var(--baladi-light)] p-3">
              <div className="rounded-full bg-[var(--baladi-muted)] p-1.5">
                <Phone className="h-3.5 w-3.5 text-[var(--baladi-gray)]" />
              </div>
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-dark)]">
                {address.phoneNumber}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex space-x-2 border-t border-[var(--baladi-border)] pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditDialogOpen(true)}
            className="flex-1 rounded-xl border-[var(--baladi-border)] font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-dark)] hover:border-[var(--baladi-primary)]/30 hover:bg-[var(--baladi-light)]"
          >
            <Edit2 className="mr-2 h-3.5 w-3.5" />
            Rediger
          </Button>

          {!address.isDefault && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSetDefault}
              className="flex-1 rounded-xl border-[var(--baladi-accent)]/30 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-accent)] hover:border-[var(--baladi-accent)]/50 hover:bg-[var(--baladi-accent)]/5"
              disabled={setDefaultAddressMutation.isPending}
            >
              <Star className="mr-2 h-3.5 w-3.5" />
              {setDefaultAddressMutation.isPending ? 'Setter...' : 'Standard'}
            </Button>
          )}
        </div>
      </div>

      <UpdateAddressDialog
        address={address}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="rounded-2xl border border-[var(--baladi-border)] bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-[family-name:var(--font-sora)] text-[var(--baladi-dark)]">
              Slett adresse
            </AlertDialogTitle>
            <AlertDialogDescription className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
              Er du sikker på at du vil slette denne adressen? Denne handlingen
              kan ikke angres.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl border-[var(--baladi-border)] font-[family-name:var(--font-dm-sans)] text-[var(--baladi-dark)] hover:bg-[var(--baladi-light)]">
              Avbryt
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="rounded-xl bg-[var(--baladi-error)] font-[family-name:var(--font-dm-sans)] hover:bg-[var(--baladi-error)]/90"
              disabled={deleteAddressMutation.isPending}
            >
              {deleteAddressMutation.isPending ? 'Sletter...' : 'Slett'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default memo(AddressCard);
