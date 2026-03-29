'use client';

// Node Modules
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { memo, useCallback, useMemo } from 'react';
import {
  Eye,
  MapPin,
  Package,
  Truck,
  User,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
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
import { Button } from '@repo/ui/components/base/button';
import { Badge } from '@repo/ui/components/base/badge';

// Hooks
import { useOrder } from '@/hooks/useOrder';
import { useOrderPreview } from '@/hooks/useOrder';

// Utils
import { downloadPdfFromHtmlString } from '@/utils/pdf.utils';

// Types
import { formatDate } from '@/utils/date.util';
import { formatPrice } from '@/utils/price.util';
import { OrderResponse } from '@/hooks/useOrder/types';

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'confirmed':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'shipped':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'delivered':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

function getStatusIcon(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return <Clock className="h-3 w-3" />;
    case 'confirmed':
      return <CheckCircle className="h-3 w-3" />;
    case 'shipped':
      return <Truck className="h-3 w-3" />;
    case 'delivered':
      return <Package className="h-3 w-3" />;
    case 'cancelled':
      return <XCircle className="h-3 w-3" />;
    default:
      return <AlertCircle className="h-3 w-3" />;
  }
}

function getStatusLabel(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'Ventende';
    case 'confirmed':
      return 'Bekreftet';
    case 'shipped':
      return 'Sendt';
    case 'delivered':
      return 'Levert';
    case 'cancelled':
      return 'Kansellert';
    default:
      return status;
  }
}

