'use client';

// Node Modules
import { memo } from 'react';
import { Heart } from '@repo/ui/lib/icons';

interface WishlistHeaderProps {
  count: number;
}

function WishlistHeader(props: WishlistHeaderProps) {
  const { count } = props;

  return (
    <div className="mb-12 text-center">
      <div className="mb-4 flex items-center justify-center gap-3">
        <div className="from-baladi-primary to-baladi-secondary rounded-2xl bg-gradient-to-r p-3 shadow-lg">
          <Heart className="h-8 w-8 fill-current text-red-600" />
        </div>
        <h1 className="font-[family-name:var(--font-sora)] text-4xl font-bold text-gray-900 md:text-5xl">
          Min Ønskeliste
        </h1>
      </div>

      <p className="mx-auto max-w-2xl font-[family-name:var(--font-dm-sans)] text-xl leading-relaxed text-gray-600">
        Oppdag dine favorittprodukter og hold oversikt over varene du ønsker å
        kjøpe
      </p>

      {count > 0 && (
        <div className="mt-6">
          <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 shadow-md">
            <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-gray-600">
              {count === 1 ? '1 produkt' : `${count} produkter`}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}

export default memo(WishlistHeader);
