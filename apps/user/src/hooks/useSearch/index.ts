// Node Modules
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import type {
  QuickSearchProductsRequest,
  FullSearchProductsRequest,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useProductSearch() {
  const api = useRequest();

  const getQuickSearchProducts = useCallback(async () => {
    const response = await api.get<QuickSearchProductsRequest['response']>(
      '/product/search/quick',
    );
    return response.data.data;
  }, [api]);

  const quickSearchProductsQuery = useQuery({
    queryKey: [ReactQueryKeys.QUICK_SEARCH_PRODUCTS],
    queryFn: getQuickSearchProducts,
  });

  const getFullSearchProducts = useCallback(async () => {
    const response =
      await api.get<FullSearchProductsRequest['response']>('/product/search');
    return response.data.data;
  }, [api]);

  const fullSearchProductsQuery = useQuery({
    queryKey: [ReactQueryKeys.FULL_SEARCH_PRODUCTS],
    queryFn: getFullSearchProducts,
  });

  return {
    quickSearchProductsQuery,
    fullSearchProductsQuery,
  };
}
