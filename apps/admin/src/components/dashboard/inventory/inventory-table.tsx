'use client';

// Node Modules
import { memo, useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Eye,
  ChevronDown,
  Archive,
} from '@repo/ui/lib/icons';
import { formatDate } from '@repo/ui/lib/date';

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/base/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/base/select';
import { Input } from '@repo/ui/components/base/input';
import { Button } from '@repo/ui/components/base/button';

// Hooks
import { useInventory } from '@/hooks/useInventory';
import { usePagination } from '@repo/ui/hooks/usePagination';
import { useInventoryFilters } from '@/hooks/useInventory/useInventoryFilters';

// Types
import { InventoryStatus } from '@/hooks/useInventory/types';

function InventoryTable() {
  const router = useRouter();
  const { inventoryQuery } = useInventory();
  const { page, limit, handlePageChange, handlePageSizeChange } =
    usePagination();
  const { search, status, handleSearchFilterChange, handleStatusFilterChange } =
    useInventoryFilters();

  const inventory = useMemo(() => {
    return inventoryQuery.data?.inventory ?? [];
  }, [inventoryQuery.data]);

  const [searchQuery, setSearchQuery] = useState<string>(search ?? '');
  const [pageInput, setPageInput] = useState<string>(page.toString());

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
      const pageNum = parseInt(pageInput, 10);
      const totalPages = inventoryQuery.data?.totalPages || 1;
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
        handlePageChange(pageNum);
      } else {
        setPageInput(page.toString());
      }
    },
    [handlePageChange, inventoryQuery.data?.totalPages, page, pageInput],
  );

  const currentPage = Number(page);
  const pageSize = Number(limit);
  const totalPages = inventoryQuery.data?.totalPages || 1;
  const totalItems = inventoryQuery.data?.totalInventory || 0;

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-200">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Lageroversikt</h2>
            <p className="mt-1 text-sm text-gray-600">
              Administrer dine produktlagernivåer og overvåk lagerstatus
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="absolute top-1/2 left-4 z-10 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Søk etter produktnavn, SKU eller strekkode..."
                className="w-96 rounded-xl border-gray-200 bg-white pr-4 pl-12 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <div className="relative">
              <Filter className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Select value={status} onValueChange={handleStatusFilterChange}>
                <SelectTrigger className="w-full rounded-xl border-gray-200 bg-white py-2.5 pr-10 pl-11 text-sm font-medium shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Alle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={InventoryStatus.ALL}>Alle</SelectItem>
                  <SelectItem value={InventoryStatus.IN_STOCK}>
                    På Lager
                  </SelectItem>
                  <SelectItem value={InventoryStatus.LOW_STOCK}>
                    Lavt Lager
                  </SelectItem>
                  <SelectItem value={InventoryStatus.OUT_OF_STOCK}>
                    Tomt på Lager
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-gray-100 bg-gray-50/50">
              <TableHead className="px-8 py-4 text-left">
                Produktdetaljer
              </TableHead>
              <TableHead className="px-4 py-4 text-left">Kategori</TableHead>
              <TableHead className="px-4 py-4 text-left">Lagernivå</TableHead>
              <TableHead className="px-4 py-4 text-left text-gray-700">
                Status
              </TableHead>
              <TableHead className="px-4 py-4 text-left text-gray-700">
                Utløpsdato
              </TableHead>
              <TableHead className="px-8 py-4 text-left text-gray-700">
                Handlinger
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="px-8 py-16 text-center">
                  <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="relative">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 ring-8 ring-gray-50">
                        <Filter className="h-10 w-10 text-gray-400" />
                      </div>
                      <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 ring-2 ring-white">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                      </div>
                    </div>
                    <div className="space-y-3 text-center">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Ingen resultater funnet
                      </h3>
                      <p className="max-w-md text-sm text-gray-600">
                        Prøv å justere søkefilteret eller statusfilteret for å
                        se flere resultater.
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button
                        variant="outline"
                        className="rounded-xl border-gray-200 px-6 py-2.5 text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
                        onClick={() => window.location.reload()}
                      >
                        Oppdater Side
                      </Button>
                    </div>
                    <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span>Filtrer på status</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Søk på produkt</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              inventory.map((item) => (
                <TableRow
                  key={item._id}
                  className="group border-b border-gray-50 transition-all duration-200 hover:bg-gray-50/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/dashboard/inventory/${item._id}`);
                  }}
                >
                  <TableCell className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 ring-2 ring-blue-100 transition-all group-hover:ring-blue-200">
                          <Package className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-semibold text-gray-900">
                          {item.product.name}
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-xs font-medium text-gray-500">
                            SKU: {item.product.sku}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-6">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ${getCategoryColor(item.product.categories[0]?.name ?? '')}`}
                    >
                      {item.product.categories[0]?.name ?? 'Ingen kategori'}
                    </span>
                  </TableCell>

                  <TableCell className="px-4 py-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <span className="text-sm text-gray-500">enheter</span>
                      </div>
                      <div className="w-24">
                        <div className="h-2 rounded-full bg-gray-200">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getStockProgressColor(
                              item.quantity,
                              new Date(item.expirationDate),
                            )}`}
                            style={{
                              width: getStockProgressWidth(
                                item.quantity,
                                new Date(item.expirationDate),
                              ),
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-6">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(
                        item.quantity,
                        new Date(item.expirationDate),
                      )}
                      {getStatusBadge(
                        item.quantity,
                        new Date(item.expirationDate),
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-6">
                    <div className="text-sm text-gray-600">
                      {formatDate(new Date(item.expirationDate), 'MMM d, yyyy')}
                    </div>
                  </TableCell>

                  <TableCell className="px-8 py-6">
                    <Button
                      variant="outline"
                      className="group/btn w-full rounded-lg text-gray-400 transition-all hover:bg-green-50 hover:text-green-600"
                      title="Vis Detaljer"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/dashboard/inventory/${item._id}`);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="border-t border-gray-100 bg-gray-50/50 px-8 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Vis:</span>
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => handlePageSizeChange(Number(value))}
              >
                <SelectTrigger className="w-20 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {totalItems > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-100">
                  <Archive className="h-3.5 w-3.5 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600">
                  Viser {(currentPage - 1) * pageSize + 1} til{' '}
                  {Math.min(currentPage * pageSize, totalItems)} av {totalItems}{' '}
                  lagerenheter
                </span>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-400"
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
                    className={`h-8 min-w-8 rounded-lg px-3 text-sm font-medium transition-all duration-300 ${
                      pageNum === currentPage
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'border border-gray-200 bg-white text-gray-700 hover:border-blue-500 hover:bg-blue-500 hover:text-white'
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
                    className="h-8 w-12 rounded-lg border border-gray-200 bg-white px-2 text-center text-sm shadow-sm transition-all duration-300 hover:border-blue-500/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                    placeholder="Gå"
                  />
                  <button
                    type="submit"
                    className="h-8 rounded-lg border border-gray-200 bg-white px-2 text-xs font-medium transition-all duration-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
                  >
                    Gå
                  </button>
                </form>
              )}

              <button
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-400"
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
            <span className="text-sm font-medium text-gray-700">
              Side {currentPage} av {totalPages}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(InventoryTable);

function getDaysUntilExpiration(expirationDate: Date) {
  const today = new Date();
  const diffTime = expirationDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getStatusIcon(quantity: number, expirationDate: Date) {
  const daysUntilExpiry = getDaysUntilExpiration(expirationDate);

  if (quantity === 0) return <XCircle className="h-5 w-5 text-red-500" />;
  if (daysUntilExpiry <= 7 || quantity <= 5)
    return <AlertTriangle className="h-5 w-5 text-amber-500" />;
  return <CheckCircle className="h-5 w-5 text-emerald-500" />;
}

function getStatusBadge(quantity: number, expirationDate: Date) {
  const daysUntilExpiry = getDaysUntilExpiration(expirationDate);

  if (quantity === 0)
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 ring-1 ring-red-600/20">
        <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
        Tomt på Lager
      </div>
    );
  if (daysUntilExpiry <= 7 || quantity <= 5)
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-600/20">
        <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
        {daysUntilExpiry <= 7 ? 'Utløper Snart' : 'Lavt Lager'}
      </div>
    );
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
      På Lager
    </div>
  );
}

function getStockProgressColor(quantity: number, expirationDate: Date) {
  const daysUntilExpiry = getDaysUntilExpiration(expirationDate);

  if (quantity === 0) return 'bg-red-500';
  if (daysUntilExpiry <= 7 || quantity <= 5) return 'bg-amber-500';
  return 'bg-emerald-500';
}

function getStockProgressWidth(quantity: number, expirationDate: Date) {
  const daysUntilExpiry = getDaysUntilExpiration(expirationDate);

  if (quantity === 0) return '0%';

  const quantityPercentage = Math.min((quantity / 20) * 100, 100);
  const expiryPercentage = Math.min((daysUntilExpiry / 30) * 100, 100);

  const finalPercentage = Math.min(quantityPercentage, expiryPercentage);

  return `${Math.max(finalPercentage, 5)}%`;
}

function getCategoryColor(category: string) {
  const colors = {
    Beverages: 'bg-blue-100 text-blue-800 ring-blue-600/20',
    Sweeteners: 'bg-purple-100 text-purple-800 ring-purple-600/20',
    Confectionery: 'bg-pink-100 text-pink-800 ring-pink-600/20',
    Oils: 'bg-yellow-100 text-yellow-800 ring-yellow-600/20',
    Dairy: 'bg-green-100 text-green-800 ring-green-600/20',
  };
  return (
    colors[category as keyof typeof colors] ||
    'bg-gray-100 text-gray-800 ring-gray-600/20'
  );
}
