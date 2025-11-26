import { Router } from "express";
import * as authController from "./auth.controller.js";
import { validateRequest } from "../../core/validateRequest.js";
import { registerSchema, loginSchema } from "./auth.schema.js";
import { authenticate } from "../../core/authMiddleware.js";

const router = Router();

/**
 * @route POST /api/v1/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register
);

/**
 * @route POST /api/v1/auth/login
 * @desc Login user and return JWT token
 * @access Public
 */
router.post("/login", validateRequest(loginSchema), authController.login);

/**
 * @route GET /api/v1/auth/profile
 * @desc Get current user profile
 * @access Private (requires authentication)
 */
router.get("/profile", authenticate, authController.getProfile);

export default router;
