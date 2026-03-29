'use client';

// Node Modules
import React, { memo, useCallback, useState } from 'react';
import { zodResolver, useForm } from '@repo/ui/lib/form';
import {
  AtSign,
  Eye,
  EyeOff,
  Key,
  User,
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
import OtpVerification from './otp-verification';
import { Input } from '@repo/ui/components/base/input';
import { Button } from '@repo/ui/components/base/button';

// Hooks
import { useAuth } from '@/hooks/useAuth';

// Types/Utils/Constants
import { signupSchema, SignupSchema } from './schema';

function SignupForm() {
  const { signupMutation, showOTPVerification, setShowOTPVerification } =
    useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
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

  function onSubmit(values: SignupSchema) {
    signupMutation.mutate(values);
  }

  return (
    <React.Fragment>
      <div className="w-full space-y-4">
        <div className="text-center">
          <h3 className="mb-1 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
            Opprett din konto
          </h3>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Fyll ut skjemaet nedenfor for å komme i gang
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                    <User className="h-4 w-4 text-[var(--baladi-gray)]" />
                    Fullt navn
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Skriv inn ditt fulle navn"
                      className="focus:ring-[var(--baladi-primary)]/20 w-full rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-3 py-2 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--baladi-primary)] focus:bg-white focus:ring-2"
                    />
                  </FormControl>
                  <FormMessage className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-error)]" />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                    <Key className="h-4 w-4 text-[var(--baladi-gray)]" />
                    Passord
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Opprett et sterkt passord"
                        className="focus:ring-[var(--baladi-primary)]/20 w-full rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-3 py-2 pr-10 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--baladi-primary)] focus:bg-white focus:ring-2"
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={togglePassword}
                        className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 text-[var(--baladi-gray)] hover:text-[var(--baladi-primary)]"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-error)]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                    <Key className="h-4 w-4 text-[var(--baladi-gray)]" />
                    Bekreft passord
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Skriv inn passordet på nytt"
                        className="focus:ring-[var(--baladi-primary)]/20 w-full rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-3 py-2 pr-10 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--baladi-primary)] focus:bg-white focus:ring-2"
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={toggleConfirmPassword}
                        className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 text-[var(--baladi-gray)] hover:text-[var(--baladi-primary)]"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-error)]" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={signupMutation.isPending}
              className="focus:ring-[var(--baladi-primary)]/30 group relative w-full overflow-hidden rounded-lg bg-[var(--baladi-primary)] px-6 py-3 font-[family-name:var(--font-dm-sans)] text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-[var(--baladi-secondary)] hover:shadow-lg focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <div className="relative flex items-center justify-center space-x-2">
                {signupMutation.isPending ? (
                  <>
                    <Loader2 className="mr-3 h-4 w-4 animate-spin text-white" />
                    <span>Oppretter konto...</span>
                  </>
                ) : (
                  <>
                    <span>Opprett konto</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </Button>
          </form>
        </Form>
      </div>
      <OtpVerification
        email={form.getValues('email')}
        open={showOTPVerification}
        setOpen={setShowOTPVerification}
      />
    </React.Fragment>
  );
}

export default memo(SignupForm);
