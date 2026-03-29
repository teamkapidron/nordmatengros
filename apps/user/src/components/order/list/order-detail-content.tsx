'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertCircle } from '@repo/ui/lib/icons';
import { Button } from '@repo/ui/components/base/button';

// Components
import OrderHeader from '../detail/order-header';
import OrderItems from '../detail/order-items';
import OrderSummary from '../detail/order-summary';
import OrderDelivery from '../detail/order-delivery';
import OrderTimeline from '../detail/order-timeline';
import OrderDetailSkeleton from '../detail/order-detail-skeleton';

// Hooks
import { useOrderDetails } from '@/hooks/useOrder';

interface OrderDetailContentProps {
  orderId: string;
}

function OrderDetailContent({ orderId }: OrderDetailContentProps) {
  const { orderDetails, isOrderDetailsLoading } = useOrderDetails(orderId);

  if (isOrderDetailsLoading) {
    return <OrderDetailSkeleton />;
  }

  if (!orderDetails) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertCircle size={32} className="text-red-600" />
        </div>
        <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-dark)]">
          Bestilling ikke funnet
        </h2>
        <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
          Bestillingen du leter etter eksisterer ikke eller du har ikke tilgang
          til den.
        </p>
        <Button className="mt-4">
          <Link href="/" className="flex items-center gap-x-2">
            <ArrowLeft size={16} />
            Tilbake til forsiden
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" className="mb-4">
          <Link href="/" className="flex items-center gap-x-2">
            <ArrowLeft size={16} />
            <span className="font-[family-name:var(--font-dm-sans)]">
              Tilbake til profil
            </span>
          </Link>
        </Button>
      </div>

      <OrderHeader order={orderDetails.order} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <OrderTimeline order={orderDetails.order} />
          <OrderItems items={orderDetails.order.items} />
          <OrderDelivery order={orderDetails.order} />
        </div>

        <div className="space-y-6">
          <OrderSummary order={orderDetails.order} />
        </div>
      </div>
    </div>
  );
}

export default memo(OrderDetailContent);
