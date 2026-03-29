'use client';

// Node Modules
import React, { memo } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Package } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';

function EmptyOrderState() {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[var(--baladi-light)] to-[var(--baladi-primary)]/10">
        <div className="relative">
          <ShoppingBag size={48} className="text-[var(--baladi-primary)]" />
          <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--baladi-secondary)]">
            <Package size={12} className="text-white" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-md space-y-4">
        <h2 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)]">
          Ingen bestillinger ennå
        </h2>
        <p className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
          Du har ikke lagt inn noen bestillinger hos Baladi Engros ennå. Utforsk
          vårt store utvalg av kvalitetsprodukter for din virksomhet.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <Button asChild size="lg" className="px-8">
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag size={18} />
            Start shopping
            <ArrowRight size={16} />
          </Link>
        </Button>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button variant="outline" asChild>
            <Link href="/categories">Se alle kategorier</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">Utforsk produkter</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(EmptyOrderState);
