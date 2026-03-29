'use client';

// Node Modules
import { memo, useMemo, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

// Components
import { Skeleton } from '@repo/ui/components/base/skeleton';
import ProductCard from '@/components/product/product-card';

// Hooks
import { useInfiniteProducts } from '@/hooks/useProduct';

function ProductGrid() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteProducts();
  const products = useMemo(() => {
    return data?.pages.flatMap((page) => page.products) || [];
  }, [data]);

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '200px',
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  if (isLoading) {
    return <ProductLoadingSkeleton />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mb-4 rounded-lg bg-[var(--baladi-light)] p-8 text-center">
          <h3 className="mb-2 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
            Ingen produkter funnet
          </h3>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Prøv å justere filtrene dine eller søk etter noe annet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-8">
          {isFetchingNextPage ? (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--baladi-primary)] border-t-transparent" />
              <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                Laster flere produkter...
              </span>
            </div>
          ) : (
            <div className="h-4" />
          )}
        </div>
      )}

      {!hasNextPage && products.length > 0 && (
        <div className="py-8 text-center">
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Du har sett alle produktene
          </p>
        </div>
      )}
    </div>
  );
}

export default memo(ProductGrid);

const ProductLoadingSkeleton = memo(() => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg border border-[var(--baladi-border)] bg-white p-4"
        >
          <Skeleton className="mb-4 aspect-square w-full rounded-md" />
          <Skeleton className="mb-2 h-4 w-3/4" />
          <Skeleton className="mb-2 h-4 w-1/2" />
          <Skeleton className="h-8 w-full" />
        </div>
      ))}
    </div>
  );
});
