'use client';

// Node Modules
import { memo } from 'react';
import { zodResolver, useForm } from '@repo/ui/lib/form';
import { AtSign, ArrowRight, Loader2, Mail } from '@repo/ui/lib/icons';

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
import { forgotPasswordSchema, ForgotPasswordSchema } from './schema';

function ForgotPasswordForm() {
  const { forgotPasswordMutation } = useAuth();

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: ForgotPasswordSchema) {
    forgotPasswordMutation.mutate(values);
  }

  return (
    <div className="w-full space-y-4">
      <div className="text-center">
        <h3 className="mb-1 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
          Tilbakestill passord
        </h3>
        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
          Vi sender deg en sikker lenke på e-post
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  <AtSign className="h-4 w-4 text-[var(--baladi-gray)]" />
                  E-postadresse
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="din@epost.no"
                    className="focus:ring-[var(--baladi-primary)]/20 w-full rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-3 py-2 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--baladi-primary)] focus:bg-white focus:ring-2"
                  />
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-error)]" />
              </FormItem>
            )}
          />

          {/* Information Box */}
          <div className="rounded-lg bg-[var(--baladi-muted)] p-3">
            <div className="flex items-start space-x-3">
              <div className="bg-[var(--baladi-info)]/10 flex h-6 w-6 items-center justify-center rounded-full">
                <Mail className="h-3 w-3 text-[var(--baladi-info)]" />
              </div>
              <div>
                <p className="font-[family-name:var(--font-dm-sans)] text-xs leading-relaxed text-[var(--baladi-gray)]">
                  <strong>Tips:</strong> Sjekk også spam-mappen din hvis du ikke
                  ser e-posten innen få minutter.
                </p>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={forgotPasswordMutation.isPending}
            className="focus:ring-[var(--baladi-primary)]/30 group relative w-full overflow-hidden rounded-lg bg-[var(--baladi-primary)] px-6 py-3 font-[family-name:var(--font-dm-sans)] text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-[var(--baladi-secondary)] hover:shadow-lg focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <div className="relative flex items-center justify-center space-x-2">
              {forgotPasswordMutation.isPending ? (
                <>
                  <Loader2 className="mr-3 h-4 w-4 animate-spin text-white" />
                  <span>Sender lenke...</span>
                </>
              ) : (
                <>
                  <span>Send tilbakestillingslenke</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </div>
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default memo(ForgotPasswordForm);
