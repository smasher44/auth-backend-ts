import { Request, Response, NextFunction } from 'express';
import { client } from "../config/mongodb";
import Database from '../config/db';

// postgres
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

// mongodb
export const getUserProgress = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const database = client.db("blazingedge");
    const collection = database.collection("user_progress");

    const result = await collection.find({}).toArray();
    res.status(200).json({
      status: 'success',
      data: {
        userProgress: result,
      },
    });
  } catch (error) {
    console.error('🔴 Error fetching user progress:', error);
    next({
      status: 'error',
      message: 'Failed to fetch user progress',
    });
  }
};
