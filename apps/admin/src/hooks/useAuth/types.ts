import { ApiData } from '@/utils/types.util';
import type { Admin } from '@repo/types/admin';

export type GetAdminDataRequest = ApiData<
  undefined,
  {
    admin: Admin;
  }
>;

export type LoginRequest = ApiData<
  {
    email: string;
    password: string;
  },
  undefined
>;

export type LogoutRequest = ApiData<undefined, undefined>;
