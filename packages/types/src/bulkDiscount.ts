export interface BulkDiscount {
  _id: string;

  minQuantity: number;
  discountPercentage: number;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}
