import User from '@/models/user.model';

import { getPagination } from '@/utils/common/pagination.utils';

import { UserStatusFilter, type FilterUserQuery } from '@/types/user.types';
import type { GetAllUsersSchema } from '@/validators/user.validator';

export function getUserFiltersFromQuery(query: GetAllUsersSchema['query']) {
  const { search, userType, status, page, limit } = query;

  let queryObject: FilterUserQuery = {};
  const {
    page: currentPage,
    limit: perPage,
    skip,
  } = getPagination(page, limit);

  if (search) {
    queryObject['$or'] = [
      { name: new RegExp(search, 'i') },
      { email: new RegExp(search, 'i') },
      { companyName: new RegExp(search, 'i') },
      { organizationNumber: new RegExp(search, 'i') },
      { phoneNumber: new RegExp(search, 'i') },
      { address: new RegExp(search, 'i') },
    ];
  }

  if (userType) {
    queryObject['userType'] = userType;
  }

  if (status && status !== UserStatusFilter.ALL) {
    if (status === UserStatusFilter.APPROVED) {
      queryObject['isApprovedByAdmin'] = true;
    } else if (status === UserStatusFilter.PENDING) {
      queryObject['isApprovedByAdmin'] = false;
    } else if (status === UserStatusFilter.UNVERIFIED) {
      queryObject['isEmailVerified'] = false;
    }
  }

  return {
    queryObject,
    perPage,
    currentPage,
    skip,
  };
}

export async function getUsersCountBeforeFromDate(from?: string) {
  const initialTotal = from
    ? await User.countDocuments({
        createdAt: { $lt: new Date(new Date(from).setHours(0, 0, 0, 0)) },
        isApprovedByAdmin: true,
      })
    : 0;

  return initialTotal;
}
