// Node Modules
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';
import type {
  GetDiscountsRequest,
  CreateDiscountRequest,
  UpdateDiscountRequest,
  MakeDiscountInactiveRequest,
  CreateBulkDiscountRequest,
  BulkDiscountsRequest,
} from './types';

export function useDiscount() {
  const api = useRequest();
  const queryClient = useQueryClient();

  const getDiscounts = useCallback(async () => {
    const response =
      await api.get<GetDiscountsRequest['response']>('/discount/all');
    return response.data.data;
  }, [api]);

  const { data: discounts, isLoading: isLoadingDiscounts } = useQuery({
    queryKey: [ReactQueryKeys.GET_DISCOUNTS],
    queryFn: getDiscounts,
    staleTime: 5 * 60 * 1000,
  });

  const createDiscount = useCallback(
    async (discount: CreateDiscountRequest['payload']) => {
      const response = await api.post<CreateDiscountRequest['response']>(
        '/discount',
        discount,
      );

      return response.data.data;
    },
    [api],
  );

  const createDiscountMutation = useMutation({
    mutationFn: createDiscount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_DISCOUNTS],
      });
      toast.success('Rabatt opprettet vellykket');
    },
  });

  const updateDiscount = useCallback(
    async (discount: UpdateDiscountRequest['payload']) => {
      const response = await api.put<UpdateDiscountRequest['response']>(
        `/discount/${discount.discountId}`,
        discount.discount,
      );

      return response.data.data;
    },
    [api],
  );

  const updateDiscountMutation = useMutation({
    mutationFn: updateDiscount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_DISCOUNTS],
      });
      toast.success('Rabatt oppdatert vellykket');
    },
  });

  const toggleDiscountActive = useCallback(
    async (discountId: MakeDiscountInactiveRequest['payload']) => {
      const response = await api.delete<
        MakeDiscountInactiveRequest['response']
      >(`/discount/${discountId.discountId}`);
      return response.data.data;
    },
    [api],
  );

  const toggleDiscountActiveMutation = useMutation({
    mutationFn: toggleDiscountActive,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_DISCOUNTS],
      });
      toast.success('Rabatt status oppdatert vellykket');
    },
  });

  return {
    // Queries
    discounts,
    isLoadingDiscounts,

    // Mutations
    createDiscountMutation,
    updateDiscountMutation,
    toggleDiscountActiveMutation,
  };
}

export function useBulkDiscount() {
  const api = useRequest();
  const queryClient = useQueryClient();

  const getBulkDiscounts = useCallback(async () => {
    const response =
      await api.get<BulkDiscountsRequest['response']>('/discount/bulk/all');

    return response.data.data;
  }, [api]);

  const { data: bulkDiscounts, isLoading: isLoadingBulkDiscounts } = useQuery({
    queryKey: [ReactQueryKeys.GET_BULK_DISCOUNTS],
    queryFn: getBulkDiscounts,
    staleTime: 5 * 60 * 1000,
  });

  const createBulkDiscount = useCallback(
    async (discounts: CreateBulkDiscountRequest['payload']) => {
      const response = await api.post<CreateBulkDiscountRequest['response']>(
        '/discount/bulk',
        discounts,
      );

      return response.data.data;
    },
    [api],
  );

  const createBulkDiscountMutation = useMutation({
    mutationFn: createBulkDiscount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_BULK_DISCOUNTS],
      });
      toast.success('Bulk rabatt opprettet vellykket');
    },
  });

  return {
    // Queries
    bulkDiscounts,
    isLoadingBulkDiscounts,

    // Mutations
    createBulkDiscountMutation,
  };
}
