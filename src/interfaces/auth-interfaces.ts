// File: src/interfaces/auth.interface.ts
export interface User {
  id: number;
  email: string;
  password: string;
}

export interface JwtPayload {
  id: number;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UpdateCredentials {
  currentPassword: string;
  newPassword?: string;
  newEmail?: string;
}

export interface AuthResponse {
  status: 'success' | 'error';
  message?: string;
  data?: {
    token?: string;
    user?: Omit<User, 'password'>;
  };
}
