import { AxiosError } from 'axios';
import { ApiError } from '@/utils/types.util';

export function sanitizeError(error: AxiosError<ApiError>) {
  return {
    title: error.response?.data.name || 'Request Failed',
    description: error.response?.data.error || error.message,
  };
}
