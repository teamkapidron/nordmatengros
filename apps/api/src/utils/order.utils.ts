import { startOfDay, endOfDay } from 'date-fns';

import type { OrderFilterQuery } from '@/types/order.types';
import type { GetAllOrdersSchema } from '@/validators/order.validator';

export async function getOrderFiltersFromQuery(
  query: GetAllOrdersSchema['query'],
) {
  const { page, limit, status, search, from, to } = query;

  let queryObject: OrderFilterQuery = {};
  const perPage = parseInt(limit ?? '10', 10);
  const currentPage = parseInt(page ?? '1', 10);

  if (status) {
    queryObject.status = status;
  }

  if (from && to) {
    queryObject.createdAt = {
      $gte: startOfDay(new Date(from)),
      $lte: endOfDay(new Date(to)),
    };
  }

  if (search) {
    queryObject.$or = [
      { 'userId.name': new RegExp(search, 'i') },
      { 'userId.email': new RegExp(search, 'i') },
      { 'userId.userType': new RegExp(search, 'i') },
      { 'items.productId.name': new RegExp(search, 'i') },
      { 'items.productId.sku': new RegExp(search, 'i') },
      { 'items.productId.barcode': new RegExp(search, 'i') },
    ];
  }

  return {
    queryObject,
    perPage,
    currentPage,
    skip: (currentPage - 1) * perPage,
  };
}
