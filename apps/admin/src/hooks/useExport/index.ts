// Node Modules
import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';

// Types
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';
import { API_URL } from '@/constants/url.constants';

export function useExport() {
  const queryClient = useQueryClient();

  const exportOrders = useCallback(async () => {
    window.location.href = `${API_URL}/export/orders`;
  }, []);

  const exportOrdersMutation = useMutation({
    mutationFn: exportOrders,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.EXPORT_ORDERS],
      });
      toast.success('Ordrer eksportert');
    },
  });

  const exportProducts = useCallback(async () => {
    window.location.href = `${API_URL}/export/products`;
  }, []);

  const exportProductsMutation = useMutation({
    mutationFn: exportProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.EXPORT_PRODUCTS],
      });
      toast.success('Produkter eksportert');
    },
  });

  const exportUsers = useCallback(async () => {
    window.location.href = `${API_URL}/export/users`;
  }, []);

  const exportUsersMutation = useMutation({
    mutationFn: exportUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.EXPORT_USERS],
      });
      toast.success('Brukere eksportert');
    },
  });

  return {
    exportOrdersMutation,
    exportProductsMutation,
    exportUsersMutation,
  };
}
