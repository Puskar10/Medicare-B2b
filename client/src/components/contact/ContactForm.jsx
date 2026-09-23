import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Send,
  Clock,
  Building2,
  UserRound,
  MessageSquare,
  AlertCircle,
  Headphones,
  CalendarClock,
} from "lucide-react";
import { Link } from "react-router-dom";

const inputCls =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/10";

const labelCls =
  "mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-slate-500";

/* ---------- Field wrapper ---------- */

function Field({ label, htmlFor, icon: Icon, hint, children }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={htmlFor} className={labelCls}>
          {label}
        </label>
        {hint && (
          <span className="text-[10px] font-semibold text-slate-400">
            {hint}
          </span>
        )}
      </div>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        )}
        {children}
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

/* ---------- Contact info cards ---------- */

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email",
    value: "sales@curamed.in",
    href: "mailto:sales@curamed.in",
    hint: "Best for detailed enquiries",
    tone: "blue",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98450 12345",
    href: "tel:+919845012345",
    hint: "Mon–Sat, 9:00–18:00 IST",
    tone: "teal",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Hyderabad, Telangana, India",
    hint: "By appointment only",
    tone: "slate",
  },
];

const TONE_MAP = {
  blue: { bg: "bg-[#0F4C81]/10", text: "text-[#0F4C81]" },
  teal: { bg: "bg-[#14B8A6]/10", text: "text-[#14B8A6]" },
  slate: { bg: "bg-slate-100", text: "text-slate-600" },
};

function ContactCard({ icon: Icon, label, value, href, hint, tone }) {
  const styles = TONE_MAP[tone] || TONE_MAP.slate;

  const inner = (
    <>
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.bg}`}
      >
        <Icon className={`h-5 w-5 ${styles.text}`} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <p className="mt-1 truncate text-sm font-bold text-slate-900">
          {value}
        </p>
        {hint && (
          <p className="mt-0.5 text-xs text-slate-400">{hint}</p>
        )}
      </div>
    </>
  );

  const base =
    "flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition";

  if (href) {
    return (
      <a
        href={href}
        className={`${base} hover:-translate-y-0.5 hover:border-[#0F4C81]/30 hover:shadow-md`}
      >
        {inner}
      </a>
    );
  }

  return <div className={base}>{inner}</div>;
}

/* ---------- Success state ---------- */

