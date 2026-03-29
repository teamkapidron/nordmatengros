import { Schema, model } from 'mongoose';
import { ICategory } from './interfaces/category.model';

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    visibleToStore: {
      type: Boolean,
      required: true,
    },
    parentId: {
      ref: 'Category',
      required: false,
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true },
);

const Category = model<ICategory>('Category', categorySchema);

export default Category;
