import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ApiException, fail } from '../lib/response';

export function notFoundHandler(_req: Request, res: Response) {
  return fail(res, 404, 'NOT_FOUND', 'No such endpoint');
}

// Central error shaper. Guarantees the { data, meta, error } contract on errors.
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ApiException) {
    return fail(res, err.status, err.code, err.message, err.details);
  }
  if (err instanceof ZodError) {
    return fail(res, 400, 'VALIDATION_ERROR', 'Invalid request body', err.flatten());
  }
  // express.json() throws on malformed JSON bodies — treat as a client error.
  if (
    err instanceof SyntaxError &&
    'status' in err &&
    (err as { status?: number }).status === 400 &&
    'body' in err
  ) {
    return fail(res, 400, 'BAD_REQUEST', 'Malformed JSON in request body');
  }
  // eslint-disable-next-line no-console
  console.error('[unhandled]', err);
  const message = err instanceof Error ? err.message : 'Internal server error';
  return fail(res, 500, 'INTERNAL', message);
}
