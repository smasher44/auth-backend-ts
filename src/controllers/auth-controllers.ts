// File: src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { User, LoginCredentials, UpdateCredentials, AuthResponse, JwtPayload } from '../interfaces/auth-interfaces';

// Add these type extensions for better type safety
interface AuthRequest extends Request {
  user?: JwtPayload;
}

interface AuthRequestWithBody<T> extends AuthRequest {
  body: T;
}

const users: User[] = [];


export const register = async (
  req: Request<{}, {}, LoginCredentials>,
  res: Response<AuthResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        status: 'error',
        message: 'Email and password are required'
      });
      return;
    }

    if (users.find(user => user.email === email)) {
      res.status(400).json({
        status: 'error',
        message: 'User already exists'
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user: User = {
      id: users.length + 1,
      email,
      password: hashedPassword
    };

    users.push(user);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    res.status(201).json({
      status: 'success',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request<{}, {}, LoginCredentials>,
  res: Response<AuthResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        status: 'error',
        message: 'Email and password are required'
      });
      return;
    }

    const user = users.find(u => u.email === email);
    if (!user) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    res.json({
      status: 'success',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: AuthRequest,
  res: Response<AuthResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        status: 'error',
        message: 'Not authenticated'
      });
      return;
    }

    const user = users.find(u => u.id === req?.user!.id);
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
      return;
    }

    res.json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.email
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateCredentials = async (
  req: AuthRequestWithBody<UpdateCredentials>,
  res: Response<AuthResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { currentPassword, newPassword, newEmail } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        status: 'error',
        message: 'Not authenticated'
      });
      return;
    }

    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
      return;
    }

    const user = users[userIndex];

    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      res.status(401).json({
        status: 'error',
        message: 'Current password is incorrect'
      });
      return;
    }

    const updates: Partial<User> = {};

    if (newEmail && newEmail !== user.email) {
      if (users.some(u => u.email === newEmail && u.id !== userId)) {
        res.status(400).json({
          status: 'error',
          message: 'Email already in use'
        });
        return;
      }
      updates.email = newEmail;
    }

    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(newPassword, salt);
    }

    if (Object.keys(updates).length === 0) {
      res.status(400).json({
        status: 'error',
        message: 'No updates provided'
      });
      return;
    }

    users[userIndex] = {
      ...user,
      ...updates
    };

    let newToken: string | undefined;
    if (updates.email) {
      newToken = jwt.sign(
        { id: user.id, email: updates.email },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn }
      );
    }

    res.json({
      status: 'success',
      message: 'Credentials updated successfully',
      data: {
        user: {
          id: users[userIndex].id,
          email: users[userIndex].email
        },
        ...(newToken && { token: newToken })
      }
    });
  } catch (error) {
    next(error);
  }
};
