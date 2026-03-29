// Node Modules
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import type { GetBulkDiscountsRequest } from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useDiscount() {
  const api = useRequest();

  const getBulkDiscounts = useCallback(async () => {
    const response = await api.get<GetBulkDiscountsRequest['response']>(
      '/discount/bulk/active',
    );
    return response.data.data;
  }, [api]);

  const bulkDiscountQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_BULK_DISCOUNTS],
    queryFn: getBulkDiscounts,
    staleTime: Infinity,
    gcTime: Infinity,
    initialData: {
      bulkDiscounts: [
        {
          _id: '684aaedda1c87a978cbff482',
          minQuantity: 2,
          discountPercentage: 2,
          isActive: true,
          createdAt: new Date('2025-06-12T00:00:00.000Z'),
          updatedAt: new Date('2025-06-12T00:00:00.000Z'),
        },
        {
          _id: '684aaf49a1c87a978cbff483',
          minQuantity: 5,
          discountPercentage: 5,
          isActive: true,
          createdAt: new Date('2025-06-12T00:00:00.000Z'),
          updatedAt: new Date('2025-06-12T00:00:00.000Z'),
        },
        {
          _id: '684aaf56a1c87a978cbff484',
          minQuantity: 10,
          discountPercentage: 7,
          isActive: true,
          createdAt: new Date('2025-06-12T00:00:00.000Z'),
          updatedAt: new Date('2025-06-12T00:00:00.000Z'),
        },
      ],
    },
  });

  return {
    bulkDiscountQuery,
  };
}
