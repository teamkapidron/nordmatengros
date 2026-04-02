'use client';

// Node Modules
import React from 'react';
import { useForm, zodResolver } from '@repo/ui/lib/form';
import { Mail, Lock, ArrowRight, Loader2 } from '@repo/ui/lib/icons';

// Components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/base/form';
import { Input } from '@repo/ui/components/base/input';
import { Form } from '@repo/ui/components/base/form';
import { Button } from '@repo/ui/components/base/button';

// Hooks
import { useAuth } from '@/hooks/useAuth';

// Types
import { LoginFormValues, loginFormSchema } from './schema';

function LoginForm() {
  const { loginMutation } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: LoginFormValues) {
    loginMutation.mutate(values);
  }

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h3 className="mb-2 font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--nordmat-dark)]">
          Logg inn på kontoen din
        </h3>
        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--nordmat-gray)]">
          Oppgi legitimasjonen din for å få tilgang til admin-panelet
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-dark)]">
                  <Mail className="h-4 w-4 text-[var(--nordmat-gray)]" />
                  E-postadresse
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="admin@nordmatengross.com"
                    className="w-full rounded-lg border border-[var(--nordmat-border)] bg-[var(--nordmat-muted)] px-4 py-3 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--nordmat-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--nordmat-primary)]/20"
                  />
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--nordmat-error)]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-dark)]">
                  <Lock className="h-4 w-4 text-[var(--nordmat-gray)]" />
                  Passord
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Skriv inn passordet ditt"
                    className="w-full rounded-lg border border-[var(--nordmat-border)] bg-[var(--nordmat-muted)] px-4 py-3 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--nordmat-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--nordmat-primary)]/20"
                  />
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--nordmat-error)]" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="group relative w-full overflow-hidden rounded-lg bg-[var(--nordmat-primary)]/95 px-6 py-4 font-[family-name:var(--font-dm-sans)] text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-[var(--nordmat-primary)] hover:shadow-lg focus:ring-4 focus:ring-[var(--nordmat-primary)]/30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
          >
            <div className="relative flex items-center justify-center space-x-2">
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin text-white" />
                  <span>Logger inn...</span>
                </>
              ) : (
                <>
                  <span>Logg inn</span>
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

export default LoginForm;
