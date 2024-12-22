// File: src/types/express/index.d.ts
import { JwtPayload } from '../../interfaces/auth-interfaces';

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload;
    }
  }
}

export {};