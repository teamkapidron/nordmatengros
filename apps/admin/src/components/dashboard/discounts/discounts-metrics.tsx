'use client';

// Node Modules
import React, { memo, useMemo } from 'react';
import { Percent, TrendingUp, TrendingDown, Clock } from '@repo/ui/lib/icons';

// Hooks
import { useDiscount } from '@/hooks/useDiscount';

function DiscountsMetrics() {
  const { discounts: data } = useDiscount();

  const discounts = useMemo(() => data?.discounts || [], [data?.discounts]);

  const metrics = useMemo(() => {
    if (!discounts || discounts.length === 0) {
      return {
        totalDiscounts: 0,
        activeDiscounts: 0,
        scheduledDiscounts: 0,
        expiredDiscounts: 0,
        averageDiscount: 0,
      };
    }

    const now = new Date();
    const activeDiscounts = discounts.filter((d) => {
      if (!d.isActive) return false;
      const validFrom = d.validFrom ? new Date(d.validFrom) : null;
      const validTo = d.validTo ? new Date(d.validTo) : null;

      if (validFrom && now < validFrom) return false;
      if (validTo && now > validTo) return false;
      return true;
    }).length;

    const scheduledDiscounts = discounts.filter((d) => {
      if (!d.isActive) return false;
      const validFrom = d.validFrom ? new Date(d.validFrom) : null;
      return validFrom && now < validFrom;
    }).length;

    const expiredDiscounts = discounts.filter((d) => {
      const validTo = d.validTo ? new Date(d.validTo) : null;
      return validTo && now > validTo;
    }).length;

    const averageDiscount =
      discounts.length > 0
        ? discounts.reduce((sum, d) => sum + d.discountValue, 0) /
          discounts.length
        : 0;

    return {
      totalDiscounts: discounts.length,
      activeDiscounts,
      scheduledDiscounts,
      expiredDiscounts,
      averageDiscount,
    };
  }, [discounts]);

  const metricCards = [
    {
      title: 'Totale Rabatter',
      value: metrics.totalDiscounts,
      icon: Percent,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100/50',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Aktive Rabatter',
      value: metrics.activeDiscounts,
      icon: TrendingUp,
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100/50',
      iconBg: 'bg-green-500/10',
      iconColor: 'text-green-600',
    },
    {
      title: 'Planlagt',
      value: metrics.scheduledDiscounts,
      icon: Clock,
      gradient: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100/50',
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Gjennomsnittlig Rabatt',
      value: `${metrics.averageDiscount.toFixed(1)}%`,
      icon: TrendingDown,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100/50',
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metricCards.map((card) => {
        const IconComponent = card.icon;

        return (
          <div
            key={card.title}
            className={`group relative overflow-hidden rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br ${card.bgGradient} p-6 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md`}
          >
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-[var(--baladi-gray)]">
                    {card.title}
                  </p>
                  <p className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-text)]">
                    {card.value}
                  </p>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg} transition-all duration-200 group-hover:scale-110`}
                >
                  <IconComponent className={`h-6 w-6 ${card.iconColor}`} />
                </div>
              </div>
            </div>

            <div
              className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${card.gradient}`}
            ></div>

            <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(DiscountsMetrics);
