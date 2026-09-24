
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    // Check token
    if (!token) {
      setError("Invalid password reset link.");
      return;
    }

    // Check password
    if (!password) {
      setError("Please enter a new password.");
      return;
    }

    // Minimum password length
    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    // Check confirm password
    if (!confirmPassword) {
      setError("Please confirm your new password.");
      return;
    }

    // Check passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to reset password."
        );
      }

      setSuccess(
        data.message ||
          "Password reset successfully."
      );

      // Clear form
      setPassword("");
      setConfirmPassword("");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">

          {/* Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-100 mb-4">
              <span className="text-2xl">
                🔐
              </span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Reset Password
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Create a new password for your CuraMed
              account.
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-5 rounded-xl bg-green-50 border border-green-200 px-4 py-3">
              <p className="text-sm text-green-700">
                {success}
              </p>

              <p className="text-xs text-green-600 mt-1">
                Redirecting you to login...
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
              <p className="text-sm text-red-700">
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* New Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                New Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                disabled={loading || !!success}
                autoComplete="new-password"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
              />

              <p className="mt-1 text-xs text-slate-400">
                Minimum 6 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                disabled={loading || !!success}
                autoComplete="new-password"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
              />
            </div>

            {/* Reset Button */}
            <button
              type="submit"
              disabled={loading || !!success}
              className="w-full rounded-xl bg-[#0F4C81] px-4 py-3 font-semibold text-white transition hover:bg-[#0b3d68] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Resetting..."
                : "Reset Password"}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-[#0F4C81] hover:underline"
            >
              ← Back to Login
            </Link>
          </div>
        </div>

        {/* Security Text */}
        <p className="mt-5 text-center text-xs text-slate-400">
          Your password is securely encrypted before
          being stored.
        </p>
      </div>
    </div>
  );
}

