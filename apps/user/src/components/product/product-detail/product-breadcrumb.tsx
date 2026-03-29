'use client';

// Node Modules
import React, { memo, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Home } from '@repo/ui/lib/icons';

// Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@repo/ui/components/base/breadcrumb';

// Hooks
import { useProductBySlug } from '@/hooks/useProduct';

function ProductBreadcrumb() {
  const { slug } = useParams<{ slug: string }>();
  const { data: productData } = useProductBySlug(slug);

  const { categoryName, productName, categoryId } = useMemo(() => {
    return {
      categoryName: productData?.product?.categories[0]?.name,
      productName: productData?.product?.name,
      categoryId: productData?.product?.categories[0]?._id,
    };
  }, [productData]);

  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="flex items-center font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)] hover:text-[var(--baladi-primary)]"
          >
            <Home size={16} className="mr-1.5" />
            <span>Hjem</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)] hover:text-[var(--baladi-primary)]"
          >
            Produkter
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/?category=${categoryId}`}
            className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)] hover:text-[var(--baladi-primary)]"
          >
            {categoryName}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="max-w-[200px] truncate font-[family-name:var(--font-dm-sans)] text-[var(--baladi-dark)]">
            {productName}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default memo(ProductBreadcrumb);
