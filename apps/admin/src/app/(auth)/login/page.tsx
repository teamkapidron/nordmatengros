import { Metadata } from 'next';

import LoginForm from '@/components/auth/login/login-form';

export const metadata: Metadata = {
  title: 'Logg inn',
};

export default function Login() {
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
            Logg inn for å få tilgang til ditt admin-dashbord
          </p>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-[var(--baladi-border)] bg-white p-8 shadow-lg">
            <LoginForm />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center space-x-2 text-sm text-[var(--baladi-gray)]">
          <svg
            className="h-4 w-4 text-[var(--baladi-success)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span className="font-[family-name:var(--font-dm-sans)]">
            Sikret med kryptering av bedriftskvalitet
          </span>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-1 text-xs text-[var(--baladi-gray)]">
            <span className="font-[family-name:var(--font-dm-sans)]">
              © {new Date().getFullYear()}
            </span>
            <span className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-primary)]">
              Baladi
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
