// Node Modules
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import type {
  GetCategoriesRequest,
  GetCategoriesFlattenedRequest,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useCategory() {
  const api = useRequest();

  const getCategories = useCallback(async () => {
    const response =
      await api.get<GetCategoriesRequest['response']>('/category/list');
    return response.data.data;
  }, [api]);

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: [ReactQueryKeys.GET_CATEGORIES],
    queryFn: getCategories,
  });

  return {
    categories,
    isCategoriesLoading,
  };
}

export function useCategoryFlattened() {
  const api = useRequest();

  const getCategoriesFlattened = useCallback(
    async (params: GetCategoriesFlattenedRequest['payload']) => {
      const response = await api.get<GetCategoriesFlattenedRequest['response']>(
        '/category/flattened',
        {
          params,
        },
      );
      return response.data.data;
    },
    [api],
  );

  const { data: categoriesFlattened, isLoading: isCategoriesFlattenedLoading } =
    useQuery({
      queryKey: [ReactQueryKeys.GET_CATEGORIES_FLATTENED],
      queryFn: () => getCategoriesFlattened({ page: 1, limit: 100 }),
    });

  return {
    categoriesFlattened,
    isCategoriesFlattenedLoading,
  };
}
