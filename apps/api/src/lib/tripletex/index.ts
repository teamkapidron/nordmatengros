import { addDays } from 'date-fns';

import { TripletexCustomer } from '@/lib/tripletex/calls/customer/customer';
import { TripletexOrder } from '@/lib/tripletex/calls/order/order';
import { TripletexToken } from '@/lib/tripletex/calls/token/token';
import { TripletexClientConfig } from '@/lib/tripletex/calls/types';
import { TripletexProduct } from '@/lib/tripletex/calls/product/product';
import { TripletexInvoice } from '@/lib/tripletex/calls/invoice/invoice';

import type { CreateCustomerInput } from '@/lib/tripletex/calls/customer/types';
import type { CreateProductInput } from '@/lib/tripletex/calls/product/types';
import type { CreateOrderInput } from '@/lib/tripletex/calls/order/types';

export class Tripletex {
  public customer: TripletexCustomer;
  public product: TripletexProduct;
  public order: TripletexOrder;
  public invoice: TripletexInvoice;

  private tokenClient: TripletexToken;
  private sessionToken?: string;
  private tokenPromise?: Promise<string>;

  constructor(private readonly config: TripletexClientConfig) {
    this.tokenClient = new TripletexToken(config);

    this.customer = new TripletexCustomer(config);
    this.product = new TripletexProduct(config);
    this.order = new TripletexOrder(config);
    this.invoice = new TripletexInvoice(config);
  }

  private async getSessionToken(): Promise<string> {
    if (this.sessionToken) {
      return this.sessionToken;
    }

    if (this.tokenPromise) {
      return this.tokenPromise;
    }

    this.tokenPromise = this.createSessionToken();
    this.sessionToken = await this.tokenPromise;
    return this.sessionToken;
  }

  private async createSessionToken(): Promise<string> {
    const sessionTokenResponse = await this.tokenClient.createSessionToken({
      employeeToken: this.config.employeeToken ?? '',
      consumerToken: this.config.consumerToken ?? '',
      expirationDate: addDays(new Date(), 2),
    });

    return sessionTokenResponse.value.token;
  }

  private async initializeSession(): Promise<void> {
    const token = await this.getSessionToken();

    this.customer = new TripletexCustomer(this.config, token);
    this.product = new TripletexProduct(this.config, token);
    this.order = new TripletexOrder(this.config, token);
    this.invoice = new TripletexInvoice(this.config, token);
  }

  async createCustomer(input: CreateCustomerInput) {
    await this.initializeSession();
    return this.customer.create(input);
  }

  async makeCustomerActive(customerId: number, isInactive: boolean) {
    await this.initializeSession();
    return this.customer.makeCustomerActive(customerId, isInactive);
  }

  async createProduct(input: CreateProductInput) {
    await this.initializeSession();
    return this.product.create(input);
  }

  async createOrder(input: CreateOrderInput) {
    await this.initializeSession();
    return this.order.create(input);
  }

  async createInvoice(orderId: number, invoiceDate: string) {
    await this.initializeSession();
    return this.invoice.create(orderId, invoiceDate);
  }

  async viewInvoice(invoiceId: number) {
    await this.initializeSession();
    return this.invoice.view(invoiceId);
  }
}
