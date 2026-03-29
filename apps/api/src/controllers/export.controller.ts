// Node Modules
import ExcelJS from 'exceljs';

// Handlers
import { asyncHandler } from '@/handlers/async.handler';

// Models
import User from '@/models/user.model';
import Product from '@/models/product.model';
import Order from '@/models/order.model';

// Types
import { UserType } from '@repo/types/user';
import { Visibility } from '@repo/types/product';
import { OrderStatus } from '@repo/types/order';
import { PopulatedProduct, PopulatedOrder } from '@/types/export.types';

// Types
import type { Request, Response } from 'express';

export const exportUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({});

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Users');

  worksheet.columns = [
    { header: 'Navn', key: 'name' },
    { header: 'E-post', key: 'email', width: 30 },
    { header: 'Telefonnummer', key: 'phoneNumber', width: 20 },
    { header: 'Adresse', key: 'address', width: 30 },
    { header: 'Firmanavn', key: 'companyName', width: 30 },
    { header: 'E-post bekreftet', key: 'isEmailVerified', width: 20 },
    { header: 'Godkjent av admin', key: 'isApprovedByAdmin', width: 20 },
    { header: 'Organisasjonsnummer', key: 'organizationNumber', width: 20 },
    { header: 'Brukertype', key: 'userType', width: 20 },
    { header: 'Opprettet', key: 'createdAt', width: 20 },
  ];

  worksheet.addRows(
    users.map((user) => ({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      companyName: user.companyName,
      organizationNumber: user.organizationNumber,
      isEmailVerified: user.isEmailVerified ? 'Ja' : 'Nei',
      isApprovedByAdmin: user.isApprovedByAdmin ? 'Ja' : 'Nei',
      userType: user.userType === UserType.INTERNAL ? 'Intern' : 'Ekstern',
      createdAt: user.createdAt.toLocaleString('nb-NO', {
        timeZone: 'Europe/Oslo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    })),
  );
  worksheet.columns.forEach((column) => {
    let maxLength = 10;
    column.eachCell?.({ includeEmpty: true }, (cell) => {
      const cellValue = cell.value?.toString() ?? '';
      maxLength = Math.max(maxLength, cellValue.length);
    });
    column.width = maxLength + 4;
  });

  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });
  });
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  );
  res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');

  await workbook.xlsx.write(res);
  res.end();
});

export const exportProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await Product.find<PopulatedProduct>({}).populate(
      'categories',
      'name',
    );

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');

    worksheet.columns = [
      { header: 'Navn', key: 'name', width: 40 },
      { header: 'Slug', key: 'slug', width: 40 },
      { header: 'Beskrivelse', key: 'description', width: 40 },
      { header: 'Kort beskrivelse', key: 'shortDescription', width: 40 },
      { header: 'SKU', key: 'sku', width: 15 },
      { header: 'Barkod', key: 'barcode', width: 20 },
      { header: 'MVA', key: 'vat', width: 20 },
      { header: 'Kostpris uten MVA', key: 'costPrice', width: 20 },
      { header: 'Salgsverdi uten MVA', key: 'salePrice', width: 20 },
      { header: 'Kostpris med MVA', key: 'costPriceWithVat', width: 20 },
      { header: 'Salgsverdi med MVA', key: 'salePriceWithVat', width: 20 },
      { header: 'Antall enheter', key: 'noOfUnits', width: 20 },
      { header: 'Kategorier', key: 'categories', width: 40 },
      { header: 'Synlighet', key: 'visibility', width: 40 },
      { header: 'Har volumrabatt', key: 'hasVolumeDiscount', width: 20 },
      { header: 'Aktiv', key: 'isActive', width: 20 },
      { header: 'Lengde', key: 'dimensionsLength', width: 20 },
      { header: 'Bredde', key: 'dimensionsWidth', width: 20 },
      { header: 'Høyde', key: 'dimensionsHeight', width: 20 },
      { header: 'Vekt', key: 'weight', width: 20 },
      { header: 'Leverandør navn', key: 'supplierName', width: 30 },
      { header: 'Leverandør nummer', key: 'supplierNumber', width: 20 },
      { header: 'Leverandørs lokasjon', key: 'supplierLocation', width: 30 },
      { header: 'Leverandørs land', key: 'supplierCountryOfOrigin', width: 30 },
      { header: 'Leverandørs HS-kode', key: 'supplierHsCode', width: 30 },
    ];

    worksheet.addRows(
      products.map((product) => ({
        name: product.name,
        slug: product.slug,
        description: product.description,
        shortDescription: product.shortDescription,
        sku: product.sku,
        barcode: product.barcode,
        vat: product.vat,
        costPrice: product.costPrice,
        salePrice: product.salePrice,
        costPriceWithVat: product.costPrice * (1 + product.vat / 100),
        salePriceWithVat: product.salePrice * (1 + product.vat / 100),
        noOfUnits: product.noOfUnits,
        categories: product.categories
          ?.map((category: { name: string }) => category.name)
          .join(', '),
        isActive: product.isActive ? 'Ja' : 'Nei',
        visibility:
          product.visibility === Visibility.BOTH
            ? 'Både internt og eksternt'
            : product.visibility === Visibility.INTERNAL
              ? 'Internt'
              : 'Eksternt',
        hasVolumeDiscount: product.hasVolumeDiscount ? 'Ja' : 'Nei',
        dimensionsLength: product.dimensions?.length ?? '',
        dimensionsWidth: product.dimensions?.width ?? '',
        dimensionsHeight: product.dimensions?.height ?? '',
        weight: product.weight ?? '',
        supplierName: product.supplier?.name,
        supplierNumber: product.supplier?.number,
        supplierLocation: product.supplier?.location,
        supplierCountryOfOrigin: product.supplier?.countryOfOrigin,
        supplierHsCode: product.supplier?.hsCode,
      })),
    );

    worksheet.columns.forEach((column) => {
      let maxLength = 10;
      column.eachCell?.({ includeEmpty: true }, (cell) => {
        const cellValue = cell.value?.toString() ?? '';
        maxLength = Math.max(maxLength, cellValue.length);
      });
      column.width = maxLength + 4;
    });

    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=products.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  },
);

