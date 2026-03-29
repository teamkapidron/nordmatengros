import { ProductResponse } from '@/hooks/useProduct/types';
import { BulkDiscount } from '@repo/types/bulkDiscount';

export function formatPrice(price: number) {
  return new Intl.NumberFormat('nb-NO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

interface GetPricingProps {
  product: ProductResponse;
  quantity: number;
  bulkDiscounts: BulkDiscount[];
}

// This gives the price per unit everything
export function getPricing(props: GetPricingProps) {
  const { product, quantity, bulkDiscounts } = props;

  const price = product.price;
  const vat = product.vat;

  const priceWithoutVat = price;
  const vatAmount = (priceWithoutVat * vat) / 100;
  const priceWithVat = priceWithoutVat + vatAmount;

  let volumeDiscount = 0;

  if (bulkDiscounts && bulkDiscounts.length > 0) {
    const bulkDiscount = bulkDiscounts
      .filter((bd) => bd.minQuantity <= quantity)
      .sort((a, b) => b.discountPercentage - a.discountPercentage)[0];

    if (bulkDiscount && product.hasVolumeDiscount) {
      volumeDiscount = priceWithVat * (bulkDiscount.discountPercentage / 100);
    }
  }

  const netPrice = priceWithVat - volumeDiscount;
  const pricePerUnit = netPrice / product.noOfUnits;

  return {
    priceWithoutVat,
    vatAmount,
    priceWithVat,
    volumeDiscount,
    netPrice,
    pricePerUnit,
  };
}
