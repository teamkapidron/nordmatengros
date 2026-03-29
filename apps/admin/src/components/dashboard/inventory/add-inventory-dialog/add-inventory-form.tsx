'use client';

// Node Modules
import React, { memo } from 'react';
import { useForm, zodResolver } from '@repo/ui/lib/form';
import {
  Package,
  Hash,
  Loader2,
  Plus,
  Calendar as CalendarIcon,
} from '@repo/ui/lib/icons';

// Components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/base/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/base/popover';
import { Input } from '@repo/ui/components/base/input';
import { Form } from '@repo/ui/components/base/form';
import { Button } from '@repo/ui/components/base/button';
import { Calendar } from '@repo/ui/components/base/calendar';
import ProductSearchCombobox from '@/components/common/product-search-combobox';

// Hooks
import { useInventory } from '@/hooks/useInventory';

// Types/Utils
import { AddInventoryFormValues, addInventoryFormSchema } from './schema';

interface AddInventoryFormProps {
  onSuccess?: () => void;
}

function AddInventoryForm(props: AddInventoryFormProps) {
  const { onSuccess } = props;

  const { createInventoryMutation } = useInventory();

  const form = useForm<AddInventoryFormValues>({
    resolver: zodResolver(addInventoryFormSchema),
    defaultValues: {
      quantity: 1,
      expirationDate: '',
    },
  });

  function onSubmit(values: AddInventoryFormValues) {
    createInventoryMutation.mutate(
      {
        productId: values.productId,
        quantity: values.quantity,
        expirationDate: values.expirationDate,
      },
      {
        onSuccess: () => {
          form.reset();
          onSuccess?.();
        },
      },
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--baladi-primary)] to-[var(--baladi-secondary)]">
          <Package className="h-8 w-8 text-white" />
        </div>
        <h3 className="mb-2 font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-dark)]">
          Legg til Lager
        </h3>
        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
          Registrer nytt lager for et produkt med utløpsdato
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="productId"
            render={() => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  <Package className="h-4 w-4 text-[var(--baladi-gray)]" />
                  Produkt
                </FormLabel>
                <FormControl>
                  <ProductSearchCombobox
                    onSelect={(productId) =>
                      form.setValue('productId', productId)
                    }
                  />
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-error)]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  <Hash className="h-4 w-4 text-[var(--baladi-gray)]" />
                  Antall
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min="1"
                    placeholder="Skriv inn antall enheter"
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    className="w-full rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-4 py-3 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--baladi-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--baladi-primary)]/20"
                  />
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-error)]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expirationDate"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  <CalendarIcon className="h-4 w-4 text-[var(--baladi-gray)]" />
                  Utløpsdato
                </FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-4 py-3 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--baladi-primary)] focus:bg-white focus:ring-2"
                      >
                        {field.value
                          ? new Date(field.value).toLocaleDateString('no-NO')
                          : 'Utløpsdato'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[280px] p-0">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          if (date) {
                            field.onChange(date.toISOString());
                          }
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-error)]" />
              </FormItem>
            )}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={createInventoryMutation.isPending}
              className="group relative flex-1 overflow-hidden rounded-lg bg-[var(--baladi-primary)] px-6 py-4 font-[family-name:var(--font-dm-sans)] text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-[var(--baladi-secondary)] hover:shadow-lg focus:ring-4 focus:ring-[var(--baladi-primary)]/30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
            >
              <div className="relative flex items-center justify-center space-x-2">
                {createInventoryMutation.isPending ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin text-white" />
                    <span>Legger til...</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                    <span>Legg til Lager</span>
                  </>
                )}
              </div>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default memo(AddInventoryForm);
