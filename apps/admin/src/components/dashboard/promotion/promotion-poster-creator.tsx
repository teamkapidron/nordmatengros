'use client';

// Node Modules
import { memo, useEffect } from 'react';
import { Download, ImageIcon, Percent, Sparkles } from '@repo/ui/lib/icons';
import { useForm, z, zodResolver } from '@repo/ui/lib/form';

// Components
import { Input } from '@repo/ui/components/base/input';
import { Button } from '@repo/ui/components/base/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/base/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/base/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/base/select';

// Hooks
import { usePromotion } from '@/hooks/usePromotion';

interface PromotionPosterCreatorProps {
  selectedProducts: string[];
}

const formSchema = z.object({
  title: z.string().optional(),
  posterType: z.enum(['new-arrival', 'promotion']),
  productsIds: z.array(z.string()).min(1, 'Vennligst velg minst ett produkt'),
});

type FormSchema = z.infer<typeof formSchema>;

function PromotionPosterCreator(props: PromotionPosterCreatorProps) {
  const { selectedProducts } = props;

  const { previewPromotionPosterMutation } = usePromotion();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      posterType: 'new-arrival',
      productsIds: selectedProducts,
    },
  });

  function onSubmit(values: FormSchema) {
    previewPromotionPosterMutation.mutate({
      posterType: values.posterType,
      productsIds: values.productsIds,
      title: values.title ?? 'Kampanje',
    });
  }

  useEffect(() => {
    form.setValue('productsIds', selectedProducts, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [form, selectedProducts]);

  return (
    <Card className="h-fit rounded-xl shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
              Opprett Kampanjeplakat
            </CardTitle>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Design iøynefallende plakater for dine markedsføringskampanjer
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--baladi-primary)]/10">
            <ImageIcon className="h-5 w-5 text-[var(--baladi-primary)]" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="posterType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                    Plakattype
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Velg plakattype" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="new-arrival">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-[var(--baladi-info)]" />
                          Nyheter
                        </div>
                      </SelectItem>
                      <SelectItem value="promotion">
                        <div className="flex items-center gap-2">
                          <Percent className="h-4 w-4 text-[var(--baladi-accent)]" />
                          Kampanje
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                    Bildenavn
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Skriv inn et bildenavn..."
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end gap-3">
              <Button
                type="submit"
                className="gap-2 bg-[var(--baladi-primary)] text-white hover:bg-[var(--baladi-primary)]/90"
                disabled={
                  !form.formState.isValid ||
                  previewPromotionPosterMutation.isPending
                }
              >
                <Download className="h-4 w-4" />
                {previewPromotionPosterMutation.isPending
                  ? 'Laster ned...'
                  : 'Last ned'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default memo(PromotionPosterCreator);
