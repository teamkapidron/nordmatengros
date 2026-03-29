// Node Modules
import { memo } from 'react';
import { ChevronLeft } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';

interface HeaderProps {
  onBack: () => void;
}

function CheckoutFormHeader(props: HeaderProps) {
  const { onBack } = props;

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="h-8 w-8 p-0"
      >
        <ChevronLeft size={16} />
      </Button>
      <div>
        <h2 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)]">
          Leveringsdetaljer
        </h2>
        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
          Velg leveringsadresse og tilpass bestillingen din
        </p>
      </div>
    </div>
  );
}

export default memo(CheckoutFormHeader);
