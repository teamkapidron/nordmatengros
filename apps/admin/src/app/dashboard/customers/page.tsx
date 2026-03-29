import { Metadata } from 'next';
import { Suspense } from 'react';

import CustomersHeader from '@/components/dashboard/customers/customer-header';
import CustomerMetricCards from '@/components/dashboard/customers/customer-metric-cards';
import CustomersTable from '@/components/dashboard/customers/customer-table/customers-table';

export const metadata: Metadata = {
  title: 'Kunder',
};

export default function CustomersPage() {
  return (
    <Suspense>
      <div className="space-y-6">
        <CustomersHeader />
        <CustomerMetricCards />
        <CustomersTable />
      </div>
    </Suspense>
  );
}
