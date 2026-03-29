'use client';

// Node Modules
import React, { memo, useState, useMemo } from 'react';
import { useForm, zodResolver } from '@repo/ui/lib/form';
import { Tag } from '@repo/ui/lib/icons';

// Components
import { Input } from '@repo/ui/components/base/input';
import { Button } from '@repo/ui/components/base/button';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/base/form';
import { Switch } from '@repo/ui/components/base/switch';
import ParentCategoryCombobox from './parent-category-combobox';

// Hooks
import { useCategory } from '@/hooks/useCategory';

// Types/Schemas
import { createCategorySchema, CreateCategoryFormValues } from './schema';

interface CreateCategoryDialogProps {
  children: React.ReactNode;
}

function CreateCategoryDialog(props: CreateCategoryDialogProps) {
  const { children } = props;

  const [open, setOpen] = useState(false);
  const { createCategoryMutation, categoriesFlattened } = useCategory();

  const parentCategoryOptions = useMemo(() => {
    const options =
      categoriesFlattened?.categories?.map((category) => ({
        label: category.name,
        value: category._id,
      })) || [];
    options.unshift({ label: 'Ingen kategori', value: '' });
    return options;
  }, [categoriesFlattened?.categories]);

  const form = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
      isActive: true,
      visibleToStore: true,
      parentId: '',
    },
  });

  function onSubmit(data: CreateCategoryFormValues) {
    createCategoryMutation.mutate(data, {
      onSettled: function () {
        setOpen(false);
        form.reset();
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-sora)] text-[var(--baladi-text)]">
            Legg til ny kategori
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                    Navn
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Tag className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                      <Input
                        placeholder="Skriv inn kategorinavn"
                        className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Aktiv</FormLabel>
                      <FormDescription>
                        Aktiver eller deaktiver kategorien
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="visibleToStore"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                        Synlig i butikk
                      </FormLabel>
                      <FormDescription>
                        Vis kategorien i nettbutikken
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                    Overordnet kategori
                  </FormLabel>
                  <FormControl>
                    <ParentCategoryCombobox
                      options={parentCategoryOptions}
                      value={field.value ?? ''}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Velg en eksisterende kategori som overordnet kategori
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                disabled={createCategoryMutation.isPending}
                className="h-12 w-full rounded-lg bg-[var(--baladi-primary)] font-[family-name:var(--font-sora)] font-semibold hover:bg-[var(--baladi-primary)]/90"
              >
                {createCategoryMutation.isPending
                  ? 'Legger til...'
                  : 'Legg til kategori'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default memo(CreateCategoryDialog);
