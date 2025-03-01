import { Session } from '@/session/type';

export declare global {
  namespace Express {
    export interface Request {
      session?: Session | null;
    }
  }
}
