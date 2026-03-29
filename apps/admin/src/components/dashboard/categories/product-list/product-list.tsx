'use client';

// Node Modules
import Link from 'next/link';
import { memo, useCallback, useMemo, useState } from 'react';
import { Plus, Package, ChevronDown, ShoppingBag } from '@repo/ui/lib/icons';

// Components
import ProductCard from './product-card';
import { Badge } from '@repo/ui/components/base/badge';
import { Button } from '@repo/ui/components/base/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/base/select';

// Hooks
import { useProduct } from '@/hooks/useProduct';
import { useCategory } from '@/hooks/useCategory';
import { usePagination } from '@repo/ui/hooks/usePagination';
import { useProductFilters } from '@/hooks/useProduct/useProductFilters';

function ProductList() {
  const { category: selectedCategory } = useProductFilters();

  const { categoriesFlattened } = useCategory();
  const selectedCategoryData = useMemo(() => {
    return categoriesFlattened?.categories.find(
      (category) => category._id === selectedCategory,
    );
  }, [categoriesFlattened?.categories, selectedCategory]);

  const { page, limit, handlePageSizeChange, handlePageChange } =
    usePagination();

  const { products: data } = useProduct();
  const products = useMemo(() => {
    return data?.products || [];
  }, [data?.products]);

  const [pageInput, setPageInput] = useState<string>(page.toString());

  const handleToggleProductActive = useCallback(
    (productId: string, isActive: boolean) => {
      console.log('Toggle product active:', productId, isActive);
    },
    [],
  );

  const handlePageInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPageInput(e.target.value);
    },
    [],
  );

  const handlePageInputSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const pageNum = parseInt(pageInput, 10);
      const totalPages = data?.totalPages || 1;
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
        handlePageChange(pageNum);
      } else {
        setPageInput(page.toString());
      }
    },
    [pageInput, data?.totalPages, handlePageChange, page],
  );

  const currentPage = Number(page);
  const pageSize = Number(limit);
  const totalPages = data?.totalPages || 1;
  const totalItems = data?.totalProducts || 0;

  return (
    <div className="rounded-xl border border-[var(--baladi-border)] bg-white shadow-sm">
      <div className="border-b border-[var(--baladi-border)] p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-primary)]">
              {selectedCategoryData?.name ?? 'Alle Produkter'}
            </h2>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {totalItems} Produkter
              </Badge>
              {selectedCategoryData?.isActive && (
                <Badge className="bg-green-100 text-xs text-green-700">
                  Aktiv Kategori
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard/products/new">
              <Button
                size="sm"
                className="h-8 bg-[var(--baladi-primary)] hover:bg-[var(--baladi-primary)]/90"
              >
                <Plus className="mr-1 h-3 w-3" />
                Legg til Produkt
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-4">
        {products.length === 0 ? (
          <div className="py-8 text-center">
            <Package className="mx-auto mb-4 h-12 w-12 text-[var(--baladi-gray)]" />
            <h3 className="mb-2 font-[family-name:var(--font-sora)] text-lg font-medium text-[var(--baladi-dark)]">
              Ingen produkter funnet
            </h3>
            <p className="mb-4 text-[var(--baladi-gray)]">
              {selectedCategoryData?.name
                ? `Ingen produkter i "${selectedCategoryData.name}" kategori.`
                : 'Ingen produkter matcher dine nåværende filtre.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onToggleActive={handleToggleProductActive}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination Section */}
      {totalItems > 0 && (
        <div className="border-t border-[var(--baladi-border)] bg-[var(--baladi-light)] px-4 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-gray)]">
                  Vis:
                </span>
                <Select
                  value={pageSize.toString()}
                  onValueChange={(value) => handlePageSizeChange(Number(value))}
                >
                  <SelectTrigger className="w-20 font-[family-name:var(--font-dm-sans)] text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-[var(--baladi-primary)]/10">
                  <ShoppingBag className="h-3.5 w-3.5 text-[var(--baladi-primary)]" />
                </div>
                <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                  Viser {(currentPage - 1) * pageSize + 1} til{' '}
                  {Math.min(currentPage * pageSize, totalItems)} av {totalItems}{' '}
                  produkter
                </span>
              </div>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--baladi-border)] bg-white transition-all duration-300 hover:border-[var(--baladi-primary)] hover:bg-[var(--baladi-primary)] hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-[var(--baladi-gray)]"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  title="Forrige side"
                >
                  <ChevronDown className="h-4 w-4 rotate-90" />
                </button>

                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={`page-${pageNum}`}
                      onClick={() => handlePageChange(pageNum)}
                      className={`h-8 min-w-8 rounded-lg px-3 font-[family-name:var(--font-sora)] text-sm font-medium transition-all duration-300 ${
                        pageNum === currentPage
                          ? 'bg-[var(--baladi-primary)] text-white shadow-md'
                          : 'border border-[var(--baladi-border)] bg-white text-[var(--baladi-dark)] hover:border-[var(--baladi-primary)] hover:bg-[var(--baladi-primary)] hover:text-white'
                      }`}
                      title={`Side ${pageNum}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {totalPages > 5 && (
                  <form
                    onSubmit={handlePageInputSubmit}
                    className="ml-1 flex items-center gap-1"
                  >
                    <input
                      type="text"
                      value={pageInput}
                      onChange={handlePageInputChange}
                      className="h-8 w-12 rounded-lg border border-[var(--baladi-border)] bg-white px-2 text-center font-[family-name:var(--font-dm-sans)] text-sm shadow-sm transition-all duration-300 hover:border-[var(--baladi-primary)]/50 focus:border-[var(--baladi-primary)] focus:ring-2 focus:ring-[var(--baladi-primary)]/20 focus:outline-none"
                      placeholder="Gå"
                    />
                    <button
                      type="submit"
                      className="h-8 rounded-lg border border-[var(--baladi-border)] bg-white px-2 font-[family-name:var(--font-dm-sans)] text-xs font-medium transition-all duration-300 hover:border-[var(--baladi-primary)] hover:bg-[var(--baladi-primary)] hover:text-white"
                    >
                      Gå
                    </button>
                  </form>
                )}

                <button
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--baladi-border)] bg-white transition-all duration-300 hover:border-[var(--baladi-primary)] hover:bg-[var(--baladi-primary)] hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-[var(--baladi-gray)]"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  title="Neste side"
                >
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </button>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-3 text-center">
              <span className="font-[family-name:var(--font-sora)] text-sm font-medium text-[var(--baladi-dark)]">
                Side {currentPage} av {totalPages}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(ProductList);
