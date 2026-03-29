'use client';

// Node Modules
import { memo } from 'react';

// Components
import WishlistHeader from './wishlist-header';
import WishlistGrid from './wishlist-grid';
import EmptyWishlistState from './empty-wishlist-state';
import LoadingWishlist from './loading-wishlist';

// Hooks
import { useFavourite } from '@/hooks/useFavourite';

function WishlistContent() {
  const { favorites, isFavoritesLoading } = useFavourite();

  if (isFavoritesLoading) {
    return <LoadingWishlist />;
  }

  return (
    <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <WishlistHeader count={favorites?.favorites.length || 0} />

        {!favorites?.favorites || favorites?.favorites.length === 0 ? (
          <EmptyWishlistState />
        ) : (
          <WishlistGrid favorites={favorites?.favorites || []} />
        )}
      </div>
    </div>
  );
}

export default memo(WishlistContent);
