'use client';

// Node Modules
import Link from 'next/link';
import { memo, useCallback, useState } from 'react';
import { useForm, zodResolver } from '@repo/ui/lib/form';
import {
  AtSign,
  Eye,
  EyeOff,
  Key,
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
import { loginSchema, LoginSchema } from './schema';

function LoginForm() {
  const { loginMutation } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  function onSubmit(values: LoginSchema) {
    loginMutation.mutate(values);
  }

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h3 className="mb-2 font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-dark)]">
          Logg inn på kontoen din
        </h3>
        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
          Oppgi legitimasjonen din for å få tilgang til din konto
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  <AtSign className="h-4 w-4 text-[var(--baladi-gray)]" />
                  E-postadresse
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="din@epost.no"
                    className="focus:ring-[var(--baladi-primary)]/20 w-full rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-4 py-3 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--baladi-primary)] focus:bg-white focus:ring-2"
                  />
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-error)]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-center justify-between">
                  <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                    <Key className="h-4 w-4 text-[var(--baladi-gray)]" />
                    Passord
                  </FormLabel>
                  <Link href="/forgot-password">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-primary)] hover:bg-transparent hover:text-[var(--baladi-secondary)]"
                    >
                      Glemt passord?
                    </Button>
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Skriv inn passordet ditt"
                      className="focus:ring-[var(--baladi-primary)]/20 w-full rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-4 py-3 pr-10 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--baladi-primary)] focus:bg-white focus:ring-2"
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
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-error)]" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="focus:ring-[var(--baladi-primary)]/30 group relative w-full overflow-hidden rounded-lg bg-[var(--baladi-primary)] px-6 py-4 font-[family-name:var(--font-dm-sans)] text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-[var(--baladi-secondary)] hover:shadow-lg focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-70"
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

export default memo(LoginForm);
