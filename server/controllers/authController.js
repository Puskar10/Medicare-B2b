import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/User.js";

// ==========================================
// Generate JWT
// ==========================================

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// ==========================================
// REGISTER
// POST /api/auth/register
// ==========================================

export const register = async (req, res) => {
  try {
    const { name, email, password, company, phone } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check existing user
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      company: company?.trim() || "",
      phone: phone?.trim() || "",
    });

    // Generate JWT
    const token = generateToken(user._id.toString());

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

// ==========================================
// LOGIN
// POST /api/auth/login
// ==========================================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = generateToken(user._id.toString());

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// // ==========================================
// // FORGOT PASSWORD
// // POST /api/auth/forgot-password
// // ==========================================

// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: "Email is required",
//       });
//     }

//     const user = await User.findOne({
//       email: email.toLowerCase().trim(),
//     });

//     // Don't reveal whether email exists
//     if (!user) {
//       return res.status(200).json({
//         success: true,
//         message:
//           "If an account exists with this email, a password reset link has been sent",
//       });
//     }

//     // Generate random token
//     const resetToken = crypto.randomBytes(32).toString("hex");

//     // Save token
//     user.resetPasswordToken = resetToken;

//     // Token expires in 15 minutes
//     user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//     await user.save();

//     // Temporary development response
//     // We will replace this with email sending next.
//     return res.status(200).json({
//       success: true,
//       message: "Password reset token generated",
//       resetToken,
//     });
//   } catch (error) {
//     console.error("Forgot password error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// // ==========================================
// // RESET PASSWORD
// // POST /api/auth/reset-password/:token
// // ==========================================

// export const resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;

//     if (!password) {
//       return res.status(400).json({
//         success: false,
//         message: "New password is required",
//       });
//     }

//     if (password.length < 6) {
//       return res.status(400).json({
//         success: false,
//         message: "Password must be at least 6 characters",
//       });
//     }

//     // Find user with valid token
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpire: {
//         $gt: Date.now(),
//       },
//     });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or expired reset token",
//       });
//     }

//     // Hash new password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     user.password = hashedPassword;

//     // Clear reset fields
//     user.resetPasswordToken = null;
//     user.resetPasswordExpire = null;

//     await user.save();

//     return res.status(200).json({
//       success: true,
//       message: "Password reset successfully",
//     });
//   } catch (error) {
//     console.error("Reset password error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

export const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        company: req.user.company,
        phone: req.user.phone,
        role: req.user.role,
      },
    });
  } catch (error) {
    console.error("Get me error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
