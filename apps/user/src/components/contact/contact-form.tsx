'use client';

// Node Modules
import { memo } from 'react';
import { Send } from '@repo/ui/lib/icons';
import { z, zodResolver, useForm } from '@repo/ui/lib/form';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Input } from '@repo/ui/components/base/input';
import { Textarea } from '@repo/ui/components/base/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/base/form';
import { Card, CardContent } from '@repo/ui/components/base/card';

// Hooks
import { useContact } from '@/hooks/useContact';

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Navn må være minst 2 tegn')
    .max(50, 'Navn kan ikke være lengre enn 50 tegn'),
  email: z
    .string()
    .email('Ugyldig e-postadresse')
    .min(1, 'E-postadresse er påkrevd'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z
    .string()
    .min(5, 'Emne må være minst 5 tegn')
    .max(100, 'Emne kan ikke være lengre enn 100 tegn'),
  message: z
    .string()
    .min(10, 'Melding må være minst 10 tegn')
    .max(1000, 'Melding kan ikke være lengre enn 1000 tegn'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

function ContactForm() {
  const { sendContactFormMutation } = useContact();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
    },
  });

  function onSubmit(values: ContactFormValues) {
    sendContactFormMutation.mutate(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  }

  return (
    <Card className="border-[var(--baladi-border)] shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      Fullt navn *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Skriv inn ditt navn"
                        className="border-[var(--baladi-border)] focus:border-[var(--baladi-primary)] focus:ring-[var(--baladi-primary)]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      E-postadresse *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="din@epost.no"
                        className="border-[var(--baladi-border)] focus:border-[var(--baladi-primary)] focus:ring-[var(--baladi-primary)]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      Telefonnummer
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+47 123 45 678"
                        className="border-[var(--baladi-border)] focus:border-[var(--baladi-primary)] focus:ring-[var(--baladi-primary)]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      Bedriftsnavn
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ditt bedriftsnavn"
                        className="border-[var(--baladi-border)] focus:border-[var(--baladi-primary)] focus:ring-[var(--baladi-primary)]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                    Emne *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Hva gjelder henvendelsen?"
                      className="border-[var(--baladi-border)] focus:border-[var(--baladi-primary)] focus:ring-[var(--baladi-primary)]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                    Melding *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder="Beskriv din henvendelse i detalj..."
                      className="border-[var(--baladi-border)] focus:border-[var(--baladi-primary)] focus:ring-[var(--baladi-primary)]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={sendContactFormMutation.isPending}
              className="w-full bg-gradient-to-r from-[var(--baladi-primary)] to-[var(--baladi-secondary)] py-3 font-[family-name:var(--font-dm-sans)] text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sendContactFormMutation.isPending ? (
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Sender...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Send size={18} />
                  <span>Send melding</span>
                </div>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default memo(ContactForm);
