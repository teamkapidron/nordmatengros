import { Metadata } from 'next';
import { Suspense } from 'react';

import NewsletterMetrics from '@/components/dashboard/newsletter/newsletter-metrics';
import NewsletterBody from '@/components/dashboard/newsletter/newsletter-body';

export const metadata: Metadata = {
  title: 'Nyhetsbrev',
};

export default function NewsletterPage() {
  return (
    <Suspense>
      <div className="space-y-6">
        <NewsletterMetrics />
        <NewsletterBody />
      </div>
    </Suspense>
  );
}
