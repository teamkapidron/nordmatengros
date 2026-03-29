'use client';

// Node Modules
import React, { memo, useState } from 'react';
import { useForm, zodResolver, z } from '@repo/ui/lib/form';
import { DollarSign, Calendar, Package } from '@repo/ui/lib/icons';

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

// Hooks
import { useDiscount } from '@/hooks/useDiscount';

// Types
import type { DiscountResponse } from '@/hooks/useDiscount/types';

const updateDiscountSchema = z.object({
  discountValue: z.number().min(0.01, 'Rabatt beløp må være større enn 0'),
  validFrom: z.string().optional(),
  validTo: z.string().optional(),
});

type UpdateDiscountFormValues = z.infer<typeof updateDiscountSchema>;

interface UpdateDiscountDialogProps {
  children: React.ReactNode;
  discount: DiscountResponse;
}

function UpdateDiscountDialog(props: UpdateDiscountDialogProps) {
  const { children, discount } = props;

  const [open, setOpen] = useState(false);
  const { updateDiscountMutation } = useDiscount();

  const form = useForm<UpdateDiscountFormValues>({
    resolver: zodResolver(updateDiscountSchema),
    defaultValues: {
      discountValue: discount.discountValue,
      validFrom: '',
      validTo: '',
    },
  });

  const onSubmit = (data: UpdateDiscountFormValues) => {
    updateDiscountMutation.mutate({
      discountId: discount._id,
      discount: {
        productId: discount.productId._id,
        discountValue: data.discountValue,
        validFrom: data.validFrom,
        validTo: data.validTo,
      },
    });

    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-sora)] text-[var(--baladi-text)]">
            Oppdater Produkt Rabatt
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-light)] p-4">
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5 text-[var(--baladi-primary)]" />
                <div>
                  <p className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                    Produkt
                  </p>
                  <p className="text-sm text-[var(--baladi-text)]">
                    {discount.productId.name}
                  </p>
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="discountValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                    Rabatt Beløp (kr) *
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-success)]" />
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
                    </div>
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
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                      <Input
                        type="date"
                        className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                        {...field}
                      />
                    </div>
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
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                      <Input
                        type="date"
                        className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                        {...field}
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
                disabled={updateDiscountMutation.isPending}
                className="hover:bg-[var(--baladi-primary)]/90 h-12 w-full rounded-lg bg-[var(--baladi-primary)] font-[family-name:var(--font-sora)] font-semibold"
              >
                {updateDiscountMutation.isPending
                  ? 'Oppdaterer...'
                  : 'Oppdater Rabatt'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default memo(UpdateDiscountDialog);
