import { z } from 'zod';
import { isValidObjectId } from 'mongoose';
import { categorySchema } from './schemas/category.schema';

/******************* START: User Validators *******************/
export const getCategoriesSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});

export const getCategoriesFlattenedSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});

export const getCategoryByIdSchema = z.object({
  params: z.object({
    categoryId: z
      .string()
      .min(1, 'Category ID is required')
      .refine((val) => isValidObjectId(val), {
        message: 'Invalid category ID format',
      }),
  }),
});

export type GetCategoriesSchema = z.infer<typeof getCategoriesSchema>;
export type GetCategoriesFlattenedSchema = z.infer<
  typeof getCategoriesFlattenedSchema
>;
export type GetCategoryByIdSchema = z.infer<typeof getCategoryByIdSchema>;
/******************* END: User Validators *******************/

/******************* START: Admin Validators *******************/
export const getAllCategoriesSchema = z.object({});

export const getAllCategoriesFlattenedSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});

export const createCategorySchema = z.object({
  body: categorySchema,
});

export const updateCategorySchema = z.object({
  params: z.object({
    categoryId: z
      .string()
      .min(1, 'Category ID is required')
      .refine((val) => isValidObjectId(val), {
        message: 'Invalid category ID format',
      }),
  }),
  body: categorySchema,
});

export const deleteCategorySchema = z.object({
  params: z.object({
    categoryId: z
      .string()
      .min(1, 'Category ID is required')
      .refine((val) => isValidObjectId(val), {
        message: 'Invalid category ID format',
      }),
  }),
});

export const getCategoryStatsSchema = z.object({
  query: z.object({
    from: z.string().optional(),
    to: z.string().optional(),
  }),
});

export type GetAllCategoriesSchema = z.infer<typeof getAllCategoriesSchema>;
export type GetAllCategoriesFlattenedSchema = z.infer<
  typeof getAllCategoriesFlattenedSchema
>;
export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;
export type DeleteCategorySchema = z.infer<typeof deleteCategorySchema>;
export type GetCategoryStatsSchema = z.infer<typeof getCategoryStatsSchema>;
/******************* END: Admin Validators *******************/
