import { ApiData } from '@/utils/types.util';
import { User } from '@repo/types/user';

export type GetUserDataRequest = ApiData<
  undefined,
  {
    user: User;
  }
>;

export type GetUserStatusRequest = ApiData<
  undefined,
  {
    user: {
      isApprovedByAdmin: boolean;
    } | null;
  }
>;

export type SignUpRequest = ApiData<
  {
    name: string;
    email: string;
    password: string;
  },
  {
    userId: string;
  }
>;

export type VerifyOTPRequest = ApiData<
  {
    email: string;
    otp: string;
  },
  undefined
>;

export type ResendOTPRequest = ApiData<
  {
    email: string;
  },
  undefined
>;

export type OnboardingRequest = ApiData<
  {
    companyName: string;
    organizationNumber: string;
    phoneNumber: string;
    address: string;
    city: string;
    postalCode: string;
  },
  undefined
>;

export type LoginRequest = ApiData<
  {
    email: string;
    password: string;
  },
  undefined
>;

export type ForgotPasswordRequest = ApiData<
  {
    email: string;
  },
  undefined
>;

export type ResetPasswordRequest = ApiData<
  {
    token: string;
    password: string;
  },
  undefined
>;

export type LogoutRequest = ApiData<undefined, undefined>;
