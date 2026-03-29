// Node Modules
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';
import type {
  NewsletterStats,
  CreateCampaign,
  NewsLetterPreview,
} from './types';

export function useNewsletter() {
  const api = useRequest();
  const queryClient = useQueryClient();

  const newsletterStats = useCallback(async () => {
    const response = await api.get<NewsletterStats['response']>(
      '/marketing/newsletter/stats',
    );

    return response.data.data;
  }, [api]);

  const newsLetterStatsQuery = useQuery({
    queryKey: [ReactQueryKeys.GET_NEWSLETTER_STATS],
    queryFn: newsletterStats,
  });

  const createCampaign = useCallback(
    async (data: CreateCampaign['payload']) => {
      const response = await api.post<CreateCampaign['response']>(
        '/marketing/newsletter/campaign',
        data,
      );

      return response.data.data;
    },
    [api],
  );

  const createCampaignMutation = useMutation({
    mutationFn: createCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_NEWSLETTER_STATS],
      });
      toast.success('Kampanje opprettet');
    },
  });

  const newsLetterPreview = useCallback(
    async (data: NewsLetterPreview['payload']) => {
      const response = await api.post<NewsLetterPreview['response']>(
        '/marketing/newsletter/preview',
        data,
      );

      return response.data.data;
    },
    [api],
  );

  const newsLetterPreviewMutation = useMutation({
    mutationKey: [ReactQueryKeys.GET_NEWSLETTER_PREVIEW],
    mutationFn: newsLetterPreview,
  });

  return {
    // Queries
    newsLetterStatsQuery,

    // Mutations
    createCampaignMutation,
    newsLetterPreviewMutation,
  };
}
