import { z } from '@repo/ui/lib/form';
import { Visibility } from '@repo/types/product';

export const csvProductSchema = z.object({
  name: z.string().trim().min(1, 'Produktnavn er påkrevd'),
  slug: z.string().trim().min(1, 'Slug er påkrevd'),
  description: z.string().optional().default(''),
  shortDescription: z.string().optional().default(''),
  sku: z.string().optional().default(''),
  barcode: z.string().optional().default(''),
  vat: z
    .string()
    .trim()
    .refine((val) => val !== '', 'MVA er påkrevd')
    .refine((val) => !isNaN(parseFloat(val)), 'MVA må være et gyldig nummer')
    .refine((val) => {
      const num = parseFloat(val);
      return num >= 0 && num <= 100;
    }, 'MVA må være mellom 0 og 100')
    .transform((val) => parseFloat(val)),
  costPrice: z
    .string()
    .trim()
    .refine((val) => val !== '', 'Kostpris er påkrevd')
    .refine(
      (val) => !isNaN(parseFloat(val)),
      'Kostpris må være et gyldig nummer',
    )
    .refine((val) => parseFloat(val) >= 0, 'Kostpris må være positiv')
    .transform((val) => parseFloat(val)),
  salePrice: z
    .string()
    .trim()
    .refine((val) => val !== '', 'Salgspris er påkrevd')
    .refine(
      (val) => !isNaN(parseFloat(val)),
      'Salgspris må være et gyldig nummer',
    )
    .refine((val) => parseFloat(val) >= 0, 'Salgspris må være positiv')
    .transform((val) => parseFloat(val)),
  noOfUnits: z
    .string()
    .trim()
    .refine((val) => val !== '', 'Antall enheter er påkrevd')
    .refine(
      (val) => !isNaN(parseInt(val)),
      'Antall enheter må være et gyldig nummer',
    )
    .refine((val) => parseInt(val) >= 0, 'Antall enheter må være positivt')
    .transform((val) => parseInt(val)),
  categories: z.string().optional().default(''),
  images: z.string().optional().default(''),
  isActive: z
    .string()
    .trim()
    .refine((val) => val !== '', 'Aktiv status er påkrevd')
    .refine((val) => {
      const lower = val.toLowerCase();
      return ['true', 'false', '1', '0', 'ja', 'nei'].includes(lower);
    }, 'Aktiv må være true/false, 1/0, eller ja/nei')
    .transform((val) => ['true', '1', 'ja'].includes(val.toLowerCase())),
  visibility: z
    .string()
    .trim()
    .refine((val) => val !== '', 'Synlighet er påkrevd')
    .refine((val) => {
      const lower = val.toLowerCase();
      return [
        'both',
        'begge',
        'internal',
        'intern',
        'external',
        'ekstern',
      ].includes(lower);
    }, 'Synlighet må være: both/begge, internal/intern, eller external/ekstern')
    .transform((val) => {
      const lower = val.toLowerCase();
      if (lower === 'both' || lower === 'begge') return Visibility.BOTH;
      if (lower === 'internal' || lower === 'intern')
        return Visibility.INTERNAL;
      return Visibility.EXTERNAL;
    }),
  hasVolumeDiscount: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === '') return true;
      const lower = val.toLowerCase();
      return ['true', 'false', '1', '0', 'ja', 'nei'].includes(lower);
    }, 'Volum rabatt må være true/false, 1/0, eller ja/nei')
    .transform((val) => {
      if (!val || val.trim() === '') return false;
      return ['true', '1', 'ja'].includes(val.toLowerCase());
    })
    .default('false'),
  weight: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === '') return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, 'Vekt må være et gyldig og positivt nummer')
    .transform((val) =>
      val && val.trim() !== '' ? parseFloat(val) : undefined,
    ),
  'dimensions.length': z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === '') return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, 'Lengde må være et gyldig og positivt nummer')
    .transform((val) =>
      val && val.trim() !== '' ? parseFloat(val) : undefined,
    ),
  'dimensions.width': z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === '') return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, 'Bredde må være et gyldig og positivt nummer')
    .transform((val) =>
      val && val.trim() !== '' ? parseFloat(val) : undefined,
    ),
  'dimensions.height': z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === '') return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, 'Høyde må være et gyldig og positivt nummer')
    .transform((val) =>
      val && val.trim() !== '' ? parseFloat(val) : undefined,
    ),
  'supplier.number': z.string().optional().default(''),
  'supplier.name': z.string().optional().default(''),
  'supplier.location': z.string().optional().default(''),
  'supplier.countryOfOrigin': z.string().optional().default(''),
  'supplier.hsCode': z.string().optional().default(''),
});

export type CSVProductSchema = z.infer<typeof csvProductSchema>;

export const REQUIRED_COLUMNS = [
  'name',
  'slug',
  'vat',
  'costPrice',
  'salePrice',
  'noOfUnits',
  'isActive',
  'visibility',
];

export const ALL_COLUMNS = [
  'name',
  'slug',
  'description',
  'shortDescription',
  'sku',
  'barcode',
  'vat',
  'costPrice',
  'salePrice',
  'noOfUnits',
  'categories',
  'images',
  'isActive',
  'visibility',
  'hasVolumeDiscount',
  'weight',
  'dimensions.length',
  'dimensions.width',
  'dimensions.height',
  'supplier.number',
  'supplier.name',
  'supplier.location',
  'supplier.countryOfOrigin',
  'supplier.hsCode',
];

export const TEMPLATE_DATA: Record<string, string> = {
  name: 'Eksempel Produkt',
  slug: 'eksempel-produkt',
  description: 'Detaljert beskrivelse av produktet',
  shortDescription: 'Kort beskrivelse',
  sku: 'EKS001',
  barcode: '1234567890123',
  vat: '25',
  costPrice: '100',
  salePrice: '150',
  noOfUnits: '50',
  categories: 'kategori1,kategori2',
  images: 'bilde1.jpg,bilde2.jpg',
  isActive: 'true',
  visibility: 'both',
  hasVolumeDiscount: 'false',
  weight: '0.5',
  'dimensions.length': '10',
  'dimensions.width': '5',
  'dimensions.height': '3',
  'supplier.number': 'SUP001',
  'supplier.name': 'Leverandør AS',
  'supplier.location': 'Oslo',
  'supplier.countryOfOrigin': 'Norge',
  'supplier.hsCode': '12345678',
};

export const csvConfig = {
  requiredColumns: REQUIRED_COLUMNS,
  allColumns: ALL_COLUMNS,
  templateData: TEMPLATE_DATA,
  maxFileSize: 10,
  acceptedFileTypes: ['.csv'],
};