function SuccessState({ summary, onReset }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50/40">
      <div className="p-8 text-center sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 ring-8 ring-emerald-50">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>

        <h2 className="mt-6 text-2xl font-black uppercase tracking-tight text-slate-900 sm:text-3xl">
          Message received
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
          Thank you for reaching out. Our team typically responds within{" "}
          <span className="font-bold text-slate-700">
            one business day
          </span>
          . You'll receive a reply at{" "}
          <span className="font-bold text-slate-700">
            {summary?.email || "your email"}
          </span>
          .
        </p>

        {summary && (
          <div className="mx-auto mt-6 max-w-md rounded-2xl border border-slate-200 bg-white p-4 text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Reference summary
            </p>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Name</dt>
                <dd className="font-semibold text-slate-800">
                  {summary.name}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Company</dt>
                <dd className="truncate font-semibold text-slate-800">
                  {summary.company}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Subject</dt>
                <dd className="font-semibold capitalize text-slate-800">
                  {summary.subject.replace("-", " ")}
                </dd>
              </div>
            </dl>
          </div>
        )}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0F4C81] px-6 text-xs font-black uppercase tracking-wider text-white transition hover:bg-[#0b3c66] active:scale-[0.98]"
          >
            Send another message
          </button>
          <Link
            to="/products"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-xs font-black uppercase tracking-wider text-slate-700 transition hover:border-[#0F4C81] hover:text-[#0F4C81]"
          >
            Browse products
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------- Main component ---------- */

const SUBJECT_OPTIONS = [
  { value: "general", label: "General enquiry" },
  { value: "bulk-order", label: "Bulk medicine order" },
  { value: "existing-order", label: "Existing order" },
  { value: "product", label: "Product enquiry" },
  { value: "pricing", label: "Pricing enquiry" },
  { value: "partnership", label: "Business partnership" },
  { value: "other", label: "Other" },
];

export default function ContactForm() {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState(null);

  const maxMessage = 1000;
  const messageNearLimit = message.length > maxMessage * 0.9;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const contactData = {
      name: String(formData.get("name") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    setBusy(true);
    setError("");

    try {
      // Temporary frontend-only submission.
      // Later connect this to:
      // POST http://localhost:5000/api/contact

      console.log("Contact request:", contactData);

      await new Promise((resolve) => setTimeout(resolve, 800));

      setSummary(contactData);
      setDone(true);
      setMessage("");
      form.reset();
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong. Please email sales@curamed.in directly."
      );
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <SuccessState
        summary={summary}
        onReset={() => {
          setDone(false);
          setError("");
          setSummary(null);
        }}
      />
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      {/* ---------- Left: contact info ---------- */}
      <div className="lg:sticky lg:top-10">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#14B8A6]">
          Get in touch
        </p>

        <h1 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight text-slate-900 sm:text-5xl">
          Contact us
        </h1>

        <p className="mt-5 max-w-md text-sm leading-7 text-slate-500">
          Have a question about medicine procurement, bulk orders or your
          existing order? Send us a message and our team will help.
        </p>

        {/* Response time badges */}
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
            <Clock className="h-3.5 w-3.5 text-[#14B8A6]" />
            Replies within 1 business day
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
            <Headphones className="h-3.5 w-3.5 text-[#0F4C81]" />
            Dedicated B2B support
          </span>
        </div>

        {/* Contact cards */}
        <div className="mt-8 space-y-4">
          {CONTACT_ITEMS.map((item) => (
            <ContactCard key={item.label} {...item} />
          ))}
        </div>

        {/* Business hours */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-slate-500" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              Business hours
            </p>
          </div>
          <dl className="mt-3 space-y-1.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Monday – Friday</dt>
              <dd className="font-semibold text-slate-800">
                9:00 – 18:00 IST
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Saturday</dt>
              <dd className="font-semibold text-slate-800">
                10:00 – 14:00 IST
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Sunday</dt>
              <dd className="font-semibold text-slate-500">Closed</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* ---------- Right: form ---------- */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#14B8A6]">
              Customer support
            </p>
            <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-slate-900">
              Send a message
            </h2>
          </div>
          <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500 sm:inline-block">
            Step 1 of 1
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Full name"
            htmlFor="contact-name"
            icon={UserRound}
          >
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your full name"
              className={`${inputCls} pl-10`}
            />
          </Field>

          <Field
            label="Company / Institution"
            htmlFor="contact-company"
            icon={Building2}
          >
            <input
              id="contact-company"
              name="company"
              type="text"
              required
              placeholder="Pharmacy, clinic or hospital"
              className={`${inputCls} pl-10`}
            />
          </Field>

          <Field
            label="Work email"
            htmlFor="contact-email"
            icon={Mail}
          >
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className={`${inputCls} pl-10`}
            />
          </Field>

          <Field
            label="Phone"
            htmlFor="contact-phone"
            icon={Phone}
          >
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+91 98765 43210"
              className={`${inputCls} pl-10`}
            />
          </Field>
        </div>

        {/* Subject */}
        <div className="mt-5">
          <label htmlFor="contact-subject" className={labelCls}>
            Subject
          </label>
          <select
            id="contact-subject"
            name="subject"
            required
            defaultValue=""
            className={`${inputCls} cursor-pointer`}
          >
            <option value="" disabled>
              Select a subject
            </option>
            {SUBJECT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="mt-5">
          <div className="flex items-baseline justify-between">
            <label htmlFor="contact-message" className={labelCls}>
              Message
            </label>
            <span
              className={`text-[10px] font-semibold ${
                messageNearLimit ? "text-amber-600" : "text-slate-400"
              }`}
            >
              {message.length} / {maxMessage}
            </span>
          </div>

          <div className="relative">
            <MessageSquare className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              required
              maxLength={maxMessage}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your requirement, order quantity or question..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/10"
            />
          </div>
          <p className="mt-1.5 text-xs text-slate-400">
            Include medicine names, quantities and delivery location if
            relevant — it helps us respond faster.
          </p>
        </div>

        {error && <Alert variant="error">{error}</Alert>}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0F4C81] text-sm font-black uppercase tracking-wider text-white transition hover:bg-[#0b3c66] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send message
            </>
          )}
        </button>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <p>
            Your details are used only to respond to your enquiry.
          </p>
        </div>
      </form>
    </div>
  );
}