// Node Modules
import { useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';
// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import type {
  UpdateAdminPasswordRequest,
  GetAllAdminsRequest,
  CreateAdminRequest,
  GetSiteConfigRequest,
  UpdateSiteConfigRequest,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useSettings() {
  const api = useRequest();

  const updatePassword = useCallback(
    async (request: UpdateAdminPasswordRequest['payload']) => {
      const response = await api.put<UpdateAdminPasswordRequest['response']>(
        '/user/admin/password',
        request,
      );
      return response.data.data;
    },
    [api],
  );

  const updatePasswordMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: function () {
      toast.success('Passord oppdatert');
    },
  });

  const getAllAdmins = useCallback(async () => {
    const response =
      await api.get<GetAllAdminsRequest['response']>('/user/admin/all');
    return response.data.data;
  }, [api]);

  const getAllAdminsQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_ALL_ADMINS],
    queryFn: getAllAdmins,
  });

  const createAdmin = useCallback(
    async (request: CreateAdminRequest['payload']) => {
      const response = await api.post<CreateAdminRequest['response']>(
        '/auth/admin/create',
        request,
      );
      return response.data.data;
    },
    [api],
  );

  const createAdminMutation = useMutation({
    mutationFn: createAdmin,
    onSuccess: function () {
      toast.success('Admin opprettet');
    },
  });

  return {
    // Queries
    getAllAdminsQuery,

    // Mutations
    updatePasswordMutation,
    createAdminMutation,
  };
}

export function useConfig() {
  const api = useRequest();

  const getSiteConfig = useCallback(async () => {
    const response = await api.get<GetSiteConfigRequest['response']>('/config');
    return response.data.data;
  }, [api]);

  const getSiteConfigQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_SITE_CONFIG],
    queryFn: getSiteConfig,
  });

  const updateSiteConfig = useCallback(
    async (payload: UpdateSiteConfigRequest['payload']) => {
      const response = await api.put<UpdateSiteConfigRequest['response']>(
        '/config',
        payload,
      );
      return response.data.data;
    },
    [api],
  );

  const updateSiteConfigMutation = useMutation({
    mutationFn: updateSiteConfig,
    onSuccess: function () {
      toast.success('Palett oppdatert');
    },
  });

  return {
    // Queries
    getSiteConfigQuery,

    // Mutations
    updateSiteConfigMutation,
  };
}
