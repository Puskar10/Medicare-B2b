import crypto from "crypto";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

// ==========================================
// FORGOT PASSWORD
// POST /api/auth/forgot-password
// ==========================================

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    // Don't reveal whether the email exists
    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If an account exists with this email, a password reset link has been sent",
      });
    }

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Save token
    user.resetPasswordToken = resetToken;

    // Token expires in 15 minutes
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    // Frontend reset URL
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // Email HTML
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />

          <style>
            body {
              margin: 0;
              padding: 0;
              background: #f4f7fb;
              font-family: Arial, sans-serif;
            }

            .container {
              max-width: 600px;
              margin: 40px auto;
              background: #ffffff;
              border-radius: 16px;
              padding: 40px;
            }

            .logo {
              color: #0F4C81;
              font-size: 28px;
              font-weight: bold;
            }

            h1 {
              color: #1e293b;
            }

            p {
              color: #475569;
              line-height: 1.7;
            }

            .button {
              display: inline-block;
              background: #0F4C81;
              color: white !important;
              text-decoration: none;
              padding: 14px 24px;
              border-radius: 10px;
              font-weight: bold;
              margin: 20px 0;
            }

            .warning {
              background: #fff7ed;
              padding: 15px;
              border-radius: 8px;
              color: #9a3412;
              font-size: 13px;
            }
          </style>
        </head>

        <body>

          <div class="container">

            <div class="logo">
              CuraMed
            </div>

            <h1>
              Reset Your Password
            </h1>

            <p>
              Hello ${user.name},
            </p>

            <p>
              We received a request to reset the password
              for your CuraMed account.
            </p>

            <p>
              Click the button below to create a new password.
            </p>

            <a
              href="${resetUrl}"
              class="button"
            >
              Reset Password
            </a>

            <p>
              This link will expire in
              <strong>15 minutes</strong>.
            </p>

            <div class="warning">
              If you did not request a password reset,
              you can safely ignore this email.
            </div>

          </div>

        </body>
      </html>
    `;

    // Send email
    await sendEmail({
      to: user.email,
      subject: "CuraMed - Reset Your Password",
      html,
    });

    return res.status(200).json({
      success: true,
      message:
        "If an account exists with this email, a password reset link has been sent",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send password reset email",
    });
  }
};

// ==========================================
// RESET PASSWORD
// POST /api/auth/reset-password/:token
// ==========================================

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "New password is required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    // Remove reset token
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while resetting password",
    });
  }
};
