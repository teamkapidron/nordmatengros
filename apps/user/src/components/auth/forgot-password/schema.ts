import { z } from '@repo/ui/lib/form';

export const forgotPasswordSchema = z.object({
  email: z.string().email('Ugyldig e-postadresse'),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
