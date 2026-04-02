'use client';

// Node Modules
import { cn } from '@repo/ui/lib/utils';
import { memo, useCallback } from 'react';
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  TruckIcon,
  PackageCheck,
  XCircle,
} from '@repo/ui/lib/icons';

// Hooks
import { useOrderFilters } from '@/hooks/useOrder/useOrderFilters';

// Types
import { OrderStatusFilter } from '@/hooks/useOrder/types';

function OrderStatusTabs() {
  const { status, handleStatusFilterChange } = useOrderFilters();

  const handleTabClick = useCallback(
    (tab: OrderStatusFilter) => {
      handleStatusFilterChange(tab);
    },
    [handleStatusFilterChange],
  );

  return (
    <div className="mb-6 mt-6">
      <div className="flex flex-wrap gap-3 rounded-xl bg-[var(--nordmat-light)] p-2">
        <button
          onClick={() => handleTabClick(OrderStatusFilter.ALL)}
          className={cn(
            'group relative flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-3 font-[family-name:var(--font-dm-sans)] text-sm font-medium transition-all duration-300',
            status === OrderStatusFilter.ALL
              ? 'to-[var(--nordmat-primary)]/80 bg-gradient-to-r from-[var(--nordmat-primary)] text-white shadow-lg'
              : 'text-[var(--nordmat-gray)] hover:bg-white hover:text-[var(--nordmat-dark)] hover:shadow-md',
          )}
        >
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded transition-all duration-300',
              status === OrderStatusFilter.ALL
                ? 'bg-white/20'
                : 'bg-[var(--nordmat-primary)]/10 group-hover:bg-[var(--nordmat-primary)]/20',
            )}
          >
            <ShoppingBag
              className={cn(
                'h-3.5 w-3.5 transition-colors duration-300',
                status === OrderStatusFilter.ALL
                  ? 'text-white'
                  : 'text-[var(--nordmat-primary)]',
              )}
            />
          </div>
          <span>Alle Bestillinger</span>
        </button>

        <button
          onClick={() => handleTabClick(OrderStatusFilter.PENDING)}
          className={cn(
            'group relative flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-3 font-[family-name:var(--font-dm-sans)] text-sm font-medium transition-all duration-300',
            status === OrderStatusFilter.PENDING
              ? 'to-[var(--nordmat-warning)]/80 bg-gradient-to-r from-[var(--nordmat-warning)] text-white shadow-lg'
              : 'text-[var(--nordmat-gray)] hover:bg-white hover:text-[var(--nordmat-dark)] hover:shadow-md',
          )}
        >
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded transition-all duration-300',
              status === OrderStatusFilter.PENDING
                ? 'bg-white/20'
                : 'bg-[var(--nordmat-warning)]/10 group-hover:bg-[var(--nordmat-warning)]/20',
            )}
          >
            <Clock
              className={cn(
                'h-3.5 w-3.5 transition-colors duration-300',
                status === OrderStatusFilter.PENDING
                  ? 'text-white'
                  : 'text-[var(--nordmat-warning)]',
              )}
            />
          </div>
          <span>Ventende</span>
        </button>

        <button
          onClick={() => handleTabClick(OrderStatusFilter.CONFIRMED)}
          className={cn(
            'group relative flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-3 font-[family-name:var(--font-dm-sans)] text-sm font-medium transition-all duration-300',
            status === OrderStatusFilter.CONFIRMED
              ? 'to-[var(--nordmat-secondary)]/80 bg-gradient-to-r from-[var(--nordmat-secondary)] text-white shadow-lg'
              : 'text-[var(--nordmat-gray)] hover:bg-white hover:text-[var(--nordmat-dark)] hover:shadow-md',
          )}
        >
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded transition-all duration-300',
              status === OrderStatusFilter.CONFIRMED
                ? 'bg-white/20'
                : 'bg-[var(--nordmat-secondary)]/10 group-hover:bg-[var(--nordmat-secondary)]/20',
            )}
          >
            <CheckCircle
              className={cn(
                'h-3.5 w-3.5 transition-colors duration-300',
                status === OrderStatusFilter.CONFIRMED
                  ? 'text-white'
                  : 'text-[var(--nordmat-secondary)]',
              )}
            />
          </div>
          <span>Bekreftet</span>
        </button>

        <button
          onClick={() => handleTabClick(OrderStatusFilter.SHIPPED)}
          className={cn(
            'group relative flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-3 font-[family-name:var(--font-dm-sans)] text-sm font-medium transition-all duration-300',
            status === OrderStatusFilter.SHIPPED
              ? 'to-[var(--nordmat-accent)]/80 bg-gradient-to-r from-[var(--nordmat-accent)] text-white shadow-lg'
              : 'text-[var(--nordmat-gray)] hover:bg-white hover:text-[var(--nordmat-dark)] hover:shadow-md',
          )}
        >
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded transition-all duration-300',
              status === OrderStatusFilter.SHIPPED
                ? 'bg-white/20'
                : 'bg-[var(--nordmat-accent)]/10 group-hover:bg-[var(--nordmat-accent)]/20',
            )}
          >
            <TruckIcon
              className={cn(
                'h-3.5 w-3.5 transition-colors duration-300',
                status === OrderStatusFilter.SHIPPED
                  ? 'text-white'
                  : 'text-[var(--nordmat-accent)]',
              )}
            />
          </div>
          <span>Sendt</span>
        </button>

        <button
          onClick={() => handleTabClick(OrderStatusFilter.DELIVERED)}
          className={cn(
            'group relative flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-3 font-[family-name:var(--font-dm-sans)] text-sm font-medium transition-all duration-300',
            status === OrderStatusFilter.DELIVERED
              ? 'to-[var(--nordmat-success)]/80 bg-gradient-to-r from-[var(--nordmat-success)] text-white shadow-lg'
              : 'text-[var(--nordmat-gray)] hover:bg-white hover:text-[var(--nordmat-dark)] hover:shadow-md',
          )}
        >
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded transition-all duration-300',
              status === OrderStatusFilter.DELIVERED
                ? 'bg-white/20'
                : 'bg-[var(--nordmat-success)]/10 group-hover:bg-[var(--nordmat-success)]/20',
            )}
          >
            <PackageCheck
              className={cn(
                'h-3.5 w-3.5 transition-colors duration-300',
                status === OrderStatusFilter.DELIVERED
                  ? 'text-white'
                  : 'text-[var(--nordmat-success)]',
              )}
            />
          </div>
          <span>Levert</span>
        </button>

        <button
          onClick={() => handleTabClick(OrderStatusFilter.CANCELLED)}
          className={cn(
            'group relative flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-3 font-[family-name:var(--font-dm-sans)] text-sm font-medium transition-all duration-300',
            status === OrderStatusFilter.CANCELLED
              ? 'to-[var(--nordmat-error)]/80 bg-gradient-to-r from-[var(--nordmat-error)] text-white shadow-lg'
              : 'text-[var(--nordmat-gray)] hover:bg-white hover:text-[var(--nordmat-dark)] hover:shadow-md',
          )}
        >
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded transition-all duration-300',
              status === OrderStatusFilter.CANCELLED
                ? 'bg-white/20'
                : 'bg-[var(--nordmat-error)]/10 group-hover:bg-[var(--nordmat-error)]/20',
            )}
          >
            <XCircle
              className={cn(
                'h-3.5 w-3.5 transition-colors duration-300',
                status === OrderStatusFilter.CANCELLED
                  ? 'text-white'
                  : 'text-[var(--nordmat-error)]',
              )}
            />
          </div>
          <span>Kansellert</span>
        </button>
      </div>
    </div>
  );
}

export default memo(OrderStatusTabs);
