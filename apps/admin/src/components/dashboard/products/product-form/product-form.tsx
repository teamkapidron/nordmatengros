'use client';

// Node Modules
import Image from 'next/image';
import { memo, useMemo, useRef, useCallback, useEffect } from 'react';
import { useForm, zodResolver } from '@repo/ui/lib/form';
import {
  Loader2,
  Save,
  Percent,
  BoxesIcon,
  Barcode,
  Weight,
  Ruler,
  Eye,
  Package,
  FileText,
  Tag,
  Building,
  Globe,
  User,
  MapPin,
  Hash,
  Upload,
  Image as ImageIcon,
  X,
  Plus,
  Landmark,
} from '@repo/ui/lib/icons';

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/base/form';
import { Input } from '@repo/ui/components/base/input';
import { Textarea } from '@repo/ui/components/base/textarea';
import { Checkbox } from '@repo/ui/components/base/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/base/select';
import { MultiSelect } from '@repo/ui/components/base/multi-select';
import { Button } from '@repo/ui/components/base/button';

// Schemas
import {
  VAT,
  vatOptions,
  productFormSchema,
  ProductFormValues,
} from './product-schema';

// Hooks
import { useCategory } from '@/hooks/useCategory';

// Types
import { Visibility } from '@repo/types/product';
import { formatPrice } from '@/utils/price.util';

interface ProductFormProps {
  isPending: boolean;
  defaultValues?: ProductFormValues;
  onSubmit: (data: ProductFormValues) => void;
}

