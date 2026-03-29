import { ApiData } from '@/utils/types.util';
import { Admin } from '@repo/types/admin';
import { Config } from '@repo/types/config';

export type UpdateAdminPasswordRequest = ApiData<
  {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  },
  {
    admin: Admin;
  }
>;

export type GetAllAdminsRequest = ApiData<
  undefined,
  {
    admins: Admin[];
  }
>;

export type CreateAdminRequest = ApiData<
  {
    name: string;
    email: string;
  },
  {
    admin: Admin;
  }
>;

export type GetSiteConfigRequest = ApiData<
  undefined,
  {
    config: Config;
  }
>;

export type UpdateSiteConfigRequest = ApiData<
  {
    showPalette: boolean;
  },
  undefined
>;
