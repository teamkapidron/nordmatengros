'use client';

// Node Modules
import { memo } from 'react';
import { Plus } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import CreateDiscountDialog from './create-discount-dialog';

function DiscountsTableHeader() {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
            Produkt Rabatter
          </h2>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Administrer rabatter for produkter
          </p>
        </div>
      </div>
      <CreateDiscountDialog>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Legg til Rabatt
        </Button>
      </CreateDiscountDialog>
    </div>
  );
}

export default memo(DiscountsTableHeader);
