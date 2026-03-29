import { ApiData } from '@/utils/types.util';

export type SendContactFormRequest = ApiData<
  {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
  },
  undefined
>;
