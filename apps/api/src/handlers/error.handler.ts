import { ErrorName } from '@/types/common/error.types';

export class ErrorHandler extends Error {
  statusCode: number;
  message: string;
  name: string;

  constructor(statusCode: number, message: string, name: ErrorName) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.name = ErrorName[name];
    Error.captureStackTrace(this, this.constructor);
  }
}
