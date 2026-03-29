import { model, Schema } from 'mongoose';
import { CampaignType } from '@repo/types/campaign';
import { ICampaign } from './interfaces/campaign.model';

const campaignSchema = new Schema<ICampaign>(
  {
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: CampaignType, required: true },
    productsIds: { type: [Schema.Types.ObjectId], required: true },
  },
  { timestamps: true },
);

const Campaign = model<ICampaign>('Campaign', campaignSchema);

export default Campaign;
