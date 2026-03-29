'use client';

// Node Modules
import React, { memo, useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Card, CardHeader, CardContent } from '@repo/ui/components/base/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/base/select';
import { Badge } from '@repo/ui/components/base/badge';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

// Hooks
import {
  useCancelOrder,
  useDeleteOrder,
  useOrderDetails,
  useUpdateOrderStatus,
} from '@/hooks/useOrder';

// Types/Utils
import { OrderStatus } from '@repo/types/order';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';
import { useRouter } from 'next/navigation';

interface OrderActionsCardProps {
  orderId: string;
}

function OrderActionsCard(props: OrderActionsCardProps) {
  const { orderId } = props;
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | ''>('');
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: orderData } = useOrderDetails(orderId);
  const updateOrderStatusMutation = useUpdateOrderStatus();
  const cancelOrderMutation = useCancelOrder();
  const deleteOrderMutation = useDeleteOrder();
  const order = orderData?.order;

  const handleApproveOrder = useCallback(() => {
    if (!order?._id) return;

    updateOrderStatusMutation.mutate(
      {
        orderId: order._id,
        status: OrderStatus.CONFIRMED,
      },
      {
        onSuccess: function () {
          queryClient.invalidateQueries({
            queryKey: [ReactQueryKeys.GET_ORDER_DETAILS, orderId],
          });
        },
      },
    );
  }, [order?._id, updateOrderStatusMutation, queryClient, orderId]);

  const handleStatusChange = useCallback(
    (newStatus: OrderStatus) => {
      if (!order?._id || newStatus === order.status) return;

      updateOrderStatusMutation.mutate(
        {
          orderId: order._id,
          status: newStatus,
        },
        {
          onSuccess: function () {
            queryClient.invalidateQueries({
              queryKey: [ReactQueryKeys.GET_ORDER_DETAILS, orderId],
            });
          },
        },
      );
    },
    [
      order?._id,
      order?.status,
      updateOrderStatusMutation,
      queryClient,
      orderId,
    ],
  );

  const handleCancelOrder = useCallback(() => {
    if (!order?._id) return;
    cancelOrderMutation.mutate({ orderId: order._id });
  }, [cancelOrderMutation, order?._id]);

  const handleDeleteOrder = useCallback(() => {
    if (!order?._id) return;
    deleteOrderMutation.mutate({ orderId: order._id });
    router.push('/dashboard/orders');
  }, [order?._id, deleteOrderMutation, router]);

  const availableStatuses = Object.values(OrderStatus).filter(
    (status) => status !== order?.status && status !== OrderStatus.CANCELLED,
  );

  return (
    <Card className="border-[var(--baladi-border)] shadow-lg">
      <CardHeader className="border-b border-[var(--baladi-border)]">
        <div className="space-y-2">
          <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
            Ordre Handling
          </h2>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Administrer og oppdater ordrestatus
          </p>
          {order?.status && (
            <div className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                Nåværende status:
              </span>
              <Badge variant={getStatusBadgeVariant(order.status)}>
                {getStatusLabel(order.status)}
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-6 pt-0">
        {order?.status === OrderStatus.PENDING && (
          <div className="space-y-2">
            <h3 className="font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
              Godkjenn Ordre
            </h3>
            <Button
              variant="default"
              className="w-full justify-center bg-green-600 hover:bg-green-700"
              onClick={handleApproveOrder}
              disabled={updateOrderStatusMutation.isPending}
            >
              {updateOrderStatusMutation.isPending
                ? 'Godkjenner...'
                : 'Godkjenn Ordre'}
            </Button>
          </div>
        )}

        {order?.status !== OrderStatus.PENDING &&
          order?.status !== OrderStatus.CANCELLED && (
            <div className="space-y-2">
              <h3 className="font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
                Endre Ordrestatus
              </h3>
              <div className="space-y-3">
                <Select
                  value={selectedStatus}
                  onValueChange={(value) =>
                    setSelectedStatus(value as OrderStatus)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Velg ny status" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {getStatusLabel(status)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedStatus && (
                  <Button
                    variant="outline"
                    className="w-full justify-center"
                    onClick={() => handleStatusChange(selectedStatus)}
                    disabled={updateOrderStatusMutation.isPending}
                  >
                    {updateOrderStatusMutation.isPending
                      ? 'Oppdaterer...'
                      : `Oppdater til ${getStatusLabel(selectedStatus)}`}
                  </Button>
                )}
              </div>
            </div>
          )}

        {order?.status !== OrderStatus.CANCELLED && (
          <div className="space-y-2 border-t border-[var(--baladi-border)] pt-4">
            <h3 className="font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
              Avbryt Ordre
            </h3>
            <ConfirmationDialog
              trigger={
                <Button
                  variant="outline"
                  className="w-full justify-center border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50"
                  disabled={cancelOrderMutation.isPending}
                >
                  {cancelOrderMutation.isPending
                    ? 'Avbryter...'
                    : 'Avbryt Ordre'}
                </Button>
              }
              title="Avbryt Ordre"
              description="Er du sikker på at du vil avbryte denne ordren? Denne handlingen kan ikke angres."
              confirmText="Ja, avbryt ordre"
              onConfirm={handleCancelOrder}
              isPending={cancelOrderMutation.isPending}
            />
          </div>
        )}

        <div className="space-y-2">
          <h3 className="font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
            Slett Ordre
          </h3>
          <ConfirmationDialog
            trigger={
              <Button
                variant="outline"
                className="w-full justify-center border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50"
                disabled={deleteOrderMutation.isPending}
              >
                {deleteOrderMutation.isPending ? 'Sletter...' : 'Slett Ordre'}
              </Button>
            }
            title="Slett Ordre"
            description="Er du sikker på at du vil slette denne ordren permanent? Alle data knyttet til ordren vil bli fjernet og denne handlingen kan ikke angres."
            confirmText="Ja, slett ordre"
            onConfirm={handleDeleteOrder}
            isPending={deleteOrderMutation.isPending}
          />
        </div>

        {order?.status === OrderStatus.CANCELLED && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-red-600">
              Denne ordren er avbrutt og kan ikke endres.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default memo(OrderActionsCard);

function getStatusBadgeVariant(status: OrderStatus) {
  switch (status) {
    case OrderStatus.PENDING:
      return 'secondary';
    case OrderStatus.CONFIRMED:
      return 'default';
    case OrderStatus.SHIPPED:
      return 'outline';
    case OrderStatus.DELIVERED:
      return 'default';
    case OrderStatus.CANCELLED:
      return 'destructive';
    default:
      return 'secondary';
  }
}

function getStatusLabel(status: OrderStatus) {
  switch (status) {
    case OrderStatus.PENDING:
      return 'Venter';
    case OrderStatus.CONFIRMED:
      return 'Bekreftet';
    case OrderStatus.SHIPPED:
      return 'Sendt';
    case OrderStatus.DELIVERED:
      return 'Levert';
    case OrderStatus.CANCELLED:
      return 'Avbrutt';
    default:
      return status;
  }
}
