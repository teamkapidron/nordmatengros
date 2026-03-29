'use client';

// Node Modules
import { memo } from 'react';

// Components
import ProductForm from '@/components/dashboard/products/product-form/product-form';
import { ProductFormValues } from '@/components/dashboard/products/product-form/product-schema';

// Hooks
import { useProduct } from '@/hooks/useProduct';

function NewProduct() {
  const { createProductMutation } = useProduct();

  function onSubmit(data: ProductFormValues) {
    console.log(data);

    createProductMutation.mutate(data);
  }

  return (
    <div className="bg-background rounded-xl p-5 shadow-md">
      <ProductForm
        onSubmit={onSubmit}
        isPending={createProductMutation.isPending}
      />
    </div>
  );
}

export default memo(NewProduct);
