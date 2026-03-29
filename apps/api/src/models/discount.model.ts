import { model, Schema } from 'mongoose';
import { IDiscount } from './interfaces/discount.model';

const discountSchema = new Schema<IDiscount>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },

    discountValue: { type: Number, required: true },

    validFrom: { type: Date },
    validTo: { type: Date },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Discount = model<IDiscount>('Discount', discountSchema);

export default Discount;
