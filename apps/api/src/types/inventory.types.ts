export enum InventoryStatus {
  ALL = 'all',
  IN_STOCK = 'in-stock',
  LOW_STOCK = 'low-stock',
  OUT_OF_STOCK = 'out-of-stock',
}

export interface InventoryFilterQuery {
  $or?: {
    'product.name'?: RegExp;
    'product.sku'?: RegExp;
    'product.barcode'?: RegExp;
    'product.categories.name'?: RegExp;
  }[];
  quantity?: {
    $gte?: number;
    $gt?: number;
    $lte?: number;
    $eq?: number;
  };
}
