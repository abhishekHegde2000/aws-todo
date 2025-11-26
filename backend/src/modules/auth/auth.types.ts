import { Request } from "express";

export interface UserPayload {
  id: number;
  email: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    email: string;
    name: string | null;
  };
  token: string;
}

export interface UserResponse {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
}
