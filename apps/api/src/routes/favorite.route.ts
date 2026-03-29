import { Router } from 'express';

import validate from '@/middlewares/validate.middleware';
import { isAuthenticated } from '@/middlewares/auth.middleware';

import {
  getUserFavorites,
  addToFavorites,
  removeFromFavorites,
} from '@/controllers/favorite.controller';

import {
  getFavoritesSchema,
  addToFavoritesSchema,
  removeFromFavoritesSchema,
} from '@/validators/favourite.validator';

const router: Router = Router();

router.get(
  '/my',
  isAuthenticated,
  validate(getFavoritesSchema),
  getUserFavorites,
);
router.post(
  '/:productId',
  isAuthenticated,
  validate(addToFavoritesSchema),
  addToFavorites,
);
router.delete(
  '/:productId',
  isAuthenticated,
  validate(removeFromFavoritesSchema),
  removeFromFavorites,
);

export default router;
