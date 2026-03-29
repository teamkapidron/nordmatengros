import { Types } from 'mongoose';
import { Visibility } from '@repo/types/product';

export enum ProductStock {
  ALL = 'all',
  IN_STOCK = 'in-stock',
  OUT_OF_STOCK = 'out-of-stock',
}

export interface UserProductFilter {
  $or?: { [key: string]: RegExp }[];
  categories?: { $in?: Types.ObjectId[] };
  salePrice?: { $gte?: number; $lte?: number };
}

export interface ProductFilter {
  $or?: { [key: string]: RegExp }[];
  salePrice?: { $gte?: number; $lte?: number };
  isActive?: boolean;
  visibility?: Visibility;
  categories?: { $in?: Types.ObjectId[] };
}

export interface QuickSearchProductAggregateType {
  _id: string;
  name: string;
  images: string[];
  slug: string;
  noOfUnits: number;
  salePrice: number;
  shortDescription: string;
  categories: {
    name: string;
    slug: string;
  }[];
}

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
