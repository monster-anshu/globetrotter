import { verifyJwt } from '@/libs/test/jwt';
import type { RequestHandler } from 'express';

export const SessionMiddlewareFn: RequestHandler = async (req, res, next) => {
  const cookies = (req.cookies || {}) as Record<string, string>;
  const token = cookies.__session;

  if (!token) {
    next();
    return;
  }

  const session = await verifyJwt(token);
  req.session = session;

  next();
};
