// Node Modules
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';

// Hooks
import { useRequest } from '@/hooks/useRequest';
import { usePagination } from '@repo/ui/hooks/usePagination';

// Types
import type {
  PlaceOrderRequest,
  GetUserOrdersRequest,
  GetUserOrderDetailsRequest,
  CancelOrderRequest,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useOrder() {
  const api = useRequest();
  const queryClient = useQueryClient();
  const { page, limit } = usePagination();

  const placeOrder = useCallback(
    async (payload: PlaceOrderRequest['payload']) => {
      const response = await api.post<PlaceOrderRequest['response']>(
        '/order/place',
        payload,
      );
      return response.data.data;
    },
    [api],
  );

  const placeOrderMutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_MY_ORDERS],
      });
      toast.success('Ordre plassert vellykket');
    },
  });

  const getMyOrders = useCallback(
    async (payload: GetUserOrdersRequest['payload']) => {
      const response = await api.get<GetUserOrdersRequest['response']>(
        '/order/my',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const { data: myOrders, isLoading: isMyOrdersLoading } = useQuery({
    queryKey: [ReactQueryKeys.GET_MY_ORDERS, page, limit],
    queryFn: () => getMyOrders({ page, limit }),
  });

  const cancelOrder = useCallback(
    async (payload: CancelOrderRequest['payload']) => {
      const response = await api.post<CancelOrderRequest['response']>(
        '/order/cancel',
        payload,
      );
      return response.data.data;
    },
    [api],
  );

  const cancelOrderMutation = useMutation({
    mutationFn: cancelOrder,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_MY_ORDERS],
      });
      toast.success('Ordre avbrutt');
    },
  });

  return {
    // Queries
    myOrders,
    isMyOrdersLoading,

    // Mutations
    placeOrderMutation,
    cancelOrderMutation,
  };
}

export function useOrderDetails(orderId: string) {
  const api = useRequest();

  const getOrderDetails = useCallback(async () => {
    const response = await api.get<GetUserOrderDetailsRequest['response']>(
      `/order/details/${orderId}`,
    );
    return response.data.data;
  }, [api, orderId]);

  const { data: orderDetails, isLoading: isOrderDetailsLoading } = useQuery({
    queryKey: [ReactQueryKeys.GET_ORDER_DETAILS, orderId],
    queryFn: getOrderDetails,
  });

  return {
    orderDetails,
    isOrderDetailsLoading,
  };
}
