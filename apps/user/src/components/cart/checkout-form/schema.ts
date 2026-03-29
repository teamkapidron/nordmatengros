import { z } from '@repo/ui/lib/form';

export const checkoutFormSchema = z.object({
  selectedAddressId: z.string().min(1, 'Vennligst velg en leveringsadresse'),
  customerComment: z
    .string()
    .max(500, 'Kommentaren kan ikke være lengre enn 500 tegn')
    .optional(),
  desiredDeliveryDate: z.date().optional(),
  palletType: z.enum(['EUR', 'Large'], {
    required_error: 'Vennligst velg en pallettype',
  }),
});

export type CheckoutFormSchema = z.infer<typeof checkoutFormSchema>;
