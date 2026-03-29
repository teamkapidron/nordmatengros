import type { ApiData } from '@/utils/types.util';
import type { Category, HierarchicalCategory } from '@repo/types/category';

export interface CategoryRequestBody {
  name: string;
  slug?: string;
  image?: string;
  isActive?: boolean;
  visibleToStore?: boolean;
  parentId?: string;
}

export type GetAllCategoriesRequest = ApiData<
  undefined,
  {
    categories: HierarchicalCategory[];
  }
>;

export type GetAllCategoriesFlattenedRequest = ApiData<
  {
    page: string;
    limit: string;
  },
  {
    categories: Category[];
    total: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
  }
>;

export type CreateCategoryRequest = ApiData<
  CategoryRequestBody,
  {
    category: Category;
  }
>;

export type UpdateCategoryRequest = ApiData<
  {
    categoryId: string;
    category: CategoryRequestBody;
  },
  {
    category: Category;
  }
>;

export type DeleteCategoryRequest = ApiData<
  {
    categoryId: string;
  },
  undefined
>;

export type GetCategoryStatsRequest = ApiData<
  {
    from?: string;
    to?: string;
  },
  {
    stats: {
      totalCategories: number;
      totalProducts: number;
      totalOrders: number;
      totalRevenue: number;
    };
  }
>;
