'use client';

// Node Modules
import { memo, useState } from 'react';

// Components
import NewsletterProductSelection from '@/components/dashboard/newsletter/newsletter-product-selection';
import NewsletterCreator from '@/components/dashboard/newsletter/newsletter-creator';

function NewsletterBody() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <NewsletterProductSelection
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
      <NewsletterCreator selectedProducts={selectedProducts} />
    </div>
  );
}

export default memo(NewsletterBody);
