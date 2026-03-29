import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

export const categorySchema = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
  image: z.string().optional(),
  isActive: z.boolean().optional(),
  visibleToStore: z.boolean().optional(),
  parentId: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val === '' || val === null) {
          return true;
        }
        return isValidObjectId(val);
      },
      {
        message: 'Invalid parent ID format',
      },
    ),
});
