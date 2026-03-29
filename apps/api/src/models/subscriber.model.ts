import { model, Schema } from 'mongoose';
import { SubscriberStatus } from '@repo/types/subscribers';
import { ISubscriber } from './interfaces/subscriber.mode';

const subscriberSchema = new Schema<ISubscriber>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    status: {
      type: String,
      enum: SubscriberStatus,
      required: true,
      default: SubscriberStatus.SUBSCRIBED,
    },
  },
  { timestamps: true },
);

const Subscriber = model<ISubscriber>('Subscriber', subscriberSchema);

export default Subscriber;
