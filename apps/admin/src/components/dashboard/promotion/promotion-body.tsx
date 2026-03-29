'use client';

// Node Modules
import { memo, useState } from 'react';

// Components
import PromotionProductSelection from './promotion-product-selection';
import PromotionPosterCreator from './promotion-poster-creator';

function PromotionBody() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <PromotionProductSelection
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
      <PromotionPosterCreator selectedProducts={selectedProducts} />
    </div>
  );
}

export default memo(PromotionBody);
