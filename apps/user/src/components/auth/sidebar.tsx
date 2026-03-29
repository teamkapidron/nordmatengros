import { memo } from 'react';
import Image from 'next/image';

function AuthSidebar() {
  return (
    <div className="relative hidden overflow-hidden bg-gradient-to-br from-[var(--baladi-dark)] via-[var(--baladi-primary)] to-[var(--baladi-primary-dark)] lg:block lg:w-1/2">
      <div className="absolute inset-0 opacity-20">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient
              id="radialGradient"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="linearGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="40" fill="url(#radialGradient)" />
          <polygon
            points="50,5 95,50 50,95 5,50"
            fill="url(#linearGradient)"
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="white"
            strokeWidth="0.3"
            strokeOpacity="0.2"
          />
        </svg>
      </div>

      <div className="absolute inset-0 opacity-25">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 h-80 w-full"
        >
          <path
            fill="rgba(255, 255, 255, 0.15)"
            fillOpacity="1"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="animate-wave"
          ></path>
          <path
            fill="rgba(255, 255, 255, 0.2)"
            fillOpacity="1"
            d="M0,192L60,208C120,224,240,256,360,245.3C480,235,600,181,720,170.7C840,160,960,192,1080,197.3C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            className="animate-wave-slow"
          ></path>
        </svg>
      </div>

      <div className="absolute inset-0">
        <div className="animate-float left-1/6 top-1/6 bg-white/8 absolute h-40 w-40 rounded-full blur-2xl"></div>
        <div className="animate-float-delay right-1/6 bg-white/12 absolute top-3/4 h-32 w-32 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/4 h-24 w-24 animate-pulse rounded-full bg-white/10 blur-lg"></div>
        <div
          className="bg-[var(--baladi-accent)]/20 absolute right-1/3 top-1/3 h-16 w-16 animate-bounce rounded-full blur-md"
          style={{ animationDuration: '3s' }}
        ></div>
      </div>

      <div className="opacity-8 absolute inset-0">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.15) 25%, rgba(255, 255, 255, 0.15) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.15) 75%, rgba(255, 255, 255, 0.15) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.15) 25%, rgba(255, 255, 255, 0.15) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.15) 75%, rgba(255, 255, 255, 0.15) 76%, transparent 77%, transparent)',
            backgroundSize: '80px 80px',
          }}
        ></div>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="p-12 text-center text-white">
          <div className="relative mb-16 inline-flex items-center justify-center">
            <div className="absolute inset-0 animate-pulse rounded-full bg-white/15 blur-3xl"></div>
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-white/5 to-white/10 blur-xl"></div>
            <div className="relative flex items-center space-x-6 rounded-3xl border border-white/40 bg-gradient-to-br from-white/15 to-white/5 p-8 shadow-[0_0_50px_rgba(255,255,255,0.15)] backdrop-blur-lg">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-white/20 blur-md"></div>
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-white/25 to-white/10 p-3 shadow-lg">
                  <Image
                    src="/images/brand/logo.png"
                    alt="Baladi Engros Logo"
                    width={80}
                    height={80}
                    className="h-auto w-14 drop-shadow-lg"
                  />
                </div>
              </div>
              <div className="text-left">
                <h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold text-white drop-shadow-lg">
                  Baladi Engros
                </h1>
                <p className="font-[family-name:var(--font-dm-sans)] text-base text-white/90 drop-shadow-sm">
                  Din engros-partner
                </p>
                <div className="mt-2 h-0.5 w-24 rounded-full bg-gradient-to-r from-[var(--baladi-accent)] to-transparent"></div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto max-w-lg">
            <div className="absolute bottom-0 left-10 top-0 w-1 rounded-full bg-gradient-to-b from-white/50 via-white/30 to-white/10"></div>

            <div className="group relative mb-12 flex items-center">
              <div className="z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/40 bg-gradient-to-br from-white/25 to-white/10 shadow-2xl backdrop-blur-lg transition-all duration-500 group-hover:scale-125 group-hover:from-white/35 group-hover:to-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                <svg
                  className="h-8 w-8 text-white drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <div className="ml-8 flex-1 rounded-2xl border border-white/30 bg-gradient-to-r from-white/15 to-white/5 p-6 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-2 group-hover:from-white/20 group-hover:to-white/10 group-hover:shadow-lg">
                <h3 className="font-[family-name:var(--font-sora)] text-xl font-semibold drop-shadow-sm">
                  Omfattende produktkatalog
                </h3>
                <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm opacity-90">
                  Utforsk tusenvis av produkter fra pålitelige leverandører
                </p>
              </div>
            </div>

            <div className="group relative mb-12 flex items-center">
              <div className="z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/40 bg-gradient-to-br from-white/25 to-white/10 shadow-2xl backdrop-blur-lg transition-all duration-500 group-hover:scale-125 group-hover:from-white/35 group-hover:to-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                <svg
                  className="h-8 w-8 text-white drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <div className="ml-8 flex-1 rounded-2xl border border-white/30 bg-gradient-to-r from-white/15 to-white/5 p-6 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-2 group-hover:from-white/20 group-hover:to-white/10 group-hover:shadow-lg">
                <h3 className="font-[family-name:var(--font-sora)] text-xl font-semibold drop-shadow-sm">
                  Konkurransedyktige priser
                </h3>
                <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm opacity-90">
                  Få de beste prisene og eksklusive tilbud for engros-kunder
                </p>
              </div>
            </div>

            <div className="group relative flex items-center">
              <div className="z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/40 bg-gradient-to-br from-white/25 to-white/10 shadow-2xl backdrop-blur-lg transition-all duration-500 group-hover:scale-125 group-hover:from-white/35 group-hover:to-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                <svg
                  className="h-8 w-8 text-white drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="ml-8 flex-1 rounded-2xl border border-white/30 bg-gradient-to-r from-white/15 to-white/5 p-6 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-2 group-hover:from-white/20 group-hover:to-white/10 group-hover:shadow-lg">
                <h3 className="font-[family-name:var(--font-sora)] text-xl font-semibold drop-shadow-sm">
                  Rask og pålitelig service
                </h3>
                <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm opacity-90">
                  Effektiv bestilling, rask levering og 24/7 kundestøtte
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(AuthSidebar);
