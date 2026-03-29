'use client';

// Node Modules
import React, { memo } from 'react';
import { Download, Users } from '@repo/ui/lib/icons';

// Hooks
import { useExport } from '@/hooks/useExport';

function CustomersHeader() {
  const { exportUsersMutation } = useExport();

  return (
    <div className="relative overflow-hidden rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br from-[var(--baladi-primary)] via-[var(--baladi-primary)] to-[var(--baladi-secondary)] p-6 shadow-lg">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-white/20"></div>
        <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10"></div>
        <div className="absolute right-1/4 top-1/2 h-24 w-24 rounded-full bg-white/5"></div>
      </div>

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-sora)] text-xl font-bold tracking-tight text-white lg:text-2xl">
                Kunder dashbord
              </h1>
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-white/80">
                Overvåk og administrer alle kundeaktiviteter
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            onClick={() => exportUsersMutation.mutate()}
            className="group flex h-11 items-center gap-2 rounded-lg bg-white px-4 py-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-primary)] shadow-lg transition-all duration-200 hover:scale-105 hover:bg-white/95 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            <Download className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            <span>Eksporter kunder</span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[var(--baladi-accent)] via-white/50 to-[var(--baladi-accent)]"></div>
    </div>
  );
}

export default memo(CustomersHeader);
