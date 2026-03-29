'use client';

import React, { memo, useCallback, useMemo } from 'react';
import {
  ShoppingCart,
  CheckCircle,
  Package,
  Truck,
  MapPin,
  Clock,
} from '@repo/ui/lib/icons';
import { cn } from '@repo/ui/lib/utils';

// Types/Utils
import { formatDate } from '@/utils/date.util';
import { OrderStatus } from '@repo/types/order';
import { OrderResponse } from '@/hooks/useOrder/types';

interface OrderTimelineProps {
  order: OrderResponse;
}

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'completed' | 'current' | 'pending';
  date?: string;
}

function OrderTimeline({ order }: OrderTimelineProps) {
  const getOrderSteps = useCallback(() => {
    const currentStatus = order.status;

    const steps: TimelineStep[] = [
      {
        id: 'placed',
        title: 'Bestilling mottatt',
        description: 'Din bestilling er registrert og bekreftet',
        icon: <ShoppingCart size={20} />,
        status: 'completed',
        date: formatDate(order.createdAt),
      },
      {
        id: 'confirmed',
        title: 'Bestilling bekreftet',
        description: 'Vi har bekreftet din bestilling og starter behandling',
        icon: <CheckCircle size={20} />,
        status: currentStatus === OrderStatus.PENDING ? 'current' : 'completed',
        date:
          currentStatus !== OrderStatus.PENDING
            ? formatDate(order.updatedAt)
            : undefined,
      },
      {
        id: 'processing',
        title: 'Behandles',
        description: 'Varene dine blir pakket og gjort klar for sending',
        icon: <Package size={20} />,
        status:
          currentStatus === OrderStatus.CONFIRMED
            ? 'current'
            : [OrderStatus.SHIPPED, OrderStatus.DELIVERED].includes(
                  currentStatus,
                )
              ? 'completed'
              : 'pending',
      },
      {
        id: 'shipped',
        title: 'Sendt',
        description: 'Pakken er sendt og på vei til deg',
        icon: <Truck size={20} />,
        status:
          currentStatus === OrderStatus.SHIPPED
            ? 'current'
            : currentStatus === OrderStatus.DELIVERED
              ? 'completed'
              : 'pending',
      },
      {
        id: 'delivered',
        title: 'Levert',
        description: 'Pakken er levert til leveringsadressen',
        icon: <MapPin size={20} />,
        status:
          currentStatus === OrderStatus.DELIVERED ? 'completed' : 'pending',
      },
    ];

    if (currentStatus === OrderStatus.CANCELLED) {
      return steps
        .map((step, index) => ({
          ...step,
          status: (index === 0 ? 'completed' : 'pending') as
            | 'completed'
            | 'current'
            | 'pending',
        }))
        .concat([
          {
            id: 'cancelled',
            title: 'Kansellert',
            description: 'Bestillingen er kansellert',
            icon: <Clock size={20} />,
            status: 'current' as const,
            date: formatDate(order.updatedAt),
          },
        ]);
    }

    return steps;
  }, [order.status, order.createdAt, order.updatedAt]);

  const steps = useMemo(() => getOrderSteps(), [getOrderSteps]);

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-6 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
        Bestillingsstatus
      </h2>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex gap-4">
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'absolute top-12 left-5 h-12 w-0.5',
                  step.status === 'completed'
                    ? 'bg-[var(--baladi-primary)]'
                    : 'bg-[var(--baladi-border)]',
                )}
              />
            )}

            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300',
                step.status === 'completed'
                  ? 'bg-[var(--baladi-primary)] text-white'
                  : step.status === 'current'
                    ? 'bg-[var(--baladi-secondary)] text-white ring-4 ring-[var(--baladi-secondary)]/20'
                    : 'bg-[var(--baladi-muted)] text-[var(--baladi-gray)]',
              )}
            >
              {step.icon}
            </div>

            <div className="flex-1 pb-8">
              <div className="flex items-center justify-between">
                <h3
                  className={cn(
                    'font-[family-name:var(--font-dm-sans)] font-semibold',
                    step.status === 'completed' || step.status === 'current'
                      ? 'text-[var(--baladi-dark)]'
                      : 'text-[var(--baladi-gray)]',
                  )}
                >
                  {step.title}
                </h3>
                {step.date && (
                  <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                    {step.date}
                  </span>
                )}
              </div>
              <p
                className={cn(
                  'mt-1 font-[family-name:var(--font-dm-sans)] text-sm',
                  step.status === 'completed' || step.status === 'current'
                    ? 'text-[var(--baladi-gray)]'
                    : 'text-[var(--baladi-muted)]',
                )}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(OrderTimeline);
