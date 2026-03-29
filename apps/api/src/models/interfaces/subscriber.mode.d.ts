import { Document, Types } from 'mongoose';
import { Subscriber } from '@repo/types/subscribers';

export interface ISubscriber extends Document, Subscriber {
  userId: Types.ObjectId;
}
