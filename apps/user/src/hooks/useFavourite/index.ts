// Node Modules
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import type {
  GetFavoritesRequest,
  AddToFavoritesRequest,
  RemoveFromFavoritesRequest,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useFavourite() {
  const api = useRequest();
  const queryClient = useQueryClient();

  const getFavorites = useCallback(async () => {
    const response =
      await api.get<GetFavoritesRequest['response']>('/favorite/my');
    return response.data.data;
  }, [api]);

  const { data: favorites, isLoading: isFavoritesLoading } = useQuery({
    queryKey: [ReactQueryKeys.GET_FAVORITES],
    queryFn: getFavorites,
  });

  const addToFavorites = useCallback(
    async (payload: AddToFavoritesRequest['payload']) => {
      const response = await api.post<AddToFavoritesRequest['response']>(
        `/favorite/${payload.productId}`,
      );
      return response.data.data;
    },
    [api],
  );

  const addToFavoritesMutation = useMutation({
    mutationFn: addToFavorites,
    onSuccess: async function () {
      await queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_FAVORITES],
      });
      toast.success('Produkt lagt til favoritter');
    },
  });

  const removeFromFavorites = useCallback(
    async (payload: RemoveFromFavoritesRequest['payload']) => {
      const response = await api.delete<RemoveFromFavoritesRequest['response']>(
        `/favorite/${payload.productId}`,
      );
      return response.data.data;
    },
    [api],
  );

  const removeFromFavoritesMutation = useMutation({
    mutationFn: removeFromFavorites,
    onSuccess: async function () {
      await queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_FAVORITES],
      });
      toast.success('Produkt fjernet fra favoritter');
    },
  });

  return {
    // Queries
    favorites,
    isFavoritesLoading,

    // Mutations
    addToFavoritesMutation,
    removeFromFavoritesMutation,
  };
}
