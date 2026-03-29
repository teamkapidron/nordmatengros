import { Document, Types } from 'mongoose';
import { Address } from '@repo/types/address';

export interface IAddress extends Document, Address {
  userId: Types.ObjectId;
}
