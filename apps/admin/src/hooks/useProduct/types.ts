import { ApiData } from '@/utils/types.util';
import type { Product, Visibility } from '@repo/types/product';

export type ProductRequestBody = Omit<
  Product,
  '_id' | 'createdAt' | 'updatedAt' | 'images'
> & {
  images?: File[];
};

export interface QuickSearchProduct {
  _id: string;
  name: string;
  image: string | undefined;
  slug: string;
  noOfUnits: number;
  salePrice: number;
  shortDescription: string;
  categories: {
    name: string;
    slug: string;
  };
}

export type ProductResponse = Omit<Product, 'categories'> & {
  categories?: {
    _id: string;
    name: string;
    slug: string;
  }[];
  stock: number;
};

export type GetAllProductsRequest = ApiData<
  {
    search?: string;
    page?: string;
    limit?: string;
    category?: string;
    isActive?: 'true' | 'false';
    visibility?: Visibility;
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

export type GetProductImageUploadUrlRequest = ApiData<
  {
    slug: string;
    names: string[];
    imageCount: number;
  },
  {
    urls: {
      url: string;
      fields: {
        key: string;
        bucket: string;
        'X-Amz-Algorithm': string;
        'X-Amz-Credential': string;
        'X-Amz-Date': string;
        Policy: string;
        'X-Amz-Signature': string;
      };
    }[];
  }
>;

export type CreateProductRequest = ApiData<
  ProductRequestBody,
  {
    product: Product;
  }
>;

export type UpdateProductRequest = ApiData<
  {
    productId: string;
    product: ProductRequestBody;
  },
  {
    product: Product;
  }
>;

export type DeleteProductRequest = ApiData<
  {
    productId: string;
  },
  undefined
>;

export type LowStockProductsRequest = ApiData<
  {
    lowStockThreshold?: string;
  },
  {
    outOfStockProducts: {
      _id: string;
      name: string;
      categories: {
        _id: string;
        name: string;
      }[];
    }[];
    lowStockProducts: {
      _id: string;
      name: string;
      categories: {
        _id: string;
        name: string;
      }[];
    }[];
    outOfStockCount: number;
    lowStockCount: number;
  }
>;

export type TopProductsRequest = ApiData<
  {
    limit?: string;
    from?: string;
    to?: string;
  },
  {
    products: {
      product: {
        _id: string;
        name: string;
        image: string;
        slug: string;
      };
      totalQuantity: number;
      totalOrders: number;
    }[];
  }
>;

export type ProductStatsRequest = ApiData<
  undefined,
  {
    totalProducts: number;
    totalCategories: number;
    activeProducts: number;
    activeCategories: number;
  }
>;

export type QuickSearchProductsRequest = ApiData<
  {
    query: string;
  },
  {
    products: QuickSearchProduct[];
  }
>;
