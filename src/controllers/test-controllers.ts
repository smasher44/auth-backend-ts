// File: src/controllers/test.controller.ts
import { Request, Response } from 'express';
import { TestResponse } from '../interfaces/test-interfaces';

export const getTestData = async (
  req: Request,
  res: Response<TestResponse>
): Promise<void> => {
  try {
    // Sample test data
    const testData = {
      "id": "503b-23af-a9c5-ab9c-e2c9-6223",
        "user": {
          "id": "503b-23af-a9c5-ab9c-e2c9-6223",
          "name": "John Doe",
          "email" : "john.doe@example.com",
          "phone": "+1-555-123-4567",
          "address": {
              street: "123 Tech Avenue",
              city: "Silicon Valley",
              state: "CA",
              zipCode: "94025"
          },
          education: {
              degree: "Bachelor of Science",
              major: "Electrical Engineering",
              university: "Tech University",
              graduationYear: 2023
          },
          profile: {
              joinDate: "2024-01-15",
              lastActive: "2024-12-26",
              timezone: "UTC-8",
              preferences: {
                  notifications: true,
                  language: "English",
                  darkMode: true
              }
          },
          subscriptionStatus: "premium",
      },
      "enrolled_courses": [
          {
              "course_id": "EE101",
              "course_name": "Electrical Engineering Fundamentals",
              "progress": {
                  "completed_modules": 10,
                  "total_modules": 20,
                  "completion_percentage": 50
              },
              "quizzes": [
                  {
                      "quiz_id": "Q101",
                      "quiz_name": "Basic Electrical Circuits",
                      "score": 8,
                      "total_score": 10,
                      "date_taken": "2024-12-20"
                  },
                  {
                      "quiz_id": "Q102",
                      "quiz_name": "Ohm's Law and Power",
                      "score": 7,
                      "total_score": 10,
                      "date_taken": "2024-12-21"
                  }
              ]
          },
          {
              "course_id": "EE102",
              "course_name": "Control Systems",
              "progress": {
                  "completed_modules": 5,
                  "total_modules": 15,
                  "completion_percentage": 33
              },
              "quizzes": [
                  {
                      "quiz_id": "Q201",
                      "quiz_name": "Introduction to Control Systems",
                      "score": 6,
                      "total_score": 10,
                      "date_taken": "2024-12-22"
                  }
              ]
          }
      ],
      "analytics": {
          "overall_completion_percentage": 42,
          "average_quiz_score": 7.5,
          "strengths": ["Basic Electrical Circuits", "Ohm's Law"],
          "weaknesses": ["Control Systems Fundamentals"]
      }
    }
  
    res.json({
      status: 'success',
      data: testData
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      data: {} as any
    });
  }
};