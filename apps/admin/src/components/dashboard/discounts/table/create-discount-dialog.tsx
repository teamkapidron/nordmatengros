'use client';

// Node Modules
import React, { memo, useState } from 'react';
import { useForm, zodResolver, z } from '@repo/ui/lib/form';
import { Calendar as CalendarIcon } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Input } from '@repo/ui/components/base/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@repo/ui/components/base/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/base/form';
import ProductSearchCombobox from '@/components/common/product-search-combobox';

// Hooks
import { useDiscount } from '@/hooks/useDiscount';

const createDiscountSchema = z.object({
  productId: z.string().min(1, 'Produkt er påkrevd'),
  discountValue: z.number().min(0.01, 'Rabatt beløp må være større enn 0'),
  validFrom: z.string().optional(),
  validTo: z.string().optional(),
});

type CreateDiscountFormValues = z.infer<typeof createDiscountSchema>;

function CreateDiscountDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { createDiscountMutation } = useDiscount();

  const form = useForm<CreateDiscountFormValues>({
    resolver: zodResolver(createDiscountSchema),
    defaultValues: {
      discountValue: 0,
      validFrom: '',
      validTo: '',
    },
  });

  function onSubmit(data: CreateDiscountFormValues) {
    createDiscountMutation.mutate({
      productId: data.productId,
      discountValue: data.discountValue,
      validFrom: data.validFrom,
      validTo: data.validTo,
    });

    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-sora)] text-[var(--baladi-text)]">
            Legg til Produkt Rabatt
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                    Velg Produkt *
                  </FormLabel>
                  <FormControl>
                    <ProductSearchCombobox
                      onSelect={(productId) => field.onChange(productId)}
                      placeholder="Søk og velg et produkt..."
                      className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discountValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                    Rabatt Beløp (kr) *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step="0.01"
                      placeholder="Skriv inn rabatt beløp"
                      className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="validFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                    Gyldig Fra
                  </FormLabel>
                  <FormControl>
                    <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                    <Input
                      type="date"
                      className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="validTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                    Gyldig Til
                  </FormLabel>
                  <FormControl>
                    <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                    <Input
                      type="date"
                      className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                disabled={createDiscountMutation.isPending}
                className="hover:bg-[var(--baladi-primary)]/90 h-12 w-full rounded-lg bg-[var(--baladi-primary)] font-[family-name:var(--font-sora)] font-semibold"
              >
                {createDiscountMutation.isPending
                  ? 'Oppretter...'
                  : 'Opprett Rabatt'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default memo(CreateDiscountDialog);
