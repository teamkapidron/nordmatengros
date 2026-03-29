import { ApiData } from '@/utils/types.util';
import { Campaign } from '@repo/types/campaign';

export type CampaignRequestBody = Omit<Campaign, 'createdAt' | 'updatedAt'>;

export type NewsletterStats = ApiData<
  undefined,
  {
    campaignCount: number;
    subscriberCount: number;
    unsubscribedSubscribers: number;
  }
>;

export type CreateCampaign = ApiData<
  CampaignRequestBody,
  {
    campaign: Campaign;
  }
>;

export type NewsLetterPreview = ApiData<
  Omit<CampaignRequestBody, 'title' | 'description'>,
  {
    html: string;
  }
>;
