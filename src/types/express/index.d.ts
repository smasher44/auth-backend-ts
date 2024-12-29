// File: src/types/express/index.d.ts
import { JwtPayload } from '../../interfaces/auth-interfaces';

declare module 'bcryptjs';
declare module 'jsonwebtoken';
declare module 'cors';
declare module 'morgan';
declare module 'pg';
declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload;
    }
  }
}


export {};