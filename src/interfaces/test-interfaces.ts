export interface TestData {
  id: number;
  message: string;
  timestamp: string;
}

export interface TestResponse {
  status: 'success' | 'error';
  data: TestData[];
}