'use client';

// Node Modules
import { memo, useMemo } from 'react';
import { Package, Calendar, Hash } from '@repo/ui/lib/icons';

// Components
import AnimatedCounter from '@repo/ui/components/base/animate-counter';

// Hooks
import { useProductInventory } from '@/hooks/useInventory';

// Utils
import { formatPrice } from '@/utils/price.util';

interface ProductInventoryStatsProps {
  productId: string;
}

function ProductInventoryStats({ productId }: ProductInventoryStatsProps) {
  const productInventoryQuery = useProductInventory(productId);

  const stats = useMemo(() => {
    return {
      totalQuantity: productInventoryQuery.data?.totalQuantity ?? 0,
      totalBatches: productInventoryQuery.data?.activeLots ?? 0,
      totalValue: productInventoryQuery.data?.totalValue ?? 0,
    };
  }, [
    productInventoryQuery.data?.totalQuantity,
    productInventoryQuery.data?.activeLots,
    productInventoryQuery.data?.totalValue,
  ]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Total Quantity */}
      <div className="group relative overflow-hidden rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-blue-500/10" />
        <div className="relative p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 shadow-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-900">
                <AnimatedCounter value={stats.totalQuantity} />
              </p>
              <p className="text-sm font-medium text-blue-600">Total Enheter</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">Lagernivå</span>
              <span className="text-sm font-semibold text-blue-900">
                {stats.totalQuantity > 0 ? 'På lager' : 'Ikke på lager'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Total Batches */}
      <div className="group relative overflow-hidden rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-purple-500/10" />
        <div className="relative p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500 shadow-lg">
              <Hash className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-900">
                <AnimatedCounter value={stats.totalBatches} />
              </p>
              <p className="text-sm font-medium text-purple-600">
                Lager Partier
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-700">Aktive partier</span>
              <span className="text-sm font-semibold text-purple-900">
                <AnimatedCounter value={stats.totalBatches} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Total Value */}
      <div className="group relative overflow-hidden rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-green-100 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-green-500/10" />
        <div className="relative p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500 shadow-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-900">
                <AnimatedCounter value={formatPrice(stats.totalValue)} />
                kr
              </p>
              <p className="text-sm font-medium text-green-600">Total Verdi</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-700">Kartongpris</span>
              <span className="text-sm font-semibold text-green-900">
                {formatPrice(stats.totalValue / stats.totalQuantity)} kr
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductInventoryStats);
