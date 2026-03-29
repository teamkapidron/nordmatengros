import { z } from 'zod';

export const getConfigSchema = z.object({});

export const updateConfigSchema = z.object({
  body: z.object({
    showPalette: z.boolean(),
  }),
});

export const createConfigSchema = z.object({
  body: z.object({
    showPalette: z.boolean(),
  }),
});

export type GetConfigSchema = z.infer<typeof getConfigSchema>;
export type UpdateConfigSchema = z.infer<typeof updateConfigSchema>;
export type CreateConfigSchema = z.infer<typeof createConfigSchema>;
