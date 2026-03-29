import { Suspense } from 'react';
import { Metadata } from 'next';

import Header from '@/components/common/header/header';
import Footer from '@/components/common/footer/footer';
import OrderListContent from '@/components/order/list/order-list-content';

export const metadata: Metadata = {
  title: 'Mine bestillinger | Baladi Engros',
};

export default function OrderListPage() {
  return (
    <Suspense>
      <div className="min-h-screen bg-[var(--baladi-background)]">
        <Header />
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <OrderListContent />
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}
