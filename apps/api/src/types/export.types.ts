import { Category } from '@repo/types/category';
import { Product as ProductType } from '@repo/types/product';
import { Order as OrderType } from '@repo/types/order';

export type PopulatedProduct = Omit<ProductType, 'categories'> & {
  categories: Pick<Category, 'name'>[];
};

export type PopulatedOrder = Omit<
  OrderType,
  'userId' | 'items' | 'shippingAddress'
> & {
  userId: {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
  };
} & {
  items: {
    productId: { name: string };
    quantity: number;
    price: number;
    vatAmount: number;
    totalPrice: number;
    discount?: number;
    bulkDiscount?: number;
  }[];
  shippingAddress: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
};
