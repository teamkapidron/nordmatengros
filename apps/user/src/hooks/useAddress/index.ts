// Node Modules
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import type {
  GetAddressesRequest,
  GetAddressDetailsRequest,
  AddAddressRequest,
  UpdateAddressRequest,
  DeleteAddressRequest,
  SetDefaultAddressRequest,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useAddress() {
  const api = useRequest();
  const queryClient = useQueryClient();

  const getAddresses = useCallback(async () => {
    const response =
      await api.get<GetAddressesRequest['response']>('/address/list');
    return response.data.data;
  }, [api]);

  const { data: address, isLoading: isAddressLoading } = useQuery({
    queryKey: [ReactQueryKeys.GET_ADDRESSES],
    queryFn: getAddresses,
  });

  const addAddress = useCallback(
    async (payload: AddAddressRequest['payload']) => {
      const response = await api.post<AddAddressRequest['response']>(
        '/address',
        payload,
      );
      return response.data.data;
    },
    [api],
  );

  const addAddressMutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ADDRESSES],
      });
      toast.success('Adresse lagt til');
    },
  });

  const updateAddress = useCallback(
    async (payload: UpdateAddressRequest['payload']) => {
      const response = await api.put<UpdateAddressRequest['response']>(
        `/address/${payload.addressId}`,
        payload.address,
      );
      return response.data.data;
    },
    [api],
  );

  const updateAddressMutation = useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ADDRESSES],
      });
      toast.success('Adresse oppdatert');
    },
  });

  const deleteAddress = useCallback(
    async (payload: DeleteAddressRequest['payload']) => {
      const response = await api.delete<DeleteAddressRequest['response']>(
        `/address/${payload.addressId}`,
      );
      return response.data.data;
    },
    [api],
  );

  const deleteAddressMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ADDRESSES],
      });
      toast.success('Adresse slettet');
    },
  });

  const setDefaultAddress = useCallback(
    async (payload: SetDefaultAddressRequest['payload']) => {
      const response = await api.patch<SetDefaultAddressRequest['response']>(
        `/address/${payload.addressId}/default`,
      );
      return response.data.data;
    },
    [api],
  );

  const setDefaultAddressMutation = useMutation({
    mutationFn: setDefaultAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ADDRESSES],
      });
      toast.success('Standard adresse oppdatert');
    },
  });

  return {
    // Queries
    address,
    isAddressLoading,

    // Mutations
    addAddressMutation,
    updateAddressMutation,
    deleteAddressMutation,
    setDefaultAddressMutation,
  };
}

export function useAddressDetails(addressId: string) {
  const api = useRequest();

  const getAddressDetails = useCallback(async () => {
    const response = await api.get<GetAddressDetailsRequest['response']>(
      `/address/${addressId}`,
    );

    return response.data.data;
  }, [api, addressId]);

  const { data: addressDetails, isLoading: isAddressDetailsLoading } = useQuery(
    {
      queryKey: [ReactQueryKeys.GET_ADDRESS_DETAILS, addressId],
      queryFn: getAddressDetails,
    },
  );

  return { addressDetails, isAddressDetailsLoading };
}
