// Node Modules
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';
import type { GetAdminDataRequest, LoginRequest, LogoutRequest } from './types';

export function useAuth() {
  const api = useRequest();
  const router = useRouter();
  const queryClient = useQueryClient();

  const getAdminData = useCallback(async () => {
    const response =
      await api.get<GetAdminDataRequest['response']>('/auth/admin/me');
    return response.data.data.admin;
  }, [api]);

  const {
    data: user,
    isLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: [ReactQueryKeys.GET_ADMIN_DATA],
    queryFn: getAdminData,
  });

  const login = useCallback(
    async (payload: LoginRequest['payload']) => {
      const response = await api.post<LoginRequest['response']>(
        '/auth/admin/login',
        payload,
      );
      return response.data;
    },
    [api],
  );

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ADMIN_DATA],
      });
      router.push('/dashboard');
      window.location.reload();
      toast.success('Innlogging vellykket');
    },
  });

  const logout = useCallback(async () => {
    const response = await api.post<LogoutRequest['response']>('/auth/logout');
    return response.data;
  }, [api]);

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: function () {
      queryClient.resetQueries({
        queryKey: [ReactQueryKeys.GET_ADMIN_DATA],
      });
      router.push('/login');
      window.location.reload();
      toast.success('Utlogging vellykket');
    },
  });

  return {
    // States
    user,
    isLoading,
    refetchUser,
    isAuthenticated: !!user,

    // Mutations
    loginMutation,
    logoutMutation,
  };
}
