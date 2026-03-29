import '@/styles/globals.css';
import { Sora, DM_Sans } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from '@repo/ui/components/base/sonner';
import ReactQueryProvider from '@/providers/react-query-provider';
import CookieConsent from '@/components/common/cookie-consent';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Baladi Engros',
    default: 'Baladi Engros',
  },
};

const sora = Sora({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-sora',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable}`}>
      <body className="font-dm-sans">
        <ReactQueryProvider>
          <NuqsAdapter>
            <main>{children}</main>
            <Toaster richColors />
            <CookieConsent />
          </NuqsAdapter>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
