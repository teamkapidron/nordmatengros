import { User } from '@repo/types/user';
import { Subscriber } from '@repo/types/subscribers';

export type SubscriberWithUser = Omit<Subscriber, 'userId'> & {
  userId: Pick<User, 'email' | 'name'>;
};
