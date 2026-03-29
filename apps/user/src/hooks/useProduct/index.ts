// Node Modules
import { useCallback } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

// Hooks
import { useRequest } from '@/hooks/useRequest';
import { useProductFilters } from './useProductFilters';
import { usePagination } from '@repo/ui/hooks/usePagination';

// Types
import type {
  GetProductsRequest,
  GetProductByIdRequest,
  GetProductBySlugRequest,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useProducts() {
  const api = useRequest();
  const { page, limit } = usePagination(undefined, '12');
  const { search, category, minPrice, maxPrice, stock } = useProductFilters();

  const getProducts = useCallback(
    async (payload: GetProductsRequest['payload']) => {
      const response = await api.get<GetProductsRequest['response']>(
        '/product/list',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  return useQuery({
    queryKey: [
      ReactQueryKeys.GET_PRODUCTS,
      search,
      category,
      minPrice,
      maxPrice,
      stock,
    ],
    queryFn: () =>
      getProducts({
        page,
        limit,
        search: search ?? undefined,
        category: category ?? undefined,
        minPrice,
        maxPrice,
        stock,
      }),
  });
}

export function useInfiniteProducts() {
  const api = useRequest();
  const { search, category, minPrice, maxPrice, stock } = useProductFilters();

  const getProducts = useCallback(
    async (payload: GetProductsRequest['payload']) => {
      const response = await api.get<GetProductsRequest['response']>(
        '/product/list',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  return useInfiniteQuery({
    queryKey: [
      ReactQueryKeys.GET_PRODUCTS,
      'infinite',
      search,
      category,
      minPrice,
      maxPrice,
      stock,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getProducts({
        page: pageParam.toString(),
        limit: '12',
        search: search ?? undefined,
        category: category ?? undefined,
        minPrice,
        maxPrice,
        stock,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
    initialPageParam: 1,
  });
}

export function useProductById(productId: string) {
  const api = useRequest();

  return useQuery({
    queryKey: [ReactQueryKeys.GET_PRODUCT_BY_ID, productId],
    queryFn: async () => {
      const response = await api.get<GetProductByIdRequest['response']>(
        `/product/details/${productId}`,
      );
      return response.data.data;
    },
  });
}

export function useProductBySlug(slug: string) {
  const api = useRequest();

  return useQuery({
    queryKey: [ReactQueryKeys.GET_PRODUCT_BY_SLUG, slug],
    queryFn: async () => {
      const response = await api.get<GetProductBySlugRequest['response']>(
        `/product/slug/${slug}`,
      );
      return response.data.data;
    },
  });
}
