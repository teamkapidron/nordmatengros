'use client';

import React, { memo } from 'react';
import {
  MapPin,
  Truck,
  Package,
  MessageSquare,
  Calendar,
} from '@repo/ui/lib/icons';

// Types/Utils
import { formatDate } from '@/utils/date.util';
import { OrderResponse } from '@/hooks/useOrder/types';

interface OrderDeliveryProps {
  order: OrderResponse;
}

function OrderDelivery({ order }: OrderDeliveryProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-[var(--baladi-accent)]/10 flex h-8 w-8 items-center justify-center rounded-full">
          <Truck size={16} className="text-[var(--baladi-accent)]" />
        </div>
        <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
          Leveringsinformasjon
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[var(--baladi-primary)]" />
            <h4 className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-dark)]">
              Leveringsadresse
            </h4>
          </div>

          <div className="ml-6 space-y-1 font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
            <p className="font-medium text-[var(--baladi-dark)]">
              {order.shippingAddress.addressLine1}
            </p>
            {order.shippingAddress.addressLine2 && (
              <p>{order.shippingAddress.addressLine2}</p>
            )}
            <p>
              {order.shippingAddress.postalCode} {order.shippingAddress.city}
            </p>
            <p>{order.shippingAddress.state}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Package size={16} className="text-[var(--baladi-secondary)]" />
            <h4 className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-dark)]">
              Leveringsdetaljer
            </h4>
          </div>

          <div className="ml-6 space-y-3">
            <div className="flex items-center gap-3">
              <Calendar size={14} className="text-[var(--baladi-gray)]" />
              <div>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  Ønsket leveringsdato
                </p>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                  {order.desiredDeliveryDate
                    ? formatDate(order.desiredDeliveryDate)
                    : 'Ikke spesifisert'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Package size={14} className="text-[var(--baladi-gray)]" />
              <div>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  Palltype
                </p>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                  {order.palletType || 'Ikke spesifisert'}
                </p>
              </div>
            </div>

            {order.notes && (
              <div className="flex items-center gap-3">
                <MessageSquare
                  size={14}
                  className="text-[var(--baladi-gray)]"
                />
                <div>
                  <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                    Kunde kommentar
                  </p>
                  <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                    {order.notes}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(OrderDelivery);
