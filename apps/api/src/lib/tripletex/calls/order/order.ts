import { TripletexBase } from '../base';
import {
  CreateOrderInput,
  CreateOrderResult,
} from '@/lib/tripletex/calls/order/types';

export class TripletexOrder extends TripletexBase {
  async create(input: CreateOrderInput): Promise<CreateOrderResult> {
    const response = await this.performRequest<CreateOrderResult>(() =>
      this.authenticatedRequest('/v2/order', {
        method: 'POST',
        body: input,
      }),
    );

    return response;
  }
}
