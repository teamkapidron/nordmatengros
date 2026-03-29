export interface Address {
  _id: string;
  userId: string;
  label?: string;
  isDefault: boolean;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}
