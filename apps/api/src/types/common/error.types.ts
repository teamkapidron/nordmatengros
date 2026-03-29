export const ErrorName = {
  NOT_FOUND: 'Not Found',
  UNAUTHORIZED: 'Unauthorized',
  BAD_REQUEST: 'Bad Request',
  VALIDATION: 'Validation Error',
  CONFLICT: 'Conflict',
  INTERNAL_SERVER: 'Internal Server Error',
} as const;

export type ErrorName = keyof typeof ErrorName;
