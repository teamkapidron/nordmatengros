import { UserType } from '@repo/types/user';

export enum UserStatusFilter {
  ALL = 'all',
  APPROVED = 'approved',
  PENDING = 'pending',
  UNVERIFIED = 'unverified',
}

export interface FilterUserQuery {
  $or?: { [key: string]: RegExp }[];
  userType?: UserType;
  isApprovedByAdmin?: boolean;
  isEmailVerified?: boolean;
}
