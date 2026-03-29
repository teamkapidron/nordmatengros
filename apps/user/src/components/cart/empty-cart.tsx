import Link from 'next/link';
import React, { memo } from 'react';
import { Button } from '@repo/ui/components/base/button';
import { ArrowRight, ShoppingCart } from '@repo/ui/lib/icons';

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-white p-12 text-center shadow-sm">
      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
        <ShoppingCart className="h-12 w-12 text-[var(--color-muted-foreground)]" />
      </div>
      <h2 className="mb-4 text-xl font-medium text-[var(--color-text)]">
        Handlekurven din er tom
      </h2>
      <p className="mb-6 max-w-md text-[var(--color-muted-foreground)]">
        Utforsk vårt utvalg av asiatiske produkter og legg til varer i
        handlekurven din.
      </p>
      <Link href="/">
        <Button className="hover:bg-[var(--color-primary)]/90 cursor-pointer bg-[var(--color-primary)] text-white">
          Fortsett å handle
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </Link>
    </div>
  );
}

export default memo(EmptyCart);
