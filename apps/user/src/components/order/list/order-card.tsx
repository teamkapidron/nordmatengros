'use client';

// Node Modules
import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';
import {
  Calendar,
  CreditCard,
  Package,
  MapPin,
  ArrowRight,
} from '@repo/ui/lib/icons';

// Components
import { Badge } from '@repo/ui/components/base/badge';
import { Button } from '@repo/ui/components/base/button';

// Types/Utils
import { formatDate } from '@/utils/date.util';
import { formatPrice } from '@/utils/price.util';
import { OrderResponse } from '@/hooks/useOrder/types';

interface OrderCardProps {
  order: OrderResponse;
}

function OrderCard({ order }: OrderCardProps) {
  const statusInfo = getStatusInfo(order.status);
  const itemsToShow = order.items.slice(0, 3);
  const remainingItems = order.items.length - 3;

  return (
    <div className="group rounded-lg bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
            Bestilling #{order._id.slice(-8).toUpperCase()}
          </h3>
          <Badge
            className={cn(
              'flex items-center gap-2 border font-[family-name:var(--font-dm-sans)] font-medium',
              statusInfo.color,
            )}
          >
            <div className={cn('h-2 w-2 rounded-full', statusInfo.dotColor)} />
            {statusInfo.text}
          </Badge>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex items-center gap-3">
          <div className="bg-[var(--baladi-primary)]/10 flex h-8 w-8 items-center justify-center rounded-full">
            <Calendar size={14} className="text-[var(--baladi-primary)]" />
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
          <div className="bg-[var(--baladi-secondary)]/10 flex h-8 w-8 items-center justify-center rounded-full">
            <CreditCard size={14} className="text-[var(--baladi-secondary)]" />
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
          <div className="bg-[var(--baladi-accent)]/10 flex h-8 w-8 items-center justify-center rounded-full">
            <MapPin size={14} className="text-[var(--baladi-accent)]" />
          </div>
          <div>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Leveres til
            </p>
            <p className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
              {order.shippingAddress.city}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-3 flex items-center gap-2">
          <Package size={16} className="text-[var(--baladi-gray)]" />
          <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
            {order.items.length} varer bestilt
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {itemsToShow.map((item, index) => (
              <div
                key={`${item.productId._id}-${index}`}
                className="bg-[var(--baladi-light)]/30 relative h-12 w-12 overflow-hidden rounded-md border-2 border-white shadow-sm"
              >
                <Image
                  src={item.productId.images?.[0] || ''}
                  alt={item.productId.name}
                  fill
                  className="object-contain p-1"
                  sizes="48px"
                />
              </div>
            ))}
            {remainingItems > 0 && (
              <div className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-white bg-[var(--baladi-muted)] shadow-sm">
                <span className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-gray)]">
                  +{remainingItems}
                </span>
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              {itemsToShow.map((item, index) => (
                <span key={item.productId._id}>
                  {item.productId.name}
                  {index < itemsToShow.length - 1 && ', '}
                </span>
              ))}
              {remainingItems > 0 && ` og ${remainingItems} til...`}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end border-t border-[var(--baladi-border)] pt-4">
        <div className="flex items-center gap-2">
          <Button>
            <Link
              href={`/order/${order._id}`}
              className="flex items-center gap-2"
            >
              Vis bestilling
              <ArrowRight size={14} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(OrderCard);

function getStatusInfo(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return {
        text: 'Venter',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        dotColor: 'bg-yellow-500',
      };
    case 'confirmed':
      return {
        text: 'Bekreftet',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        dotColor: 'bg-blue-500',
      };
    case 'processing':
      return {
        text: 'Behandles',
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        dotColor: 'bg-purple-500',
      };
    case 'shipped':
      return {
        text: 'Sendt',
        color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        dotColor: 'bg-indigo-500',
      };
    case 'delivered':
      return {
        text: 'Levert',
        color: 'bg-green-100 text-green-800 border-green-200',
        dotColor: 'bg-green-500',
      };
    case 'cancelled':
      return {
        text: 'Kansellert',
        color: 'bg-red-100 text-red-800 border-red-200',
        dotColor: 'bg-red-500',
      };
    default:
      return {
        text: status,
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        dotColor: 'bg-gray-500',
      };
  }
}
