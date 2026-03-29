import { User } from '@repo/types/user';
import { Admin } from '@repo/types/admin';

export interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
      admin?: Admin;
    }
  }
}
