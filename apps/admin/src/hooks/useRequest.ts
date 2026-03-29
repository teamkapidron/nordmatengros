import axios from 'axios';
import { useRef } from 'react';
import { API_URL } from '@/constants/url.constants';

export function useRequest(headers: Record<string, string> = {}) {
  const api = useRef(
    axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      withCredentials: true,
    }),
  );

  return api.current;
}
