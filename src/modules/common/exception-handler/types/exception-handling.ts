export type ErrorType =
  | 'INTERNAL'
  | 'CONFLICT'
  | 'UNAUTHORIZED'
  | 'NOT_FOUND'
  | 'NOT_ACCEPTABLE'
  | 'BAD_REQUEST'
  | 'FORBIDDEN';

export type ErrorOptions = {
  message?: string;
  error?: Error;
};
