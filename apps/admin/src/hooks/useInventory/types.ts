import { ApiData } from '@/utils/types.util';
import { Inventory } from '@repo/types/inventory';

export enum InventoryStatus {
  ALL = 'all',
  IN_STOCK = 'in-stock',
  LOW_STOCK = 'low-stock',
  OUT_OF_STOCK = 'out-of-stock',
}

export type InventoryResponse = Omit<Inventory, 'productId'> & {
  product: {
    _id: string;
    name: string;
    sku: string;
    categories: {
      _id: string;
      name: string;
    }[];
    salePrice: number;
  };
};

export type GetAllInventoryRequest = ApiData<
  {
    page: string;
    limit: string;
    search?: string;
    status: InventoryStatus;
  },
  {
    inventory: InventoryResponse[];
    totalInventory: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
  }
>;

export type GetProductInventoryRequest = ApiData<
  {
    productId: string;
    page: string;
    limit: string;
  },
  {
    inventory: InventoryResponse[];
    totalQuantity: number;
    activeLots: number;
    totalValue: number;
  }
>;

export type CreateInventoryRequest = ApiData<
  {
    productId: string;
    quantity: number;
    expirationDate: string;
  },
  {
    inventory: Inventory;
  }
>;

export type UpdateInventoryRequest = ApiData<
  {
    inventoryId: string;
    quantity: number;
    expirationDate: string;
  },
  {
    inventory: Inventory;
  }
>;

export type DeleteInventoryRequest = ApiData<
  {
    inventoryId: string;
  },
  undefined
>;

export type InventoryStatsRequest = ApiData<
  {
    from: string;
    to: string;
  },
  {
    outOfStockCount: number;
    lowStockCount: number;
    totalInventoryValue: number;
  }
>;
