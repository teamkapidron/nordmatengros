import express, { Router } from 'express';

import validate from '@/middlewares/validate.middleware';
import {
  addUserToRequest,
  isAdmin,
  isSuperAdmin,
} from '@/middlewares/auth.middleware';

import {
  getConfig,
  updateConfig,
  createConfig,
} from '@/controllers/config.controller';
import {
  getConfigSchema,
  updateConfigSchema,
  createConfigSchema,
} from '@/validators/config.validator';

const router: Router = express.Router();

router.get('/', validate(getConfigSchema), getConfig);
router.put('/', isAdmin, validate(updateConfigSchema), updateConfig);
router.post('/', isSuperAdmin, validate(createConfigSchema), createConfig);

export default router;
