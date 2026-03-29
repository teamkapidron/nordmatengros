import { formatDate } from 'date-fns';

import { TripletexClientConfig } from '@/lib/tripletex/calls/types';
import { defaultBaseUrl, makeRequest } from '@/lib/tripletex/utils';

import type {
  SessionToken,
  GetTokenResponse,
  CreateSessionTokenInput,
} from '@/lib/tripletex/calls/token/types';

export class TripletexToken {
  constructor(readonly config: TripletexClientConfig) {}

  async createSessionToken(
    args: CreateSessionTokenInput,
  ): Promise<GetTokenResponse> {
    const baseUrl = this.config.baseUrl ?? defaultBaseUrl;
    const url = `${baseUrl.replace(/\/$/, '')}/v2/token/session/:create`;

    const query = {
      ...args,
      expirationDate: formatDate(args.expirationDate, 'yyyy-MM-dd'),
    };

    const response = await makeRequest<GetTokenResponse>(url, {
      method: 'PUT',
      headers: {
        'User-Agent': this.config.userAgent ?? 'baladi/1.0.0',
      },
      query,
    });

    return response;
  }
}

export type { SessionToken, GetTokenResponse };
