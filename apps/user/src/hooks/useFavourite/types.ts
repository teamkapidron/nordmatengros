import { ApiData } from '@/utils/types.util';

export interface FavoriteResponse {
  _id: string;
  createdAt: Date;
  product: {
    _id: string;
    name: string;
    price: number;
    slug: string;
    images: string[];
    shortDescription: string;
    categories: {
      _id: string;
      name: string;
      slug: string;
    }[];
  };
}

export type GetFavoritesRequest = ApiData<
  {
    page: number;
    limit: number;
  },
  {
    favorites: FavoriteResponse[];
    totalFavorites: number;
    page: number;
    perPage: number;
    totalPages: number;
  }
>;

export type AddToFavoritesRequest = ApiData<
  {
    productId: string;
  },
  undefined
>;

export type RemoveFromFavoritesRequest = ApiData<
  {
    productId: string;
  },
  undefined
>;
