import { Metadata } from 'next';
import { Suspense } from 'react';

import OrderHeader from '@/components/dashboard/orders/order-header';
import OrderMetricCards from '@/components/dashboard/orders/order-metric-card';
import OrderTable from '@/components/dashboard/orders/order-table/order-table';

export const metadata: Metadata = {
  title: 'Ordrer',
};

export default function OrdersPage() {
  return (
    <Suspense>
      <div className="space-y-6">
        <OrderHeader />
        <OrderMetricCards />
        <OrderTable />
      </div>
    </Suspense>
  );
}
