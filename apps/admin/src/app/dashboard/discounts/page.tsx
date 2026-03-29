import { Metadata } from 'next';

import DiscountsHeader from '@/components/dashboard/discounts/discounts-header';
import DiscountsMetrics from '@/components/dashboard/discounts/discounts-metrics';
import DiscountsTable from '@/components/dashboard/discounts/table/discounts-table';
import BulkDiscountsCards from '@/components/dashboard/discounts/bulk-discounts-cards';

export const metadata: Metadata = {
  title: 'Rabatter',
};

export default function DiscountsPage() {
  return (
    <div className="space-y-8">
      <DiscountsHeader />
      <DiscountsMetrics />
      <BulkDiscountsCards />
      <DiscountsTable />
    </div>
  );
}
