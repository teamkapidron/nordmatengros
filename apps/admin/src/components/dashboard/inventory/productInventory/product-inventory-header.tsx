'use client';

// Node Modules
import { memo, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Package, Clock, Tag, TrendingUp } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';

// Hooks
import { useProductInventory } from '@/hooks/useInventory';

// Utils
import { format } from '@repo/ui/lib/date';

interface ProductInventoryHeaderProps {
  productId: string;
}

function ProductInventoryHeader({ productId }: ProductInventoryHeaderProps) {
  const router = useRouter();
  const productInventoryQuery = useProductInventory(productId);

  const product = useMemo(() => {
    const firstInventoryItem = productInventoryQuery.data?.inventory?.[0];
    return firstInventoryItem?.product;
  }, [productInventoryQuery.data]);

  const totalQuantity = useMemo(() => {
    return (
      productInventoryQuery.data?.inventory?.reduce(
        (total, item) => total + item.quantity,
        0,
      ) ?? 0
    );
  }, [productInventoryQuery.data]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br from-[var(--baladi-primary)] via-[var(--baladi-primary)] to-[var(--baladi-secondary)] p-6 shadow-lg">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-white/20"></div>
        <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10"></div>
        <div className="absolute top-1/2 right-1/4 h-24 w-24 rounded-full bg-white/5"></div>
      </div>

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push('/dashboard/inventory')}
              className="border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tilbake til Lager
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-sora)] text-xl font-bold tracking-tight text-white lg:text-2xl">
                {product?.name || 'Laster produkt...'}
              </h1>
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-white/80">
                {product ? `SKU: ${product.sku}` : 'Laster produktdetaljer...'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-white/60" />
              <span className="font-[family-name:var(--font-dm-sans)] text-sm text-white/80">
                Sist oppdatert: {format(new Date(), 'MMM d, yyyy h:mm a')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-white/60" />
              <span className="font-[family-name:var(--font-dm-sans)] text-sm text-white/80">
                Total lagerbeholdning: {totalQuantity} enheter
              </span>
            </div>
          </div>

          {product?.categories && product.categories.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-white/60" />
              <span className="font-[family-name:var(--font-dm-sans)] text-sm text-white/80">
                Kategori: {product.categories[0]?.name}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[var(--baladi-accent)] via-white/50 to-[var(--baladi-accent)]"></div>
    </div>
  );
}

export default memo(ProductInventoryHeader);
