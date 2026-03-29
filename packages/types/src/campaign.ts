export enum CampaignType {
  NEW_ARRIVAL = 'new_arrival',
  PROMOTION = 'promotion',
}

export interface Campaign {
  title: string;
  description?: string;

  type: CampaignType;

  productsIds: string[];

  createdAt: Date;
  updatedAt: Date;
}
