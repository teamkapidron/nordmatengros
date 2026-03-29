'use client';

// Node Modules
import { memo, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// Components
import ProductForm from '@/components/dashboard/products/product-form/product-form';
import { ProductFormValues } from '@/components/dashboard/products/product-form/product-schema';

// Hooks
import { useProductBySlug, useProduct } from '@/hooks/useProduct';

// Types
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

interface EditProductProps {
  slug: string;
}

function EditProduct(props: EditProductProps) {
  const { slug } = props;

  const queryClient = useQueryClient();

  const { updateProductMutation } = useProduct();
  const { data: productData } = useProductBySlug(slug);

  const product = productData?.product;
  const [imagesFileList, setImagesFileList] = useState<File[]>([]);

  useEffect(() => {
    async function convertImagesToFiles() {
      if (!product) {
        setImagesFileList([]);
        return;
      }

      const files: File[] = [];

      for (const imageUrl of product.images || []) {
        try {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const fileName = imageUrl.split('/').pop() || 'image.jpg';
          const file = new File([blob], fileName, { type: blob.type });
          files.push(file);
        } catch (error) {
          console.error('Error converting image URL to File:', error);
        }
      }

      setImagesFileList(files);
    }

    convertImagesToFiles();
  }, [product]);

  const defaultValues = useMemo(() => {
    if (!product) return undefined;

    return {
      name: product.name,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription,

      sku: product.sku,
      barcode: product.barcode,

      vat: product.vat,

      costPrice: product.costPrice,
      salePrice: product.salePrice,
      noOfUnits: product.noOfUnits,

      categories: product.categories?.map((category) => category._id) || [],

      images: imagesFileList,
      isActive: product.isActive,
      visibility: product.visibility,

      hasVolumeDiscount: product.hasVolumeDiscount,

      dimensions: product.dimensions,
      weight: product.weight,

      supplier: product.supplier,
    };
  }, [product, imagesFileList]);

  console.log(defaultValues);

  function onSubmit(data: ProductFormValues) {
    if (!product) return;

    updateProductMutation.mutate(
      {
        productId: product._id,
        product: data,
      },
      {
        onSuccess: function () {
          queryClient.invalidateQueries({
            queryKey: [ReactQueryKeys.GET_PRODUCT_BY_SLUG, slug],
          });
        },
      },
    );
  }

  return (
    <div className="bg-background rounded-xl p-5 shadow-md">
      <ProductForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        isPending={updateProductMutation.isPending}
      />
    </div>
  );
}

export default memo(EditProduct);
