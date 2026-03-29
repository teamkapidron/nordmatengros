import { Document, Types } from 'mongoose';
import { Discount } from '@repo/types/discount';

export interface IDiscount extends Document, Discount {
  productId: Types.ObjectId;
}
