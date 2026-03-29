import { Metadata } from 'next';
import { Suspense } from 'react';

import Header from '@/components/common/header/header';
import ProductsSidebar from '@/components/home/filter-sidebar';
import ProductsSortBar from '@/components/home/sort-bar';
import ProductGrid from '@/components/home/product-grid';
import Footer from '@/components/common/footer/footer';

export const metadata: Metadata = {
  title: 'Hjem | Baladi Engros',
};

export default function Home() {
  return (
    <Suspense>
      <div className="min-h-screen bg-[var(--baladi-background)]">
        <Header />

        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="mb-4 font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-dark)] md:text-4xl">
              Våre Produkter
            </h1>
          </div>

          <div className="flex gap-8">
            <ProductsSidebar />
            <div className="flex-1">
              <ProductsSortBar />
              <ProductGrid />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </Suspense>
  );
}
