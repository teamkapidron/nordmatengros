import { ApiData } from '@/utils/types.util';
import { HierarchicalCategory, Category } from '@repo/types/category';

export type GetCategoriesRequest = ApiData<
  {
    page: number;
    limit: number;
  },
  {
    categories: HierarchicalCategory[];
    totalCategories: number;
    page: number;
    perPage: number;
    totalPages: number;
  }
>;

export type GetCategoriesFlattenedRequest = ApiData<
  {
    page: number;
    limit: number;
  },
  {
    categories: Category[];
    totalCategories: number;
    page: number;
    perPage: number;
    totalPages: number;
  }
>;

export type GetCategoryByIdRequest = ApiData<
  {
    categoryId: string;
  },
  {
    category: Category;
  }
>;
