// Node Modules
import { useCallback } from 'react';
import { toast } from '@repo/ui/lib/sonner';
import { useMutation } from '@tanstack/react-query';

import { useRequest } from '@/hooks/useRequest';

import { SendContactFormRequest } from './types';

export function useContact() {
  const api = useRequest();

  const sendContactForm = useCallback(
    async (payload: SendContactFormRequest['payload']) => {
      const response = await api.post<SendContactFormRequest['response']>(
        '/marketing/contact/form',
        payload,
      );
      return response.data.data;
    },
    [api],
  );

  const sendContactFormMutation = useMutation({
    mutationFn: sendContactForm,
    onSuccess: function () {
      toast.success('Takk for at du kontaktet oss!');
    },
    onError: function () {
      toast.error('Det oppstod en feil. Vennligst prøv igjen senere.');
    },
  });

  return { sendContactFormMutation };
}
