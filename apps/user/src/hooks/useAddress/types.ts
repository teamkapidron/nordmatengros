import { ApiData } from '@/utils/types.util';
import { Address } from '@repo/types/address';

export interface AddressRequestBody {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  label?: string;
  phoneNumber?: string;
}

export type GetAddressesRequest = ApiData<
  {
    page: number;
    limit: number;
  },
  {
    addresses: Address[];
    totalAddresses: number;
    page: number;
    perPage: number;
    totalPages: number;
  }
>;

export type GetAddressDetailsRequest = ApiData<
  {
    addressId: string;
  },
  {
    address: Address;
  }
>;

export type AddAddressRequest = ApiData<
  AddressRequestBody,
  {
    address: Address;
  }
>;

export type UpdateAddressRequest = ApiData<
  {
    addressId: string;
    address: AddressRequestBody;
  },
  {
    address: Address;
  }
>;

export type DeleteAddressRequest = ApiData<
  {
    addressId: string;
  },
  undefined
>;

export type SetDefaultAddressRequest = ApiData<
  {
    addressId: string;
  },
  {
    address: Address;
  }
>;
