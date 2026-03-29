import { z } from '@repo/ui/lib/form';

export const loginSchema = z.object({
  email: z.string().email('Ugyldig e-postadresse'),
  password: z.string().min(8, 'Passord må være minst 8 tegn'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
