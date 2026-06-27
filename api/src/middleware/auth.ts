import { NextFunction, Request, Response } from 'express';
import { config } from '../config';
import { Unauthorized } from '../lib/response';

// Guards write operations. Clients must send the shared secret via X-API-Key.
export function requireApiKey(req: Request, _res: Response, next: NextFunction) {
  const provided = req.header('X-API-Key');
  if (!provided || provided !== config.apiKey) {
    return next(Unauthorized());
  }
  return next();
}
