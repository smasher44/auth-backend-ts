import { Request, Response, NextFunction } from 'express';
import Database from '../config/db';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const db = Database.getInstance();
    const pool = db.getPool();

    const result = await pool.query('SELECT * FROM users');
    res.status(200).json({
      status: 'success',
      data: {
        users: result.rows,
      },
    });
  } catch (error) {
    console.error('🔴 Error fetching users:', error);
    next({
      status: 'error',
      message: 'Failed to fetch users',
    });
  }
};
