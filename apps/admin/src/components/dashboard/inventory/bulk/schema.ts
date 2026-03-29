import { z } from '@repo/ui/lib/form';

export const csvInventorySchema = z.object({
  name: z.string().trim().min(1, 'Produktnavn er påkrevd'),
  slug: z.string().trim().min(1, 'Slug er påkrevd'),
  quantity: z
    .string()
    .trim()
    .refine((val) => !isNaN(parseInt(val)), 'Antall må være et gyldig nummer')
    .transform((val) => parseInt(val)),
  expirationDate: z
    .string()
    .trim()
    .refine(
      (val) => !isNaN(new Date(val).getTime()),
      'Utgårdato må være et gyldig dato',
    )
    .transform((val) => new Date(val)),
});

export const REQUIRED_COLUMNS = ['name', 'slug', 'quantity', 'expirationDate'];

export const ALL_COLUMNS = ['name', 'slug', 'quantity', 'expirationDate'];

export const TEMPLATE_DATA: Record<string, string> = {
  name: 'Produktnavn',
  slug: 'produkt-slug',
  quantity: '10',
  expirationDate: '2025-01-01',
};

export const csvConfig = {
  requiredColumns: REQUIRED_COLUMNS,
  allColumns: ALL_COLUMNS,
  templateData: TEMPLATE_DATA,
  maxFileSize: 10,
  acceptedFileTypes: ['.csv'],
};
