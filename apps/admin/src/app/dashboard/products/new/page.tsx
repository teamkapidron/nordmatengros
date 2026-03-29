import { Metadata } from 'next';
import { Suspense } from 'react';

import NewProduct from '@/components/dashboard/products/new/new-product';

export const metadata: Metadata = {
  title: 'Legg til produkt',
};

export default function NewProductPage() {
  return (
    <Suspense>
      <NewProduct />
    </Suspense>
  );
}
