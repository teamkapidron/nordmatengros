'use client';

// Node Modules
import { memo } from 'react';
import { zodResolver, useForm } from '@repo/ui/lib/form';
import {
  Building2,
  Hash,
  Phone,
  MapPin,
  ArrowRight,
  Loader2,
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
import { Button } from '@repo/ui/components/base/button';

// Hooks
import { useAuth } from '@/hooks/useAuth';

// Types/Utils/Constants
import { onboardingSchema, OnboardingSchema } from './schema';

function OnboardingForm() {
  const { onboardingMutation } = useAuth();

  const form = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      companyName: '',
      organizationNumber: '',
      phoneNumber: '',
      address: '',
      city: '',
      postalCode: '',
    },
  });

  function onSubmit(values: OnboardingSchema) {
    onboardingMutation.mutate(values);
  }

  return (
    <div className="w-full space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  <Building2 className="h-4 w-4 text-[var(--baladi-gray)]" />
                  Bedriftsnavn
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Skriv inn navnet på bedriften din"
                    className="w-full rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-4 py-3 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--baladi-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--baladi-primary)]/20"
                  />
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-error)]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organizationNumber"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  <Hash className="h-4 w-4 text-[var(--baladi-gray)]" />
                  Organisasjonsnummer
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="123456789"
                    className="w-full rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-4 py-3 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--baladi-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--baladi-primary)]/20"
                  />
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-error)]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  <Phone className="h-4 w-4 text-[var(--baladi-gray)]" />
                  Telefonnummer
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="+47 123 45 678"
                    className="w-full rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-4 py-3 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--baladi-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--baladi-primary)]/20"
                  />
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-error)]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  <MapPin className="h-4 w-4 text-[var(--baladi-gray)]" />
                  Gateadresse
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="f.eks. Storgata 1"
                    className="w-full rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-4 py-3 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--baladi-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--baladi-primary)]/20"
                  />
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-error)]" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                    <Hash className="h-4 w-4 text-[var(--baladi-gray)]" />
                    Postnummer
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="f.eks. 0150"
                      className="w-full rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-4 py-3 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--baladi-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--baladi-primary)]/20"
                    />
                  </FormControl>
                  <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-error)]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                    <Building2 className="h-4 w-4 text-[var(--baladi-gray)]" />
                    By
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="f.eks. Oslo"
                      className="w-full rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-4 py-3 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--baladi-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--baladi-primary)]/20"
                    />
                  </FormControl>
                  <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-error)]" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-center">
            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
              <span className="text-[var(--baladi-error)]">*</span> Alle felt er
              påkrevd for videre behandling
            </p>
          </div>

          <Button
            type="submit"
            disabled={onboardingMutation.isPending}
            className="group relative w-full overflow-hidden rounded-lg bg-[var(--baladi-primary)] px-6 py-4 font-[family-name:var(--font-dm-sans)] text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-[var(--baladi-secondary)] hover:shadow-lg focus:ring-4 focus:ring-[var(--baladi-primary)]/30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>

            <div className="relative flex items-center justify-center space-x-2">
              {onboardingMutation.isPending ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin text-white" />
                  <span>Behandler informasjon...</span>
                </>
              ) : (
                <>
                  <span>Fullfør registrering</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </div>
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default memo(OnboardingForm);
