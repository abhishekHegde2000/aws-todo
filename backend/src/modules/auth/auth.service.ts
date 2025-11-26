import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
import { PrismaClient } from "../../generated/prisma/client.js";
import type {
  RegisterInput,
  LoginInput,
  AuthResponse,
  UserResponse,
  UserPayload,
} from "./auth.types.js";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

/**
 * Generate a JWT token for a user
 */
const generateToken = (user: UserPayload): string => {
  const options: SignOptions = {
    expiresIn: "7d",
  };
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, options);
};

/**
 * Verify a JWT token and return the payload
 */
export const verifyToken = (token: string): UserPayload => {
  return jwt.verify(token, JWT_SECRET) as UserPayload;
};

/**
 * Register a new user
 */
export const register = async (input: RegisterInput): Promise<AuthResponse> => {
  const { email, password, name } = input;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: name || null,
    },
  });

  // Generate token
  const token = generateToken({ id: user.id, email: user.email });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    token,
  };
};

/**
 * Login a user
 */
export const login = async (input: LoginInput): Promise<AuthResponse> => {
  const { email, password } = input;

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // Generate token
  const token = generateToken({ id: user.id, email: user.email });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    token,
  };
};

/**
 * Get user profile by ID
 */
export const getProfile = async (
  userId: number
): Promise<UserResponse | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  });

  return user;
};
