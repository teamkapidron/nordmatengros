'use client';

import Link from 'next/link';
import React, { memo } from 'react';
import { Plus, ChevronLeft, ChevronRight } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/base/select';
import OrderCard from './order-card';
import EmptyOrderState from '../detail/empty-order-state';
import OrderListSkeleton from './order-skeleton';
import ScrollToTop from '@/components/common/scroll-to-top';

// Hooks
import { useOrder } from '@/hooks/useOrder';
import { usePagination } from '@repo/ui/hooks/usePagination';

function OrderListContent() {
  const {
    page,
    limit,
    handlePageSizeChange,
    handlePageChange,
    goToNextPage,
    goToPreviousPage,
  } = usePagination();
  const { myOrders, isMyOrdersLoading } = useOrder();

  if (isMyOrdersLoading) {
    return <OrderListSkeleton />;
  }

  if (!myOrders?.orders || myOrders.orders.length === 0) {
    return <EmptyOrderState />;
  }

  const totalPages = myOrders?.totalPages || 1;
  const currentPage = Number(page);

  return (
    <React.Fragment>
      <ScrollToTop />
      <div className="space-y-8">
        <div className="flex flex-col gap-4 rounded-lg border border-[var(--baladi-border)] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Vis per side:
            </span>
            <Select
              value={limit}
              onValueChange={(value) => handlePageSizeChange(Number(value))}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Side {currentPage} av {totalPages} ({myOrders?.totalOrders || 0}{' '}
              bestillinger)
            </span>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousPage}
                disabled={currentPage <= 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft size={16} />
              </Button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className="h-8 w-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={currentPage >= totalPages}
                className="h-8 w-8 p-0"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {myOrders.orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-gradient-to-r from-[var(--baladi-light)]/50 to-[var(--baladi-primary)]/5 p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--baladi-primary)]/10">
            <Plus size={24} className="text-[var(--baladi-primary)]" />
          </div>
          <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
            Trenger du mer?
          </h3>
          <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
            Utforsk vårt store utvalg av kvalitetsprodukter for din virksomhet
          </p>
          <Button className="mt-4">
            <Link href="/" className="flex flex-row items-center">
              <Plus size={16} className="mr-2" />
              Fortsett å handle
            </Link>
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default memo(OrderListContent);
