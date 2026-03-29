'use client';

// Node Modules
import React, { memo, useMemo } from 'react';
import { useParams } from 'next/navigation';
import {
  Info,
  Package2,
  Scale,
  Ruler,
  Percent,
  TrendingDown,
} from '@repo/ui/lib/icons';

// Components
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/ui/components/base/tabs';
import { Separator } from '@repo/ui/components/base/separator';

// Hooks
import { useDiscount } from '@/hooks/useDiscount';
import { useProductBySlug } from '@/hooks/useProduct';
import { cn } from '@repo/ui/lib/utils';

function ProductSpecifications() {
  const { slug } = useParams<{ slug: string }>();

  const { bulkDiscountQuery } = useDiscount();
  const { data: productData, isLoading } = useProductBySlug(slug);

  const bulkDiscounts = useMemo(() => {
    return bulkDiscountQuery.data?.bulkDiscounts || [];
  }, [bulkDiscountQuery.data]);

  const { product, category, hasVolumeDiscount } = useMemo(() => {
    if (!productData?.product) return { product: null, category: null };

    return {
      product: productData?.product,
      category: productData?.product?.categories[0],
      hasVolumeDiscount: productData?.product?.hasVolumeDiscount,
    };
  }, [productData?.product]);

  if (isLoading) {
    return (
      <div className="mt-12 space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-[var(--baladi-light)]" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className="h-6 w-24 animate-pulse rounded bg-[var(--baladi-light)]" />
              <div className="h-6 w-32 animate-pulse rounded bg-[var(--baladi-light)]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 rounded-lg p-4 shadow-md">
      <Tabs defaultValue="details" className="w-full">
        <TabsList
          className={cn(
            'grid w-full bg-[var(--baladi-light)]/50',
            hasVolumeDiscount ? 'grid-cols-2' : 'grid-cols-1',
          )}
        >
          <TabsTrigger
            value="details"
            className="font-[family-name:var(--font-dm-sans)] data-[state=active]:bg-white data-[state=active]:text-[var(--baladi-primary)]"
          >
            Detaljer & Spesifikasjoner
          </TabsTrigger>
          {hasVolumeDiscount && (
            <TabsTrigger
              value="discounts"
              className="font-[family-name:var(--font-dm-sans)] data-[state=active]:bg-white data-[state=active]:text-[var(--baladi-primary)]"
            >
              Mengderabatter
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="details" className="mt-6 space-y-6">
          <div className="space-y-4">
            <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
              Produktspesifikasjoner
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Info size={18} className="text-[var(--baladi-primary)]" />
                  <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                    Kategori
                  </span>
                </div>
                <span className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                  {category?.name}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Package2
                    size={18}
                    className="text-[var(--baladi-primary)]"
                  />
                  <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                    Enheter per Kartong
                  </span>
                </div>
                <span className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                  {product?.noOfUnits}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Scale size={18} className="text-[var(--baladi-primary)]" />
                  <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                    Vekt
                  </span>
                </div>
                <span className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                  {product?.weight}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Ruler size={18} className="text-[var(--baladi-primary)]" />
                  <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-dark)]">
                    Dimensjoner
                  </span>
                </div>
                <span className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                  {product?.dimensions?.length} x {product?.dimensions?.width} x{' '}
                  {product?.dimensions?.height} cm
                </span>
              </div>
            </div>

            {product?.description && <Separator />}

            {product?.description && (
              <div className="space-y-3">
                <h4 className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-dark)]">
                  Produktbeskrivelse
                </h4>
                <p className="font-[family-name:var(--font-dm-sans)] leading-relaxed text-[var(--baladi-gray)]">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {hasVolumeDiscount && (
          <TabsContent value="discounts" className="mt-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
                Mengderabatter
              </h3>

              <div className="mb-6 rounded-lg bg-gradient-to-r from-[var(--baladi-primary)]/10 to-[var(--baladi-accent)]/10 p-4">
                <div className="mb-3 flex items-center gap-3">
                  <TrendingDown
                    size={24}
                    className="text-[var(--baladi-primary)]"
                  />
                  <h4 className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-dark)]">
                    Spar mer ved større bestillinger!
                  </h4>
                </div>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                  Jo flere enheter du kjøper, desto mer sparer du. Rabattene
                  gjelder automatisk ved kassen.
                </p>
              </div>

              {bulkDiscounts.length > 0 ? (
                <div className="grid gap-4">
                  {bulkDiscounts
                    .sort((a, b) => a.minQuantity - b.minQuantity)
                    .map((discount) => (
                      <div
                        key={discount._id}
                        className="rounded-lg border-2 border-[var(--baladi-light)] bg-white p-4 transition-colors hover:border-[var(--baladi-primary)]/30"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-[var(--baladi-primary)]/10 p-3">
                              <Percent
                                size={24}
                                className="text-[var(--baladi-primary)]"
                              />
                            </div>
                            <div>
                              <h5 className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-dark)]">
                                Kjøp {discount.minQuantity}+ enheter
                              </h5>
                              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                                Få automatisk rabatt på hele bestillingen
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="rounded-full bg-[var(--baladi-accent)] px-4 py-2 text-white">
                              <span className="font-[family-name:var(--font-sora)] text-lg font-bold">
                                {discount.discountPercentage}%
                              </span>
                            </div>
                            <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                              rabatt
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Percent
                    size={48}
                    className="mx-auto mb-4 text-[var(--baladi-light)]"
                  />
                  <p className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                    Ingen mengderabatter tilgjengelig for øyeblikket
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

export default memo(ProductSpecifications);
