'use client';

// Node Modules
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useForm, z, zodResolver } from '@repo/ui/lib/form';
import { Send, Eye, Mail, Sparkles } from '@repo/ui/lib/icons';

// Components
import { Input } from '@repo/ui/components/base/input';
import { Button } from '@repo/ui/components/base/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/base/card';
import { Badge } from '@repo/ui/components/base/badge';
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
import { useNewsletter } from '@/hooks/useNewsletter';

// Types
import { CampaignType } from '@repo/types/campaign';

interface NewsletterCreatorProps {
  selectedProducts: string[];
}

const formSchema = z.object({
  subject: z.string().min(1, 'Emne er påkrevd'),
  products: z.array(z.string()),
  campaignType: z.nativeEnum(CampaignType),
});

function NewsletterCreator(props: NewsletterCreatorProps) {
  const { selectedProducts } = props;

  const { createCampaignMutation, newsLetterPreviewMutation } = useNewsletter();

  const form = useForm({
    defaultValues: {
      subject: '',
      products: selectedProducts,
      campaignType: CampaignType.NEW_ARRIVAL,
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.setValue('products', selectedProducts, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [form, selectedProducts]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    createCampaignMutation.mutate({
      title: values.subject,
      type: values.campaignType,
      productsIds: selectedProducts,
    });

    form.reset();

    newsLetterPreviewMutation.reset();
  }

  const preview = useMemo(() => {
    return newsLetterPreviewMutation.data?.html;
  }, [newsLetterPreviewMutation.data]);

  const showPreview = useCallback(() => {
    newsLetterPreviewMutation.mutate({
      type: form.watch('campaignType'),
      productsIds: selectedProducts,
    });
  }, [form, newsLetterPreviewMutation, selectedProducts]);

  return (
    <Card className="h-fit rounded-xl shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
              Opprett Nyhetsbrev Kampanje
            </CardTitle>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Design og send engasjerende nyhetsbrev til dine abonnenter
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--baladi-primary)]/10">
            <Mail className="h-5 w-5 text-[var(--baladi-primary)]" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="campaignType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                    Kampanjetype
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Velg kampanjetype" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={CampaignType.NEW_ARRIVAL}>
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-[var(--baladi-info)]" />
                          Nyheter
                        </div>
                      </SelectItem>
                      <SelectItem value={CampaignType.PROMOTION}>
                        <div className="flex items-center gap-2">
                          <Badge className="h-4 w-4 bg-[var(--baladi-accent)]" />
                          Produktkampanje
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
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                    E-post Emnelinje
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Skriv inn en overbevisende emnelinje som fanger oppmerksomhet..."
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Card className="border-[var(--baladi-border)]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-[family-name:var(--font-sora)] text-base font-semibold text-[var(--baladi-dark)]">
                    Nyhetsbrev Forhåndsvisning
                  </CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={showPreview}
                    className="gap-2"
                    disabled={
                      newsLetterPreviewMutation.isPending ||
                      selectedProducts.length === 0
                    }
                  >
                    <Eye className="h-4 w-4" />
                    Vis Forhåndsvisning
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                {preview !== undefined ? (
                  <div className="space-y-4">
                    <iframe
                      srcDoc={preview}
                      className="h-[600px] w-full border-0"
                      title="Nyhetsbrev Forhåndsvisning"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--baladi-primary)]/10">
                      <Eye className="h-8 w-8 text-[var(--baladi-primary)]" />
                    </div>
                    <h4 className="mb-2 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
                      Forhåndsvis Ditt Nyhetsbrev
                    </h4>
                    <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                      Klikk &quot;Vis Forhåndsvisning&quot; knappen ovenfor for
                      å se hvordan ditt nyhetsbrev vil se ut
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex items-center justify-end">
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="gap-2 bg-[var(--baladi-primary)] text-white hover:bg-[var(--baladi-primary)]/90"
                  disabled={
                    !form.formState.isValid || createCampaignMutation.isPending
                  }
                >
                  <Send className="h-4 w-4" />
                  {createCampaignMutation.isPending
                    ? 'Sender...'
                    : 'Send Nyhetsbrev'}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default memo(NewsletterCreator);
