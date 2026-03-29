import { z } from '@repo/ui/lib/form';

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token er påkrevd'),
  password: z.string().min(8, 'Passord må være minst 8 tegn'),
  confirmPassword: z.string().min(8, 'Passord må være minst 8 tegn'),
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
