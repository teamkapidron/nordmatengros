import { Suspense } from 'react';

import OrderDetailHeader from '@/components/dashboard/orders/order-detail/order-detail-header';
import OrderSummaryCard from '@/components/dashboard/orders/order-detail/order-summary-card';
import OrderTrackingTimeline from '@/components/dashboard/orders/order-detail/order-tracking-timeline';
import OrderItemsList from '@/components/dashboard/orders/order-detail/order-items-list';
import CustomerInfoCard from '@/components/dashboard/orders/order-detail/customer-info-card';
import OrderActionsCard from '@/components/dashboard/orders/order-detail/order-actions-card';

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage(props: OrderDetailPageProps) {
  const { id } = await props.params;

  return (
    <Suspense>
      <div className="space-y-6">
        <OrderDetailHeader orderId={id} />
        <OrderTrackingTimeline orderId={id} />

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <OrderSummaryCard orderId={id} />
            <OrderItemsList orderId={id} />
          </div>
          <div className="space-y-6">
            <OrderActionsCard orderId={id} />
            <CustomerInfoCard orderId={id} />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
