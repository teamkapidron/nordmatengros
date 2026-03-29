'use client';

// Node Modules
import { memo } from 'react';
import { MapPin, Plus } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';

// Components
import AddAddressDialog from './add-address-dialog';

interface AddressListHeaderProps {
  count: number;
}

function AddressListHeader(props: AddressListHeaderProps) {
  const { count } = props;

  return (
    <div className="mb-8">
      <div className="mb-6 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="from-baladi-primary to-baladi-secondary flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg">
            <MapPin className="text-primary h-8 w-8" />
          </div>
          <div className="text-left">
            <h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold text-gray-900">
              Mine adresser
            </h1>
            <p className="font-[family-name:var(--font-dm-sans)] text-gray-600">
              {count === 0
                ? 'Ingen adresser registrert'
                : count === 1
                  ? '1 adresse registrert'
                  : `${count} adresser registrert`}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <AddAddressDialog>
            <Button
              size="lg"
              className="group rounded-xl font-[family-name:var(--font-dm-sans)] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Plus className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Legg til ny adresse
            </Button>
          </AddAddressDialog>
        </div>
      </div>
    </div>
  );
}

export default memo(AddressListHeader);
