import { JWT_SECRET } from '@/env';
import { Session } from '@/session/type';
import { sign, verify } from 'jsonwebtoken';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

export const signJwt = (
  data: Session,
  options: { expiresIn?: number } = {}
) => {
  const { expiresIn } = options;
  const token = sign(
    {
      data,
    },
    JWT_SECRET,
    { expiresIn: expiresIn || 90 * 24 * 60 * 60 }
  );

  return token;
};

export const verifyJwt = (token: string): Promise<Session | null> => {
  return new Promise((resolve) => {
    if (!token) {
      return resolve(null);
    }
    verify(token, JWT_SECRET, (_err, decoded) => {
      if (typeof decoded !== 'object' || !('data' in decoded)) {
        return resolve(null);
      }
      resolve((decoded?.data as Session) || null);
    });
  });
};
