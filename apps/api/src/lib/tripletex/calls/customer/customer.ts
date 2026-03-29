import { TripletexBase } from '../base';
import {
  CreateCustomerInput,
  CreateCustomerResponse,
  CreateCustomerResult,
} from '@/lib/tripletex/calls/customer/types';

export class TripletexCustomer extends TripletexBase {
  async makeCustomerActive(
    customerId: number,
    isInactive: boolean,
  ): Promise<CreateCustomerResult> {
    if (!customerId) {
      throw new Error('Customer ID is required');
    }

    if (isInactive === undefined) {
      throw new Error('isInactive is required');
    }

    const response = await this.performRequest<CreateCustomerResponse>(() =>
      this.authenticatedRequest(`/v2/customer/${customerId}`, {
        method: 'PUT',
        body: {
          isInactive,
        },
      }),
    );
    return {
      customerId: response.value.id,
      isInactive: response.value.isInactive ?? false,
    };
  }

  async create(input: CreateCustomerInput): Promise<CreateCustomerResult> {
    const response = await this.performRequest<CreateCustomerResponse>(() =>
      this.authenticatedRequest('/v2/customer', {
        method: 'POST',
        body: input,
      }),
    );

    return { customerId: response.value.id };
  }
}
