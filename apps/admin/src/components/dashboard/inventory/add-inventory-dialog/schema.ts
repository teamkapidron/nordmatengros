import { z } from '@repo/ui/lib/form';

export const addInventoryFormSchema = z.object({
  productId: z.string().min(1, 'Produkt er påkrevd'),
  quantity: z.number().min(1, 'Antall må være minst 1'),
  expirationDate: z.string().min(1, 'Utløpsdato er påkrevd'),
});

export type AddInventoryFormValues = z.infer<typeof addInventoryFormSchema>;
