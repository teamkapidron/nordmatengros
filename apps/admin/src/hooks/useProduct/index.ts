// Node Modules
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/navigation';
import { toast } from '@repo/ui/lib/sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Hooks
import { useRequest } from '@/hooks/useRequest';
import { useProductFilters } from './useProductFilters';
import { usePagination } from '@repo/ui/hooks/usePagination';
import { useDateRangeInParams } from '@repo/ui/hooks/useDate/useDateRangeInParams';

// Types
import type {
  GetAllProductsRequest,
  GetProductByIdRequest,
  GetProductBySlugRequest,
  GetProductImageUploadUrlRequest,
  CreateProductRequest,
  UpdateProductRequest,
  DeleteProductRequest,
  LowStockProductsRequest,
  TopProductsRequest,
  ProductStatsRequest,
  QuickSearchProductsRequest,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useProductStats() {
  const api = useRequest();

  const getProductStats = useCallback(async () => {
    const response =
      await api.get<ProductStatsRequest['response']>('/product/stats');
    return response.data.data;
  }, [api]);

  const productStatsQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_PRODUCT_STATS],
    queryFn: getProductStats,
  });

  return { productStatsQuery };
}

export function useProductDetails(productId: string) {
  const api = useRequest();

  const getProductDetails = useCallback(
    async (payload: GetProductByIdRequest['payload']) => {
      const response = await api.get<GetProductByIdRequest['response']>(
        `/product/admin/details${payload.productId}`,
      );
      return response.data.data;
    },
    [api],
  );

  const productDetailsQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_PRODUCT_DETAILS, productId],
    queryFn: () => getProductDetails({ productId }),
  });

  return productDetailsQuery;
}

export function useProductBySlug(slug: string) {
  const api = useRequest();

  const getProductBySlug = useCallback(
    async (payload: GetProductBySlugRequest['payload']) => {
      const response = await api.get<GetProductBySlugRequest['response']>(
        `/product/admin/slug/${payload.slug}`,
      );
      return response.data.data;
    },
    [api],
  );

  const productBySlugQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_PRODUCT_BY_SLUG, slug],
    queryFn: () => getProductBySlug({ slug }),
  });

  return productBySlugQuery;
}

