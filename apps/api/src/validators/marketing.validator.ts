import { z } from 'zod';
import { CampaignType } from '@repo/types/campaign';

export const newsletterStatsSchema = z.object({});

export const createCampaignSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    type: z.nativeEnum(CampaignType),
    productsIds: z.array(z.string()).min(1, 'Products IDs are required'),
  }),
});

export const newsLetterPreviewSchema = z.object({
  body: z.object({
    type: z.nativeEnum(CampaignType),
    productsIds: z.array(z.string()).min(1, 'Products IDs are required'),
  }),
});

export const previewPromotionPosterSchema = z.object({
  body: z.object({
    posterType: z.enum(['new-arrival', 'promotion']),
    productsIds: z.array(z.string()).min(1, 'Products IDs are required'),
  }),
});

export const sendContactFormSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    company: z.string().optional(),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(1, 'Message is required'),
  }),
});

export const unsubscribeSchema = z.object({
  query: z.object({
    email: z.string().email('Invalid email address'),
  }),
});

export type NewsletterStatsSchema = z.infer<typeof newsletterStatsSchema>;
export type CreateCampaignSchema = z.infer<typeof createCampaignSchema>;
export type NewsLetterPreviewSchema = z.infer<typeof newsLetterPreviewSchema>;
export type PreviewPromotionPosterSchema = z.infer<
  typeof previewPromotionPosterSchema
>;
export type SendContactFormSchema = z.infer<typeof sendContactFormSchema>;
export type UnsubscribeSchema = z.infer<typeof unsubscribeSchema>;
