'use client';

// Node Modules
import React, { memo } from 'react';

// Icons
import {
  Clock,
  CheckCircle,
  TruckIcon,
  PackageIcon,
  XCircle,
} from '@repo/ui/lib/icons';

// Components
import { Card } from '@repo/ui/components/base/card';
import { CardHeader } from '@repo/ui/components/base/card';
import { CardContent } from '@repo/ui/components/base/card';

// Hooks
import { useOrderDetails } from '@/hooks/useOrder';

// Types/Utils
import { OrderStatus } from '@repo/types/order';
import { formatDate } from '@repo/ui/lib/date';

interface OrderTrackingTimelineProps {
  orderId: string;
}

function OrderTrackingTimeline(props: OrderTrackingTimelineProps) {
  const { orderId } = props;

  const { data: orderData } = useOrderDetails(orderId);
  const order = orderData?.order;

  const orderStatuses = [
    {
      status: OrderStatus.PENDING,
      label: 'Ordre Mottatt',
      description: 'Ordren er registrert i systemet',
    },
    {
      status: OrderStatus.CONFIRMED,
      label: 'Ordre Bekreftet',
      description: 'Ordren er bekreftet og behandles',
    },
    {
      status: OrderStatus.SHIPPED,
      label: 'Ordre Sendt',
      description: 'Ordren er sendt fra lageret',
    },
    {
      status: OrderStatus.DELIVERED,
      label: 'Ordre Levert',
      description: 'Ordren er levert til kunden',
    },
  ];

  const currentStatusIndex = orderStatuses.findIndex(
    (s) => s.status === order?.status,
  );

  return (
    <Card className="border-[var(--baladi-border)] shadow-lg">
      <CardHeader className="border-b border-[var(--baladi-border)]">
        <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
          Ordre Sporing
        </h2>
        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
          Følg fremdriften til din ordre
        </p>
      </CardHeader>

      <CardContent className="p-8">
        <div className="relative">
          <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-[var(--baladi-border)] to-[var(--baladi-muted)]"></div>

          <div className="space-y-10">
            {orderStatuses.map((step, index) => {
              const isActive = currentStatusIndex >= index;
              const isPast = currentStatusIndex > index;
              const isCurrent = currentStatusIndex === index;

              return (
                <div key={step.status} className="relative flex items-start">
                  <div
                    className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 transition-all duration-300 ${
                      isActive
                        ? isPast
                          ? 'border-green-200 bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg shadow-green-200'
                          : 'border-[var(--baladi-primary)]/30 shadow-[var(--baladi-primary)]/30 bg-gradient-to-br from-[var(--baladi-primary)] to-[var(--baladi-secondary)] text-white shadow-lg'
                        : 'border-[var(--baladi-border)] bg-[var(--baladi-muted)] text-[var(--baladi-gray)]'
                    }`}
                  >
                    {getStatusIcon(step.status)}

                    {isCurrent && (
                      <div className="absolute inset-0 animate-pulse rounded-full border-4 border-[var(--baladi-primary)] opacity-75"></div>
                    )}
                  </div>

                  <div className="ml-8 min-w-0 flex-1 pb-8">
                    <div
                      className={`rounded-lg p-4 transition-all duration-300 ${
                        isActive
                          ? 'from-[var(--baladi-primary)]/5 to-[var(--baladi-secondary)]/5 bg-gradient-to-r'
                          : 'bg-[var(--baladi-muted)]/50'
                      }`}
                    >
                      <h3
                        className={`font-[family-name:var(--font-sora)] text-lg font-bold transition-colors duration-300 ${
                          isActive
                            ? 'text-[var(--baladi-dark)]'
                            : 'text-[var(--baladi-gray)]'
                        }`}
                      >
                        {step.label}
                      </h3>

                      <p
                        className={`mt-1 font-[family-name:var(--font-dm-sans)] text-sm transition-colors duration-300 ${
                          isActive
                            ? 'text-[var(--baladi-gray)]'
                            : 'text-[var(--baladi-gray)]/70'
                        }`}
                      >
                        {step.description}
                      </p>

                      {isActive && order?.createdAt && (
                        <div className="mt-3 flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-[var(--baladi-primary)]"></div>
                          <p className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-primary)]">
                            {isCurrent
                              ? `Oppdatert ${formatDate(new Date(order.createdAt), "MMM d, yyyy 'kl.' HH:mm")}`
                              : 'Fullført'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {order?.status === OrderStatus.CANCELLED && (
              <div className="relative flex items-start">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-red-200 bg-gradient-to-br from-red-400 to-red-600 text-white shadow-lg shadow-red-200">
                  <XCircle className="h-6 w-6" />
                </div>

                <div className="ml-8 min-w-0 flex-1">
                  <div className="rounded-lg bg-gradient-to-r from-red-50 to-red-100 p-4">
                    <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-red-800">
                      Ordre Kansellert
                    </h3>
                    <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm text-red-600">
                      Ordren ble kansellert av kunde eller admin
                    </p>
                    {order?.createdAt && (
                      <div className="mt-3 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <p className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-red-600">
                          Kansellert{' '}
                          {formatDate(
                            new Date(order.createdAt),
                            "MMM d, yyyy 'kl.' HH:mm",
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(OrderTrackingTimeline);

function getStatusIcon(status: OrderStatus) {
  switch (status) {
    case OrderStatus.PENDING:
      return <Clock className="h-6 w-6" />;
    case OrderStatus.CONFIRMED:
      return <CheckCircle className="h-6 w-6" />;
    case OrderStatus.SHIPPED:
      return <TruckIcon className="h-6 w-6" />;
    case OrderStatus.DELIVERED:
      return <PackageIcon className="h-6 w-6" />;
    case OrderStatus.CANCELLED:
      return <XCircle className="h-6 w-6" />;
    default:
      return null;
  }
}