export function useProductDashboard() {
  const api = useRequest();
  const { dateRangeInString } = useDateRangeInParams();

  const topProducts = useCallback(
    async (payload: TopProductsRequest['payload']) => {
      const response = await api.get<TopProductsRequest['response']>(
        '/product/top',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const topProductsQuery = useQuery({
    queryKey: [
      ReactQueryKeys.GET_TOP_PRODUCTS,
      dateRangeInString.from,
      dateRangeInString.to,
    ],
    queryFn: () => topProducts(dateRangeInString),
  });

  const lowStockProducts = useCallback(
    async (payload: LowStockProductsRequest['payload']) => {
      const response = await api.get<LowStockProductsRequest['response']>(
        '/product/low-stock',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const lowStockProductsQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_LOW_STOCK_PRODUCTS],
    queryFn: () => lowStockProducts({ lowStockThreshold: '5' }),
  });

  return { topProductsQuery, lowStockProductsQuery };
}

export function useProduct() {
  const api = useRequest();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { page, limit } = usePagination();
  const { search, category } = useProductFilters();

  const getAllProducts = useCallback(
    async (payload: GetAllProductsRequest['payload']) => {
      const response = await api.get<GetAllProductsRequest['response']>(
        '/product/all',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const { data: products, isLoading } = useQuery({
    queryKey: [ReactQueryKeys.GET_ALL_PRODUCTS, page, limit, search, category],
    queryFn: () =>
      getAllProducts({
        page,
        limit,
        search: search ?? undefined,
        category: category ?? undefined,
      }),
  });

  const createProduct = useCallback(
    async (payload: CreateProductRequest['payload']) => {
      if (payload.images?.length && payload.images.length > 0) {
        const imageUploadUrlResponse = await api.post<
          GetProductImageUploadUrlRequest['response']
        >('/product/image-upload-url', {
          slug: payload.slug,
          names: payload.images.map((image) => image.name),
          imageCount: payload.images.length,
        });

        const imageUploadUrls = imageUploadUrlResponse.data.data.urls;

        await Promise.all(
          imageUploadUrls.map((url, index) => {
            const formData = new FormData();
            Object.entries(url.fields).forEach(([key, value]) => {
              formData.append(key, value);
            });

            const file = payload.images?.[index];
            if (file) {
              formData.append('file', file);
            }

            return axios.post(url.url, formData);
          }),
        );
      }

      const images = payload.images?.map(
        (image) =>
          `https://baladi-prod-baladibucket-fedmxzsx.s3.eu-central-1.amazonaws.com/products/${payload.slug}/images/${image.name}`,
      );

      const response = await api.post<CreateProductRequest['response']>(
        '/product',
        {
          ...payload,
          images,
        },
      );
      return response.data.data;
    },
    [api],
  );

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: function () {
      toast.success('Produkt opprettet');
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ALL_PRODUCTS],
      });
      router.push('/dashboard/products');
    },
  });

  const updateProduct = useCallback(
    async (payload: UpdateProductRequest['payload']) => {
      if (payload.product.images?.length && payload.product.images.length > 0) {
        const imageUploadUrlResponse = await api.post<
          GetProductImageUploadUrlRequest['response']
        >('/product/image-upload-url', {
          slug: payload.product.slug,
          names: payload.product.images.map((image) => image.name),
          imageCount: payload.product.images.length,
        });

        const imageUploadUrls = imageUploadUrlResponse.data.data.urls;

        await Promise.all(
          imageUploadUrls.map((url, index) => {
            const formData = new FormData();
            Object.entries(url.fields).forEach(([key, value]) => {
              formData.append(key, value);
            });

            const file = payload.product.images?.[index];
            if (file) {
              formData.append('file', file);
            }

            return axios.post(url.url, formData);
          }),
        );
      }

      const images = payload.product.images?.map(
        (image) =>
          `https://baladi-prod-baladibucket-fedmxzsx.s3.eu-central-1.amazonaws.com/products/${payload.product.slug}/images/${image.name}`,
      );

      const response = await api.put<UpdateProductRequest['response']>(
        `/product/${payload.productId}`,
        {
          ...payload.product,
          images,
        },
      );
      return response.data.data;
    },
    [api],
  );

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: function () {
      toast.success('Produkt oppdatert');
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ALL_PRODUCTS],
      });
      router.push('/dashboard/products');
    },
  });

  const deleteProduct = useCallback(
    async (payload: DeleteProductRequest['payload']) => {
      const response = await api.delete<DeleteProductRequest['response']>(
        `/product/${payload.productId}`,
      );
      return response.data.data;
    },
    [api],
  );

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
  });

  return {
    // Queries
    products,
    isLoading,

    // Mutations
    createProductMutation,
    updateProductMutation,
    deleteProductMutation,
  };
}

export function useQuickSearchProduct(query: string) {
  const api = useRequest();
  const [searchQuery, setSearchQuery] = useState(query);
  const debouncedSearchQuery = useRef(debounce(setSearchQuery, 500));

  useEffect(() => {
    debouncedSearchQuery.current(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const searchQueryRef = debouncedSearchQuery.current;

    return () => {
      searchQueryRef.cancel();
    };
  }, []);

  const quickSearchProduct = useCallback(
    async (payload: QuickSearchProductsRequest['payload']) => {
      const response = await api.get<QuickSearchProductsRequest['response']>(
        '/product/search/quick',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const quickSearchProductQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_QUICK_SEARCH_PRODUCTS, searchQuery],
    queryFn: () => quickSearchProduct({ query: searchQuery }),
  });

  const handleSearch = useCallback((query: string) => {
    debouncedSearchQuery.current(query);
  }, []);

  return { quickSearchProductQuery, handleSearch };
}
