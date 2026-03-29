import { Document, Types } from 'mongoose';
import { Category } from '@repo/types/category';

export interface ICategory extends Document, Category {
  parentId: Types.ObjectId | null;
}
