import { Metadata } from 'next';
import { Suspense } from 'react';

import Header from '@/components/common/header/header';
import ContactContent from '@/components/contact/contact-content';
import Footer from '@/components/common/footer/footer';

export const metadata: Metadata = {
  title: 'Kontakt oss | Nordmat Engros',
};

export default function ContactPage() {
  return (
    <Suspense>
      <div className="min-h-screen bg-[var(--nordmat-background)]">
        <Header />
        <ContactContent />
        <Footer />
      </div>
    </Suspense>
  );
}
