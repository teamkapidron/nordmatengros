import { Metadata } from 'next';
import { Suspense } from 'react';

import EditProduct from '@/components/dashboard/products/edit/edit-product';

export const metadata: Metadata = {
  title: 'Rediger produkt',
};

interface EditProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditProductPage(props: EditProductPageProps) {
  const { slug } = await props.params;

  return (
    <Suspense>
      <EditProduct slug={slug} />
    </Suspense>
  );
}
