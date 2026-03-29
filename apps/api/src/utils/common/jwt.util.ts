import jwt, { SignOptions } from 'jsonwebtoken';

import type { Response, CookieOptions } from 'express';

export function sendJwt(
  res: Response,
  payload: object,
  options: {
    message?: string;
    redirect?: string;
  },
  data?: Record<string, unknown>,
) {
  const haveAllRequiredEnvVars = [
    process.env.JWT_SECRET,
    process.env.JWT_EXPIRY,
    process.env.COOKIE_EXPIRY,
    process.env.COOKIE_DOMAIN,
  ].every((envVar) => envVar !== undefined);

  if (!haveAllRequiredEnvVars) {
    throw new Error('Missing required environment variables for JWT');
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: parseInt(process.env.JWT_EXPIRY!),
  });

  const cookieOptions: CookieOptions = {
    expires: new Date(
      Date.now() + parseInt(process.env.COOKIE_EXPIRY!) * 24 * 60 * 60 * 1000,
    ),
    secure: true,
    httpOnly: true,
    domain: process.env.COOKIE_DOMAIN,
  };

  if (options.redirect) {
    res
      .status(200)
      .cookie('token', token, cookieOptions)
      .redirect(options.redirect);

    return;
  }

  res
    .status(200)
    .cookie('token', token, cookieOptions)
    .json({
      success: true,
      message: options.message,
      ...(data && { data }),
    });
}
