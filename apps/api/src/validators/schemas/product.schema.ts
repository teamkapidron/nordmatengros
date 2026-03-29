import { z } from 'zod';
import { Types } from 'mongoose';
import { Visibility } from '@repo/types/product';

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  slug: z.string().min(1, 'Product slug is required').optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),

  sku: z.string().optional(),
  barcode: z.string().optional(),

  vat: z.number().min(0).max(100, 'VAT must be between 0 and 100'),

  costPrice: z.number().min(0, 'Cost price must be positive'),
  salePrice: z.number().min(0, 'Sale price must be positive'),

  noOfUnits: z.number().min(0, 'Number of units must be positive'),

  categories: z.array(
    z.string().refine((value) => Types.ObjectId.isValid(value), {
      message: 'Invalid category ID format',
    }),
  ),

  images: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
  visibility: z.nativeEnum(Visibility).default(Visibility.BOTH),

  hasVolumeDiscount: z.boolean(),

  dimensions: z
    .object({
      length: z.number().min(0, 'Length must be positive'),
      width: z.number().min(0, 'Width must be positive'),
      height: z.number().min(0, 'Height must be positive'),
    })
    .optional(),
  weight: z.number().min(0, 'Weight must be positive').optional(),

  supplier: z
    .object({
      number: z.string().optional(),
      name: z.string().optional(),
      location: z.string().optional(),
      countryOfOrigin: z.string().optional(),
      hsCode: z.string().optional(),
    })
    .optional(),
});
