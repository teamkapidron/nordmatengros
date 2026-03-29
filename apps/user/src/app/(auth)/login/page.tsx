import Link from 'next/link';
import { Metadata } from 'next';
import LoginForm from '@/components/auth/login/login-form';

export const metadata: Metadata = {
  title: 'Logg inn',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[var(--baladi-light)] p-8 sm:p-12 lg:w-1/2">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="mb-6">
            <h2 className="font-[family-name:var(--font-sora)] text-4xl font-bold tracking-tight text-[var(--baladi-dark)]">
              Velkommen tilbake
            </h2>
            <div className="mt-3 flex items-center justify-center">
              <div className="h-1 w-12 rounded-full bg-[var(--baladi-primary)]"></div>
            </div>
          </div>
          <p className="font-[family-name:var(--font-dm-sans)] text-lg text-[var(--baladi-gray)]">
            Logg inn for å få tilgang til din Baladi Engros-konto
          </p>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-[var(--baladi-border)] bg-white p-8 shadow-lg">
            <LoginForm />
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="border-t border-[var(--baladi-border)] pt-6">
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Har du ikke en konto?{' '}
              <Link
                href="/signup"
                className="font-medium text-[var(--baladi-primary)] transition-colors duration-200 hover:text-[var(--baladi-secondary)]"
              >
                Opprett en konto
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
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
