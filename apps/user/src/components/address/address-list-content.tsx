'use client';

// Node Modules
import { memo } from 'react';

// Components
import AddressListHeader from './address-list-header';
import AddressGrid from './address-grid';
import EmptyAddressState from './empty-address-state';
import LoadingAddressList from './loading-address-list';

// Hooks
import { useAddress } from '@/hooks/useAddress';

function AddressListContent() {
  const { address, isAddressLoading } = useAddress();

  if (isAddressLoading) {
    return <LoadingAddressList />;
  }

  const addresses = address?.addresses || [];

  return (
    <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <AddressListHeader count={addresses.length} />

        {addresses.length === 0 ? (
          <EmptyAddressState />
        ) : (
          <AddressGrid addresses={addresses} />
        )}
      </div>
    </div>
  );
}

export default memo(AddressListContent);
