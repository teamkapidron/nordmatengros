export enum Visibility {
  BOTH = 'both',
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;

  sku?: string;
  barcode?: string;

  vat: number;

  costPrice: number;
  salePrice: number;

  noOfUnits: number;

  categories?: string[];

  images?: string[];
  isActive: boolean;
  visibility: Visibility;

  hasVolumeDiscount: boolean;

  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  weight?: number;

  supplier?: {
    number?: string;
    name?: string;
    location?: string;
    countryOfOrigin?: string;
    hsCode?: string;
  };

  createdAt: Date;
  updatedAt: Date;
}
