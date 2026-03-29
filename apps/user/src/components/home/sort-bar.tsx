'use client';

// Node Modules
import { useMemo, memo } from 'react';
// import { ArrowDownAZ, ArrowUpAZ, Star, Clock } from '@repo/ui/lib/icons';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@repo/ui/components/base/dropdown-menu';
// import { Button } from '@repo/ui/components/base/button';

// Hooks
import { useProducts } from '@/hooks/useProduct';
// import { useProductFilters } from '@/hooks/useProduct/useProductFilters';

// Types
// import { ProductSort } from '@/hooks/useProduct/types';

// const sortOptions = [
//   {
//     id: ProductSort.POPULARITY,
//     label: 'Popularitet',
//     icon: <Star size={16} />,
//   },
//   {
//     id: ProductSort.PRICE_ASC,
//     label: 'Pris: Lav til Høy',
//     icon: <ArrowUpAZ size={16} />,
//   },
//   {
//     id: ProductSort.PRICE_DESC,
//     label: 'Pris: Høy til Lav',
//     icon: <ArrowDownAZ size={16} />,
//   },
//   { id: ProductSort.NEWEST, label: 'Nyeste', icon: <Clock size={16} /> },
// ];

function ProductsSortBar() {
  // const { handleSortChange } = useProductFilters();
  const { data: productsData, isLoading } = useProducts();

  const statusText = useMemo(() => {
    if (isLoading) return 'Laster produkter...';

    if (!productsData) return 'Ingen produkter funnet';

    const { totalProducts } = productsData;

    return `${totalProducts} produkter`;
  }, [isLoading, productsData]);

  return (
    <div className="mb-6 flex items-center justify-between rounded-lg border border-[var(--baladi-border)] bg-white p-4 shadow-sm transition-all duration-300 hover:border-[var(--baladi-primary)]/20 hover:shadow-md">
      <div className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
        {statusText}
      </div>

      {/* <div className="flex items-center gap-3">
        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-[var(--baladi-border)] font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)] transition-all duration-200 hover:border-[var(--baladi-primary)] hover:bg-[var(--baladi-light)] hover:text-[var(--baladi-primary)]"
              >
                Sorter Etter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 border-[var(--baladi-border)] bg-white shadow-lg"
            >
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.id}
                  onClick={() => handleSortChange(option.id)}
                  className="flex cursor-pointer items-center gap-3 px-3 py-2 font-[family-name:var(--font-dm-sans)] text-sm transition-colors hover:bg-[var(--baladi-light)] focus:bg-[var(--baladi-light)]"
                >
                  <span className="text-[var(--baladi-primary)]">
                    {option.icon}
                  </span>
                  <span className="text-[var(--baladi-dark)]">
                    {option.label}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div> */}
    </div>
  );
}

export default memo(ProductsSortBar);
