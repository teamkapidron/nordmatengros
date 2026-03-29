import { Response } from 'express';

export function sendResponse(
  res: Response,
  statusCode: number,
  message: string,
  data?: Record<string, unknown>,
) {
  res.status(statusCode).json({
    success: statusCode < 400,
    message,
    ...(data && { data }),
  });
}
