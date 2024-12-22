// File: src/middleware/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { config } from '../config/config';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);

  res.status(500).json({
    status: 'error',
    message: config.nodeEnv === 'development' ? err.message : 'Something went wrong!'
  });
};