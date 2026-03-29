import { Schema, model } from 'mongoose';
import { IProduct } from './interfaces/product.model';
import { Visibility } from '@repo/types/product';

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    shortDescription: {
      type: String,
      required: false,
    },

    sku: {
      type: String,
      required: false,
      sparse: true,
      unique: true,
    },
    barcode: {
      type: String,
      required: false,
      sparse: true,
      unique: true,
    },

    vat: {
      type: Number,
      required: true,
    },

    costPrice: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      required: true,
    },

    noOfUnits: {
      type: Number,
      required: true,
    },

    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false,
      },
    ],

    images: {
      type: [String],
      required: false,
      default: [],
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    visibility: {
      type: String,
      required: true,
      enum: Object.values(Visibility),
      default: Visibility.BOTH,
    },

    hasVolumeDiscount: {
      type: Boolean,
      required: false,
      default: false,
    },

    dimensions: {
      length: {
        type: Number,
        required: false,
      },
      width: {
        type: Number,
        required: false,
      },
      height: {
        type: Number,
        required: false,
      },
    },
    weight: {
      type: Number,
      required: false,
    },

    supplier: {
      number: {
        type: String,
        required: false,
      },
      name: {
        type: String,
        required: false,
      },
      location: {
        type: String,
        required: false,
      },
      countryOfOrigin: {
        type: String,
        required: false,
      },
      hsCode: {
        type: String,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Product = model<IProduct>('Product', productSchema);

export default Product;
