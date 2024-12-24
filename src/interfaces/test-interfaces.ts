export interface TestData {
    id: string;
    name: string;
    email: string;
    enrolled_courses: {
        course_id: string;
        course_name: string;
        progress: {
            completed_modules: number;
            total_modules: number;
            completion_percentage: number;
        };
        quizzes: {
            quiz_id: string;
            quiz_name: string;
            score: number;
            total_score: number;
            date_taken: string;
        }[];
    }[];
    analytics: {
        overall_completion_percentage: number;
        average_quiz_score: number;
        strengths: string[];
        weaknesses: string[];
    };
}


export interface TestResponse {
  status: 'success' | 'error';
  data: TestData;
}