import mongoose from 'mongoose';
import { ErrorHandler } from '@/handlers/error.handler';

export function customError(error: Error): Error | ErrorHandler {
  if (error.name === 'ValidationError') {
    return new ErrorHandler(400, error.message, 'VALIDATION');
  }

  if (
    error instanceof mongoose.mongo.MongoServerError &&
    error.code === 11000
  ) {
    const duplicateField = Object.keys(error.keyValue || {}).join(', ');
    return new ErrorHandler(
      409,
      `Duplicate value for field: ${duplicateField}`,
      'CONFLICT',
    );
  }

  return error;
}
