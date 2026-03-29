import { Suspense } from 'react';
import { Metadata } from 'next';

import Header from '@/components/common/header/header';
import Cart from '@/components/cart/cart';
import Footer from '@/components/common/footer/footer';

export const metadata: Metadata = {
  title: 'Handlekurv',
};

export default function CartPage() {
  return (
    <Suspense>
      <div className="flex min-h-screen flex-col bg-[var(--baladi-background)]">
        <Header />
        <Cart />
        <Footer />
      </div>
    </Suspense>
  );
}
