import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
  Building2,
  Phone,
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Truck,
  BadgeCheck,
} from "lucide-react";

const inputCls =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/10";

const labelCls =
  "mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-slate-500";

/* ---------- Password strength ---------- */

function scorePassword(value) {
  if (!value) return { score: 0, label: "", tone: "slate" };

  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;

  const map = [
    { label: "Too short", tone: "red" },
    { label: "Weak", tone: "red" },
    { label: "Fair", tone: "amber" },
    { label: "Good", tone: "teal" },
    { label: "Strong", tone: "emerald" },
  ];

  return { score, ...map[score] };
}

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

/* ---------- Field wrapper ---------- */

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

/* ---------- Brand panel (desktop only) ---------- */

function BrandPanel() {
  const points = [
    {
      icon: Truck,
      title: "Bulk medicine procurement",
      body: "Order commonly required medicines in bulk with business-friendly MOQs.",
    },
    {
      icon: FileCheck2,
      title: "GST-ready invoicing",
      body: "Documented procurement with license and tax details on every order.",
    },
    {
      icon: ShieldCheck,
      title: "Verified supply chain",
      body: "Every product sourced through compliant distribution channels.",
    },
  ];

  return (
    <aside className="relative hidden overflow-hidden rounded-3xl bg-[#0F4C81] p-10 text-white lg:block">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#14B8A6]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

      <div className="relative flex h-full flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
              <BadgeCheck className="h-4 w-4 text-[#14B8A6]" />
            </span>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#14B8A6]">
              CuraMed
            </p>
          </div>

          <h2 className="mt-8 text-3xl font-black uppercase leading-[1.05] tracking-tight">
            Medicine procurement,
            <br />
            built for business.
          </h2>

          <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">
            Join pharmacies, clinics and distributors who manage recurring
            medicine orders through one B2B platform.
          </p>
        </div>

        <ul className="mt-10 space-y-5">
          {points.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <Icon className="h-4 w-4 text-[#14B8A6]" />
              </span>
              <div>
                <p className="text-sm font-bold">{title}</p>
                <p className="mt-0.5 text-xs leading-5 text-white/60">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

/* ---------- Main component ---------- */

export default function AuthForms() {
  const [tab, setTab] = useState("login");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [registerPassword, setRegisterPassword] = useState("");

  const navigate = useNavigate();

  const onLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    setBusy(true);
    setError("");
    setSuccess("");

    try {
      /*
       * TEMPORARY DEMO LOGIN
       * Replace with your backend:
       * POST /api/users/login
       */
      await new Promise((resolve) => setTimeout(resolve, 700));

      if (!email || !password) throw new Error("Missing credentials");

      localStorage.setItem(
        "curamed_user",
        JSON.stringify({ email, role: "user" })
      );

      navigate("/products");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const onRegister = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const gst = String(formData.get("gst") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    setBusy(true);
    setError("");
    setSuccess("");

    try {
      if (password.length < 8) {
        throw new Error("Password must contain at least 8 characters.");
      }

      /*
       * TEMPORARY DEMO REGISTER
       * Replace with: POST /api/users/register
       */
      await new Promise((resolve) => setTimeout(resolve, 700));

      localStorage.setItem(
        "curamed_user",
        JSON.stringify({ name, company, gst, phone, email, role: "user" })
      );

      setSuccess("Account created successfully.");

      setTimeout(() => navigate("/products"), 500);
    } catch (err) {
      console.error(err);
      setError(
        err.message ||
          "Registration failed. Please check your details and try again."
      );
    } finally {
      setBusy(false);
    }
  };

  const switchTab = (value) => {
    setTab(value);
    setError("");
    setSuccess("");
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        {/* Brand side */}
        <BrandPanel />

        {/* Form side */}
        <div className="mx-auto w-full max-w-lg lg:mx-0">
          {/* Header */}
          <div className="text-center lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#14B8A6]">
              Business accounts
            </p>

            <h1 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight text-slate-900 sm:text-5xl">
              {tab === "login" ? "Sign in" : "Create account"}
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500 lg:mx-0">
              {tab === "login"
                ? "Sign in to manage your medicine procurement and orders."
                : "Create a business account to start ordering medicines from CuraMed."}
            </p>
          </div>

          {/* Tabs */}
          <div className="mt-8 grid grid-cols-2 rounded-xl border border-slate-200 bg-slate-100 p-1">
            {[
              { id: "login", label: "Sign in" },
              { id: "register", label: "Create account" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => switchTab(item.id)}
                className={`rounded-lg px-4 py-3 text-xs font-black uppercase tracking-wider transition ${
                  tab === item.id
                    ? "bg-[#0F4C81] text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* ---------- LOGIN ---------- */}
          {tab === "login" && (
            <form
              onSubmit={onLogin}
              className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
            >
              <div className="space-y-5">
                <Field
                  label="Work email"
                  htmlFor="login-email"
                  icon={Mail}
                >
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

                <Field
                  label="Password"
                  htmlFor="login-password"
                  icon={LockKeyhole}
                  suffix={
                    <button
                      type="button"
                      onClick={() =>
                        setShowLoginPassword((v) => !v)
                      }
                      className="text-slate-400 transition hover:text-[#0F4C81]"
                      aria-label={
                        showLoginPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showLoginPassword ? (
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
                    type={showLoginPassword ? "text" : "password"}
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

              {error && <Alert variant="error">{error}</Alert>}

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
                  Demo mode
                </span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>

              <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                Backend authentication will be connected in production.
              </p>
            </form>
          )}

          {/* ---------- REGISTER ---------- */}
          {tab === "register" && (
            <form
              onSubmit={onRegister}
              className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
            >
              {/* Section: Contact */}
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Contact details
              </p>

              <div className="mt-4 space-y-5">
                <Field
                  label="Contact person"
                  htmlFor="register-name"
                  icon={UserRound}
                >
                  <input
                    id="register-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                    className={`${inputCls} pl-10`}
                  />
                </Field>

                <Field
                  label="Work email"
                  htmlFor="register-email"
                  icon={Mail}
                >
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

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Phone"
                    htmlFor="register-phone"
                    icon={Phone}
                  >
                    <input
                      id="register-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="+91"
                      className={`${inputCls} pl-10`}
                    />
                  </Field>

                  <Field
                    label="GST / License"
                    htmlFor="register-gst"
                    icon={FileCheck2}
                  >
                    <input
                      id="register-gst"
                      name="gst"
                      required
                      placeholder="GST number"
                      className={`${inputCls} pl-10`}
                    />
                  </Field>
                </div>
              </div>

              {/* Section: Business */}
              <p className="mt-7 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Business details
              </p>

              <div className="mt-4 space-y-5">
                <Field
                  label="Company / Institution"
                  htmlFor="register-company"
                  icon={Building2}
                >
                  <input
                    id="register-company"
                    name="company"
                    required
                    placeholder="Hospital, clinic, pharmacy or distributor"
                    className={`${inputCls} pl-10`}
                  />
                </Field>

                <div>
                  <Field
                    label="Password"
                    htmlFor="register-password"
                    icon={LockKeyhole}
                    suffix={
                      <button
                        type="button"
                        onClick={() =>
                          setShowRegisterPassword((v) => !v)
                        }
                        className="text-slate-400 transition hover:text-[#0F4C81]"
                        aria-label={
                          showRegisterPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showRegisterPassword ? (
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
                      type={
                        showRegisterPassword ? "text" : "password"
                      }
                      required
                      minLength={8}
                      autoComplete="new-password"
                      value={registerPassword}
                      onChange={(e) =>
                        setRegisterPassword(e.target.value)
                      }
                      placeholder="Minimum 8 characters"
                      className={`${inputCls} pl-10 pr-11`}
                    />
                  </Field>
                  <PasswordStrength value={registerPassword} />
                </div>
              </div>

              {error && <Alert variant="error">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <button
                type="submit"
                disabled={busy}
                className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-[#0F4C81] text-sm font-black uppercase tracking-wider text-white transition hover:bg-[#0b3c66] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy ? "Creating account..." : "Create business account"}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                By creating an account, you agree to CuraMed's B2B terms of
                service and privacy policy.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}