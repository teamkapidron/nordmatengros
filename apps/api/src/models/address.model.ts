import { Schema, model } from 'mongoose';
import { IAddress } from './interfaces/address.model';

const addressSchema = new Schema<IAddress>(
  {
    userId: {
      ref: 'User',
      type: Schema.Types.ObjectId,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: false,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: false,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const Address = model<IAddress>('Address', addressSchema);

export default Address;
