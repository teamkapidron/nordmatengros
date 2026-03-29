'use client';

// Node Modules
import { memo } from 'react';

// Components
import AddressCard from './address-card';

// Types
import { Address } from '@repo/types/address';

interface AddressGridProps {
  addresses: Address[];
}

function AddressGrid(props: AddressGridProps) {
  const { addresses } = props;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {addresses.map((address) => (
        <AddressCard key={address._id} address={address} />
      ))}
    </div>
  );
}

export default memo(AddressGrid);
