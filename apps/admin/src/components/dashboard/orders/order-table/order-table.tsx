'use client';

import { memo } from 'react';

import OrderTableHeader from './order-table-header';
import OrderStatusTabs from './order-status-tabs';
import OrderTableFilters from './order-table-filters';
import OrderTableContent from './order-table-content';

function OrderTable() {
  return (
    <div className="bg-background rounded-xl p-4 shadow-md">
      <OrderTableHeader />
      <OrderStatusTabs />
      <OrderTableFilters />
      <OrderTableContent />
    </div>
  );
}

export default memo(OrderTable);
