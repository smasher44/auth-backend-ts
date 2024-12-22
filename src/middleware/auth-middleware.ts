// File: src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { JwtPayload } from '../interfaces/auth-interfaces';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
      res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      });
      return;
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(403).json({
          status: 'error',
          message: 'Invalid or expired token'
        });
        return;
      }

      (req as Request & { user: JwtPayload }).user = decoded as JwtPayload;
      next();
    });
  } catch (error) {
    next(error);
  }
};