export interface Inventory {
  _id: string;

  productId: string;

  quantity: number;
  inputQuantity: number;

  expirationDate: Date;

  createdAt: Date;
  updatedAt: Date;
}
