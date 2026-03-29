'use client';

// Node Modules
import React, { memo, useMemo } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  Package,
  MessageSquare,
  Receipt,
  Truck,
} from '@repo/ui/lib/icons';

// Components
import DataItem from './atoms/data-item';
import { Card, CardHeader, CardContent } from '@repo/ui/components/base/card';
import { Separator } from '@repo/ui/components/base/separator';
import { Badge } from '@repo/ui/components/base/badge';

// Hooks
import { useOrderDetails } from '@/hooks/useOrder';

// Types/Utils
import { formatDate } from '@/utils/date.util';
import { formatPrice } from '@/utils/price.util';
import { OrderResponse } from '@/hooks/useOrder/types';

interface OrderSummaryCardProps {
  orderId: string;
}

function OrderSummaryCard({ orderId }: OrderSummaryCardProps) {
  const { data: orderData } = useOrderDetails(orderId);
  const order = orderData?.order;

  const pricingTotals = useMemo(() => {
    if (!order?.items) return null;

    const subtotal = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const totalVatAmount = order.items.reduce(
      (sum, item) => sum + item.vatAmount * item.quantity,
      0,
    );
    const totalDiscount = order.items.reduce(
      (sum, item) => sum + (item.discount || 0) * item.quantity,
      0,
    );
    const totalBulkDiscount = order.items.reduce(
      (sum, item) => sum + (item.bulkDiscount || 0) * item.quantity,
      0,
    );
    const subtotalWithVat = order.items.reduce(
      (sum, item) => sum + item.priceWithVat * item.quantity,
      0,
    );
    const finalTotal = order.items.reduce(
      (sum, item) => sum + item.totalPrice * item.quantity,
      0,
    );

    return {
      subtotal,
      totalVatAmount,
      totalDiscount,
      totalBulkDiscount,
      subtotalWithVat,
      finalTotal,
    };
  }, [order?.items]);

  if (!order) {
    return (
      <Card className="border-[var(--baladi-border)] shadow-lg">
        <CardHeader className="border-b border-[var(--baladi-border)] bg-gradient-to-r from-[var(--baladi-muted)] to-white">
          <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
            Ordre Sammendrag
          </h2>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-[var(--baladi-muted)]"></div>
              <p className="mt-4 font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                Laster ordre data...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[var(--baladi-border)] shadow-lg">
      <CardHeader className="border-b border-[var(--baladi-border)]">
        <div className="flex items-center gap-3">
          <div className="bg-[var(--baladi-primary)]/10 flex h-8 w-8 items-center justify-center rounded-full">
            <Receipt size={16} className="text-[var(--baladi-primary)]" />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
              Ordre Sammendrag
            </h2>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Detaljert informasjon om ordre #{order._id.slice(-8)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="from-[var(--baladi-primary)]/5 to-[var(--baladi-secondary)]/5 rounded-lg bg-gradient-to-r p-4">
              <h3 className="mb-4 font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                Ordre Informasjon
              </h3>
              <div className="space-y-3">
                <DataItem
                  icon={<Calendar className="h-4 w-4" />}
                  label="Bestilt"
                  value={formatDate(order.createdAt)}
                />
                <DataItem
                  icon={<Clock className="h-4 w-4" />}
                  label="Sist oppdatert"
                  value={formatDate(order.updatedAt)}
                />
                {order.desiredDeliveryDate && (
                  <DataItem
                    icon={<Truck className="h-4 w-4" />}
                    label="Ønsket leveringsdato"
                    value={formatDate(order.desiredDeliveryDate)}
                  />
                )}
                {order.palletType && (
                  <DataItem
                    icon={<Package className="h-4 w-4" />}
                    label="Pallet type"
                    value={
                      <Badge variant="outline">
                        {order.palletType === 'EUR'
                          ? 'EUR Pallet (80x120cm)'
                          : 'Large Pallet (100x120cm)'}
                      </Badge>
                    }
                  />
                )}
              </div>
            </div>

            {order.notes && (
              <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                <h3 className="mb-3 flex items-center gap-2 font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                  <MessageSquare className="h-4 w-4" />
                  Kundens kommentar
                </h3>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm italic text-[var(--baladi-gray)]">
                  &quot;{order.notes}&quot;
                </p>
              </div>
            )}

            {order.cancellationReason && (
              <div className="rounded-lg border border-red-200 bg-gradient-to-r from-red-50 to-red-100 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-1 h-5 w-5 text-red-500" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-[family-name:var(--font-sora)] font-bold text-red-800">
                      Kansellerings årsak
                    </h4>
                    <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm text-red-700">
                      {order.cancellationReason}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-4">
              <h3 className="mb-4 font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                Leveringsadresse
              </h3>
              <DataItem
                icon={<MapPin className="h-4 w-4" />}
                label="Adresse"
                value={
                  <div className="space-y-1">
                    <div className="font-medium text-[var(--baladi-dark)]">
                      {formatAddress(order.shippingAddress)}
                    </div>
                  </div>
                }
              />
            </div>

            {pricingTotals && (
              <div className="from-[var(--baladi-accent)]/10 rounded-lg bg-gradient-to-r to-orange-50 p-4">
                <h3 className="mb-4 font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                  Ordre verdi
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                      Subtotal (ekskl. mva)
                    </span>
                    <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                      {formatPrice(pricingTotals.subtotal)} kr
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                      MVA
                    </span>
                    <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                      {formatPrice(pricingTotals.totalVatAmount)} kr
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                      Subtotal (inkl. mva)
                    </span>
                    <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                      {formatPrice(pricingTotals.subtotalWithVat)} kr
                    </span>
                  </div>

                  {pricingTotals.totalDiscount > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="font-[family-name:var(--font-dm-sans)] text-sm text-green-600">
                        Rabatt
                      </span>
                      <span className="font-[family-name:var(--font-dm-sans)] font-medium text-green-600">
                        -{formatPrice(pricingTotals.totalDiscount)} kr
                      </span>
                    </div>
                  )}

                  {pricingTotals.totalBulkDiscount > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="font-[family-name:var(--font-dm-sans)] text-sm text-green-600">
                        Mengderabatt
                      </span>
                      <span className="font-[family-name:var(--font-dm-sans)] font-medium text-green-600">
                        -{formatPrice(pricingTotals.totalBulkDiscount)} kr
                      </span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                      Totalt å betale
                    </span>
                    <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-primary)]">
                      {formatPrice(pricingTotals.finalTotal)} kr
                    </span>
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

export default memo(OrderSummaryCard);

function formatAddress(
  address: OrderResponse['shippingAddress'] | undefined | null,
) {
  if (!address) return 'Ingen adresse oppgitt';

  const parts = [
    address.addressLine1,
    address.addressLine2,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(', ') : 'Ingen adresse oppgitt';
}
