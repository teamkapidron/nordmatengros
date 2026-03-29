import { Schema, model } from 'mongoose';
import { IFavorite } from '@/models/interfaces/favorite.model';

const favoriteSchema = new Schema<IFavorite>(
  {
    userId: {
      ref: 'User',
      required: true,
      type: Schema.Types.ObjectId,
    },
    productId: {
      ref: 'Product',
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true },
);

const Favorite = model<IFavorite>('Favorite', favoriteSchema);

export default Favorite;
