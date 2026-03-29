import { AnyZodObject, ZodError } from 'zod';

import { asyncHandler } from '@/handlers/async.handler';
import { ErrorHandler } from '@/handlers/error.handler';

import type { Request, Response, NextFunction } from 'express';

export default function validate(schema: AnyZodObject) {
  return asyncHandler(
    async (req: Request, _res: Response, next: NextFunction) => {
      try {
        await schema.parseAsync({
          body: req.body,
          query: req.query,
          params: req.params,
        });

        return next();
      } catch (error) {
        if (error instanceof ZodError) {
          const errorMessage = error.errors
            .map(
              (err: { path: (string | number)[]; message: string }) =>
                `${err.path.join('.')}: ${err.message}`,
            )
            .join(', ');
          return next(new ErrorHandler(400, errorMessage, 'VALIDATION'));
        }
        return next(error);
      }
    },
  );
}
