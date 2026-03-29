import { ApiData } from '@/utils/types.util';
import type { User, UserType } from '@repo/types/user';

export enum UserStatusFilter {
  ALL = 'all',
  APPROVED = 'approved',
  PENDING = 'pending',
  UNVERIFIED = 'unverified',
}

export enum UserSort {
  ASC = 'asc',
  DESC = 'desc',
}

export type GetAllCustomersRequest = ApiData<
  {
    page?: string;
    limit?: string;
    search?: string;
    userType?: UserType;
    status?: UserStatusFilter;
  },
  {
    users: User[];
    totalRecords: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
  }
>;

export type GetCustomerDetailsRequest = ApiData<
  {
    userId: string;
  },
  {
    user: User;
  }
>;

export type UpdateUserRequest = ApiData<
  {
    userId: string;
    isApprovedByAdmin?: boolean;
    userType?: UserType;
  },
  undefined
>;

export type GetUserRegistrationGraphDataRequest = ApiData<
  {
    from?: string;
    to?: string;
  },
  {
    data: {
      date: string;
      newRegistrations: number;
      totalUsers: number;
    }[];
  }
>;

export type GetUserStatsRequest = ApiData<
  {
    from?: string;
    to?: string;
  },
  {
    totalUsers: number;
    approvedUsers: number;
    pendingUsers: number;
    unverifiedUsers: number;
  }
>;

export type TopUsersRequest = ApiData<
  {
    from?: string;
    to?: string;
  },
  {
    topUsers: {
      user: {
        _id: string;
        userName: string;
        userEmail: string;
      };
      totalAmount: number;
      totalOrders: number;
    }[];
  }
>;

export type DeleteUserRequest = ApiData<
  {
    userId: string;
  },
  undefined
>;
