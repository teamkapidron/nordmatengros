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
      <div className="flex flex-wrap gap-3 rounded-xl bg-[var(--baladi-light)] p-2">
        <button
          onClick={() => handleTabClick(OrderStatusFilter.ALL)}
          className={cn(
            'group relative flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-3 font-[family-name:var(--font-dm-sans)] text-sm font-medium transition-all duration-300',
            status === OrderStatusFilter.ALL
              ? 'to-[var(--baladi-primary)]/80 bg-gradient-to-r from-[var(--baladi-primary)] text-white shadow-lg'
              : 'text-[var(--baladi-gray)] hover:bg-white hover:text-[var(--baladi-dark)] hover:shadow-md',
          )}
        >
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded transition-all duration-300',
              status === OrderStatusFilter.ALL
                ? 'bg-white/20'
                : 'bg-[var(--baladi-primary)]/10 group-hover:bg-[var(--baladi-primary)]/20',
            )}
          >
            <ShoppingBag
              className={cn(
                'h-3.5 w-3.5 transition-colors duration-300',
                status === OrderStatusFilter.ALL
                  ? 'text-white'
                  : 'text-[var(--baladi-primary)]',
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
              ? 'to-[var(--baladi-warning)]/80 bg-gradient-to-r from-[var(--baladi-warning)] text-white shadow-lg'
              : 'text-[var(--baladi-gray)] hover:bg-white hover:text-[var(--baladi-dark)] hover:shadow-md',
          )}
        >
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded transition-all duration-300',
              status === OrderStatusFilter.PENDING
                ? 'bg-white/20'
                : 'bg-[var(--baladi-warning)]/10 group-hover:bg-[var(--baladi-warning)]/20',
            )}
          >
            <Clock
              className={cn(
                'h-3.5 w-3.5 transition-colors duration-300',
                status === OrderStatusFilter.PENDING
                  ? 'text-white'
                  : 'text-[var(--baladi-warning)]',
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
              ? 'to-[var(--baladi-secondary)]/80 bg-gradient-to-r from-[var(--baladi-secondary)] text-white shadow-lg'
              : 'text-[var(--baladi-gray)] hover:bg-white hover:text-[var(--baladi-dark)] hover:shadow-md',
          )}
        >
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded transition-all duration-300',
              status === OrderStatusFilter.CONFIRMED
                ? 'bg-white/20'
                : 'bg-[var(--baladi-secondary)]/10 group-hover:bg-[var(--baladi-secondary)]/20',
            )}
          >
            <CheckCircle
              className={cn(
                'h-3.5 w-3.5 transition-colors duration-300',
                status === OrderStatusFilter.CONFIRMED
                  ? 'text-white'
                  : 'text-[var(--baladi-secondary)]',
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
              ? 'to-[var(--baladi-accent)]/80 bg-gradient-to-r from-[var(--baladi-accent)] text-white shadow-lg'
              : 'text-[var(--baladi-gray)] hover:bg-white hover:text-[var(--baladi-dark)] hover:shadow-md',
          )}
        >
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded transition-all duration-300',
              status === OrderStatusFilter.SHIPPED
                ? 'bg-white/20'
                : 'bg-[var(--baladi-accent)]/10 group-hover:bg-[var(--baladi-accent)]/20',
            )}
          >
            <TruckIcon
              className={cn(
                'h-3.5 w-3.5 transition-colors duration-300',
                status === OrderStatusFilter.SHIPPED
                  ? 'text-white'
                  : 'text-[var(--baladi-accent)]',
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
              ? 'to-[var(--baladi-success)]/80 bg-gradient-to-r from-[var(--baladi-success)] text-white shadow-lg'
              : 'text-[var(--baladi-gray)] hover:bg-white hover:text-[var(--baladi-dark)] hover:shadow-md',
          )}
        >
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded transition-all duration-300',
              status === OrderStatusFilter.DELIVERED
                ? 'bg-white/20'
                : 'bg-[var(--baladi-success)]/10 group-hover:bg-[var(--baladi-success)]/20',
            )}
          >
            <PackageCheck
              className={cn(
                'h-3.5 w-3.5 transition-colors duration-300',
                status === OrderStatusFilter.DELIVERED
                  ? 'text-white'
                  : 'text-[var(--baladi-success)]',
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
              ? 'to-[var(--baladi-error)]/80 bg-gradient-to-r from-[var(--baladi-error)] text-white shadow-lg'
              : 'text-[var(--baladi-gray)] hover:bg-white hover:text-[var(--baladi-dark)] hover:shadow-md',
          )}
        >
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded transition-all duration-300',
              status === OrderStatusFilter.CANCELLED
                ? 'bg-white/20'
                : 'bg-[var(--baladi-error)]/10 group-hover:bg-[var(--baladi-error)]/20',
            )}
          >
            <XCircle
              className={cn(
                'h-3.5 w-3.5 transition-colors duration-300',
                status === OrderStatusFilter.CANCELLED
                  ? 'text-white'
                  : 'text-[var(--baladi-error)]',
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
