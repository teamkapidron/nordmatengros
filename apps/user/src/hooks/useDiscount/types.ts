import { ApiData } from '@/utils/types.util';
import { BulkDiscount } from '@repo/types/bulkDiscount';

export type GetBulkDiscountsRequest = ApiData<
  undefined,
  {
    bulkDiscounts: BulkDiscount[];
  }
>;
