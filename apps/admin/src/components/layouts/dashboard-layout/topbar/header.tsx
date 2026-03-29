'use client';

import { memo, useMemo } from 'react';
import { usePathname } from 'next/navigation';

const translations = {
  products: 'Produkter',
  categories: 'Kategorier',
  inventory: 'Lager',
  orders: 'Ordrer',
  customers: 'Kunder',
  discounts: 'Rabatter',
  newsletter: 'Nyhetsbrev',
  promotion: 'Kampanjer',
  settings: 'Innstillinger',
};

function Header() {
  const pathname = usePathname();
  const tab = pathname.split('/').pop();

  const label = useMemo(() => {
    if (pathname === '/dashboard/products/new') {
      return 'Legg til produkt';
    }
    return translations[tab as keyof typeof translations] ?? 'Hjem';
  }, [pathname, tab]);

  return (
    <nav className="flex items-center space-x-4">
      <div className="md:hidden">
        <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-primary)]">
          {label}
        </span>
      </div>

      <div className="hidden h-16 items-center space-x-4 md:flex">
        <span className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-primary)]">
          {label}
        </span>
      </div>
    </nav>
  );
}

export default memo(Header);
