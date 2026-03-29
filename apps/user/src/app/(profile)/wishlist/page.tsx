import { Suspense } from 'react';

import Header from '@/components/common/header/header';
import WishlistContent from '@/components/wishlist/wishlist-content';
import Footer from '@/components/common/footer/footer';

export default function WishlistPage() {
  return (
    <Suspense>
      <div className="min-h-screen bg-[var(--baladi-background)]">
        <Header />

        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <WishlistContent />
        </main>

        <Footer />
      </div>
    </Suspense>
  );
}