function formatAddress(address: OrderResponse['shippingAddress']) {
  if (!address) return 'Ingen fraktadresse';
  const parts = [
    address.addressLine1,
    address.addressLine2,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ].filter(Boolean);
  return parts.join(', ');
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function OrderTableContent() {
  const router = useRouter();

  const { orders: ordersData } = useOrder();
  const { pickingListMutation, freightLabelMutation } = useOrderPreview();

  const orders = useMemo(() => {
    return ordersData?.orders || [];
  }, [ordersData]);

  const handleDownloadPickingList = useCallback(
    async (orderId: string) => {
      pickingListMutation.mutate(
        { orderId },
        {
          onSuccess: (data) => {
            downloadPdfFromHtmlString(data.html, `${orderId}-picking-list.pdf`);
          },
        },
      );
    },
    [pickingListMutation],
  );

  const handleDownloadFreightLabel = useCallback(
    async (orderId: string) => {
      freightLabelMutation.mutate(
        { orderId },
        {
          onSuccess: (data) => {
            downloadPdfFromHtmlString(
              data.html,
              `${orderId}-freight-label.pdf`,
            );
          },
        },
      );
    },
    [freightLabelMutation],
  );

  return (
    <div className="relative">
      <div className="max-h-[700px] overflow-auto rounded-lg border border-gray-200 shadow-sm">
        <Table className="w-full">
          <TableHeader className="border-b border-gray-200 bg-gray-50">
            <TableRow className="border-b border-gray-200">
              <TableHead className="sticky top-0 z-50 border-b border-gray-200 bg-gray-50 p-4 text-left text-sm font-semibold text-gray-900">
                Bestillingsdetaljer
              </TableHead>
              <TableHead className="sticky top-0 z-50 border-b border-gray-200 bg-gray-50 p-4 text-left text-sm font-semibold text-gray-900">
                Kunde
              </TableHead>
              <TableHead className="sticky top-0 z-50 border-b border-gray-200 bg-gray-50 p-4 text-left text-sm font-semibold text-gray-900">
                Produkter
              </TableHead>
              <TableHead className="sticky top-0 z-50 border-b border-gray-200 bg-gray-50 p-4 text-left text-sm font-semibold text-gray-900">
                Frakt
              </TableHead>
              <TableHead className="sticky top-0 z-50 border-b border-gray-200 bg-gray-50 p-4 text-left text-sm font-semibold text-gray-900">
                Status
              </TableHead>
              <TableHead className="sticky top-0 z-50 border-b border-gray-200 bg-gray-50 p-4 text-left text-sm font-semibold text-gray-900">
                Handlinger
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200 bg-white">
            {orders.map((order) => {
              const totalItems = order.items.reduce(
                (sum, item) => sum + item.quantity,
                0,
              );
              const firstThreeItems = order.items.slice(0, 3);

              return (
                <TableRow
                  key={order._id}
                  onClick={() => router.push(`/dashboard/orders/${order._id}`)}
                  className="cursor-pointer border-b border-gray-100 transition-colors duration-150 ease-in-out hover:bg-gray-50"
                >
                  <TableCell className="p-4">
                    <div className="flex flex-col space-y-3">
                      <div className="flex flex-col space-y-1">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatPrice(order.totalAmount)} kr
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="mr-1 h-3 w-3" />
                          {formatDate(order.createdAt)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="rounded-md bg-gray-50 px-2 py-1">
                          <span className="font-mono text-sm font-medium text-gray-600">
                            #{order._id}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Customer */}
                  <TableCell className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white">
                          {getInitials(order.userId.name)}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium text-gray-900">
                          {order.userId.name}
                        </div>
                        <div className="truncate text-sm text-gray-500">
                          {order.userId.email}
                        </div>
                        <div className="mt-1 flex items-center">
                          <User className="mr-1 h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500 capitalize">
                            {order.userId.userType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Products */}
                  <TableCell className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">
                          {order.items.length} produkt
                          {order.items.length !== 1 ? 'er' : ''}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({totalItems} vare{totalItems !== 1 ? 'r' : ''})
                        </span>
                      </div>
                      <div className="flex -space-x-2">
                        {firstThreeItems.map((item, itemIndex) => {
                          const itemData =
                            item as OrderResponse['items'][number];
                          return (
                            <div
                              key={itemData._id || itemIndex}
                              className="relative"
                              title={`${itemData.productId.name} (Ant: ${item.quantity})`}
                            >
                              {itemData.productId.images &&
                              itemData.productId.images.length > 0 ? (
                                <div className="relative h-8 w-8">
                                  <Image
                                    width={32}
                                    height={32}
                                    src={itemData.productId.images[0]!}
                                    alt={itemData.productId.name || 'Produkt'}
                                    className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm"
                                  />
                                </div>
                              ) : (
                                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-200 shadow-sm">
                                  <Package className="h-3 w-3 text-gray-400" />
                                </div>
                              )}
                              {item.quantity > 1 && (
                                <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                                  {item.quantity}
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {order.items.length > 3 && (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-xs font-medium text-gray-600 shadow-sm">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* Shipping */}
                  <TableCell className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                        <div className="min-w-0 flex-1">
                          <div className="line-clamp-2 text-sm text-gray-900">
                            {formatAddress(order.shippingAddress)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="p-4">
                    <Badge
                      className={`inline-flex items-center space-x-1 rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="capitalize">
                        {getStatusLabel(order.status)}
                      </span>
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="p-4">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/dashboard/orders/${order._id}`}
                        className="group relative"
                        title="Vis bestillingsdetaljer"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 border-blue-200 p-0 text-blue-600 transition-all duration-150 hover:border-blue-300 hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadPickingList(order._id);
                        }}
                        disabled={pickingListMutation.isPending}
                        className="h-8 w-8 border-green-200 p-0 text-green-600 transition-all duration-150 hover:border-green-300 hover:bg-green-50"
                        title="Last ned plukkliste"
                      >
                        {pickingListMutation.isPending ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-green-600 border-t-transparent"></div>
                        ) : (
                          <FileText className="h-4 w-4" />
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadFreightLabel(order._id);
                        }}
                        disabled={freightLabelMutation.isPending}
                        className="h-8 w-8 border-purple-200 p-0 text-purple-600 transition-all duration-150 hover:border-purple-300 hover:bg-purple-50"
                        title="Last ned fraktetikett"
                      >
                        {freightLabelMutation.isPending ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-600 border-t-transparent"></div>
                        ) : (
                          <Truck className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}

            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3 py-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="mb-1 text-lg font-medium text-gray-900">
                        Ingen bestillinger funnet
                      </p>
                      <p className="text-sm text-gray-500">
                        Bestillinger vil vises her når kunder legger dem inn
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default memo(OrderTableContent);
