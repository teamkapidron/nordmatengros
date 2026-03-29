'use client';

// Node Modules
import { memo, useState, useCallback } from 'react';
import { ChevronDown, Search, Filter, Users } from '@repo/ui/lib/icons';

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
import { useUsers } from '@/hooks/useUsers';
import { usePagination } from '@repo/ui/hooks/usePagination';
import { useUserFilter } from '@/hooks/useUsers/useUserFilter';

// Types
import { UserType } from '@repo/types/user';

function CustomerTableFilters() {
  const { users } = useUsers();
  const { page, limit, handlePageSizeChange, handlePageChange } =
    usePagination();
  const { search, userType, handleSearchFilter, handleUserTypeFilter } =
    useUserFilter();

  const currentPage = Number(page);
  const pageSize = Number(limit);
  const totalPages = users?.totalPages || 1;

  const [searchQuery, setSearchQuery] = useState<string>(search);
  const [pageInput, setPageInput] = useState<string>(currentPage.toString());

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      handleSearchFilter(e.target.value);
    },
    [handleSearchFilter],
  );

  const handleUserTypeChange = useCallback(
    (userType: string) => {
      if (userType === 'all') {
        handleUserTypeFilter(undefined);
      } else {
        handleUserTypeFilter(userType as UserType);
      }
    },
    [handleUserTypeFilter],
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
            <Input
              type="text"
              placeholder="Søk kunder (navn, e-post, firma, org.nr, telefon, adresse)..."
              className="w-96 pl-9 pr-4 font-[family-name:var(--font-dm-sans)] text-sm"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-[var(--baladi-primary)]/10 flex h-8 w-8 items-center justify-center rounded-lg">
              <Filter className="h-4 w-4 text-[var(--baladi-primary)]" />
            </div>
            <Select
              value={userType || 'all'}
              onValueChange={handleUserTypeChange}
            >
              <SelectTrigger className="w-40 font-[family-name:var(--font-dm-sans)] text-sm">
                <SelectValue placeholder="Brukertype" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle typer</SelectItem>
                <SelectItem value={UserType.INTERNAL}>Intern</SelectItem>
                <SelectItem value={UserType.EXTERNAL}>Ekstern</SelectItem>
              </SelectContent>
            </Select>
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
                <SelectItem value="100">100</SelectItem>
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

              {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
                let pageNum: number;

                if (totalPages <= 5) {
                  pageNum = index + 1;
                } else if (currentPage <= 3) {
                  pageNum = index + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + index;
                } else {
                  pageNum = currentPage - 2 + index;
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
                    onChange={(e) => setPageInput(e.target.value)}
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

      <div className="flex items-center justify-between rounded-lg bg-[var(--baladi-light)] px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="bg-[var(--baladi-primary)]/10 flex h-6 w-6 items-center justify-center rounded">
            <Users className="h-3.5 w-3.5 text-[var(--baladi-primary)]" />
          </div>
          <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Viser {(currentPage - 1) * pageSize + 1} til{' '}
            {Math.min(currentPage * pageSize, users?.totalRecords || 0)} av{' '}
            {users?.totalRecords || 0} kunder
            {searchQuery && (
              <span className="ml-1 font-medium text-[var(--baladi-primary)]">
                for &quot;{searchQuery}&quot;
              </span>
            )}
          </span>
        </div>
        {totalPages > 1 && (
          <span className="font-[family-name:var(--font-sora)] text-sm font-medium text-[var(--baladi-dark)]">
            Side {currentPage} av {totalPages}
          </span>
        )}
      </div>
    </div>
  );
}

export default memo(CustomerTableFilters);
