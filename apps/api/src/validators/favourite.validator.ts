import { z } from 'zod';
import { Types } from 'mongoose';

const productIdSchema = z
  .string()
  .refine((value) => Types.ObjectId.isValid(value), {
    message: 'Invalid product ID format',
  });

export const getFavoritesSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});

export const addToFavoritesSchema = z.object({
  params: z.object({
    productId: productIdSchema,
  }),
});

export const removeFromFavoritesSchema = z.object({
  params: z.object({
    productId: productIdSchema,
  }),
});

export type GetFavoritesSchema = z.infer<typeof getFavoritesSchema>;
export type AddToFavoritesSchemaType = z.infer<typeof addToFavoritesSchema>;
export type RemoveFromFavoritesSchemaType = z.infer<
  typeof removeFromFavoritesSchema
>;
