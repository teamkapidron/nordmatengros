import { ApiData } from '@/utils/types.util';

export type PosterType = 'new-arrival' | 'promotion';

export type PreviewPromotionPosterRequest = ApiData<
  {
    posterType: PosterType;
    productsIds: string[];
  },
  {
    productsData: {
      name: string;
      price: number;
      image: string;
      pricePerUnit: number;
      bulkDiscount: {
        minQuantity: number;
        price: number;
        pricePerUnit: number;
      }[];
      expirationDate: string | null;
    }[];
  }
>;
