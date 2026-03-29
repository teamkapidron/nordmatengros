import { Metadata } from 'next';
import { Suspense } from 'react';

import ProductsHeader from '@/components/dashboard/products/products-header';
import MetricCards from '@/components/dashboard/products/metric-cards';
import ProductTable from '@/components/dashboard/products/product-table/product-table';

export const metadata: Metadata = {
  title: 'Produkter',
};

export default function ProductsPage() {
  return (
    <Suspense>
      <div className="space-y-6">
        <ProductsHeader />
        <MetricCards />
        <ProductTable />
      </div>
    </Suspense>
  );
}
