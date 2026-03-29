import { memo } from 'react';
import Image from 'next/image';

function AuthSidebar() {
  return (
    <div className="relative hidden overflow-hidden bg-gradient-to-br from-[var(--baladi-primary)] to-[var(--baladi-secondary)] lg:block lg:w-1/2">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] opacity-40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent)]"></div>

      <div className="absolute right-20 top-20 h-16 w-16 rounded-full bg-white/10 opacity-30 blur-sm"></div>
      <div className="absolute bottom-32 left-16 h-12 w-12 rounded-lg bg-white/5 opacity-40"></div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50"></div>

      <div className="relative z-10 flex h-full items-center justify-center p-12">
        <div className="max-w-xl text-white">
          <div className="mb-12 text-center lg:text-left">
            <div className="mb-8 flex items-center justify-center space-x-4 lg:justify-start">
              <div className="flex size-24 items-center justify-center rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                <Image
                  src="/images/brand/logo.png"
                  alt="Baladi Logo"
                  width={500}
                  height={500}
                  className="h-auto w-32"
                />
              </div>
              <div className="text-left">
                <h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold text-white">
                  Baladi Engross
                </h1>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-white/80">
                  Administrasjonsportal
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="font-[family-name:var(--font-sora)] text-4xl font-bold leading-tight text-white">
                Velkommen til ditt dashbord
              </h2>

              <p className="font-[family-name:var(--font-dm-sans)] text-lg leading-relaxed text-white/90">
                Administrer din virksomhet med vår kraftige og intuitive
                admin-plattform. Overvåk ytelse og driv vekst.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-8">
              <div className="flex items-center space-x-3 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--baladi-accent)]">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="font-[family-name:var(--font-dm-sans)] text-white/90">
                  Sanntidsanalyse
                </span>
              </div>

              <div className="flex items-center space-x-3 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--baladi-accent)]">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <span className="font-[family-name:var(--font-dm-sans)] text-white/90">
                  Sikker plattform
                </span>
              </div>

              <div className="flex items-center space-x-3 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--baladi-accent)]">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <span className="font-[family-name:var(--font-dm-sans)] text-white/90">
                  Forretningsrapporter
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(AuthSidebar);
