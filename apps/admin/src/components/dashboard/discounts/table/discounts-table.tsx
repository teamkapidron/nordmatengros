'use client';

// Node Modules
import React, { memo } from 'react';

// Components
import DiscountsTableHeader from './discounts-table-header';
import DiscountsTableContent from './discounts-table-content';

function DiscountsTable() {
  return (
    <div className="bg-background rounded-xl p-4 shadow-md">
      <DiscountsTableHeader />
      <DiscountsTableContent />
    </div>
  );
}

export default memo(DiscountsTable);
