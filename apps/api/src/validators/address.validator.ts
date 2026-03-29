import { z } from 'zod';
import { addressSchema } from './schemas/address.schema';

export const getAddressesSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});

export const getAddressByIdSchema = z.object({
  params: z.object({
    addressId: z.string().min(1, 'Address ID is required'),
  }),
});

export const addAddressSchema = z.object({
  body: addressSchema,
});

export const updateAddressSchema = z.object({
  params: z.object({
    addressId: z.string().min(1, 'Address ID is required'),
  }),
  body: addressSchema,
});

export const deleteAddressSchema = z.object({
  params: z.object({
    addressId: z.string().min(1, 'Address ID is required'),
  }),
});

export const setDefaultAddressSchema = z.object({
  params: z.object({
    addressId: z.string().min(1, 'Address ID is required'),
  }),
});

export type GetAddressesSchema = z.infer<typeof getAddressesSchema>;
export type GetAddressByIdSchema = z.infer<typeof getAddressByIdSchema>;
export type AddAddressSchema = z.infer<typeof addAddressSchema>;
export type UpdateAddressSchema = z.infer<typeof updateAddressSchema>;
export type DeleteAddressSchema = z.infer<typeof deleteAddressSchema>;
export type SetDefaultAddressSchema = z.infer<typeof setDefaultAddressSchema>;
