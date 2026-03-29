// Node Modules
import { memo } from 'react';
import { ChevronLeft, Truck } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';

interface CheckoutFormFooterProps {
  onBack: () => void;
  handleSubmit: () => void;
  isDisabled: boolean;
  isPending: boolean;
}

function CheckoutFormFooter(props: CheckoutFormFooterProps) {
  const { onBack, handleSubmit, isDisabled, isPending } = props;

  return (
    <div className="flex gap-3">
      <Button variant="outline" onClick={onBack} className="flex-1">
        <ChevronLeft size={16} className="mr-2" />
        Tilbake til handlekurv
      </Button>

      <Button
        onClick={handleSubmit}
        className="flex-1"
        disabled={isDisabled || isPending}
        isLoading={isPending}
      >
        <Truck size={16} className="mr-2" />
        Send bestilling
      </Button>
    </div>
  );
}

export default memo(CheckoutFormFooter);