function ProductForm(props: ProductFormProps) {
  const { onSubmit, isPending, defaultValues } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { categoriesFlattened } = useCategory();
  const categoryOptions = useMemo(
    () =>
      categoriesFlattened?.categories?.map((category) => ({
        label: category.name,
        value: category._id,
        icon: Tag,
      })) || [],
    [categoriesFlattened?.categories],
  );

  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: undefined,
      slug: undefined,
      description: undefined,
      shortDescription: undefined,
      sku: undefined,
      barcode: undefined,
      vat: VAT.VAT_15,
      costPrice: 0,
      salePrice: 0,
      noOfUnits: 10,
      categories: [],
      images: [],
      isActive: true,
      visibility: Visibility.BOTH,
      hasVolumeDiscount: true,
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
      },
      weight: 0,
      supplier: {
        number: undefined,
        name: undefined,
        location: undefined,
        countryOfOrigin: undefined,
        hsCode: undefined,
      },
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      Array.from({ length: files.length }).forEach(async (_, index) => {
        const file = files.item(index);
        if (!file) return;

        form.setValue('images', [...(form.getValues('images') || []), file]);
      });
    },
    [form],
  );

  const handleRemoveImage = useCallback(
    (indexToRemove: number) => {
      form.setValue(
        'images',
        (form.getValues('images') || []).filter(
          (_, index) => index !== indexToRemove,
        ),
      );
    },
    [form],
  );

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="rounded-xl border border-[var(--baladi-border)] bg-gradient-to-r from-[var(--baladi-primary)] to-[var(--baladi-secondary)] p-6 shadow-lg">
        <h1 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-white">
          {defaultValues ? 'Rediger Produkt' : 'Opprett Nytt Produkt'}
        </h1>
        <p className="mt-2 text-blue-100">
          Fyll ut detaljene nedenfor for å legge til et nytt produkt i lageret
          ditt
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
                    Grunnleggende Informasjon
                  </h2>
                </div>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Produktnavn *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Package className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              placeholder="Skriv inn produktnavn"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                const slug = e.target.value
                                  .toLowerCase()
                                  .replace(/[^\w\s-]/g, '')
                                  .replace(/\s+/g, '-');
                                form.setValue('slug', slug);
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          URL Slug
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Hash className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              placeholder="produkt-slug"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <p className="text-xs text-[var(--baladi-gray)]">
                          Automatisk generert fra produktnavn
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Kort Beskrivelse
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Kort produktbeskrivelse"
                            className="h-12 rounded-lg border-[var(--baladi-border)] focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                            {...field}
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Fullstendig Beskrivelse
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <FileText className="absolute top-3 left-3 h-4 w-4 text-[var(--baladi-gray)]" />
                            <Textarea
                              placeholder="Detaljert produktbeskrivelse"
                              className="min-h-[120px] rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              value={field.value || ''}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                    <Tag className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
                    Kategorier
                  </h2>
                </div>

                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                        Velg Kategorier *
                      </FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={categoryOptions}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          placeholder="Søk og velg kategorier..."
                          variant="default"
                          animation={0.2}
                          maxCount={5}
                          className="h-12 rounded-lg border-[var(--baladi-border)] focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                        />
                      </FormControl>
                      <p className="text-xs text-[var(--baladi-gray)]">
                        Velg en eller flere kategorier som best beskriver
                        produktet ditt
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100">
                    <ImageIcon className="h-5 w-5 text-pink-600" />
                  </div>
                  <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
                    Produktbilder
                  </h2>
                </div>

                <FormField
                  control={form.control}
                  name="images"
                  render={() => (
                    <FormItem>
                      <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                        Last opp Bilder
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <div
                            onClick={triggerFileInput}
                            className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-[var(--baladi-border)] bg-gray-50 transition-colors hover:border-[var(--baladi-primary)] hover:bg-[var(--baladi-primary)]/5"
                          >
                            <div className="text-center">
                              <Upload className="mx-auto h-8 w-8 text-[var(--baladi-gray)]" />
                              <p className="mt-2 text-sm font-medium text-[var(--baladi-primary)]">
                                Klikk for å laste opp bilder
                              </p>
                              <p className="text-xs text-[var(--baladi-gray)]">
                                PNG, JPG, JPEG opptil 10MB hver
                              </p>
                            </div>
                          </div>

                          <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />

                          {(form.getValues('images')?.length ?? 0) > 0 && (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-[var(--baladi-primary)]">
                                  Opplastede Bilder (
                                  {form.getValues('images')?.length ?? 0})
                                </p>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={triggerFileInput}
                                  className="h-8 border-[var(--baladi-border)] text-[var(--baladi-primary)] hover:bg-[var(--baladi-primary)] hover:text-white"
                                >
                                  <Plus className="mr-1 h-3 w-3" />
                                  Legg til Flere
                                </Button>
                              </div>

                              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                {(form.getValues('images') || []).map(
                                  (image, index) => (
                                    <div
                                      key={index}
                                      className="group relative aspect-square overflow-hidden rounded-lg border border-[var(--baladi-border)] bg-gray-100"
                                    >
                                      <Image
                                        src={URL.createObjectURL(image)}
                                        width={100}
                                        height={100}
                                        alt={`Product image ${index + 1}`}
                                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                      />
                                      <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleRemoveImage(index)
                                          }
                                          className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
                                        >
                                          <X className="h-3 w-3" />
                                        </button>
                                      </div>
                                      <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                                        <p className="text-xs font-medium text-white">
                                          Bilde {index + 1}
                                        </p>
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <p className="text-xs text-[var(--baladi-gray)]">
                        Last opp høykvalitetsbilder av produktet ditt. Det
                        første bildet vil bli brukt som hovedproduktbilde.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <Landmark className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
                    Priser
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="costPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Kostpris (kr) *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Landmark className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              type="number"
                              step="0.01"
                              min={0}
                              placeholder="0.00"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              value={field.value}
                            />
                          </div>
                        </FormControl>
                        <p className="text-xs text-[var(--baladi-gray)]">
                          {`Pris per enhet: ${formatPrice(
                            (field.value || 0) / (form.watch('noOfUnits') || 1),
                          )}`}
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Salgspris (kr) *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Landmark className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--baladi-success)]" />
                            <Input
                              type="number"
                              step="0.01"
                              min={0}
                              placeholder="0.00"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              value={field.value}
                            />
                          </div>
                        </FormControl>
                        <p className="text-xs text-[var(--baladi-gray)]">
                          {`Pris per enhet: ${formatPrice(
                            (field.value || 0) / (form.watch('noOfUnits') || 1),
                          )}`}
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="costPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Kostpris inkl. MVA (kr)
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Landmark className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              type="number"
                              disabled
                              value={(
                                (field.value || 0) *
                                (1 + form.watch('vat') / 100)
                              ).toFixed(2)}
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Salgspris inkl. MVA (kr)
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Landmark className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--baladi-success)]" />
                            <Input
                              type="number"
                              disabled
                              value={(
                                (field.value || 0) *
                                (1 + form.watch('vat') / 100)
                              ).toFixed(2)}
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          MVA (%) *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Percent className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value.toString()}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]">
                                  <SelectValue placeholder="Velg MVA" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="rounded-lg">
                                {vatOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value.toString()}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="noOfUnits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Antall Enheter *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <BoxesIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              type="number"
                              min={0}
                              placeholder="10"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              onChange={(e) => {
                                field.onChange(Number(e.target.value));
                              }}
                              value={field.value}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                    <Tag className="h-5 w-5 text-purple-600" />
                  </div>
                  <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
                    Produktidentifikatorer
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          SKU
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Tag className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              placeholder="Skriv inn SKU"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e.target.value.toUpperCase());
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="barcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Strekkode
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Barcode className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              placeholder="Skriv inn strekkode"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              value={field.value || ''}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Vekt (kg)
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Weight className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              type="number"
                              step="0.01"
                              min={0}
                              placeholder="0.00"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              value={field.value}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                    <Ruler className="h-5 w-5 text-orange-600" />
                  </div>
                  <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
                    Dimensjoner
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="dimensions.length"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Lengde (cm)
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Ruler className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              type="number"
                              step="0.1"
                              min={0}
                              placeholder="0.0"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              value={field.value}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dimensions.width"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Bredde (cm)
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Ruler className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              type="number"
                              step="0.1"
                              min={0}
                              placeholder="0.0"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              value={field.value}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dimensions.height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Høyde (cm)
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Ruler className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              type="number"
                              step="0.1"
                              min={0}
                              placeholder="0.0"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              value={field.value}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Eye className="h-5 w-5 text-gray-600" />
                  </div>
                  <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
                    Innstillinger
                  </h2>
                </div>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="visibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Synlighet
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl className="relative">
                            <SelectTrigger className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]">
                              <Eye className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                              <SelectValue placeholder="Velg synlighet" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-lg">
                            <SelectItem value="both">
                              Begge (Intern & Ekstern)
                            </SelectItem>
                            <SelectItem value="internal">Kun Intern</SelectItem>
                            <SelectItem value="external">
                              Kun Ekstern
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-y-0 space-x-3 rounded-lg border border-[var(--baladi-border)] p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-[var(--baladi-border)] data-[state=checked]:bg-[var(--baladi-primary)]"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                            Aktivt Produkt
                          </FormLabel>
                          <p className="text-sm text-[var(--baladi-gray)]">
                            Produktet vil være synlig og tilgjengelig
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasVolumeDiscount"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-y-0 space-x-3 rounded-lg border border-[var(--baladi-border)] p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-[var(--baladi-border)] data-[state=checked]:bg-[var(--baladi-primary)]"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                            Er dette produktet egnet for volumrabatt?
                          </FormLabel>
                          <p className="text-sm text-[var(--baladi-gray)]">
                            Produktet kan tilbys med rabatt ved kjøp av større
                            mengder
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                    <Building className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
                    Leverandørinformasjon
                  </h2>
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="supplier.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Leverandørnavn
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              placeholder="Leverandørnavn"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              value={field.value}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="supplier.number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Leverandørnummer
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Hash className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              placeholder="Leverandørnummer"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              value={field.value || ''}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="supplier.location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Lokasjon
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              placeholder="Leverandørens lokasjon"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              value={field.value || ''}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="supplier.countryOfOrigin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          Opprinnelsesland
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Globe className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              placeholder="Opprinnelsesland"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              value={field.value || ''}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="supplier.hsCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                          HS Code
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Barcode className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <Input
                              placeholder="HS kode"
                              className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                              {...field}
                              value={field.value || ''}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              className="h-12 rounded-lg bg-[var(--baladi-primary)] px-8 font-[family-name:var(--font-sora)] font-semibold text-white shadow-lg transition-all hover:bg-[var(--baladi-primary)]/90 hover:shadow-xl focus:ring-2 focus:ring-[var(--baladi-primary)]/20"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {defaultValues
                    ? 'Oppdaterer Produkt...'
                    : 'Oppretter Produkt...'}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  {defaultValues ? 'Oppdater Produkt' : 'Opprett Produkt'}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default memo(ProductForm);
