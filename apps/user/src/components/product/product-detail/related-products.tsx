'use client';

// Node Modules
import Link from 'next/link';
import React, { memo, useMemo } from 'react';
import { ArrowRight } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import ProductCard from '@/components/product/product-card';

// Hooks
import { useProducts } from '@/hooks/useProduct';

function RelatedProducts() {
  const { data: productsData, isLoading } = useProducts();

  const relatedProducts = useMemo(() => {
    return productsData?.products?.slice(0, 4) || [];
  }, [productsData?.products]);

  if (isLoading) {
    return (
      <div className="mt-12 space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-[var(--baladi-light)]" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-square w-full animate-pulse rounded-lg bg-[var(--baladi-light)]" />
              <div className="h-6 w-3/4 animate-pulse rounded bg-[var(--baladi-light)]" />
              <div className="h-5 w-1/2 animate-pulse rounded bg-[var(--baladi-light)]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!relatedProducts.length) {
    return null;
  }

  return (
    <div className="mt-12 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)]">
          Relaterte produkter
        </h2>
        <Button variant="ghost" asChild className="group">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-primary)]">
              Se alle produkter
            </span>
            <ArrowRight
              size={16}
              className="text-[var(--baladi-primary)] transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            className="bg-white shadow-sm transition-shadow hover:shadow-md"
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button asChild size="lg" variant="outline">
          <Link
            href="/"
            className="font-[family-name:var(--font-dm-sans)] font-medium"
          >
            Utforsk hele vårt utvalg
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default memo(RelatedProducts);
