
import express from "express";

import {
  register,
  login,
  getMe,
} from "../controllers/authController.js";

import { forgotPassword, resetPassword, } from "../controllers/passwordController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Forgot password
router.post("/forgot-password", forgotPassword);

// Reset password
router.post("/reset-password/:token", resetPassword);

// Get logged-in user 
router.get("/me", authMiddleware, getMe);

export default router;

