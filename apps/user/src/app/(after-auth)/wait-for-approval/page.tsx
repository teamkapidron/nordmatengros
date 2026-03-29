import Link from 'next/link';
import { Metadata } from 'next';
import {
  Clock,
  Shield,
  UserCheck,
  Mail,
  CheckCircle,
} from '@repo/ui/lib/icons';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Venter på godkjenning',
};

export default function WaitForApprovalPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[var(--baladi-light)] p-8 sm:p-12">
      <div className="w-full max-w-lg">
        <div className="mb-10 text-center">
          <div className="mb-8">
            <div className="relative mb-6 inline-flex items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-2xl bg-[var(--baladi-primary)]/10 blur-2xl"></div>
              <div className="absolute -inset-6 rounded-2xl bg-gradient-to-r from-[var(--baladi-primary)]/5 to-[var(--baladi-secondary)]/5 blur-xl"></div>
              <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-[var(--baladi-primary)]/10">
                <Image
                  width={96}
                  height={96}
                  src="/images/brand/logo.png"
                  alt="Baladi Engros"
                  className="h-24 w-auto object-contain"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="mb-3 flex items-center justify-center gap-2">
                <div className="h-1 w-8 rounded-full bg-[var(--baladi-accent)]"></div>
                <h1 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-primary)]">
                  BALADI ENGROS
                </h1>
                <div className="h-1 w-8 rounded-full bg-[var(--baladi-accent)]"></div>
              </div>
              <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-secondary)]">
                Din pålitelige grossistpartner
              </p>
            </div>

            <div className="mb-4 flex items-center justify-center">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--baladi-warning)] to-amber-500 shadow-lg">
                <Clock className="h-8 w-8 animate-pulse text-white" />
              </div>
            </div>

            <h2 className="font-[family-name:var(--font-sora)] text-4xl font-bold tracking-tight text-[var(--baladi-dark)]">
              Venter på godkjenning
            </h2>
            <div className="mt-3 flex items-center justify-center">
              <div className="h-1 w-16 rounded-full bg-[var(--baladi-primary)]"></div>
            </div>
          </div>
          <p className="font-[family-name:var(--font-dm-sans)] text-lg text-[var(--baladi-gray)]">
            Takk for at du registrerte deg hos Baladi Engros
          </p>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-[var(--baladi-border)] bg-white p-8 shadow-lg">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="mb-3 font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-dark)]">
                  Din søknad er under behandling
                </h3>
                <p className="font-[family-name:var(--font-dm-sans)] leading-relaxed text-[var(--baladi-gray)]">
                  Vi gjennomgår for øyeblikket din registrering og verifiserer
                  bedriftsinformasjonen din.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 rounded-lg bg-[var(--baladi-success)]/10 p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--baladi-success)] shadow-sm">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      Registrering fullført
                    </p>
                    <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                      Din konto er opprettet
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 rounded-lg bg-[var(--baladi-info)]/10 p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--baladi-info)] shadow-sm">
                    <Shield className="h-4 w-4 animate-pulse text-white" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      Verifisering pågår
                    </p>
                    <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                      Vi sjekker bedriftsinformasjonen din
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 rounded-lg bg-[var(--baladi-muted)] p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--baladi-gray)] shadow-sm">
                    <UserCheck className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      Godkjenning
                    </p>
                    <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                      Du vil motta en e-post når kontoen er godkjent
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-[var(--baladi-primary)]/20 bg-gradient-to-r from-[var(--baladi-primary)]/5 to-[var(--baladi-secondary)]/5 p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--baladi-primary)]/10">
                    <Mail className="h-3 w-3 text-[var(--baladi-primary)]" />
                  </div>
                  <div>
                    <p className="mb-1 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      Viktig informasjon
                    </p>
                    <p className="font-[family-name:var(--font-dm-sans)] text-xs leading-relaxed text-[var(--baladi-gray)]">
                      Du vil motta en e-post så snart kontoen din er godkjent og
                      klar til bruk. Sjekk også søppelpost-mappen din.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-[var(--baladi-secondary)]/20 bg-gradient-to-br from-[var(--baladi-secondary)]/10 to-[var(--baladi-accent)]/10 p-6 text-center">
                <h4 className="mb-3 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
                  I mellomtiden...
                </h4>
                <p className="mb-4 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                  Utforsk vårt omfattende produktkatalog og se hva vi kan tilby
                  din bedrift
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[var(--baladi-primary)] to-[var(--baladi-secondary)] px-6 py-3 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-[var(--baladi-secondary)] hover:to-[var(--baladi-primary)] hover:shadow-xl"
                >
                  Se våre produkter
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>

              <div className="border-t border-[var(--baladi-border)] pt-4">
                <p className="text-center font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                  Har du spørsmål om registreringen din?
                </p>
                <p className="mt-1 text-center font-[family-name:var(--font-dm-sans)] text-sm">
                  <Link
                    href="/contact"
                    className="font-medium text-[var(--baladi-primary)] transition-colors duration-200 hover:text-[var(--baladi-secondary)]"
                  >
                    Kontakt oss
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="rounded-lg bg-[var(--baladi-primary)]/5 px-6 py-4">
            <div className="mb-2 flex items-center justify-center">
              <Image
                width={32}
                height={32}
                src="/images/brand/logo.png"
                alt="Baladi Engros"
                className="h-8 w-auto object-contain opacity-80"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-2 text-xs text-[var(--baladi-gray)]">
                <span className="font-[family-name:var(--font-dm-sans)]">
                  © {new Date().getFullYear()}
                </span>
                <span className="font-[family-name:var(--font-sora)] font-bold text-[var(--baladi-primary)]">
                  BALADI ENGROS
                </span>
              </div>
              <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                Alle rettigheter forbeholdt • Din pålitelige grossistpartner
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
