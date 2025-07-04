export interface User {
  id: number;
  username: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  userId: number;
  username: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean; // Changed back to isAdmin to match backend JsonProperty
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}
