import { model, Schema } from 'mongoose';
import { IBulkDiscount } from './interfaces/bulkDiscount.model';

const bulkDiscountSchema = new Schema<IBulkDiscount>(
  {
    minQuantity: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const BulkDiscount = model<IBulkDiscount>('BulkDiscount', bulkDiscountSchema);

export default BulkDiscount;
