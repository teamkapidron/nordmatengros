'use client';

// Node Modules
import { memo } from 'react';

// Components
import ProductInventoryHeader from './product-inventory-header';
import ProductInventoryStats from './product-inventory-stats';
import ProductInventoryBatches from './product-inventory-batches';

interface ProductInventoryViewProps {
  productId: string;
}

function ProductInventoryView({ productId }: ProductInventoryViewProps) {
  return (
    <div className="space-y-8">
      <ProductInventoryHeader productId={productId} />
      <ProductInventoryStats productId={productId} />
      <ProductInventoryBatches productId={productId} />
    </div>
  );
}

export default memo(ProductInventoryView);
