// Node Modules
import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';
import type { PreviewPromotionPosterRequest } from './types';
import {
  multiProductPosterTemplate,
  promotionPosterTemplate,
} from '@/templates/poster.template';

export function usePromotion() {
  const api = useRequest();

  const previewPromotionPoster = useCallback(
    async (
      request: PreviewPromotionPosterRequest['payload'] & { title: string },
    ) => {
      const response = await api.post<
        PreviewPromotionPosterRequest['response']
      >('/marketing/promotion/poster/preview', request);

      if (request.productsIds.length > 1) {
        return await multiProductPosterTemplate({
          ...response.data.data,
          title: request.title,
          posterType: request.posterType,
        });
      } else {
        return await promotionPosterTemplate({
          ...response.data.data.productsData[0]!,
          title: request.title,
          posterType: request.posterType,
        });
      }
    },
    [api],
  );

  const previewPromotionPosterMutation = useMutation({
    mutationKey: [ReactQueryKeys.PREVIEW_PROMOTION_POSTER],
    mutationFn: previewPromotionPoster,
  });

  return {
    // Mutations
    previewPromotionPosterMutation,
  };
}
