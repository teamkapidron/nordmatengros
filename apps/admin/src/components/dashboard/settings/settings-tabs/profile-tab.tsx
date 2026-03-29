'use client';

// Node Modules
import React, { memo, useState } from 'react';
import { z, zodResolver, useForm } from '@repo/ui/lib/form';
import { Eye, EyeOff, User, Mail, Lock, Shield, Key } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Input } from '@repo/ui/components/base/input';
import { Label } from '@repo/ui/components/base/label';
import {
  Card,
  CardContent,
  CardDescription,
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

// Hooks
import { useAuth } from '@/hooks/useAuth';
import { useSettings } from '@/hooks/useSettings';

const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, 'Nåværende passord er påkrevd'),
    newPassword: z.string().min(8, 'Passord må være minst 8 tegn'),
    confirmPassword: z.string().min(8, 'Bekreft passord er påkrevd'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passordene stemmer ikke overens',
    path: ['confirmPassword'],
  });

type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;

function ProfileTab() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { user } = useAuth();
  const { updatePasswordMutation } = useSettings();

  const form = useForm<PasswordChangeFormData>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: PasswordChangeFormData) => {
    updatePasswordMutation.mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmPassword,
    });

    form.reset();
  };

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl border border-[var(--baladi-border)] bg-gradient-to-br from-white via-white to-[var(--baladi-light)]/20 shadow-sm">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-[var(--baladi-primary)]"></div>
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-[var(--baladi-accent)]"></div>
        </div>

        <div className="relative p-8">
          <div className="flex items-start gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--baladi-primary)] to-[var(--baladi-secondary)] shadow-lg">
              <User className="h-10 w-10 text-white" />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)]">
                  {user?.name}
                </h2>
                <p className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                  {user?.email}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-lg bg-[var(--baladi-primary)]/10 px-3 py-2">
                  <Shield className="h-4 w-4 text-[var(--baladi-primary)]" />
                  <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-primary)]">
                    Admin
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-emerald-700">
                    Aktiv
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden border-[var(--baladi-border)] py-0 shadow-sm">
        <CardHeader className="border-b border-[var(--baladi-border)] bg-gradient-to-r from-gray-50 to-[var(--baladi-light)]/30 pt-4">
          <CardTitle className="flex items-center gap-3 font-[family-name:var(--font-sora)] text-xl text-[var(--baladi-dark)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--baladi-primary)]/10">
              <User className="h-5 w-5 text-[var(--baladi-primary)]" />
            </div>
            Kontoinformasjon
          </CardTitle>
          <CardDescription className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
            Grunnleggende kontoinformasjon som administreres av systemet
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <Label className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[var(--baladi-dark)]">
                Fullt navn
              </Label>
              <div className="relative">
                <Input
                  value={user?.name}
                  disabled
                  className="h-12 bg-gray-50/80 font-[family-name:var(--font-dm-sans)] text-[var(--baladi-dark)] backdrop-blur-sm"
                  iconLeft={
                    <User className="h-5 w-5 text-[var(--baladi-dark)]" />
                  }
                />
                <div className="absolute top-1/2 right-3 -translate-y-1/2">
                  <div className="rounded-md bg-gray-200 px-2 py-1">
                    <span className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-gray-600">
                      Låst
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[var(--baladi-dark)]">
                E-postadresse
              </Label>
              <div className="relative">
                <Input
                  value={user?.email}
                  disabled
                  className="h-12 bg-gray-50/80 font-[family-name:var(--font-dm-sans)] text-[var(--baladi-dark)] backdrop-blur-sm"
                  iconLeft={
                    <Mail className="h-5 w-5 text-[var(--baladi-dark)]" />
                  }
                />
                <div className="absolute top-1/2 right-3 -translate-y-1/2">
                  <div className="rounded-md bg-gray-200 px-2 py-1">
                    <span className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-gray-600">
                      Låst
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-[var(--baladi-border)] py-0 shadow-sm">
        <CardHeader className="border-b border-[var(--baladi-border)] bg-gradient-to-r from-amber-50 to-orange-50 pt-4">
          <CardTitle className="flex items-center gap-3 font-[family-name:var(--font-sora)] text-xl text-[var(--baladi-dark)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
              <Key className="h-5 w-5 text-amber-600" />
            </div>
            Sikkerhet & Passord
          </CardTitle>
          <CardDescription className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
            Oppdater passordet ditt for økt sikkerhet og beskyttelse
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[var(--baladi-dark)]">
                        Nåværende passord
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showCurrentPassword ? 'text' : 'password'}
                            placeholder="Skriv inn nåværende passord"
                            className="h-12 pr-12 font-[family-name:var(--font-dm-sans)]"
                            iconLeft={
                              <Lock className="h-5 w-5 text-[var(--baladi-gray)]" />
                            }
                            iconRight={
                              <button
                                type="button"
                                onClick={() =>
                                  setShowCurrentPassword(!showCurrentPassword)
                                }
                                className="rounded-md p-1 text-[var(--baladi-gray)] transition-colors hover:bg-gray-100 hover:text-[var(--baladi-primary)]"
                              >
                                {showCurrentPassword ? (
                                  <EyeOff className="h-5 w-5" />
                                ) : (
                                  <Eye className="h-5 w-5" />
                                )}
                              </button>
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[var(--baladi-dark)]">
                          Nytt passord
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showNewPassword ? 'text' : 'password'}
                              placeholder="Skriv inn nytt passord"
                              className="h-12 pr-12 font-[family-name:var(--font-dm-sans)]"
                              iconLeft={
                                <Lock className="h-5 w-5 text-[var(--baladi-gray)]" />
                              }
                              iconRight={
                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowNewPassword(!showNewPassword)
                                  }
                                  className="rounded-md p-1 text-[var(--baladi-gray)] transition-colors hover:bg-gray-100 hover:text-[var(--baladi-primary)]"
                                >
                                  {showNewPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                  ) : (
                                    <Eye className="h-5 w-5" />
                                  )}
                                </button>
                              }
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[var(--baladi-dark)]">
                          Bekreft nytt passord
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="Bekreft nytt passord"
                              className="h-12 pr-12 font-[family-name:var(--font-dm-sans)]"
                              iconLeft={
                                <Lock className="h-5 w-5 text-[var(--baladi-gray)]" />
                              }
                              iconRight={
                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                  }
                                  className="rounded-md p-1 text-[var(--baladi-gray)] transition-colors hover:bg-gray-100 hover:text-[var(--baladi-primary)]"
                                >
                                  {showConfirmPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                  ) : (
                                    <Eye className="h-5 w-5" />
                                  )}
                                </button>
                              }
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end border-t border-[var(--baladi-border)] pt-6">
                <Button
                  type="submit"
                  disabled={updatePasswordMutation.isPending}
                  className="h-12 bg-gradient-to-r from-[var(--baladi-primary)] to-[var(--baladi-secondary)] px-8 font-[family-name:var(--font-dm-sans)] font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Key className="mr-2 h-5 w-5" />
                  {updatePasswordMutation.isPending
                    ? 'Oppdaterer...'
                    : 'Oppdater passord'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default memo(ProfileTab);
