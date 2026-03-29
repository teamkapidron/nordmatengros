export enum SubscriberStatus {
  SUBSCRIBED = 'subscribed',
  UNSUBSCRIBED = 'unsubscribed',
}

export interface Subscriber {
  userId: string;

  status: SubscriberStatus;

  createdAt: Date;
  updatedAt: Date;
}
