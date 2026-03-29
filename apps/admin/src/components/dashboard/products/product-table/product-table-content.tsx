'use client';

// Node Modules
import Link from 'next/link';
import Image from 'next/image';
import { memo, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  EditIcon,
  Package,
  Tag,
  Building2,
  MapPin,
  Globe,
} from '@repo/ui/lib/icons';

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/base/table';

// Hooks
import { useProduct } from '@/hooks/useProduct';

// Types/Utils
import { Visibility } from '@repo/types/product';
import { formatPrice } from '@/utils/price.util';

function ProductTableContent() {
  const router = useRouter();
  const { products: productsData } = useProduct();

  const products = useMemo(() => {
    return productsData?.products || [];
  }, [productsData]);

  return (
    <div className="relative">
      <div className="max-h-[700px] overflow-auto rounded-xl border border-[var(--baladi-border)] bg-white shadow-sm">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-[var(--baladi-border)] bg-[var(--baladi-light)]">
              <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-primary)]">
                Produktdetaljer
              </TableHead>
              <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-primary)]">
                Priser & SKU
              </TableHead>
              <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-primary)]">
                Lager
              </TableHead>
              <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-primary)]">
                Leverandør
              </TableHead>
              <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-primary)]">
                Kategorier
              </TableHead>
              <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-primary)]">
                Status
              </TableHead>
              <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-center font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-primary)]">
                Handlinger
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => {
              const stockStatus = getStockStatus(product.stock);
              const priceWithVat =
                product.salePrice + (product.vat * product.salePrice) / 100;
              const costPriceWithVat =
                product.costPrice + (product.vat * product.costPrice) / 100;

              const haveSupplierInfo =
                !!product.supplier &&
                Object.values(product.supplier).some(Boolean);

              return (
                <TableRow
                  key={product._id}
                  className={`cursor-pointer border-b border-[var(--baladi-border)] transition-colors hover:bg-[var(--baladi-muted)] ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[var(--baladi-light)]'
                  }`}
                  onClick={() => {
                    router.push(`/dashboard/products/edit/${product.slug}`);
                  }}
                >
                  <TableCell className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)]">
                        {product.images && product.images.length > 0 ? (
                          <Image
                            alt={product.name}
                            src={product.images[0]!}
                            className="h-full w-full object-cover"
                            width={64}
                            height={64}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Package className="h-6 w-6 text-[var(--baladi-gray)]" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-[family-name:var(--font-sora)] text-base font-semibold text-[var(--baladi-primary)]">
                          {product.name}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm text-[var(--baladi-gray)]">
                          {product.shortDescription ||
                            product.description ||
                            'Ingen beskrivelse tilgjengelig'}
                        </p>
                        <div className="mt-2 flex items-center space-x-2">
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                            ID: {product._id}
                          </span>
                          {product.sku && (
                            <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
                              <Tag className="mr-1 h-3 w-3" />
                              {product.sku}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="p-4">
                    <div className="space-y-3">
                      <div className="rounded-lg bg-green-50 p-3">
                        <p className="mb-1 text-xs font-medium text-green-600">
                          SALGSPRIS
                        </p>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Med MVA:
                            </span>
                            <span className="font-[family-name:var(--font-sora)] text-base font-semibold text-[var(--baladi-primary)]">
                              {formatPrice(priceWithVat)} kr
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Uten MVA:
                            </span>
                            <span className="font-[family-name:var(--font-sora)] text-sm font-semibold text-gray-700">
                              {formatPrice(product.salePrice)} kr
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg bg-orange-50 p-3">
                        <p className="mb-1 text-xs font-medium text-orange-600">
                          KOSTPRIS
                        </p>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Med MVA:
                            </span>
                            <span className="text-sm font-semibold text-gray-700">
                              {formatPrice(costPriceWithVat)} kr
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Uten MVA:
                            </span>
                            <span className="text-sm font-semibold text-gray-600">
                              {formatPrice(product.costPrice)} kr
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {product.vat > 0 && (
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                            {product.vat}% MVA
                          </span>
                        )}
                        {product.barcode && (
                          <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700">
                            {product.barcode}
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="p-4">
                    <div className="space-y-3">
                      <div
                        className={`inline-flex items-center rounded-lg px-3 py-2 ${stockStatus.color}`}
                      >
                        <Package className="mr-2 h-4 w-4" />
                        <span className="font-medium">{stockStatus.label}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-[var(--baladi-gray)]">
                          Enheter: {product.noOfUnits}
                        </div>
                        <div className="text-xs text-[var(--baladi-gray)]">
                          Vekt: {product.weight}kg
                        </div>
                        {product.dimensions && (
                          <div className="text-xs text-[var(--baladi-gray)]">
                            Dimensjoner: {product.dimensions.length}×
                            {product.dimensions.width}×
                            {product.dimensions.height}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="p-4">
                    <div className="space-y-3">
                      {product.supplier && haveSupplierInfo ? (
                        <div className="rounded-lg bg-blue-50 p-3">
                          <div className="space-y-2">
                            {product.supplier.name && (
                              <div className="flex items-center space-x-2">
                                <Building2 className="h-4 w-4 text-blue-600" />
                                <div>
                                  <p className="text-xs font-medium text-blue-600">
                                    NAVN
                                  </p>
                                  <p className="text-sm font-semibold text-gray-700">
                                    {product.supplier.name}
                                  </p>
                                </div>
                              </div>
                            )}

                            {product.supplier.number && (
                              <div className="flex items-center space-x-2">
                                <Tag className="h-4 w-4 text-blue-600" />
                                <div>
                                  <p className="text-xs font-medium text-blue-600">
                                    NUMMER
                                  </p>
                                  <p className="text-sm text-gray-700">
                                    {product.supplier.number}
                                  </p>
                                </div>
                              </div>
                            )}

                            {product.supplier.location && (
                              <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-blue-600" />
                                <div>
                                  <p className="text-xs font-medium text-blue-600">
                                    LOKASJON
                                  </p>
                                  <p className="text-sm text-gray-700">
                                    {product.supplier.location}
                                  </p>
                                </div>
                              </div>
                            )}

                            {product.supplier.countryOfOrigin && (
                              <div className="flex items-center space-x-2">
                                <Globe className="h-4 w-4 text-blue-600" />
                                <div>
                                  <p className="text-xs font-medium text-blue-600">
                                    OPPRINNELSESLAND
                                  </p>
                                  <p className="text-sm text-gray-700">
                                    {product.supplier.countryOfOrigin}
                                  </p>
                                </div>
                              </div>
                            )}

                            {product.supplier.hsCode && (
                              <div className="mt-2 border-t border-blue-200 pt-2">
                                <p className="text-xs font-medium text-blue-600">
                                  HS-KODE
                                </p>
                                <p className="font-mono text-sm text-gray-700">
                                  {product.supplier.hsCode}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-lg bg-gray-50 p-3 text-center">
                          <Building2 className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                          <p className="text-sm text-gray-500">
                            Ingen leverandør registrert
                          </p>
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="p-4">
                    <div className="space-y-2">
                      {product.categories && product.categories.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {product.categories
                            .slice(0, 3)
                            .map((category, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center rounded-md bg-[var(--baladi-primary)]/10 px-2.5 py-1 text-xs font-medium text-[var(--baladi-primary)]"
                              >
                                <Tag className="mr-1 h-3 w-3" />
                                {category.name}
                              </span>
                            ))}
                          {product.categories.length > 3 && (
                            <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                              +{product.categories.length - 3} more
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-[var(--baladi-gray)]">
                          Ingen kategorier
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="p-4">
                    <div className="space-y-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                          product.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.isActive ? 'Aktiv' : 'Inaktiv'}
                      </span>
                      <br />
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getVisibilityBadge(product.visibility)}`}
                      >
                        {product.visibility === Visibility.BOTH
                          ? 'Begge'
                          : product.visibility === Visibility.INTERNAL
                            ? 'Kun Intern'
                            : product.visibility === Visibility.EXTERNAL
                              ? 'Kun Ekstern'
                              : 'Ukjent'}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Link
                        href={`/dashboard/products/edit/${product.slug}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--baladi-primary)]/10 text-[var(--baladi-primary)] transition-colors hover:bg-[var(--baladi-primary)]/20"
                        title="Rediger Produkt"
                      >
                        <EditIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default memo(ProductTableContent);

function getStockStatus(stock: number) {
  if (stock === 0)
    return {
      label: 'Utsolgt',
      color: 'text-[var(--baladi-error)] bg-red-50',
      badge: 'bg-red-100 text-red-800',
    };
  if (stock < 10)
    return {
      label: `Lav Lagerbeholdning (${stock})`,
      color: 'text-[var(--baladi-warning)] bg-amber-50',
      badge: 'bg-amber-100 text-amber-800',
    };
  return {
    label: stock.toString(),
    color: 'text-[var(--baladi-success)] bg-green-50',
    badge: 'bg-green-100 text-green-800',
  };
}

function getVisibilityBadge(visibility: string) {
  switch (visibility) {
    case 'public':
      return 'bg-green-100 text-green-800';
    case 'private':
      return 'bg-gray-100 text-gray-800';
    case 'hidden':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
