'use client';

// Node Modules
import React, { useState } from 'react';
import { useForm, zodResolver, z } from '@repo/ui/lib/form';
import { Plus, Percent, Hash } from '@repo/ui/lib/icons';

// Components
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@repo/ui/components/base/card';
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

// Hooks
import { useBulkDiscount } from '@/hooks/useDiscount';

const bulkDiscountSchema = z.object({
  minQuantity: z.number().min(1, 'Minimum antall må være minst 1'),
  discountPercentage: z
    .number()
    .min(1, 'Rabatt prosent må være minst 1')
    .max(100, 'Rabatt prosent kan ikke være mer enn 100'),
});

type BulkDiscountFormValues = z.infer<typeof bulkDiscountSchema>;

function BulkDiscountsCards() {
  const { bulkDiscounts, createBulkDiscountMutation } = useBulkDiscount();

  const [open, setOpen] = useState(false);

  const form = useForm<BulkDiscountFormValues>({
    resolver: zodResolver(bulkDiscountSchema),
    defaultValues: {
      minQuantity: 1,
      discountPercentage: 0,
    },
  });

  function onSubmit(data: BulkDiscountFormValues) {
    createBulkDiscountMutation.mutate({
      minQuantity: data.minQuantity,
      discountPercentage: data.discountPercentage,
    });

    setOpen(false);
    form.reset();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--nordmat-text)]">
          Bulk Rabatter
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="hover:bg-[var(--nordmat-primary)]/90 gap-2 rounded-lg bg-[var(--nordmat-primary)] font-[family-name:var(--font-sora)]">
              <Plus className="h-4 w-4" />
              Legg til Bulk Rabatt
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-[family-name:var(--font-sora)] text-[var(--nordmat-text)]">
                Legg til Bulk Rabatt
              </DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="minQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--nordmat-primary)]">
                        Minimum Antall *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--nordmat-gray)]" />
                          <Input
                            type="number"
                            min={1}
                            placeholder="Skriv inn minimum antall"
                            className="h-12 rounded-lg border-[var(--nordmat-border)] pl-10 focus:border-[var(--nordmat-primary)] focus:ring-1 focus:ring-[var(--nordmat-primary)]"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                  name="discountPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--nordmat-primary)]">
                        Rabatt Prosent *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Percent className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--nordmat-success)]" />
                          <Input
                            type="number"
                            min={1}
                            max={100}
                            placeholder="Skriv inn rabatt prosent"
                            className="h-12 rounded-lg border-[var(--nordmat-border)] pl-10 focus:border-[var(--nordmat-primary)] focus:ring-1 focus:ring-[var(--nordmat-primary)]"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            value={field.value || ''}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={createBulkDiscountMutation.isPending}
                    className="hover:bg-[var(--nordmat-primary)]/90 h-12 w-full rounded-lg bg-[var(--nordmat-primary)] font-[family-name:var(--font-sora)] font-semibold"
                  >
                    {createBulkDiscountMutation.isPending
                      ? 'Oppretter...'
                      : 'Opprett Rabatt'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {!bulkDiscounts?.bulkDiscounts?.length ? (
        <div className="rounded-xl border border-[var(--nordmat-border)] bg-white shadow-sm">
          <div className="flex items-center justify-center p-12">
            <div className="text-center">
              <div className="bg-[var(--nordmat-primary)]/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Plus className="h-8 w-8 text-[var(--nordmat-primary)]" />
              </div>
              <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--nordmat-text)]">
                Ingen bulk rabatter funnet
              </h3>
              <p className="mt-2 text-sm text-[var(--nordmat-gray)]">
                Opprett din første bulk rabatt for å tilby mengdebasert prising
                til kunder.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bulkDiscounts.bulkDiscounts.map((discount) => (
            <Card key={discount._id} className="border-[var(--nordmat-border)]">
              <CardHeader>
                <CardTitle className="text-[var(--nordmat-text)]">
                  Min Antall:{' '}
                  <span className="text-[var(--nordmat-primary)]">
                    {discount.minQuantity}
                  </span>
                </CardTitle>
                <CardDescription>
                  Rabatt:{' '}
                  <span className="font-semibold text-[var(--nordmat-primary)]">
                    {discount.discountPercentage}%
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm text-[var(--nordmat-gray)]">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      discount.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {discount.isActive ? 'Aktiv' : 'Inaktiv'}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default BulkDiscountsCards;
