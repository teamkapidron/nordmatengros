import Link from 'next/link';
import { Metadata } from 'next';
import SignupForm from '@/components/auth/signup/signup-form';

export const metadata: Metadata = {
  title: 'Opprett konto',
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[var(--baladi-light)] p-6 lg:w-1/2">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mb-4">
            <h2 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight text-[var(--baladi-dark)]">
              Bli med i Baladi Engros
            </h2>
            <div className="mt-2 flex items-center justify-center">
              <div className="h-1 w-12 rounded-full bg-[var(--baladi-primary)]"></div>
            </div>
          </div>
          <p className="font-[family-name:var(--font-dm-sans)] text-base text-[var(--baladi-gray)]">
            Opprett din konto og få tilgang til vår engrosplattform
          </p>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-[var(--baladi-border)] bg-white p-6 shadow-lg">
            <SignupForm />
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="border-t border-[var(--baladi-border)] pt-4">
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Har du allerede en konto?{' '}
              <Link
                href="/login"
                className="font-medium text-[var(--baladi-primary)] transition-colors duration-200 hover:text-[var(--baladi-secondary)]"
              >
                Logg inn
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="inline-flex items-center space-x-1 text-xs text-[var(--baladi-gray)]">
            <span className="font-[family-name:var(--font-dm-sans)]">
              © {new Date().getFullYear()}
            </span>
            <span className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-primary)]">
              Baladi Engros
            </span>
            <span className="font-[family-name:var(--font-dm-sans)]">
              • Alle rettigheter forbeholdt
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
