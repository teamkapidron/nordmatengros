'use client';

// Node Modules
import { memo, useCallback, useState } from 'react';
import { ChevronDown, Search, Filter, ShoppingBag } from '@repo/ui/lib/icons';

// Components
import { Input } from '@repo/ui/components/base/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/base/select';

// Hooks
import { useOrder } from '@/hooks/useOrder';
import { usePagination } from '@repo/ui/hooks/usePagination';
import { useOrderFilters } from '@/hooks/useOrder/useOrderFilters';

function OrderTableFilters() {
  const { page, limit, handlePageSizeChange, handlePageChange } =
    usePagination();

  const { orders } = useOrder();
  const { search, handleSearchFilterChange } = useOrderFilters();

  const currentPage = Number(page);
  const pageSize = Number(limit);
  const totalPages = orders?.totalPages || 1;

  const [searchQuery, setSearchQuery] = useState<string>(search ?? '');
  const [pageInput, setPageInput] = useState<string>(currentPage.toString());

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      handleSearchFilterChange(e.target.value);
    },
    [handleSearchFilterChange],
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
      const page = parseInt(pageInput, 10);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        handlePageChange(page);
      } else {
        setPageInput(currentPage.toString());
      }
    },
    [currentPage, handlePageChange, pageInput, totalPages],
  );

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <div className="bg-[var(--baladi-primary)]/10 flex h-8 w-8 items-center justify-center rounded-lg">
              <Filter className="h-4 w-4 text-[var(--baladi-primary)]" />
            </div>
            <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-gray)]">
              Søk Bestillinger
            </span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
            <Input
              type="text"
              placeholder="Søk etter bestillings-ID, kundenavn eller adresse..."
              className="w-80 pl-9 pr-4 font-[family-name:var(--font-dm-sans)] text-sm"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

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
                    className="hover:border-[var(--baladi-primary)]/50 focus:ring-[var(--baladi-primary)]/20 h-8 w-12 rounded-lg border border-[var(--baladi-border)] bg-white px-2 text-center font-[family-name:var(--font-dm-sans)] text-sm shadow-sm transition-all duration-300 focus:border-[var(--baladi-primary)] focus:outline-none focus:ring-2"
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
      </div>

      {orders && (
        <div className="flex items-center justify-between rounded-lg bg-[var(--baladi-light)] px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="bg-[var(--baladi-primary)]/10 flex h-6 w-6 items-center justify-center rounded">
              <ShoppingBag className="h-3.5 w-3.5 text-[var(--baladi-primary)]" />
            </div>
            <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Viser {(currentPage - 1) * pageSize + 1} til{' '}
              {Math.min(currentPage * pageSize, orders.totalOrders)} av{' '}
              {orders.totalOrders} bestillinger
            </span>
          </div>
          {totalPages > 1 && (
            <span className="font-[family-name:var(--font-sora)] text-sm font-medium text-[var(--baladi-dark)]">
              Side {currentPage} av {totalPages}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(OrderTableFilters);
