import { addDays } from 'date-fns';

import { TripletexClientConfig } from './types';
import { defaultBaseUrl, makeRequest } from '@/lib/tripletex/utils';
import { TripletexToken } from '@/lib/tripletex/calls/token/token';

interface RequestOptions {
  method?: string;
  body?: any;
  query?: Record<string, string>;
  headers?: Record<string, string>;
}

export abstract class TripletexBase {
  private readonly tokenClient: TripletexToken;

  constructor(
    readonly config: TripletexClientConfig,
    private sessionToken?: string,
  ) {
    this.tokenClient = new TripletexToken(config);
  }

  protected async authenticatedRequest<T>(
    path: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const sessionToken = await this.getToken();
    const baseUrl = this.config.baseUrl ?? defaultBaseUrl;
    const url = `${baseUrl.replace(/\/$/, '')}${path}`;

    const basicAuth = Buffer.from(
      [this.config.organizationId ?? '0', sessionToken].join(':'),
    ).toString('base64');

    return makeRequest<T>(url, {
      ...options,
      headers: {
        'User-Agent': this.config.userAgent ?? 'baladi/1.0.0',
        Authorization: `Basic ${basicAuth}`,
        ...options.headers,
      },
    });
  }

  protected async performRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    try {
      return await requestFn();
    } catch (error) {
      throw error;
    }
  }

  private async getToken(): Promise<string> {
    if (this.sessionToken) {
      return this.sessionToken;
    }

    if (!this.config.employeeToken) {
      throw new Error('employeeToken is required in config');
    }
    if (!this.config.consumerToken) {
      throw new Error('consumerToken is required in config');
    }

    try {
      const tokenResponse = await this.tokenClient.createSessionToken({
        employeeToken: this.config.employeeToken,
        consumerToken: this.config.consumerToken,
        expirationDate: addDays(new Date(), 2),
      });

      this.sessionToken = tokenResponse.value.token;
      return this.sessionToken;
    } catch (error) {
      throw new Error('Not able to retrieve session token');
    }
  }
}
