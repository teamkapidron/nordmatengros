import { ResourceRef } from '../types';

export interface Product {
  id: number;
  version?: number | null;
  name: string;
  number?: string | null;
  description?: string | null;
  ean?: string | null;
  elNumber?: string | null;
  nrfNumber?: string | null;
  costExcludingVatCurrency?: number | null;
  priceExcludingVatCurrency?: number | null;
  priceIncludingVatCurrency?: number | null;
  isInactive?: boolean;
  unitOfMeasure?: ResourceRef | null;
  isStockItem?: boolean;
  stockOfGoods?: number | null;
  vatType?: ResourceRef | null;
  currency?: ResourceRef | null;
  discountGroup?: ResourceRef | null;
  account?: ResourceRef | null;
  productGroup?: ResourceRef | null;
  category?: ResourceRef | null;
  hsCode?: string | null;
  alternativeName?: string | null;
  resaleProduct?: ResourceRef | null;
  weight?: number | null;
  weightUnit?: 'kg' | 'g' | 'hg' | null;
  volume?: number | null;
  volumeUnit?: 'l' | 'dl' | 'cl' | 'ml' | null;
  supplierProductNumber?: string | null;
  supplier?: ResourceRef | null;
}

export interface CreateProductInput {
  name: string;
  number?: string;
  description?: string;
  ean?: string;
  elNumber?: string;
  nrfNumber?: string;
  costExcludingVatCurrency?: number;
  priceExcludingVatCurrency?: number;
  priceIncludingVatCurrency?: number;
  isInactive?: boolean;
  unitOfMeasureId?: number;
  isStockItem?: boolean;
  stockOfGoods?: number;
  vatTypeId?: number;
  currencyId?: number;
  discountGroupId?: number;
  accountId?: number;
  productGroupId?: number;
  categoryId?: number;
  hsCode?: string;
  alternativeName?: string;
  resaleProductId?: number;
  weight?: number;
  weightUnit?: 'kg' | 'g' | 'hg';
  volume?: number;
  volumeUnit?: 'l' | 'dl' | 'cl' | 'ml';
  supplierProductNumber?: string;
  supplierId?: number;
}

export interface CreateProductResponse {
  value: Product;
}

export interface CreateProductResult {
  productId: number;
}
