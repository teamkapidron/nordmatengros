import express, { Router } from 'express';

import validate from '@/middlewares/validate.middleware';
import { isAdmin } from '@/middlewares/auth.middleware';

import {
  createCampaign,
  newsletterStats,
  newsLetterPreview,
  previewPromotionPoster,
  sendContactForm,
  unsubscribe,
} from '@/controllers/marketing.controller';

import {
  newsletterStatsSchema,
  createCampaignSchema,
  newsLetterPreviewSchema,
  previewPromotionPosterSchema,
  sendContactFormSchema,
  unsubscribeSchema,
} from '@/validators/marketing.validator';

const router: Router = express.Router();

router.get(
  '/newsletter/stats',
  isAdmin,
  validate(newsletterStatsSchema),
  newsletterStats,
);
router.post(
  '/newsletter/campaign',
  isAdmin,
  validate(createCampaignSchema),
  createCampaign,
);
router.post(
  '/newsletter/preview',
  isAdmin,
  validate(newsLetterPreviewSchema),
  newsLetterPreview,
);
router.post(
  '/promotion/poster/preview',
  isAdmin,
  validate(previewPromotionPosterSchema),
  previewPromotionPoster,
);
router.post('/contact/form', validate(sendContactFormSchema), sendContactForm);
router.get('/unsubscribe', validate(unsubscribeSchema), unsubscribe);

export default router;
