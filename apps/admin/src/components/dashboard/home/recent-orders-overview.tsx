'use client';

// Node Modules
import Link from 'next/link';
import { memo, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { User, ArrowRight, ShoppingBag } from '@repo/ui/lib/icons';

// Hooks
import { useOrderDashboard } from '@/hooks/useOrder';

// Types/Utils
import { formatDate } from '@/utils/date.util';
import { formatPrice } from '@/utils/price.util';

function RecentOrdersOverview() {
  const router = useRouter();
  const { recentOrdersQuery } = useOrderDashboard();

  const recentOrders = useMemo(() => {
    return recentOrdersQuery.data?.orders ?? [];
  }, [recentOrdersQuery.data]);

  return (
    <div className="h-full rounded-xl bg-white p-6 shadow-lg ring-1 ring-[var(--baladi-border)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
            Nylige bestillinger
          </h3>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Siste kundebestillinger og statusoppdateringer
          </p>
        </div>
        <Link
          href="/dashboard/orders"
          className="group flex items-center gap-1 rounded-lg bg-[var(--baladi-primary)]/10 px-3 py-1.5 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-primary)] transition-colors hover:bg-[var(--baladi-primary)]/20"
        >
          Se alle
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {recentOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--baladi-muted)]">
            <ShoppingBag className="h-8 w-8 text-[var(--baladi-gray)]" />
          </div>
          <h4 className="mb-2 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
            Ingen nylige bestillinger
          </h4>
          <p className="mb-4 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Nylige kundebestillinger vil vises her når du begynner å motta
            bestillinger.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div
              key={order._id}
              onClick={() => router.push(`/dashboard/orders/${order._id}`)}
              className="group cursor-pointer rounded-lg border border-[var(--baladi-border)] p-3 transition-all duration-200 hover:border-[var(--baladi-primary)]/20 hover:bg-[var(--baladi-light)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--baladi-primary)]/10 to-[var(--baladi-secondary)]/10">
                    <User className="h-4 w-4 text-[var(--baladi-primary)]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      {order.user.name}
                    </div>
                    <div className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                      <span>
                        #{order._id.toString().slice(-8).toUpperCase()}
                      </span>
                      <span>•</span>
                      <span>
                        {order.itemsCount} vare{order.itemsCount > 1 ? 'r' : ''}
                      </span>
                      <span>•</span>
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-[family-name:var(--font-dm-sans)] text-sm font-bold text-[var(--baladi-dark)]">
                    {formatPrice(order.totalAmount)} kr
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(RecentOrdersOverview);
