import { Document, Types } from 'mongoose';
import { Favorite } from '@repo/types/favorite';

export interface IFavorite extends Document, Favorite {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
}
