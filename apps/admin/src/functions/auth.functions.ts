'use server';

import { API_URL } from '@/constants/url.constants';
import type { GetAdminDataRequest } from '@/hooks/useAuth/types';

export async function getAdminData(token: string) {
  const response = await fetch(`${API_URL}/auth/admin/me`, {
    headers: {
      Cookie: `token=${token}`,
    },
  });

  const data = (await response.json()) as GetAdminDataRequest['response'];

  return data.data.admin;
}
