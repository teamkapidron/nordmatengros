import { Document, Types } from 'mongoose';
import { Campaign } from '@repo/types/campaign';

export interface ICampaign extends Document, Campaign {
  productsIds: Types.ObjectId[];
}
