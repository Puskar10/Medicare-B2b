import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
  Building2,
  Phone,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const inputCls =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/10";

const labelCls =
  "mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-slate-500";

/* ---------- Password strength ---------- */

function scorePassword(value) {
  if (!value) {
    return {
      score: 0,
      label: "",
      tone: "slate",
    };
  }

  let score = 0;

  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;

  const map = [
    {
      label: "Too short",
      tone: "red",
    },
    {
      label: "Weak",
      tone: "red",
    },
    {
      label: "Fair",
      tone: "amber",
    },
    {
      label: "Good",
      tone: "teal",
    },
    {
      label: "Strong",
      tone: "emerald",
    },
  ];

  return {
    score,
    ...map[score],
  };
}

/* ---------- Password strength UI ---------- */

function PasswordStrength({ value }) {
  const { score, label, tone } = scorePassword(value);

  const toneMap = {
    red: "bg-red-500",
    amber: "bg-amber-500",
    teal: "bg-teal-500",
    emerald: "bg-emerald-500",
    slate: "bg-slate-200",
  };

  const textMap = {
    red: "text-red-600",
    amber: "text-amber-600",
    teal: "text-teal-600",
    emerald: "text-emerald-600",
    slate: "text-slate-400",
  };

  if (!value) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= score ? toneMap[tone] : "bg-slate-200"
            }`}
          />
        ))}
      </div>

      <p className={`mt-1.5 text-[11px] font-semibold ${textMap[tone]}`}>
        Password strength: {label}
      </p>
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

/* ---------- Register Form ---------- */

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [registerPassword, setRegisterPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  /* ---------- Submit ---------- */

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") || "").trim();

    const company = String(formData.get("company") || "").trim();

    const phone = String(formData.get("phone") || "").trim();

    const email = String(formData.get("email") || "").trim();

    const password = String(formData.get("password") || "");

    setError("");
    setSuccess("");
    setBusy(true);

    try {
      /* ---------- Validation ---------- */

      if (!name) {
        throw new Error("Please enter your full name.");
      }

      if (!email) {
        throw new Error("Please enter your email.");
      }

      if (!phone) {
        throw new Error("Please enter your phone number.");
      }

      if (!company) {
        throw new Error("Please enter your company name.");
      }

      if (!password) {
        throw new Error("Please enter a password.");
      }

      if (password.length < 8) {
        throw new Error("Password must contain at least 8 characters.");
      }

      /* ---------- Backend Register ---------- */

      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
          company,
          phone,
        }),
      });

      const data = await response.json();

      console.log("Register response:", data);

      /* ---------- Backend Error ---------- */

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      /* ---------- Save JWT ---------- */

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      /* ---------- Save User ---------- */

      if (data.user) {
        localStorage.setItem("curamed_user", JSON.stringify(data.user));

        localStorage.setItem("user", JSON.stringify(data.user));
      }

      window.dispatchEvent(new Event("curamed:auth"));

      /* ---------- Success ---------- */

      setSuccess("Account created successfully.");

      /* ---------- Redirect ---------- */

      setTimeout(() => {
        navigate("/products");
      }, 700);
    } catch (err) {
      console.error("Register error:", err);

      setError(
        err.message ||
          "Registration failed. Please check your details and try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-10 sm:px-6 lg:py-16">
      {/* ---------- Header ---------- */}

      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#14B8A6]">
          Business accounts
        </p>

        <h1 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight text-slate-900 sm:text-5xl">
          Create account
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500">
          Create a business account to start ordering medicines from CuraMed.
        </p>
      </div>

      {/* ---------- Form ---------- */}

      <form
        onSubmit={onSubmit}
        className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
      >
        {/* ---------- Contact Details ---------- */}

        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Contact details
        </p>

        <div className="mt-4 space-y-5">
          {/* Name */}

          <Field
            label="Contact person"
            htmlFor="register-name"
            icon={UserRound}
          >
            <input
              id="register-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your full name"
              className={`${inputCls} pl-10`}
            />
          </Field>

          {/* Email */}

          <Field label="Work email" htmlFor="register-email" icon={Mail}>
            <input
              id="register-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className={`${inputCls} pl-10`}
            />
          </Field>

          {/* Phone */}

          <Field label="Phone" htmlFor="register-phone" icon={Phone}>
            <input
              id="register-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+91 9876543210"
              className={`${inputCls} pl-10`}
            />
          </Field>
        </div>

        {/* ---------- Business Details ---------- */}

        <p className="mt-7 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Business details
        </p>

        <div className="mt-4 space-y-5">
          {/* Company */}

          <Field
            label="Company / Institution"
            htmlFor="register-company"
            icon={Building2}
          >
            <input
              id="register-company"
              name="company"
              type="text"
              required
              placeholder="Hospital, clinic, pharmacy or distributor"
              className={`${inputCls} pl-10`}
            />
          </Field>

          {/* Password */}

          <div>
            <Field
              label="Password"
              htmlFor="register-password"
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
                id="register-password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                autoComplete="new-password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className={`${inputCls} pl-10 pr-11`}
              />
            </Field>

            <PasswordStrength value={registerPassword} />
          </div>
        </div>

        {/* ---------- Alerts ---------- */}

        {error && <Alert variant="error">{error}</Alert>}

        {success && <Alert variant="success">{success}</Alert>}

        {/* ---------- Submit Button ---------- */}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-[#0F4C81] text-sm font-black uppercase tracking-wider text-white transition hover:bg-[#0b3c66] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Creating account..." : "Create business account"}
        </button>

        {/* ---------- Terms ---------- */}

        <p className="mt-4 text-center text-xs leading-5 text-slate-400">
          By creating an account, you agree to CuraMed's B2B terms of service
          and privacy policy.
        </p>

        {/* ---------- Login Link ---------- */}

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-[#0F4C81] hover:text-[#14B8A6]"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
