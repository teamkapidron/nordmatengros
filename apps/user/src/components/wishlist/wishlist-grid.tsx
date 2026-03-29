'use client';

// Node Modules
import { memo } from 'react';

// Components
import WishlistCard from './wishlist-card';

// Types
import { FavoriteResponse } from '@/hooks/useFavourite/types';

interface WishlistGridProps {
  favorites: FavoriteResponse[];
}

function WishlistGrid(props: WishlistGridProps) {
  const { favorites } = props;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {favorites.map((favorite) => (
        <WishlistCard key={favorite._id} favorite={favorite} />
      ))}
    </div>
  );
}

export default memo(WishlistGrid);
