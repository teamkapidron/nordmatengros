'use client';

// Node Modules
import React, { memo, useCallback, useMemo } from 'react';
import {
  Calendar,
  CreditCard,
  MapPin,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
} from '@repo/ui/lib/icons';
import { cn } from '@repo/ui/lib/utils';

// Components
import { Badge } from '@repo/ui/components/base/badge';
import { Button } from '@repo/ui/components/base/button';

// Types/Utils
import { formatDate } from '@/utils/date.util';
import { formatPrice } from '@/utils/price.util';
import { OrderResponse } from '@/hooks/useOrder/types';
import { OrderStatus } from '@repo/types/order';

interface OrderHeaderProps {
  order: OrderResponse;
}

function OrderHeader(props: OrderHeaderProps) {
  const { order } = props;

  const statusInfo = useMemo(() => getStatusInfo(order.status), [order.status]);

  const handleCancelOrder = useCallback(() => {
    console.log('cancel order');
  }, []);

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm lg:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)] lg:text-3xl">
              Bestilling #{order._id.slice(-8).toUpperCase()}
            </h1>
            <Badge
              className={cn(
                'flex items-center gap-2 border font-[family-name:var(--font-dm-sans)] font-medium',
                statusInfo.color,
              )}
            >
              {statusInfo.icon}
              {statusInfo.text}
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="bg-[var(--baladi-primary)]/10 flex h-10 w-10 items-center justify-center rounded-full">
                <Calendar size={18} className="text-[var(--baladi-primary)]" />
              </div>
              <div>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                  Bestilt
                </p>
                <p className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                  {formatDate(order.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[var(--baladi-secondary)]/10 flex h-10 w-10 items-center justify-center rounded-full">
                <CreditCard
                  size={18}
                  className="text-[var(--baladi-secondary)]"
                />
              </div>
              <div>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                  Totalbeløp
                </p>
                <p className="font-[family-name:var(--font-sora)] font-bold text-[var(--baladi-primary)]">
                  {formatPrice(order.totalAmount)} kr
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[var(--baladi-accent)]/10 flex h-10 w-10 items-center justify-center rounded-full">
                <Package size={18} className="text-[var(--baladi-accent)]" />
              </div>
              <div>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                  Antall varer
                </p>
                <p className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                  {order.items.length} varer
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--baladi-light)]">
                <MapPin size={18} className="text-[var(--baladi-primary)]" />
              </div>
              <div>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                  Levering til
                </p>
                <p className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                  {order.shippingAddress.city}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          {order.status === OrderStatus.PENDING && (
            <Button variant="destructive" size="sm" onClick={handleCancelOrder}>
              Kanseller bestilling
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(OrderHeader);

function getStatusInfo(status: OrderStatus) {
  switch (status) {
    case OrderStatus.PENDING:
      return {
        text: 'Venter',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: <Clock size={16} className="text-yellow-600" />,
      };
    case OrderStatus.CONFIRMED:
      return {
        text: 'Bekreftet',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: <CheckCircle size={16} className="text-blue-600" />,
      };
    case OrderStatus.SHIPPED:
      return {
        text: 'Sendt',
        color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        icon: <Truck size={16} className="text-indigo-600" />,
      };
    case OrderStatus.DELIVERED:
      return {
        text: 'Levert',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: <CheckCircle size={16} className="text-green-600" />,
      };
    case OrderStatus.CANCELLED:
      return {
        text: 'Kansellert',
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: <XCircle size={16} className="text-red-600" />,
      };
  }
}
