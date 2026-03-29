import { TripletexBase } from '../base';
import {
  CreateProductInput,
  CreateProductResult,
} from '@/lib/tripletex/calls/product/types';

export class TripletexProduct extends TripletexBase {
  async create(input: CreateProductInput): Promise<CreateProductResult> {
    const response = await this.performRequest<CreateProductResult>(() =>
      this.authenticatedRequest('/v2/product', {
        method: 'POST',
        body: input,
      }),
    );

    return response;
  }
}
