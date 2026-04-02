'use client';

// Node Modules
import { memo, useCallback, useState } from 'react';
import { zodResolver, useForm } from '@repo/ui/lib/form';
import {
  Eye,
  EyeOff,
  Key,
  ArrowRight,
  Loader2,
  Shield,
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
import { resetPasswordSchema, ResetPasswordSchema } from './schema';

interface ResetPasswordFormProps {
  token: string;
}

function ResetPasswordForm(props: ResetPasswordFormProps) {
  const { token } = props;

  const { resetPasswordMutation } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      password: '',
      confirmPassword: '',
    },
  });

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  function onSubmit(values: ResetPasswordSchema) {
    resetPasswordMutation.mutate(values);
  }

  return (
    <div className="w-full space-y-4">
      <div className="text-center">
        <h3 className="mb-1 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--nordmat-dark)]">
          Opprett nytt passord
        </h3>
        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--nordmat-gray)]">
          Velg et sterkt passord for å sikre kontoen din
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-dark)]">
                  <Key className="h-4 w-4 text-[var(--nordmat-gray)]" />
                  Nytt passord
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Opprett et sterkt passord"
                      className="focus:ring-[var(--nordmat-primary)]/20 w-full rounded-lg border border-[var(--nordmat-border)] bg-[var(--nordmat-muted)] px-3 py-2 pr-10 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--nordmat-primary)] focus:bg-white focus:ring-2"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={togglePassword}
                      className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 text-[var(--nordmat-gray)] hover:text-[var(--nordmat-primary)]"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-error)]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-dark)]">
                  <Key className="h-4 w-4 text-[var(--nordmat-gray)]" />
                  Bekreft nytt passord
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Skriv inn passordet på nytt"
                      className="focus:ring-[var(--nordmat-primary)]/20 w-full rounded-lg border border-[var(--nordmat-border)] bg-[var(--nordmat-muted)] px-3 py-2 pr-10 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--nordmat-primary)] focus:bg-white focus:ring-2"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={toggleConfirmPassword}
                      className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 text-[var(--nordmat-gray)] hover:text-[var(--nordmat-primary)]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-error)]" />
              </FormItem>
            )}
          />

          {/* Security Tips */}
          <div className="rounded-lg bg-[var(--nordmat-muted)] p-3">
            <div className="flex items-start space-x-3">
              <div className="bg-[var(--nordmat-success)]/10 flex h-6 w-6 items-center justify-center rounded-full">
                <Shield className="h-3 w-3 text-[var(--nordmat-success)]" />
              </div>
              <div>
                <p className="font-[family-name:var(--font-dm-sans)] text-xs leading-relaxed text-[var(--nordmat-gray)]">
                  <strong>Sikkerhetstips:</strong> Bruk minst 8 tegn med store
                  og små bokstaver, tall og spesialtegn.
                </p>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={resetPasswordMutation.isPending}
            className="focus:ring-[var(--nordmat-primary)]/30 group relative w-full overflow-hidden rounded-lg bg-[var(--nordmat-primary)] px-6 py-3 font-[family-name:var(--font-dm-sans)] text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-[var(--nordmat-secondary)] hover:shadow-lg focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <div className="relative flex items-center justify-center space-x-2">
              {resetPasswordMutation.isPending ? (
                <>
                  <Loader2 className="mr-3 h-4 w-4 animate-spin text-white" />
                  <span>Oppdaterer passord...</span>
                </>
              ) : (
                <>
                  <span>Oppdater passord</span>
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

export default memo(ResetPasswordForm);
