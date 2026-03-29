'use client';

// Node Modules
import { memo, useCallback, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  Package,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Hash,
  Info,
  Edit2,
  Trash2,
} from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';
import EditInventoryDialog from '@/components/dashboard/inventory/edit-inventory-dialog/edit-inventory-dialog';

// Hooks
import { useProductInventory, useInventory } from '@/hooks/useInventory';

// Types/Utils
import { formatDate } from '@repo/ui/lib/date';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';
import { InventoryResponse } from '@/hooks/useInventory/types';

interface ProductInventoryBatchesProps {
  productId: string;
}

function ProductInventoryBatches({ productId }: ProductInventoryBatchesProps) {
  const productInventoryQuery = useProductInventory(productId);

  const inventory = useMemo(() => {
    return productInventoryQuery.data?.inventory ?? [];
  }, [productInventoryQuery.data]);

  if (productInventoryQuery.isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
          Lagerpartier
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-gray-200 bg-white p-6"
            >
              <div className="space-y-4">
                <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                <div className="h-3 w-2/3 rounded bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (inventory.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-12 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <Package className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="mb-2 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
          Ingen lagerpartier funnet
        </h3>
        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
          Dette produktet har for øyeblikket ingen lagerbeholdning.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
            Lagerpartier
          </h2>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            {inventory.length} {inventory.length === 1 ? 'parti' : 'partier'}{' '}
            tilgjengelig
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-[var(--baladi-gray)]" />
          <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Sortert etter utløpsdato
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {inventory.map((item, index) => (
          <InventoryBatchCard
            key={item._id}
            item={item}
            index={index}
            productId={productId}
          />
        ))}
      </div>
    </div>
  );
}

interface InventoryBatchCardProps {
  item: InventoryResponse;
  index: number;
  productId: string;
}

function InventoryBatchCard({ item, productId }: InventoryBatchCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { deleteInventoryMutation } = useInventory();

  const expirationDate = new Date(item.expirationDate);
  const today = new Date();
  const daysUntilExpiry = Math.ceil(
    (expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  const isExpired = expirationDate < today;
  const isExpiringSoon = daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  const isOutOfStock = item.quantity === 0;

  const handleDelete = useCallback(() => {
    deleteInventoryMutation.mutate(item._id, {
      onSuccess: function () {
        queryClient.invalidateQueries({
          queryKey: [ReactQueryKeys.GET_PRODUCT_INVENTORY, productId],
        });
      },
    });
  }, [deleteInventoryMutation, item._id, productId, queryClient]);

  const statusInfo = useMemo(() => {
    if (isOutOfStock) {
      return {
        icon: <XCircle className="h-5 w-5 text-red-500" />,
        badge: (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 ring-1 ring-red-600/20">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
            Tomt
          </div>
        ),
        cardBorder: 'border-red-200',
        cardBg: 'bg-gradient-to-br from-red-50 to-red-100',
      };
    }

    if (isExpired) {
      return {
        icon: <XCircle className="h-5 w-5 text-red-500" />,
        badge: (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 ring-1 ring-red-600/20">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
            Utgått
          </div>
        ),
        cardBorder: 'border-red-200',
        cardBg: 'bg-gradient-to-br from-red-50 to-red-100',
      };
    }

    if (isExpiringSoon) {
      return {
        icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
        badge: (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-600/20">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
            Utløper snart
          </div>
        ),
        cardBorder: 'border-amber-200',
        cardBg: 'bg-gradient-to-br from-amber-50 to-amber-100',
      };
    }

    return {
      icon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
      badge: (
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
          På lager
        </div>
      ),
      cardBorder: 'border-emerald-200',
      cardBg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    };
  }, [isExpired, isExpiringSoon, isOutOfStock]);

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border ${statusInfo.cardBorder} ${statusInfo.cardBg} shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
    >
      <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-white/20" />

      <div className="relative p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 shadow-lg backdrop-blur-sm">
              <Package className="h-6 w-6 text-gray-700" />
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2">
                {statusInfo.icon}
                {statusInfo.badge}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Stock Information */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-gray-600" />
              <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-gray-700">
                Lagerbeholdning
              </span>
            </div>
            <div className="text-right">
              <div className="space-y-1">
                <div>
                  <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-gray-900">
                    {item.quantity}
                  </span>
                  <span className="ml-1 font-[family-name:var(--font-dm-sans)] text-sm text-gray-600">
                    gjenværende
                  </span>
                </div>
                <div>
                  <span className="font-[family-name:var(--font-dm-sans)] text-sm text-gray-600">
                    av {item.inputQuantity} lagt til
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Expiration Date */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-600" />
              <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-gray-700">
                Utløpsdato
              </span>
            </div>
            <div className="text-right">
              <div className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-gray-900">
                {formatDate(expirationDate, 'MMM d, yyyy')}
              </div>
              <div className="font-[family-name:var(--font-dm-sans)] text-xs text-gray-600">
                {isExpired
                  ? `Utgått for ${Math.abs(daysUntilExpiry)} dager siden`
                  : daysUntilExpiry === 0
                    ? 'Utløper i dag'
                    : `${daysUntilExpiry} dager igjen`}
              </div>
            </div>
          </div>

          {/* Progress bar for days until expiry */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-dm-sans)] text-xs text-gray-600">
                Lagerstatus
              </span>
              <span className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-gray-700">
                {Math.max(
                  0,
                  Math.min(100, (item.quantity / item.inputQuantity) * 100),
                ).toFixed(0)}
                %
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/60">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  isOutOfStock
                    ? 'bg-red-500'
                    : item.quantity < item.inputQuantity * 0.3
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                }`}
                style={{
                  width: `${Math.max(5, Math.min(100, (item.quantity / item.inputQuantity) * 100))}%`,
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditDialogOpen(true)}
              className="h-8 flex-1 border-gray-300 bg-white/80 px-3 text-xs font-medium text-gray-700 transition-all duration-200 hover:border-[var(--baladi-primary)] hover:bg-white hover:text-[var(--baladi-primary)]"
            >
              <Edit2 className="mr-1.5 h-3 w-3" />
              Rediger
            </Button>
            <ConfirmationDialog
              trigger={
                <Button
                  variant="outline"
                  size="sm"
                  disabled={deleteInventoryMutation.isPending}
                  className="h-8 flex-1 border-gray-300 bg-white/80 px-3 text-xs font-medium text-gray-700 transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
                >
                  <Trash2 className="mr-1.5 h-3 w-3" />
                  Slett
                </Button>
              }
              title="Slett lagerparti"
              description="Er du sikker på at du vil slette dette lagerpartiet? Denne handlingen kan ikke angres."
              confirmText="Ja, slett lagerparti"
              onConfirm={handleDelete}
              isPending={deleteInventoryMutation.isPending}
            />
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <EditInventoryDialog
        open={isEditDialogOpen}
        setOpen={setIsEditDialogOpen}
        inventoryItem={item}
        productId={productId}
      />
    </div>
  );
}

export default memo(ProductInventoryBatches);
