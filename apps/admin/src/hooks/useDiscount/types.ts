import { ApiData } from '@/utils/types.util';
import { Discount } from '@repo/types/discount';
import { BulkDiscount } from '@repo/types/bulkDiscount';

export type DiscountRequestBody = Omit<
  Discount,
  'createdAt' | 'updatedAt' | 'isActive' | '_id' | 'validFrom' | 'validTo'
> & {
  validFrom?: string;
  validTo?: string;
};

export type BulkDiscountRequestBody = Omit<
  BulkDiscount,
  'createdAt' | 'updatedAt' | 'isActive' | '_id'
>;

export type DiscountResponse = Omit<Discount, 'productId'> & {
  productId: {
    _id: string;
    name: string;
    images: string[];
    shortDescription: string;
    description: string;
    sku: string;
  };
};

export type GetDiscountsRequest = ApiData<
  undefined,
  {
    discounts: DiscountResponse[];
  }
>;

export type CreateDiscountRequest = ApiData<DiscountRequestBody, Discount>;

export type UpdateDiscountRequest = ApiData<
  {
    discountId: string;
    discount: DiscountRequestBody;
  },
  Discount
>;

export type MakeDiscountInactiveRequest = ApiData<
  {
    discountId: string;
  },
  undefined
>;

export type BulkDiscountsRequest = ApiData<
  undefined,
  {
    bulkDiscounts: BulkDiscount[];
  }
>;

export type CreateBulkDiscountRequest = ApiData<
  BulkDiscountRequestBody,
  BulkDiscount
>;
