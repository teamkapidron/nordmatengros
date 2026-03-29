import { Suspense } from 'react';
import { Metadata } from 'next';

// Components
import Header from '@/components/common/header/header';
import Footer from '@/components/common/footer/footer';
import AddressListContent from '@/components/address/address-list-content';

export const metadata: Metadata = {
  title: 'Mine adresser | Baladi Engros',
};

export default function AddressListPage() {
  return (
    <Suspense>
      <div className="min-h-screen bg-[var(--baladi-background)]">
        <Header />

        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <AddressListContent />
        </main>

        <Footer />
      </div>
    </Suspense>
  );
}
