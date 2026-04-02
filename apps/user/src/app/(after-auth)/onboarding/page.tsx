import { Metadata } from 'next';
import Image from 'next/image';
import { Sparkles } from '@repo/ui/lib/icons';
import OnboardingForm from '@/components/auth/onboarding/onboarding-form';

export const metadata: Metadata = {
  title: 'Fullfør registrering | Nordmat',
};

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[var(--nordmat-light)] p-8 sm:p-12">
      <div className="w-full max-w-lg">
        <div className="mb-10 text-center">
          <div className="mb-8">
            <div className="relative mb-6 inline-flex items-center justify-center">
              <div className="bg-[var(--nordmat-primary)]/10 absolute inset-0 animate-pulse rounded-2xl blur-2xl"></div>
              <div className="from-[var(--nordmat-primary)]/5 to-[var(--nordmat-secondary)]/5 absolute -inset-6 rounded-2xl bg-gradient-to-r blur-xl"></div>
              <div className="ring-[var(--nordmat-primary)]/10 relative overflow-hidden rounded-2xl bg-white p-4 shadow-2xl ring-1">
                <Image
                  width={96}
                  height={96}
                  src="/images/brand/logo.png"
                  alt="Nordmat Engros"
                  className="h-24 w-auto object-contain"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="mb-3 flex items-center justify-center gap-2">
                <div className="h-1 w-8 rounded-full bg-[var(--nordmat-accent)]"></div>
                <h1 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--nordmat-primary)]">
                  NORDMAT ENGROS
                </h1>
                <div className="h-1 w-8 rounded-full bg-[var(--nordmat-accent)]"></div>
              </div>
              <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--nordmat-secondary)]">
                Din pålitelige grossistpartner
              </p>
            </div>

            <h2 className="font-[family-name:var(--font-sora)] text-4xl font-bold tracking-tight text-[var(--nordmat-dark)]">
              Fullfør registreringen
            </h2>
            <div className="mt-3 flex items-center justify-center">
              <div className="h-1 w-16 rounded-full bg-[var(--nordmat-primary)]"></div>
            </div>
          </div>
          <p className="font-[family-name:var(--font-dm-sans)] text-lg text-[var(--nordmat-gray)]">
            Vi trenger litt mer informasjon om bedriften din
          </p>
        </div>

        <div className="relative">
          <div className="bg-[var(--nordmat-accent)]/30 absolute -left-2 -top-2 h-4 w-4 rounded-full blur-sm"></div>
          <div className="bg-[var(--nordmat-secondary)]/20 absolute -bottom-2 -right-2 h-6 w-6 rounded-full blur-sm"></div>

          <div className="rounded-2xl border border-[var(--nordmat-border)] bg-white p-8 shadow-lg backdrop-blur-sm">
            <div className="mb-8 text-center">
              <div className="mb-4 flex items-center justify-center space-x-2">
                <Sparkles className="h-5 w-5 text-[var(--nordmat-accent)]" />
                <h3 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--nordmat-dark)]">
                  Bedriftsinformasjon
                </h3>
                <Sparkles className="h-5 w-5 text-[var(--nordmat-accent)]" />
              </div>
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--nordmat-gray)]">
                Oppgi nøyaktig informasjon for rask godkjenning
              </p>
            </div>

            <OnboardingForm />
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-[var(--nordmat-primary)]/5 rounded-lg px-6 py-4">
            <div className="mb-2 flex items-center justify-center">
              <Image
                width={32}
                height={32}
                src="/images/brand/logo.png"
                alt="Nordmat Engros"
                className="h-8 w-auto object-contain opacity-80"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-2 text-xs text-[var(--nordmat-gray)]">
                <span className="font-[family-name:var(--font-dm-sans)]">
                  © {new Date().getFullYear()}
                </span>
                <span className="font-[family-name:var(--font-sora)] font-bold text-[var(--nordmat-primary)]">
                  NORDMAT ENGROS
                </span>
              </div>
              <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-gray)]">
                Alle rettigheter forbeholdt • Din pålitelige grossistpartner
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
