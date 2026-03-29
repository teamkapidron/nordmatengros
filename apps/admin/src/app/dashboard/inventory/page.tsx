import { Metadata } from 'next';
import { Suspense } from 'react';

import InventoryHeader from '@/components/dashboard/inventory/inventory-header';
import InventoryMetrics from '@/components/dashboard/inventory/inventory-metrics';
import InventoryTable from '@/components/dashboard/inventory/inventory-table';

export const metadata: Metadata = {
  title: 'Lager',
};

export default function InventoryPage() {
  return (
    <Suspense>
      <div className="space-y-6">
        <InventoryHeader />
        <InventoryMetrics />
        <InventoryTable />
      </div>
    </Suspense>
  );
}
