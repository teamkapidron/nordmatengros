import { Document, Types } from 'mongoose';
import { Product } from '@repo/types/product';

export interface IProduct extends Document, Product {
  categories: Types.ObjectId[];
}
