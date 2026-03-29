export interface Discount {
  _id: string;
  productId: string;

  discountValue: number;

  validFrom?: Date;
  validTo?: Date;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}
