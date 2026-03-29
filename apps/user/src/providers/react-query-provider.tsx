'use client';

import React, { useState, useEffect, lazy } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '@/lib/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

declare global {
  interface Window {
    toggleDevtools: () => void;
  }
}

const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
);

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

export default function ReactQueryProvider({
  children,
}: ReactQueryProviderProps) {
  const [queryClient] = useState(() => getQueryClient());
  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  return (
    <QueryClientProvider client={queryClient.queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen />
      {showDevtools && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )}
    </QueryClientProvider>
  );
}
