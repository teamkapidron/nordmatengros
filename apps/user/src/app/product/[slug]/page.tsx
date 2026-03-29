import { Suspense } from 'react';
import { Metadata } from 'next';

import Header from '@/components/common/header/header';
import ScrollToTop from '@/components/common/scroll-to-top';
import ProductBreadcrumb from '@/components/product/product-detail/product-breadcrumb';
import ProductGallery from '@/components/product/product-detail/product-gallery';
import ProductInfo from '@/components/product/product-detail/product-info';
import ProductSpecifications from '@/components/product/product-detail/product-specifications';
import Footer from '@/components/common/footer/footer';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Produktdetaljer | Baladi Engros`,
  };
}

export default function ProductDetailPage() {
  return (
    <Suspense>
      <div className="min-h-screen">
        <Header />

        <ScrollToTop />

        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <ProductBreadcrumb />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <ProductGallery />
              <ProductInfo />
            </div>
            <ProductSpecifications />
          </div>
        </main>

        <Footer />
      </div>
    </Suspense>
  );
}
