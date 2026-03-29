import { AxiosError } from 'axios';
import { ApiError } from '@/utils/types.util';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<ApiError>;
  }
}
