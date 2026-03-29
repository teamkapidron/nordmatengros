'use server';

import { API_URL } from '@/constants/url.constants';
import type {
  GetUserDataRequest,
  GetUserStatusRequest,
} from '@/hooks/useAuth/types';

export async function getUser(token: string) {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Cookie: `token=${token}`,
    },
  });

  const data = (await response.json()) as GetUserDataRequest['response'];

  return data.data.user;
}

export async function getUserStatus(token: string) {
  const response = await fetch(`${API_URL}/auth/me/status`, {
    headers: {
      Cookie: `token=${token}`,
    },
  });

  const data = (await response.json()) as GetUserStatusRequest['response'];

  return data.data.user;
}
