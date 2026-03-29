// Node Modules
import { AxiosError } from 'axios';
import { MutationCache, QueryClient } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';

// Utils
import { sanitizeError } from '@/utils/error.util';

// Types
import type { ApiError } from '@/utils/types.util';

export function getQueryClient() {
  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onError: (error) => {
        const err = sanitizeError(error as AxiosError<ApiError>);
        toast.error(err.title, { description: err.description });
      },
    }),
    defaultOptions: {
      queries: {
        retry: 1,
        gcTime: 1000 * 60 * 60 * 24,
        staleTime: 1000 * 60 * 60 * 24,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  });

  return {
    queryClient,
  };
}
