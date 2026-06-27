import { Response } from 'express';

// Every response follows the contract: { data, meta, error }.
// Exactly one of `data` / `error` is non-null on a given response.

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiMeta {
  [key: string]: unknown;
}

export interface ApiResponse<T> {
  data: T | null;
  meta: ApiMeta | null;
  error: ApiError | null;
}

export function ok<T>(res: Response, data: T, meta: ApiMeta | null = null, status = 200): Response {
  const body: ApiResponse<T> = { data, meta, error: null };
  return res.status(status).json(body);
}

export function fail(
  res: Response,
  status: number,
  code: string,
  message: string,
  details?: unknown,
): Response {
  const body: ApiResponse<null> = {
    data: null,
    meta: null,
    error: { code, message, ...(details !== undefined ? { details } : {}) },
  };
  return res.status(status).json(body);
}

// Thrown anywhere in a handler; caught by the error middleware and shaped correctly.
export class ApiException extends Error {
  status: number;
  code: string;
  details?: unknown;
  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const NotFound = (message = 'Resource not found') =>
  new ApiException(404, 'NOT_FOUND', message);
export const BadRequest = (message: string, details?: unknown) =>
  new ApiException(400, 'BAD_REQUEST', message, details);
export const Unauthorized = (message = 'Missing or invalid API key') =>
  new ApiException(401, 'UNAUTHORIZED', message);
