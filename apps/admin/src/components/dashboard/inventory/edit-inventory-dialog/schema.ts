import { z } from '@repo/ui/lib/form';

export const editInventoryFormSchema = z.object({
  quantity: z.number().min(1, 'Antall må være minst 1'),
  expirationDate: z.string().min(1, 'Utløpsdato er påkrevd'),
});

export type EditInventoryFormValues = z.infer<typeof editInventoryFormSchema>;
