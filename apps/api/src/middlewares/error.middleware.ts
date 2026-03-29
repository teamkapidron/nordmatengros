import { customError } from '@/utils/common/error.util';
import { ErrorHandler } from '@/handlers/error.handler';

import type { Request, Response, NextFunction } from 'express';

export default function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  err = customError(err);
  let statusCode = 500;
  let error = err.message || 'Internal server error';
  if (err instanceof ErrorHandler) {
    statusCode = err.statusCode;
    error = err.message;
  }
  res.status(statusCode).json({
    success: false,
    error,
    name: err.name,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
}
