import { z } from '@repo/ui/lib/form';
import { Visibility } from '@repo/types/product';

export const productFormSchema = z.object({
  name: z.string().min(1, 'Produktnavn er påkrevd'),
  slug: z.string(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),

  sku: z.string().optional(),
  barcode: z.string().optional(),

  vat: z.number().min(0).max(100, 'MVA må være mellom 0 og 100'),

  costPrice: z.number().min(0, 'Kostpris må være positiv'),
  salePrice: z.number().min(0, 'Salgspris må være positiv'),
  noOfUnits: z.number().min(0, 'Antall enheter må være positivt'),

  categories: z.array(z.string()).min(1, 'Minst én kategori er påkrevd'),

  images: z.array(z.instanceof(File)).optional(),

  isActive: z.boolean().default(true),
  visibility: z.nativeEnum(Visibility).default(Visibility.BOTH),

  hasVolumeDiscount: z.boolean().default(true),

  dimensions: z
    .object({
      length: z.number().min(0, 'Lengde må være positiv'),
      width: z.number().min(0, 'Bredde må være positiv'),
      height: z.number().min(0, 'Høyde må være positiv'),
    })
    .optional(),
  weight: z.number().min(0, 'Vekt må være positiv').optional(),

  supplier: z
    .object({
      number: z.string().optional(),
      name: z.string().optional(),
      location: z.string().optional(),
      countryOfOrigin: z.string().optional(),
      hsCode: z.string().optional(),
    })
    .optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export enum VAT {
  VAT_0 = 0,
  VAT_15 = 15,
  VAT_25 = 25,
}

export const vatOptions = [
  { label: '0 % MVA (MVA 0%)', value: VAT.VAT_0 },
  { label: '15 % MVA (MVA 15%)', value: VAT.VAT_15 },
  { label: '25 % MVA (MVA 25%)', value: VAT.VAT_25 },
];