export const exportOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const orders = await Order.find<PopulatedOrder>({})
      .populate('items.productId', 'name')
      .populate('userId', 'name email phoneNumber address')
      .populate(
        'shippingAddress',
        'addressLine1 addressLine2 city state postalCode country',
      );

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Orders');

    worksheet.columns = [
      { header: 'Ordre ID', key: 'orderId', width: 20 },
      { header: 'Kunde navn', key: 'CustomerName', width: 20 },
      { header: 'Kunde e-post', key: 'CustomerEmail', width: 20 },
      { header: 'Kunde telefonnummer', key: 'CustomerPhoneNumber', width: 20 },
      { header: 'Leveringsadresse', key: 'OrderShippingAddress', width: 20 },
      { header: 'Status', key: 'OrderStatus', width: 20 },
      { header: 'Total pris', key: 'OrderTotalAmount', width: 20 },
      { header: 'Total produkter', key: 'OrderTotalItems', width: 20 },
      { header: 'Produkt navn', key: 'OrderProductName', width: 20 },
      { header: 'Produkt antall', key: 'OrderProductQuantity', width: 20 },
      { header: 'Produkt pris', key: 'OrderProductPrice', width: 20 },
      { header: 'Produkt MVA', key: 'OrderProductVat', width: 20 },
      { header: 'Produkt rabatt', key: 'OrderProductDiscount', width: 20 },
      {
        header: 'Produkt volumrabatt',
        key: 'OrderProductVolumeDiscount',
        width: 20,
      },
      {
        header: 'Produkt total pris',
        key: 'OrderProductTotalPrice',
        width: 20,
      },
      { header: 'Notater', key: 'OrderNotes', width: 20 },
      {
        header: 'Ønsket leveringsdato',
        key: 'OrderDesiredDeliveryDate',
        width: 20,
      },
      { header: 'Pallettype', key: 'OrderPalletType', width: 20 },
      { header: 'Avbrutt grunn', key: 'OrderCancellationReason', width: 20 },
      { header: 'Opprettet', key: 'OrderCreatedAt', width: 20 },
    ];

    const rows = [];

    for (const order of orders) {
      order.items.forEach((item, index) => {
        rows.push({
          orderId: index === 0 ? order._id.toString() : '',
          CustomerName: index === 0 ? order.userId.name : '',
          CustomerEmail: index === 0 ? order.userId.email : '',
          CustomerPhoneNumber: index === 0 ? order.userId.phoneNumber : '',
          OrderShippingAddress:
            index === 0
              ? `${order.shippingAddress.addressLine1}, ${order.shippingAddress.addressLine2}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`
              : '',
          OrderStatus:
            index === 0
              ? {
                  [OrderStatus.PENDING]: 'På vent',
                  [OrderStatus.CONFIRMED]: 'Godkjent',
                  [OrderStatus.SHIPPED]: 'Levert',
                  [OrderStatus.DELIVERED]: 'Leveret',
                  [OrderStatus.CANCELLED]: 'Avbrutt',
                }[order.status]
              : '',
          OrderTotalAmount: index === 0 ? order.totalAmount : '',
          OrderTotalItems: index === 0 ? order.items.length : '',
          OrderProductName: item.productId.name,
          OrderProductQuantity: item.quantity,
          OrderProductPrice: item.price,
          OrderProductVat: item.vatAmount,
          OrderProductTotalPrice: item.totalPrice,
          OrderProductDiscount: item.discount,
          OrderProductVolumeDiscount: item.bulkDiscount,
          OrderNotes: index === 0 ? order.notes : '',
          OrderDesiredDeliveryDate:
            index === 0 ? (order.desiredDeliveryDate ?? '') : '',
          OrderPalletType: index === 0 ? (order.palletType ?? '') : '',
          OrderCancellationReason:
            index === 0 ? (order.cancellationReason ?? '') : '',
          OrderCreatedAt:
            index === 0
              ? order.createdAt?.toLocaleString('nb-NO', {
                  timeZone: 'Europe/Oslo',
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })
              : '',
        });
      });

      rows.push({});
    }
    worksheet.addRows(rows);

    worksheet.columns.forEach((column) => {
      let maxLength = 10;
      column.eachCell?.({ includeEmpty: true }, (cell) => {
        const cellValue = cell.value?.toString() ?? '';
        maxLength = Math.max(maxLength, cellValue.length);
      });
      column.width = maxLength + 4;
    });

    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=orders.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  },
);
