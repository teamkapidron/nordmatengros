import { Metadata } from 'next';

import { Suspense } from 'react';

import DashboardHeader from '@/components/dashboard/home/dashboard-header';
import OrderStatusPieChart from '@/components/dashboard/home/order-status-pie-chart';
import RecentOrdersOverview from '@/components/dashboard/home/recent-orders-overview';
import RevenueOrderChart from '@/components/dashboard/home/revenue-order-chart';
import StockAlertsList from '@/components/dashboard/home/stock-alert-list';
import CustomerRegistrationChart from '@/components/dashboard/home/customer-registration-chart';
import TopCustomers from '@/components/dashboard/home/top-customers';
import TopProducts from '@/components/dashboard/home/top-products';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <Suspense>
      <div className="space-y-6">
        <DashboardHeader />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <OrderStatusPieChart />
          <RecentOrdersOverview />
        </div>

        <div className="space-y-6">
          <RevenueOrderChart />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <StockAlertsList />
          <CustomerRegistrationChart />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TopProducts />
          <TopCustomers />
        </div>
      </div>
    </Suspense>
  );
}
