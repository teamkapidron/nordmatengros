'use client';

// Node Modules
import { memo } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';

function EmptyWishlistState() {
  return (
    <div className="text-center">
      <div className="mx-auto max-w-md">
        <h2 className="mb-4 font-[family-name:var(--font-sora)] text-2xl font-bold text-gray-900">
          Din ønskeliste er tom
        </h2>

        <p className="mb-8 font-[family-name:var(--font-dm-sans)] leading-relaxed text-gray-600">
          Begynn å legge til produkter du ønsker å kjøpe senere. Klikk på
          hjertet på produktsider for å legge dem til her.
        </p>

        <div className="flex flex-col gap-4">
          <Link href="/search">
            <Button
              size="lg"
              className="group w-full font-[family-name:var(--font-dm-sans)] text-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Utforsk produkter
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-gray-300 font-[family-name:var(--font-dm-sans)] text-gray-700 hover:bg-gray-50"
            >
              Tilbake til forsiden
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(EmptyWishlistState);
