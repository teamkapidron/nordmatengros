'use client';

// Node Modules
import { format } from '@repo/ui/lib/date';
import React, { memo, useCallback, useMemo } from 'react';
import {
  Calendar,
  Package,
  DollarSign,
  MoreHorizontal,
  ToggleLeft,
  ToggleRight,
  Edit,
  Barcode,
} from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/base/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/base/table';
import UpdateDiscountDialog from './update-discount-dialog';

// Hooks
import { useDiscount } from '@/hooks/useDiscount';

// Types
import { DiscountResponse } from '@/hooks/useDiscount/types';

function DiscountsTableContent() {
  const {
    discounts: data,
    toggleDiscountActiveMutation,
    updateDiscountMutation,
  } = useDiscount();

  const discounts = useMemo(() => data?.discounts || [], [data?.discounts]);

  const handleToggleActive = useCallback(
    (discount: DiscountResponse) => {
      toggleDiscountActiveMutation.mutate({ discountId: discount._id });
    },
    [toggleDiscountActiveMutation],
  );

  if (discounts.length === 0) {
    return (
      <div className="relative">
        <div className="max-h-[700px] overflow-auto rounded-xl border border-[var(--baladi-border)] bg-white shadow-sm">
          <div className="flex items-center justify-center p-12">
            <div className="text-center">
              <div className="bg-[var(--baladi-primary)]/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <DollarSign className="h-8 w-8 text-[var(--baladi-primary)]" />
              </div>
              <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
                Ingen rabatter funnet
              </h3>
              <p className="mt-2 text-sm text-[var(--baladi-gray)]">
                Opprett din første rabatt for å begynne å tilby kampanjer til
                kunder.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="max-h-[700px] overflow-auto rounded-xl border border-[var(--baladi-border)] bg-white shadow-sm">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-[var(--baladi-border)] bg-[var(--baladi-light)]">
              <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-primary)]">
                Produktdetaljer
              </TableHead>
              <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-primary)]">
                Rabatt & Beløp
              </TableHead>
              <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-primary)]">
                Gyldig Periode
              </TableHead>
              <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-primary)]">
                Status
              </TableHead>
              <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-center font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-primary)]">
                Handlinger
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {discounts.map((discount, index) => {
              const status = getDiscountStatus(discount);

              return (
                <TableRow
                  key={`${discount.productId}-${discount.createdAt}`}
                  className={`border-b border-[var(--baladi-border)] transition-colors hover:bg-[var(--baladi-muted)] ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[var(--baladi-light)]'
                  }`}
                >
                  <TableCell className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)]">
                        <div className="flex h-full w-full items-center justify-center">
                          <Package className="h-6 w-6 text-[var(--baladi-gray)]" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-[family-name:var(--font-sora)] text-base font-semibold text-[var(--baladi-primary)]">
                          {discount.productId.name}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm text-[var(--baladi-gray)]">
                          {discount.productId?.shortDescription ||
                            discount.productId?.description ||
                            'Rabatt tilgjengelig for dette produktet'}
                        </p>
                        <div className="mt-2 flex items-center space-x-2">
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                            ID: {discount.productId._id}
                          </span>
                          {discount.productId?.sku && (
                            <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
                              <Barcode className="mr-1 h-3 w-3" />
                              {discount.productId.sku}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-[var(--baladi-success)]" />
                        <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-primary)]">
                          {discount.discountValue.toLocaleString('no-NO', {
                            style: 'currency',
                            currency: 'NOK',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </span>
                      </div>
                      <div className="text-sm text-[var(--baladi-gray)]">
                        Rabatt beløp
                      </div>
                      <span className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700">
                        Kroner rabatt
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="p-4">
                    <div className="space-y-3">
                      {discount.validFrom || discount.validTo ? (
                        <div className="space-y-1">
                          {discount.validFrom && (
                            <div className="flex items-center space-x-2 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">
                              <Calendar className="h-3 w-3 text-[var(--baladi-gray)]" />
                              <span className="text-[var(--baladi-gray)]">
                                Fra:
                              </span>
                              <span className="font-medium text-[var(--baladi-primary)]">
                                {format(
                                  new Date(discount.validFrom),
                                  'dd.MM.yyyy',
                                )}
                              </span>
                            </div>
                          )}
                          {discount.validTo && (
                            <div className="flex items-center space-x-2 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-medium text-orange-800">
                              <Calendar className="h-3 w-3 text-[var(--baladi-gray)]" />
                              <span className="text-[var(--baladi-gray)]">
                                Til:
                              </span>
                              <span className="font-medium text-[var(--baladi-primary)]">
                                {format(
                                  new Date(discount.validTo),
                                  'dd.MM.yyyy',
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-2 text-blue-700">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span className="font-medium">Alltid gyldig</span>
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className="text-sm text-[var(--baladi-gray)]">
                          Opprettet:{' '}
                          {format(new Date(discount.createdAt), 'dd.MM.yyyy')}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="p-4">
                    <div className="space-y-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${status.color}`}
                      >
                        {status.label}
                      </span>
                      <br />
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">
                        Rabatt aktiv
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="bg-[var(--baladi-primary)]/10 hover:bg-[var(--baladi-primary)]/20 flex h-8 w-8 items-center justify-center rounded-lg text-[var(--baladi-primary)] transition-colors"
                          >
                            <span className="sr-only">Åpne meny</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <UpdateDiscountDialog discount={discount}>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Rediger rabatt
                            </DropdownMenuItem>
                          </UpdateDiscountDialog>
                          <DropdownMenuItem
                            onClick={() => handleToggleActive(discount)}
                            className="cursor-pointer"
                            disabled={
                              toggleDiscountActiveMutation.isPending ||
                              updateDiscountMutation.isPending
                            }
                          >
                            {toggleDiscountActiveMutation.isPending ? (
                              <>
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
                                Oppdaterer...
                              </>
                            ) : discount.isActive ? (
                              <>
                                <ToggleLeft className="mr-2 h-4 w-4" />
                                Gjør inaktiv
                              </>
                            ) : (
                              <>
                                <ToggleRight className="mr-2 h-4 w-4" />
                                Aktiver rabatt
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default memo(DiscountsTableContent);

function getDiscountStatus(discount: DiscountResponse) {
  const now = new Date();
  const validFrom = discount.validFrom ? new Date(discount.validFrom) : null;
  const validTo = discount.validTo ? new Date(discount.validTo) : null;

  if (!discount.isActive) {
    return { label: 'Inaktiv', color: 'bg-red-100 text-red-800' };
  }

  if (validFrom && now < validFrom) {
    return { label: 'Planlagt', color: 'bg-yellow-100 text-yellow-800' };
  }

  if (validTo && now > validTo) {
    return { label: 'Utløpt', color: 'bg-gray-100 text-gray-800' };
  }

  return { label: 'Aktiv', color: 'bg-green-100 text-green-800' };
}
