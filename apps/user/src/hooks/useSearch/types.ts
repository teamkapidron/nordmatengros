import { ApiData } from '@/utils/types.util';
import { Product } from '@repo/types/product';

export interface QuickSearchProduct {
  name: string;
  images: string[];
  slug: string;
  unitPrice: number;
  salePrice: number;
  shortDescription: string;
  categories: {
    name: string;
    slug: string;
  }[];
}

export type QuickSearchProductsRequest = ApiData<
  {
    query: string;
    limit: number;
  },
  {
    products: QuickSearchProduct[];
  }
>;

export type FullSearchProductsRequest = ApiData<
  {
    query: string;
    page: number;
    limit: number;
    category: string;
    minPrice: number;
    maxPrice: number;
  },
  {
    products: Product[];
    totalProducts: number;
    page: number;
    perPage: number;
    totalPages: number;
  }
>;
