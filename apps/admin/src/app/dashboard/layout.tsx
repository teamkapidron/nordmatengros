import { useMemo } from 'react';
import DashboardLayout from '@/components/layouts/dashboard-layout/dashboard-layout';

import type { LinkItem } from '@/components/layouts/dashboard-layout/types';

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export default function AdminDashboardLayout(props: AdminDashboardLayoutProps) {
  const { children } = props;

  const sidebarLinks = useMemo<LinkItem[]>(
    () => [
      {
        title: 'Hjem',
        href: '/dashboard',
        icon: 'home',
        exactMatch: true,
      },
      {
        title: 'Produkter',
        href: '/dashboard/products',
        icon: 'package',
      },
      {
        title: 'Kategorier',
        href: '/dashboard/categories',
        icon: 'tag',
      },
      {
        title: 'Lager',
        href: '/dashboard/inventory',
        icon: 'boxes',
      },
      {
        title: 'Bestillinger',
        href: '/dashboard/orders',
        icon: 'shopping-cart',
      },
      {
        title: 'Kunder',
        href: '/dashboard/customers',
        icon: 'users',
      },
      {
        title: 'Rabatter',
        href: '/dashboard/discounts',
        icon: 'percent',
      },
      {
        title: 'Nyhetsbrev',
        href: '/dashboard/newsletter',
        icon: 'mail',
      },
      {
        title: 'Kampanjer',
        href: '/dashboard/promotion',
        icon: 'badge-percent',
      },
      {
        title: 'Innstillinger',
        href: '/dashboard/settings',
        icon: 'settings',
      },
    ],
    [],
  );

  const bottomBarLinks = useMemo<LinkItem[]>(
    () => [
      {
        title: 'Hjem',
        href: '/dashboard',
        icon: 'home',
      },
      {
        title: 'Produkter',
        href: '/dashboard/products',
        icon: 'package',
      },
      {
        title: 'Bestillinger',
        href: '/dashboard/orders',
        icon: 'shopping-cart',
      },
      {
        title: 'Kunder',
        href: '/dashboard/customers',
        icon: 'users',
      },
    ],
    [],
  );

  return (
    <DashboardLayout
      sidebarLinks={sidebarLinks}
      bottomBarLinks={bottomBarLinks}
      sidebarSlice={7}
    >
      {children}
    </DashboardLayout>
  );
}
