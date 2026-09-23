import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

const inputCls =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/10";

const labelCls =
  "mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-slate-500";

export default function QuoteForm({ kind = "quote" }) {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const isQuote = kind === "quote";

  const submit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      kind,
      name: String(formData.get("name") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      productInterest: String(formData.get("productInterest") || "").trim(),
      quantity: String(formData.get("quantity") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    setBusy(true);
    setError("");

    try {
      // Temporary frontend-only submission.
      // Later connect this to:
      // POST http://localhost:5000/api/quotes
      console.log("Quote/Contact request:", data);

      await new Promise((resolve) => setTimeout(resolve, 800));

      setDone(true);
      form.reset();
    } catch (error) {
      console.error(error);

      setError("Something went wrong. Please email sales@curamed.in directly.");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>

        <h2 className="mt-4 text-2xl font-black uppercase tracking-tight text-slate-900">
          Request received
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
          Thank you. Our team will get back to you within one business day.
        </p>

        <button
          type="button"
          onClick={() => {
            setDone(false);
            setError("");
          }}
          className="mt-6 rounded-xl bg-[#0F4C81] px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-[#0b3c66]"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
    >
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#14B8A6]">
          {isQuote ? "Bulk procurement" : "Get in touch"}
        </p>

        <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-slate-900">
          {isQuote ? "Request a quotation" : "Send us a message"}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {isQuote
            ? "Tell us what medicines you need and our team will prepare a suitable B2B quotation."
            : "Have a question about medicine procurement? Send us your details and our team will respond."}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor={`${kind}-name`} className={labelCls}>
            Full name
          </label>

          <input
            id={`${kind}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={inputCls}
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor={`${kind}-company`} className={labelCls}>
            Company / institution
          </label>

          <input
            id={`${kind}-company`}
            name="company"
            type="text"
            required
            placeholder="Pharmacy, clinic or hospital"
            className={inputCls}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor={`${kind}-email`} className={labelCls}>
            Work email
          </label>

          <input
            id={`${kind}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={inputCls}
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor={`${kind}-phone`} className={labelCls}>
            Phone
          </label>

          <input
            id={`${kind}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className={inputCls}
          />
        </div>

        {/* Quote-only fields */}
        {isQuote && (
          <>
            <div>
              <label htmlFor="quote-product" className={labelCls}>
                Medicines of interest
              </label>

              <input
                id="quote-product"
                name="productInterest"
                type="text"
                placeholder="e.g. Paracetamol, Amoxicillin"
                className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="quote-quantity" className={labelCls}>
                Estimated quantity
              </label>

              <input
                id="quote-quantity"
                name="quantity"
                type="text"
                placeholder="e.g. 10,000 strips / month"
                className={inputCls}
              />
            </div>
          </>
        )}
      </div>

      {/* Message */}
      <div className="mt-5">
        <label htmlFor={`${kind}-message`} className={labelCls}>
          Message
        </label>

        <textarea
          id={`${kind}-message`}
          name="message"
          rows={5}
          required
          placeholder={
            isQuote
              ? "Tell us about quantities, delivery schedule, medicine requirements..."
              : "How can we help?"
          }
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/10"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={busy}
        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0F4C81] text-sm font-black uppercase tracking-wider text-white transition hover:bg-[#0b3c66] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? (
          "Sending..."
        ) : (
          <>
            <Send className="h-4 w-4" />

            {isQuote ? "Request quotation" : "Send message"}
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs leading-5 text-slate-400">
        Your information will only be used to respond to your request.
      </p>
    </form>
  );
}
