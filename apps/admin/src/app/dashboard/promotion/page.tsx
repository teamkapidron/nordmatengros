import { Metadata } from 'next';
import { Suspense } from 'react';

import PromotionBody from '@/components/dashboard/promotion/promotion-body';

export const metadata: Metadata = {
  title: 'Produktpromosjon',
};

export default function PromotionPage() {
  return (
    <Suspense>
      <div className="space-y-6">
        <PromotionBody />
      </div>
    </Suspense>
  );
}
