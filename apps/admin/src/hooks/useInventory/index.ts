// Node Modules
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';

// Hooks
import { useRequest } from '@/hooks/useRequest';
import { usePagination } from '@repo/ui/hooks/usePagination';
import { useInventoryFilters } from './useInventoryFilters';
import { useDateRangeInParams } from '@repo/ui/hooks/useDate/useDateRangeInParams';

// Types
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';
import type {
  GetAllInventoryRequest,
  GetProductInventoryRequest,
  CreateInventoryRequest,
  UpdateInventoryRequest,
  DeleteInventoryRequest,
  InventoryStatsRequest,
} from './types';

export function useInventoryStats() {
  const api = useRequest();
  const { dateRangeInString } = useDateRangeInParams();

  const getInventoryStats = useCallback(
    async (payload: InventoryStatsRequest['payload']) => {
      const response = await api.get<InventoryStatsRequest['response']>(
        '/inventory/stats',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const inventoryStatsQuery = useQuery({
    queryKey: [
      ReactQueryKeys.GET_INVENTORY_STATS,
      dateRangeInString.from,
      dateRangeInString.to,
    ],
    queryFn: () => getInventoryStats(dateRangeInString),
  });

  return { inventoryStatsQuery };
}

export function useProductInventory(productId: string) {
  const api = useRequest();
  const { page, limit } = usePagination();

  const getProductInventory = useCallback(
    async (payload: GetProductInventoryRequest['payload']) => {
      const response = await api.get<GetProductInventoryRequest['response']>(
        `/inventory/product/${payload.productId}`,
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const productInventoryQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_PRODUCT_INVENTORY, productId, page, limit],
    queryFn: () => getProductInventory({ productId, page, limit }),
  });

  return productInventoryQuery;
}

export function useInventory() {
  const api = useRequest();
  const queryClient = useQueryClient();
  const { page, limit } = usePagination();
  const { search, status } = useInventoryFilters();

  const getAllInventory = useCallback(
    async (payload: GetAllInventoryRequest['payload']) => {
      const response = await api.get<GetAllInventoryRequest['response']>(
        '/inventory',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const inventoryQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_ALL_INVENTORY, page, limit, search, status],
    queryFn: () =>
      getAllInventory({ page, limit, search: search ?? undefined, status }),
  });

  const createInventory = useCallback(
    async (payload: CreateInventoryRequest['payload']) => {
      const response = await api.post<CreateInventoryRequest['response']>(
        '/inventory',
        payload,
      );
      return response.data.data;
    },
    [api],
  );

  const createInventoryMutation = useMutation({
    mutationFn: createInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ALL_INVENTORY],
      });
      toast.success('Lageroppdatering opprettet');
    },
  });

  const updateInventory = useCallback(
    async (payload: UpdateInventoryRequest['payload']) => {
      const { inventoryId, ...updateData } = payload;
      const response = await api.put<UpdateInventoryRequest['response']>(
        `/inventory/${inventoryId}`,
        updateData,
      );
      return response.data.data;
    },
    [api],
  );

  const updateInventoryMutation = useMutation({
    mutationFn: updateInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ALL_INVENTORY],
      });
      toast.success('Lager oppdatert');
    },
  });

  const deleteInventory = useCallback(
    async (inventoryId: string) => {
      const response = await api.delete<DeleteInventoryRequest['response']>(
        `/inventory/${inventoryId}`,
      );
      return response.data.data;
    },
    [api],
  );

  const deleteInventoryMutation = useMutation({
    mutationFn: deleteInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ALL_INVENTORY],
      });
      toast.success('Lagerparti slettet');
    },
  });

  return {
    inventoryQuery,
    createInventoryMutation,
    updateInventoryMutation,
    deleteInventoryMutation,
  };
}
