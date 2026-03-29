'use client';

// Node Modules
import { memo } from 'react';

// Components
import CustomerTableHeader from './customer-table-header';
import CustomerStatusTabs from './customer-status-tabs';
import CustomerTableFilters from './customer-table-filters';
import CustomerTableContent from './customer-table-content';

function CustomersTable() {
  return (
    <div className="bg-background rounded-xl p-4 shadow-md">
      <CustomerTableHeader />
      <CustomerStatusTabs />
      <CustomerTableFilters />
      <CustomerTableContent />
    </div>
  );
}

export default memo(CustomersTable);
