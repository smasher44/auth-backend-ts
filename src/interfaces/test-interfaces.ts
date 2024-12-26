export interface TestData {
    id: string;
    user: {
        id: string;
        name: string;
        email: string;
        phone: string;
        address: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
        };
        education: {
            degree: string;
            major: string;
            university: string;
            graduationYear: number;
        };
        profile: {
            joinDate: string;
            lastActive: string;
            timezone: string;
            preferences: {
                notifications: boolean;
                language: string;
                darkMode: boolean;
            };
        };
        subscriptionStatus: string;
    };
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