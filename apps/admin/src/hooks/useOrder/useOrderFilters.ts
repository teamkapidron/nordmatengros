import debounce from 'lodash.debounce';
import { useCallback, useEffect, useRef } from 'react';
import { parseAsString, parseAsStringEnum, useQueryState } from 'nuqs';

import { OrderStatusFilter } from './types';
import { OrderStatus } from '@repo/types/order';

export function toOrderStatus(
  status: OrderStatusFilter,
): OrderStatus | undefined {
  if (status === OrderStatusFilter.ALL) return undefined;
  return status as unknown as OrderStatus;
}

export function useOrderFilters(debounceDelay = 400) {
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('').withOptions({
      clearOnDefault: true,
    }),
  );
  const [status, setStatus] = useQueryState(
    'status',
    parseAsStringEnum<OrderStatusFilter>(Object.values(OrderStatusFilter))
      .withDefault(OrderStatusFilter.ALL)
      .withOptions({
        clearOnDefault: true,
      }),
  );

  const debouncedSearchUpdateRef = useRef(
    debounce((search: string) => {
      setSearch(search);
    }, debounceDelay),
  );

  useEffect(() => {
    const searchUpdateRef = debouncedSearchUpdateRef.current;

    return () => {
      searchUpdateRef.cancel();
    };
  }, []);

  const handleStatusFilterChange = useCallback(
    (status: OrderStatusFilter) => {
      setStatus(status);
    },
    [setStatus],
  );

  const handleSearchFilterChange = useCallback((search: string) => {
    debouncedSearchUpdateRef.current(search);
  }, []);

  return {
    status,
    handleStatusFilterChange,

    search,
    handleSearchFilterChange,
  };
}
