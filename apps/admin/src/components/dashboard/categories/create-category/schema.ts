import { z } from '@repo/ui/lib/form';

export const createCategorySchema = z.object({
  name: z.string().min(1, { message: 'Navn er påkrevd' }),
  isActive: z.boolean().optional(),
  visibleToStore: z.boolean().optional(),
  parentId: z.string().optional(),
});

export type CreateCategoryFormValues = z.infer<typeof createCategorySchema>;
