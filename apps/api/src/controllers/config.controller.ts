// Node Modules

// Schemas
import Config from '@/models/config.model';

// Utils
import { sendResponse } from '@/utils/common/response.util';

// Handlers
import { asyncHandler } from '@/handlers/async.handler';
import { ErrorHandler } from '@/handlers/error.handler';

// Types
import type {
  CreateConfigSchema,
  UpdateConfigSchema,
} from '@/validators/config.validator';
import type { Request, Response } from 'express';

export const getConfig = asyncHandler(async (_: Request, res: Response) => {
  const config = await Config.find();

  sendResponse(res, 200, 'Config fetched successfully', {
    config,
  });
});

export const updateConfig = asyncHandler(
  async (req: Request, res: Response) => {
    const { showPalette } = req.body as UpdateConfigSchema['body'];

    const config = await Config.findOneAndUpdate(
      {},
      { showPalette },
      { new: true },
    );

    if (!config) {
      throw new ErrorHandler(404, 'Config not found', 'NOT_FOUND');
    }

    sendResponse(res, 200, 'Config updated successfully');
  },
);

export const createConfig = asyncHandler(
  async (req: Request, res: Response) => {
    const { showPalette } = req.body as CreateConfigSchema['body'];

    const config = await Config.create({ showPalette });

    sendResponse(res, 201, 'Config created successfully', { config });
  },
);
