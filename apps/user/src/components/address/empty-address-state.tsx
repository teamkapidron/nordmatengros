'use client';

// Node Modules
import { memo } from 'react';
import Link from 'next/link';

// Components
import { Button } from '@repo/ui/components/base/button';

function EmptyAddressState() {
  return (
    <div className="text-center">
      <div className="mx-auto max-w-md">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-gray-900">
              Ingen adresser registrert
            </h2>
            <div className="mx-auto h-0.5 w-12 rounded-full bg-gradient-to-r"></div>
          </div>

          <p className="font-[family-name:var(--font-dm-sans)] leading-relaxed text-gray-600">
            Legg til leveringsadresser for å gjøre handleturen din enklere. Du
            kan lagre hjemmeadresse, jobbadresse og andre steder.
          </p>

          <div className="flex flex-col gap-4">
            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 font-[family-name:var(--font-dm-sans)] text-gray-700 transition-all duration-300 hover:bg-gray-50"
              >
                Tilbake til hjemmesiden
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(EmptyAddressState);
