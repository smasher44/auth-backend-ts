// File: src/controllers/test.controller.ts
import { Request, Response } from 'express';
import { TestResponse } from '../interfaces/test-interfaces';

export const getTestData = async (
  req: Request,
  res: Response<TestResponse>
): Promise<void> => {
  try {
    // Sample test data
    const testData = [
      {
        id: 1,
        message: "Hello from the API!",
        timestamp: new Date().toISOString()
      },
      {
        id: 2,
        message: "This is a test endpoint",
        timestamp: new Date().toISOString()
      },
      {
        id: 3,
        message: "No authentication required",
        timestamp: new Date().toISOString()
      }
    ];

    res.json({
      status: 'success',
      data: testData
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      data: []
    });
  }
};