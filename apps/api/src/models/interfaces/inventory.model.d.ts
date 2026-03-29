import { Document, Types } from 'mongoose';
import { Inventory } from '@repo/types/inventory';

export interface IInventory extends Document, Inventory {
  productId: Types.ObjectId;
}
