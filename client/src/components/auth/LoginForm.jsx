import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const inputCls =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/10";

const labelCls =
  "mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-slate-500";

/* ---------- Alert ---------- */

function Alert({ variant = "error", children }) {
  const styles = {
    error: {
      wrapper: "border-red-200 bg-red-50 text-red-700",
      Icon: AlertCircle,
    },
    success: {
      wrapper: "border-emerald-200 bg-emerald-50 text-emerald-700",
      Icon: CheckCircle2,
    },
  };

  const { wrapper, Icon } = styles[variant];

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={`mt-5 flex items-start gap-2.5 rounded-xl border p-3 text-sm ${wrapper}`}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />

      <p className="leading-5">{children}</p>
    </div>
  );
}

/* ---------- Field ---------- */

function Field({ label, htmlFor, icon: Icon, suffix, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelCls}>
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        )}

        {children}

        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Login Form ---------- */

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") || "").trim();

    const password = String(formData.get("password") || "");

    setError("");
    setSuccess("");
    setBusy(true);

    try {
      if (!email) {
        throw new Error("Please enter your email.");
      }

      if (!password) {
        throw new Error("Please enter your password.");
      }

      /* ---------- Backend Login ---------- */

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log("Login response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password.");
      }

      /* ---------- Save JWT ---------- */

      localStorage.setItem("token", data.token);

      /* ---------- Save user ---------- */

      if (data.user) {
        localStorage.setItem("curamed_user", JSON.stringify(data.user));

        localStorage.setItem("user", JSON.stringify(data.user));
      }
      window.dispatchEvent(new Event("curamed:auth"));

      setSuccess("Login successful!");

      /* ---------- Redirect ---------- */

      setTimeout(() => {
        navigate("/products");
      }, 700);
    } catch (err) {
      console.error("Login error:", err);

      setError(err.message || "Login failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-10 sm:px-6 lg:py-16">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#14B8A6]">
          Business accounts
        </p>

        <h1 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight text-slate-900 sm:text-5xl">
          Sign in
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500">
          Sign in to manage your medicine procurement and orders.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
      >
        <div className="space-y-5">
          {/* Email */}

          <Field label="Work email" htmlFor="login-email" icon={Mail}>
            <input
              id="login-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className={`${inputCls} pl-10`}
            />
          </Field>

          {/* Password */}

          <Field
            label="Password"
            htmlFor="login-password"
            icon={LockKeyhole}
            suffix={
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="text-slate-400 transition hover:text-[#0F4C81]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
          >
            <input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              className={`${inputCls} pl-10 pr-11`}
            />
          </Field>
        </div>

        {/* Remember / Forgot */}

        <div className="mt-4 flex items-center justify-between">
          <label className="flex cursor-pointer select-none items-center gap-2 text-xs text-slate-600">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 rounded border-slate-300 text-[#0F4C81] focus:ring-[#0F4C81]/30"
            />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="text-xs font-bold text-[#0F4C81] transition hover:text-[#14B8A6]"
          >
            Forgot password?
          </Link>
        </div>

        {/* Error */}

        {error && <Alert variant="error">{error}</Alert>}

        {/* Success */}

        {success && <Alert variant="success">{success}</Alert>}

        {/* Button */}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-[#0F4C81] text-sm font-black uppercase tracking-wider text-white transition hover:bg-[#0b3c66] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Signing in..." : "Sign in"}
        </button>

        <div className="mt-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-slate-200" />

          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
            Secure login
          </span>

          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <p className="mt-3 text-center text-xs leading-5 text-slate-400">
          Your account is securely authenticated through CuraMed.
        </p>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-[#0F4C81] hover:text-[#14B8A6]"
          >
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}
