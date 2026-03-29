import { Suspense } from 'react';
import { Metadata } from 'next';

import Header from '@/components/common/header/header';
import Footer from '@/components/common/footer/footer';
import OrderDetailContent from '@/components/order/list/order-detail-content';

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: OrderDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Bestilling #${id} | Baladi Engros`,
  };
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;

  return (
    <Suspense>
      <div className="min-h-screen bg-[var(--baladi-background)]">
        <Header />

        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <OrderDetailContent orderId={id} />
        </main>

        <Footer />
      </div>
    </Suspense>
  );
}
