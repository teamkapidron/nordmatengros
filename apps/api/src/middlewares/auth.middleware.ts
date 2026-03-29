import * as jwt from 'jsonwebtoken';

import User from '@/models/user.model';
import Admin from '@/models/admin.model';

import { asyncHandler } from '@/handlers/async.handler';
import { ErrorHandler } from '@/handlers/error.handler';

import type { JwtPayload } from '@/types/common/auth.types';
import type { Request, Response, NextFunction } from 'express';

// Middleware to just add user to request, this will not throw if user is not authenticated,
export const addUserToRequest = asyncHandler(
  async (req: Request, _: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
      next();
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      const user = await User.findById(decoded.id).lean();
      if (!user) {
        next();
        return;
      }

      req.user = {
        ...user,
        _id: user._id.toString(),
      };
      next();
    } catch (error) {
      next();
    }
  },
);

/* Middleware just to check if the user's email is verified */
export const isVerified = asyncHandler(
  async (req: Request, _: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
      throw new ErrorHandler(
        401,
        'Please login to access this resource',
        'UNAUTHORIZED',
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      const user = await User.findById(decoded.id).lean();
      if (!user) {
        throw new ErrorHandler(401, 'Invalid token', 'UNAUTHORIZED');
      }

      if (!user.isEmailVerified) {
        throw new ErrorHandler(
          403,
          'Please verify your email first',
          'UNAUTHORIZED',
        );
      }

      req.user = {
        ...user,
        _id: user._id.toString(),
      };
      next();
    } catch (error) {
      throw new ErrorHandler(401, 'Invalid token', 'UNAUTHORIZED');
    }
  },
);

/* Middleware to check if the user is fully verified and approved by admin */
export const isAuthenticated = asyncHandler(
  async (req: Request, _: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
      throw new ErrorHandler(
        401,
        'Please login to access this resource',
        'UNAUTHORIZED',
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      const user = await User.findById(decoded.id).lean();
      if (!user) {
        throw new ErrorHandler(401, 'Invalid token', 'UNAUTHORIZED');
      }

      if (!user.isEmailVerified) {
        throw new ErrorHandler(
          403,
          'Please verify your email first',
          'UNAUTHORIZED',
        );
      }

      if (!user.isApprovedByAdmin) {
        throw new ErrorHandler(
          403,
          'Your account is pending admin approval',
          'UNAUTHORIZED',
        );
      }

      req.user = {
        ...user,
        _id: user._id.toString(),
      };
      next();
    } catch (error) {
      if (error instanceof ErrorHandler) {
        throw new ErrorHandler(401, error.message, 'UNAUTHORIZED');
      }
      throw new ErrorHandler(401, 'Invalid token', 'UNAUTHORIZED');
    }
  },
);

/* Middleware to check if the user is an admin */
export const isAdmin = asyncHandler(
  async (req: Request, _: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
      throw new ErrorHandler(
        401,
        'Please login to access this resource',
        'UNAUTHORIZED',
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      const admin = await Admin.findById(decoded.id).lean();

      if (!admin) {
        throw new ErrorHandler(
          403,
          'Access denied. Admin privileges required',
          'UNAUTHORIZED',
        );
      }

      req.admin = {
        ...admin,
        _id: admin._id.toString(),
      };
      next();
    } catch (error) {
      if (error instanceof ErrorHandler) {
        throw new ErrorHandler(401, error.message, 'UNAUTHORIZED');
      }
      throw new ErrorHandler(401, 'Invalid token', 'UNAUTHORIZED');
    }
  },
);

/* Middleware to check if the user have Admin Access API key */
export const isSuperAdmin = asyncHandler(
  async (req: Request, _: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      throw new ErrorHandler(
        401,
        'Please login to access this resource',
        'UNAUTHORIZED',
      );
    }

    const apiKey = bearerToken.split(' ')[1];
    if (apiKey !== process.env.ADMIN_API_KEY) {
      throw new ErrorHandler(401, 'Invalid API key', 'UNAUTHORIZED');
    }

    next();
  },
);
