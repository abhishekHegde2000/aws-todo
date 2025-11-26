import type { Request, Response } from "express";
import * as authService from "./auth.service.js";
import type { AuthRequest } from "./auth.types.js";

/**
 * Register a new user
 * @route POST /api/v1/auth/register
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const result = await authService.register({ email, password, name });

    res.status(201).json({
      message: "User registered successfully",
      ...result,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "User with this email already exists") {
        return res.status(409).json({ error: error.message });
      }
    }
    res.status(500).json({ error: "Failed to register user" });
  }
};

/**
 * Login a user
 * @route POST /api/v1/auth/login
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login({ email, password });

    res.status(200).json({
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Invalid credentials") {
        return res.status(401).json({ error: error.message });
      }
    }
    res.status(500).json({ error: "Failed to login" });
  }
};

/**
 * Get current user profile
 * @route GET /api/v1/auth/profile
 */
export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await authService.getProfile(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Failed to get profile" });
  }
};
