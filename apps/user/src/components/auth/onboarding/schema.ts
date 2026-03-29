import { z } from '@repo/ui/lib/form';

export const onboardingSchema = z.object({
  companyName: z.string().min(1, 'Bedriftens navn må være minst 1 tegn'),
  organizationNumber: z
    .string()
    .min(1, 'Organisasjonsnummer må være minst 1 tegn')
    .regex(/^[0-9\s]+$/, 'Organisasjonsnummer kan kun inneholde tall'),
  phoneNumber: z.string().min(1, 'Telefonnummer må være minst 1 tegn'),
  address: z.string().min(1, 'Gateadresse må være minst 1 tegn'),
  city: z.string().min(1, 'By må være minst 1 tegn'),
  postalCode: z.string().min(1, 'Postnummer må være minst 1 tegn'),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
