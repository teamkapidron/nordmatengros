export interface FavoriteAggregateType {
  _id: string;
  createdAt: Date;
  product: {
    _id: string;
    name: string;
    salePrice: number;
    unitPrice: number;
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
