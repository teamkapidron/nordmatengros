// Node Modules
import { useCallback } from 'react';
import { toast } from '@repo/ui/lib/sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Hooks
import { useRequest } from '@/hooks/useRequest';
import { toOrderStatus, useOrderFilters } from './useOrderFilters';
import { usePagination } from '@repo/ui/hooks/usePagination';
import { useDateRangeInParams } from '@repo/ui/hooks/useDate/useDateRangeInParams';

// Types
import type {
  GetAllOrdersRequest,
  GetOrderDetailsAdminRequest,
  UpdateOrderStatusRequest,
  GetOrderStatsRequest,
  GetOrderRevenueStatsRequest,
  GetOrderStatusGraphDataRequest,
  GetOrderRevenueGraphDataRequest,
  GetRecentOrdersRequest,
  PreviewPickingListRequest,
  PreviewFreightLabelRequest,
  CancelOrderAdminRequest,
  DeleteOrderAdminRequest,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useOrderStats() {
  const api = useRequest();
  const { dateRangeInString } = useDateRangeInParams();

  const getOrderStats = useCallback(
    async (payload: GetOrderStatsRequest['payload']) => {
      const response = await api.get<GetOrderStatsRequest['response']>(
        '/order/stats',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const orderStatsQuery = useQuery({
    queryKey: [
      ReactQueryKeys.GET_ORDER_STATS,
      dateRangeInString.from,
      dateRangeInString.to,
    ],
    queryFn: () => getOrderStats(dateRangeInString),
  });

  const getOrderRevenueStats = useCallback(
    async (payload: GetOrderRevenueStatsRequest['payload']) => {
      const response = await api.get<GetOrderRevenueStatsRequest['response']>(
        '/order/stats/revenue',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const orderRevenueStatsQuery = useQuery({
    queryKey: [
      ReactQueryKeys.GET_ORDER_REVENUE_STATS,
      dateRangeInString.from,
      dateRangeInString.to,
    ],
    queryFn: () => getOrderRevenueStats(dateRangeInString),
  });

  return {
    orderStatsQuery,
    orderRevenueStatsQuery,
  };
}

export function useOrderDashboard() {
  const api = useRequest();
  const { dateRangeInString } = useDateRangeInParams();

  const getOrderStatusGraphData = useCallback(
    async (payload: GetOrderStatusGraphDataRequest['payload']) => {
      const response = await api.get<
        GetOrderStatusGraphDataRequest['response']
      >('/order/graph/status', { params: payload });
      return response.data.data;
    },
    [api],
  );

  const orderStatusGraphDataQuery = useQuery({
    queryKey: [
      ReactQueryKeys.GET_ORDER_STATUS_GRAPH_DATA,
      dateRangeInString.from,
      dateRangeInString.to,
    ],
    queryFn: () => getOrderStatusGraphData(dateRangeInString),
  });

  const getOrderRevenueGraphData = useCallback(
    async (payload: GetOrderRevenueGraphDataRequest['payload']) => {
      const response = await api.get<
        GetOrderRevenueGraphDataRequest['response']
      >('/order/graph/revenue', { params: payload });
      return response.data.data;
    },
    [api],
  );

  const orderRevenueGraphDataQuery = useQuery({
    queryKey: [
      ReactQueryKeys.GET_ORDER_REVENUE_GRAPH_DATA,
      dateRangeInString.from,
      dateRangeInString.to,
    ],
    queryFn: () => getOrderRevenueGraphData(dateRangeInString),
  });

  const getRecentOrders = useCallback(
    async (payload: GetRecentOrdersRequest['payload']) => {
      const response = await api.get<GetRecentOrdersRequest['response']>(
        '/order/recent',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const recentOrdersQuery = useQuery({
    queryKey: [
      ReactQueryKeys.GET_RECENT_ORDERS,
      dateRangeInString.from,
      dateRangeInString.to,
    ],
    queryFn: () => getRecentOrders(dateRangeInString),
  });

  return {
    orderStatusGraphDataQuery,
    orderRevenueGraphDataQuery,
    recentOrdersQuery,
  };
}

export function useOrderDetails(orderId: string) {
  const api = useRequest();

  const getOrderDetails = useCallback(
    async (payload: GetOrderDetailsAdminRequest['payload']) => {
      const response = await api.get<GetOrderDetailsAdminRequest['response']>(
        `/order/details/admin/${payload.orderId}`,
      );
      return response.data.data;
    },
    [api],
  );

  const orderDetailsQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_ORDER_DETAILS, orderId],
    queryFn: () => getOrderDetails({ orderId: orderId as string }),
    enabled: !!orderId,
  });

  return orderDetailsQuery;
}

export function useUpdateOrderStatus() {
  const api = useRequest();

  const updateOrderStatus = useCallback(
    async (payload: UpdateOrderStatusRequest['payload']) => {
      const response = await api.patch<UpdateOrderStatusRequest['response']>(
        `/order/status/${payload.orderId}`,
        payload,
      );
      return response.data.data;
    },
    [api],
  );

  const updateOrderStatusMutation = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: function (_, { status }) {
      toast.success(`Ordre status oppdatert til ${status}`);
    },
  });

  return updateOrderStatusMutation;
}

export function useOrder() {
  const api = useRequest();
  const { page, limit } = usePagination();
  const { search, status } = useOrderFilters();
  const { dateRangeInString } = useDateRangeInParams();

  const getAllOrders = useCallback(
    async (payload: GetAllOrdersRequest['payload']) => {
      const response = await api.get<GetAllOrdersRequest['response']>(
        '/order/all',
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const {
    data: orders,
    isLoading,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: [
      ReactQueryKeys.GET_ALL_ORDERS,
      search,
      status,
      dateRangeInString.from,
      dateRangeInString.to,
    ],
    queryFn: () =>
      getAllOrders({
        page,
        limit,
        from: dateRangeInString.from,
        to: dateRangeInString.to,
        search,
        status: toOrderStatus(status),
      }),
  });

  return {
    // Queries
    orders,
    isLoading,
    refetchOrders,
  };
}

export function useOrderPreview() {
  const api = useRequest();

  const getPickingList = useCallback(
    async (payload: PreviewPickingListRequest['payload']) => {
      const response = await api.get<PreviewPickingListRequest['response']>(
        `/order/preview/picking-list/${payload.orderId}`,
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const pickingListMutation = useMutation({
    mutationFn: getPickingList,
  });

  const getFreightLabel = useCallback(
    async (payload: PreviewFreightLabelRequest['payload']) => {
      const response = await api.get<PreviewFreightLabelRequest['response']>(
        `/order/preview/freight-label/${payload.orderId}`,
        { params: payload },
      );
      return response.data.data;
    },
    [api],
  );

  const freightLabelMutation = useMutation({
    mutationFn: getFreightLabel,
  });

  return {
    pickingListMutation,
    freightLabelMutation,
  };
}

export function useCancelOrder() {
  const api = useRequest();
  const queryClient = useQueryClient();

  const cancelOrder = useCallback(
    async (payload: CancelOrderAdminRequest['payload']) => {
      const response = await api.post<CancelOrderAdminRequest['response']>(
        `/order/cancel/admin/${payload.orderId}`,
      );
      return response.data.data;
    },
    [api],
  );

  const cancelOrderMutation = useMutation({
    mutationFn: cancelOrder,
    onSuccess: function (_, { orderId }) {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ORDER_DETAILS, orderId],
      });
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ALL_ORDERS],
      });
      toast.success('Ordre avbrutt');
    },
  });

  return cancelOrderMutation;
}

export function useDeleteOrder() {
  const api = useRequest();
  const queryClient = useQueryClient();
  const deleteOrder = useCallback(
    async (payload: DeleteOrderAdminRequest['payload']) => {
      const response = await api.delete<DeleteOrderAdminRequest['response']>(
        `/order/delete/admin/${payload.orderId}`,
      );
      return response.data.data;
    },
    [api],
  );

  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ALL_ORDERS],
      });
      toast.success('Ordre slettet');
    },
  });

  return deleteOrderMutation;
}
