'use client';

// Node Modules
import React, { memo, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ImageIcon, Package } from '@repo/ui/lib/icons';

// Components
import { Card, CardHeader, CardContent } from '@repo/ui/components/base/card';
import { Separator } from '@repo/ui/components/base/separator';
import { Badge } from '@repo/ui/components/base/badge';

// Hooks
import { useOrderDetails } from '@/hooks/useOrder';

// Types/Utils
import { formatPrice } from '@/utils/price.util';

interface OrderItemsListProps {
  orderId: string;
}

function OrderItemsList({ orderId }: OrderItemsListProps) {
  const { data: orderData } = useOrderDetails(orderId);
  const order = orderData?.order;

  const pricingTotals = useMemo(() => {
    if (!order?.items) return null;

    const subtotal = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const totalVatAmount = order.items.reduce(
      (sum, item) => sum + item.vatAmount * item.quantity,
      0,
    );

    const totalDiscount = order.items.reduce(
      (sum, item) => sum + (item.discount || 0) * item.quantity,
      0,
    );

    const totalBulkDiscount = order.items.reduce(
      (sum, item) => sum + (item.bulkDiscount || 0) * item.quantity,
      0,
    );

    const subtotalWithVat = order.items.reduce(
      (sum, item) => sum + item.priceWithVat * item.quantity,
      0,
    );

    const finalTotal = order.items.reduce(
      (sum, item) => sum + item.totalPrice * item.quantity,
      0,
    );

    const totalItems = order.items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );

    return {
      subtotal,
      totalVatAmount,
      totalDiscount,
      totalBulkDiscount,
      subtotalWithVat,
      finalTotal,
      totalItems,
    };
  }, [order?.items]);

  if (!order) {
    return (
      <Card className="border-[var(--nordmat-border)] shadow-lg">
        <CardHeader className="border-b border-[var(--nordmat-border)]">
          <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--nordmat-dark)]">
            Ordre Varer
          </h2>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-[var(--nordmat-muted)]"></div>
              <p className="mt-4 font-[family-name:var(--font-dm-sans)] text-[var(--nordmat-gray)]">
                Laster ordre varer...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[var(--nordmat-border)] shadow-lg">
      <CardHeader className="border-b border-[var(--nordmat-border)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="from-[var(--nordmat-primary)]/10 to-[var(--nordmat-secondary)]/10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br">
              <Package className="h-5 w-5 text-[var(--nordmat-primary)]" />
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--nordmat-dark)]">
                Ordre Varer ({order.items?.length || 0})
              </h2>
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--nordmat-gray)]">
                {pricingTotals?.totalItems || 0} varer •{' '}
                {formatPrice(pricingTotals?.finalTotal || 0)} kr
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-6">
          {order.items?.map((item, index) => (
            <div key={`${item.productId._id}-${index}`}>
              <div className="rounded-lg border border-[var(--nordmat-border)] bg-white p-6 shadow-sm">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-[var(--nordmat-light)]/30 relative h-20 w-20 overflow-hidden rounded-lg border border-[var(--nordmat-border)]">
                      {item.productId.images?.[0] ? (
                        <Image
                          src={item.productId.images[0]}
                          alt={item.productId.name || 'Product'}
                          fill
                          className="object-contain p-2"
                          sizes="80px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[var(--nordmat-gray)]">
                          <ImageIcon className="h-8 w-8" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--nordmat-dark)]">
                          {item.productId.name ||
                            `Produkt #${item.productId._id.slice(-8)}`}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-[var(--nordmat-gray)]">
                          {item.productId.categories?.[0] && (
                            <span>
                              <Badge variant="outline" className="text-xs">
                                {item.productId.categories[0].name}
                              </Badge>
                            </span>
                          )}
                          <span>
                            Produkt ID: {item.productId._id.slice(-8)}
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/admin/products/${item.productId._id}`}
                        className="flex items-center gap-1 text-xs text-[var(--nordmat-primary)] transition-colors hover:text-[var(--nordmat-primary-dark)]"
                      >
                        <ExternalLink size={12} />
                        Vis produkt
                      </Link>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--nordmat-gray)]">
                          Bestilt antall:
                        </span>
                        <span className="bg-[var(--nordmat-primary)]/10 flex h-8 w-12 items-center justify-center rounded font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[var(--nordmat-primary)]">
                          {item.quantity}
                        </span>
                        <span className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-gray)]">
                          stk
                        </span>
                      </div>
                    </div>

                    <div className="bg-[var(--nordmat-light)]/30 grid grid-cols-2 gap-4 rounded-lg p-4 lg:grid-cols-4">
                      <div className="space-y-1">
                        <span className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-gray)]">
                          Pris per stk (eks. mva)
                        </span>
                        <div className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--nordmat-dark)]">
                          {formatPrice(item.price)} kr
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-gray)]">
                          MVA per stk
                        </span>
                        <div className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--nordmat-dark)]">
                          {formatPrice(item.vatAmount)} kr
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-gray)]">
                          Pris per stk (inkl. mva)
                        </span>
                        <div className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--nordmat-dark)]">
                          {formatPrice(item.priceWithVat)} kr
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--nordmat-gray)]">
                          Totalt per stk
                        </span>
                        <div className="font-[family-name:var(--font-sora)] font-bold text-[var(--nordmat-primary)]">
                          {formatPrice(item.totalPrice)} kr
                        </div>
                      </div>

                      {(item.discount > 0 || item.bulkDiscount > 0) && (
                        <>
                          <div className="col-span-2 lg:col-span-4">
                            <Separator className="my-2" />
                          </div>

                          {item.discount > 0 && (
                            <div className="space-y-1">
                              <span className="font-[family-name:var(--font-dm-sans)] text-xs text-green-600">
                                Rabatt per stk
                              </span>
                              <div className="font-[family-name:var(--font-dm-sans)] font-semibold text-green-600">
                                -{formatPrice(item.discount)} kr
                              </div>
                            </div>
                          )}

                          {item.bulkDiscount > 0 && (
                            <div className="space-y-1">
                              <span className="font-[family-name:var(--font-dm-sans)] text-xs text-green-600">
                                Mengderabatt per stk
                              </span>
                              <div className="font-[family-name:var(--font-dm-sans)] font-semibold text-green-600">
                                -{formatPrice(item.bulkDiscount)} kr
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <div className="border-[var(--nordmat-primary)]/20 bg-[var(--nordmat-primary)]/5 space-y-3 rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--nordmat-gray)]">
                          Subtotal for {item.quantity} stk (eks. mva):
                        </span>
                        <span className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--nordmat-dark)]">
                          {formatPrice(item.price * item.quantity)} kr
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--nordmat-gray)]">
                          Totalt MVA:
                        </span>
                        <span className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--nordmat-dark)]">
                          {formatPrice(item.vatAmount * item.quantity)} kr
                        </span>
                      </div>

                      {(item.discount > 0 || item.bulkDiscount > 0) && (
                        <>
                          {item.discount > 0 && (
                            <div className="flex items-center justify-between">
                              <span className="font-[family-name:var(--font-dm-sans)] text-sm text-green-600">
                                Totalt rabatt:
                              </span>
                              <span className="font-[family-name:var(--font-dm-sans)] font-semibold text-green-600">
                                -{formatPrice(item.discount * item.quantity)} kr
                              </span>
                            </div>
                          )}

                          {item.bulkDiscount > 0 && (
                            <div className="flex items-center justify-between">
                              <span className="font-[family-name:var(--font-dm-sans)] text-sm text-green-600">
                                Totalt mengderabatt:
                              </span>
                              <span className="font-[family-name:var(--font-dm-sans)] font-semibold text-green-600">
                                -
                                {formatPrice(item.bulkDiscount * item.quantity)}{' '}
                                kr
                              </span>
                            </div>
                          )}
                        </>
                      )}

                      <Separator />

                      <div className="flex items-center justify-between">
                        <span className="font-[family-name:var(--font-sora)] text-base font-bold text-[var(--nordmat-dark)]">
                          Totalt for denne varen:
                        </span>
                        <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--nordmat-primary)]">
                          {formatPrice(item.totalPrice * item.quantity)} kr
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {index < order.items.length - 1 && <Separator className="my-6" />}
            </div>
          ))}

          {pricingTotals && (
            <div className="to-[var(--nordmat-muted)]/70 rounded-lg border border-[var(--nordmat-border)] bg-gradient-to-r from-[var(--nordmat-muted)] p-6">
              <h3 className="mb-4 font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--nordmat-dark)]">
                Ordre sammendrag
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--nordmat-gray)]">
                    Subtotal (eks. mva)
                  </span>
                  <span className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--nordmat-dark)]">
                    {formatPrice(pricingTotals.subtotal)} kr
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--nordmat-gray)]">
                    Totalt MVA
                  </span>
                  <span className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--nordmat-dark)]">
                    {formatPrice(pricingTotals.totalVatAmount)} kr
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--nordmat-gray)]">
                    Subtotal (inkl. mva)
                  </span>
                  <span className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--nordmat-dark)]">
                    {formatPrice(pricingTotals.subtotalWithVat)} kr
                  </span>
                </div>

                {pricingTotals.totalDiscount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-dm-sans)] text-sm text-green-600">
                      Totalt rabatt
                    </span>
                    <span className="font-[family-name:var(--font-dm-sans)] font-semibold text-green-600">
                      -{formatPrice(pricingTotals.totalDiscount)} kr
                    </span>
                  </div>
                )}

                {pricingTotals.totalBulkDiscount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-dm-sans)] text-sm text-green-600">
                      Totalt mengderabatt
                    </span>
                    <span className="font-[family-name:var(--font-dm-sans)] font-semibold text-green-600">
                      -{formatPrice(pricingTotals.totalBulkDiscount)} kr
                    </span>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--nordmat-dark)]">
                    Ordre totalt
                  </span>
                  <span className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--nordmat-primary)]">
                    {formatPrice(pricingTotals.finalTotal)} kr
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(OrderItemsList);
