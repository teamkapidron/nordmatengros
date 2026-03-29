'use client';

// Node Modules
import React, { memo, useState } from 'react';
import { z, zodResolver, useForm } from '@repo/ui/lib/form';
import {
  Users,
  Plus,
  Mail,
  Shield,
  Clock,
  Crown,
  UserCheck,
} from '@repo/ui/lib/icons';

// Components
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/base/table';
import { Input } from '@repo/ui/components/base/input';
import { Button } from '@repo/ui/components/base/button';

// Hooks
import { useSettings } from '@/hooks/useSettings';

const adminCreationSchema = z.object({
  name: z
    .string()
    .min(1, 'Fullt navn er påkrevd')
    .min(2, 'Navn må være minst 2 tegn'),
  email: z
    .string()
    .min(1, 'E-postadresse er påkrevd')
    .email('Ugyldig e-postadresse'),
});

type AdminCreationFormData = z.infer<typeof adminCreationSchema>;

function AdminTab() {
  const [showAddForm, setShowAddForm] = useState(false);

  const { createAdminMutation, getAllAdminsQuery } = useSettings();
  const { data: admins } = getAllAdminsQuery;

  const form = useForm<AdminCreationFormData>({
    resolver: zodResolver(adminCreationSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  function onSubmit(data: AdminCreationFormData) {
    createAdminMutation.mutate(data);
    form.reset();
    setShowAddForm(false);
  }

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl border border-[var(--baladi-border)] bg-gradient-to-br from-white via-[var(--baladi-light)]/20 to-blue-50/30 p-8 shadow-sm">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-blue-500"></div>
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-[var(--baladi-primary)]"></div>
        </div>

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)]">
                  Administrator oversikt
                </h3>
                <p className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                  Administrer systemadministratorer og deres tilganger
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-emerald-700">
                  {admins?.admins.length} Aktive
                </span>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="h-12 bg-gradient-to-r from-[var(--baladi-primary)] to-[var(--baladi-secondary)] px-6 font-[family-name:var(--font-dm-sans)] font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
          >
            <Plus className="mr-2 h-5 w-5" />
            Legg til administrator
          </Button>
        </div>
      </div>

      {showAddForm && (
        <Card className="overflow-hidden border-[var(--baladi-border)] py-0 shadow-lg">
          <CardHeader className="border-b border-[var(--baladi-border)] bg-gradient-to-r from-green-50 to-emerald-50 pt-4">
            <CardTitle className="flex items-center gap-3 font-[family-name:var(--font-sora)] text-xl text-[var(--baladi-dark)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <Plus className="h-5 w-5 text-emerald-600" />
              </div>
              Legg til ny administrator
            </CardTitle>
            <CardDescription className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
              Fyll ut informasjonen nedenfor for å legge til en ny administrator
              til systemet
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[var(--baladi-dark)]">
                          Fullt navn
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Skriv inn fullt navn"
                            className="h-12 font-[family-name:var(--font-dm-sans)]"
                            iconLeft={
                              <Users className="h-5 w-5 text-[var(--baladi-gray)]" />
                            }
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
                        <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[var(--baladi-dark)]">
                          E-postadresse
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Skriv inn e-postadresse"
                            className="h-12 font-[family-name:var(--font-dm-sans)]"
                            iconLeft={
                              <Mail className="h-5 w-5 text-[var(--baladi-gray)]" />
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-blue-800">
                        Sikkerhetsnotat
                      </h4>
                      <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm text-blue-700">
                        Den nye administratoren vil motta en e-post med
                        instruksjoner for å sette opp sitt passord.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-[var(--baladi-border)] pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false);
                      form.reset();
                    }}
                    className="h-12 px-6 font-[family-name:var(--font-dm-sans)]"
                  >
                    Avbryt
                  </Button>
                  <Button
                    type="submit"
                    disabled={createAdminMutation?.isPending}
                    className="h-12 bg-gradient-to-r from-emerald-500 to-green-500 px-6 font-[family-name:var(--font-dm-sans)] font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <UserCheck className="mr-2 h-5 w-5" />
                    {createAdminMutation?.isPending
                      ? 'Legger til...'
                      : 'Legg til administrator'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      <Card className="overflow-hidden border-[var(--baladi-border)] py-0 shadow-lg">
        <CardHeader className="border-b border-[var(--baladi-border)] bg-gradient-to-r from-gray-50 via-slate-50 to-gray-50 pt-6 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="mb-1 font-[family-name:var(--font-sora)] text-2xl text-[var(--baladi-dark)]">
                  Alle administratorer
                </CardTitle>
                <CardDescription className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  {admins?.admins.length} aktive administratorer i systemet
                </CardDescription>
              </div>
            </div>
            <div className="hidden items-center gap-3 md:flex">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2">
                <span className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-emerald-700">
                  Total: {admins?.admins.length}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-100 bg-gradient-to-r from-gray-50 via-slate-50 to-gray-50 hover:bg-gray-50">
                  <TableHead className="h-16 px-8 font-[family-name:var(--font-dm-sans)] text-xs font-bold tracking-wide text-gray-600 uppercase">
                    Administrator
                  </TableHead>
                  <TableHead className="h-16 px-4 font-[family-name:var(--font-dm-sans)] text-xs font-bold tracking-wide text-gray-600 uppercase">
                    Rolle & Tilgang
                  </TableHead>
                  <TableHead className="h-16 px-4 font-[family-name:var(--font-dm-sans)] text-xs font-bold tracking-wide text-gray-600 uppercase">
                    Status
                  </TableHead>
                  <TableHead className="h-16 px-4 font-[family-name:var(--font-dm-sans)] text-xs font-bold tracking-wide text-gray-600 uppercase">
                    Opprettet
                  </TableHead>
                  <TableHead className="h-16 w-20 px-4 font-[family-name:var(--font-dm-sans)] text-xs font-bold tracking-wide text-gray-600 uppercase">
                    Handlinger
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100">
                {admins?.admins.map((admin) => (
                  <TableRow
                    key={admin._id}
                    className="group border-b border-gray-100 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50/50 hover:via-indigo-50/30 hover:to-purple-50/50 hover:shadow-md"
                  >
                    <TableCell className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--baladi-primary)] via-blue-600 to-indigo-600 text-white shadow-lg ring-2 ring-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                            <span className="font-[family-name:var(--font-sora)] text-lg font-bold">
                              {admin.name.charAt(0)}
                            </span>
                          </div>
                          <div className="absolute -right-1 -bottom-1 h-5 w-5 rounded-full border-2 border-white bg-emerald-500 shadow-sm">
                            <div className="h-full w-full animate-pulse rounded-full bg-emerald-400"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)] transition-colors group-hover:text-blue-700">
                              {admin.name}
                            </p>
                            <div className="mt-1 flex items-center gap-2">
                              <div className="flex items-center gap-1.5 text-[var(--baladi-gray)]">
                                <Mail className="h-3.5 w-3.5" />
                                <p className="font-[family-name:var(--font-dm-sans)] text-sm">
                                  {admin.email}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-6">
                      <div className="space-y-2">
                        <div
                          className={`inline-flex items-center rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-sm ${getRoleColor('Admin')}`}
                        >
                          {getRoleIcon('Admin')}
                          <span className="ml-2">Administrator</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Shield className="h-3 w-3" />
                          <span>Full tilgang</span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-6">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 shadow-sm">
                          <div className="flex items-center gap-2">
                            <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500"></div>
                            <span className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-emerald-700">
                              Aktiv
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          Sist pålogget: I dag
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                            <Clock className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                              {new Date(admin.createdAt).toLocaleDateString(
                                'no-NO',
                                {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                },
                              )}
                            </p>
                            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-gray-500">
                              {new Date(admin.createdAt).toLocaleTimeString(
                                'no-NO',
                                {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                },
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-6">
                      <div className="flex items-center gap-2">
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-400 transition-all duration-200 hover:scale-110 hover:bg-blue-100 hover:text-blue-600">
                          <div className="h-1 w-1 rounded-full bg-current"></div>
                          <div className="mx-0.5 h-1 w-1 rounded-full bg-current"></div>
                          <div className="h-1 w-1 rounded-full bg-current"></div>
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {(!admins?.admins || admins.admins.length === 0) && (
              <div className="px-8 py-16 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg">
                  <Users className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="mb-2 font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-dark)]">
                  Ingen administratorer funnet
                </h3>
                <p className="mx-auto mb-6 max-w-md font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                  Det ser ut til at det ikke er noen administratorer registrert
                  i systemet ennå.
                </p>
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-[var(--baladi-primary)] to-blue-600 text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-600 hover:shadow-xl"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Legg til første administrator
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default memo(AdminTab);

function getRoleIcon(role: string) {
  switch (role) {
    case 'Super Admin':
      return <Crown className="mr-1 h-3 w-3" />;
    case 'Admin':
      return <Shield className="mr-1 h-3 w-3" />;
    default:
      return <UserCheck className="mr-1 h-3 w-3" />;
  }
}

function getRoleColor(role: string) {
  switch (role) {
    case 'Super Admin':
      return 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 border-purple-200';
    case 'Admin':
      return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200';
    default:
      return 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200';
  }
}
