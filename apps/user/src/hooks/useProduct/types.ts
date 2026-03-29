import { ApiData } from '@/utils/types.util';
import { Product } from '@repo/types/product';

export enum ProductSort {
  POPULARITY = 'popularity',
  PRICE_ASC = 'price-asc',
  PRICE_DESC = 'price-desc',
  NEWEST = 'newest',
}

export enum ProductStock {
  ALL = 'all',
  IN_STOCK = 'in-stock',
  OUT_OF_STOCK = 'out-of-stock',
}

export interface ProductResponse
  extends Omit<Product, 'categories' | 'salePrice' | 'costPrice'> {
  isFavorite?: boolean;
  categories: {
    _id: string;
    name: string;
    slug: string;
  }[];
  stock: number;
  bestBeforeDate: string;
  price: number;
}

export type GetProductsRequest = ApiData<
  {
    page: string;
    limit: string;
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    stock?: ProductStock;
  },
  {
    products: ProductResponse[];
    totalProducts: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
  }
>;

export type GetProductByIdRequest = ApiData<
  {
    productId: string;
  },
  {
    product: ProductResponse;
  }
>;

export type GetProductBySlugRequest = ApiData<
  {
    slug: string;
  },
  {
    product: ProductResponse;
  }
>;
