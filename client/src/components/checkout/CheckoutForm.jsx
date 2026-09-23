import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ShoppingBag } from "lucide-react";

const PAYMENT_TERMS = [
  { id: "advance", label: "Advance Payment" },
  { id: "bank_transfer", label: "Bank Transfer" },
  { id: "net_30", label: "Net 30" },
  { id: "net_60", label: "Net 60" },
];

const ACCOUNT = {
  email: "puskar@example.com",
  company: "CuraMed Healthcare",
};

const CART_ITEMS = [
  {
    id: "1",
    productId: "MED001",
    name: "Paracetamol 500mg",
    sku: "PCM-500",
    qty: 1000,
    unit: "strips",
    unitPrice: 1,
  },
  {
    id: "2",
    productId: "MED002",
    name: "Amoxicillin 500mg",
    sku: "AMX-500",
    qty: 500,
    unit: "strips",
    unitPrice: 3.9,
  },
  {
    id: "3",
    productId: "MED003",
    name: "Vitamin C Tablets",
    sku: "VTC-100",
    qty: 500,
    unit: "boxes",
    unitPrice: 3.8,
  },
];

const inputCls =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/10";

const labelCls =
  "mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-slate-500";

function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function CheckoutForm() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const [company, setCompany] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("advance");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // Temporary local cart.
    // Replace this later with your CartContext/API.
    const timer = setTimeout(() => {
      setItems(CART_ITEMS);
      setLoading(false);
    }, 400);

    setCompany(ACCOUNT.company);

    return () => clearTimeout(timer);
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.qty,
    0
  );

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!items.length || placing) return;

    setPlacing(true);
    setError("");

    try {
      // Backend order API will be connected here later.
      const orderItems = items.map((item) => ({
        productId: item.productId,
        name: item.name,
        sku: item.sku,
        unit: item.unit,
        qty: item.qty,
        unitPrice: item.unitPrice,
        lineTotal: item.unitPrice * item.qty,
      }));

      const orderData = {
        company,
        poNumber,
        paymentTerms,
        items: orderItems,
        subtotal,
        notes,
        status: "pending",
      };

      console.log("Order to submit:", orderData);

      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate("/orders?placed=1");
    } catch (err) {
      console.error(err);
      setError(
        "The order could not be placed. Please try again or contact sales."
      );
      setPlacing(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="h-7 w-48 animate-pulse rounded-lg bg-slate-200" />

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="h-80 animate-pulse rounded-2xl bg-slate-100 lg:col-span-2" />
          <div className="h-72 animate-pulse rounded-2xl bg-slate-100" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
          <ShoppingBag className="h-7 w-7 text-slate-500" />
        </div>

        <h1 className="mt-6 text-3xl font-black uppercase tracking-tight text-slate-900">
          Your cart is empty
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          Add medicines to your cart before checking out.
        </p>

        <Link
          to="/products"
          className="mt-7 inline-flex h-11 items-center rounded-xl bg-[#0F4C81] px-6 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#0b3c66]"
        >
          Browse medicines
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/cart"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#0F4C81]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to cart
        </Link>

        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#14B8A6]">
          B2B medicine procurement
        </p>

        <h1 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight text-slate-900 sm:text-5xl">
          Place order
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
          Review your medicine order, provide your business details and submit
          the procurement request.
        </p>
      </div>

      <form
        onSubmit={placeOrder}
        className="grid gap-8 lg:grid-cols-3"
      >
        {/* Left */}
        <div className="space-y-6 lg:col-span-2">
          {/* Billing */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F4C81]/10">
                <CheckCircle2 className="h-5 w-5 text-[#0F4C81]" />
              </div>

              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.15em] text-slate-900">
                  Billing & purchase order
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Business information for your medicine procurement order.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {/* Company */}
              <div>
                <label htmlFor="company" className={labelCls}>
                  Company / institution
                </label>

                <input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Enter company name"
                  required
                  className={inputCls}
                />
              </div>

              {/* PO */}
              <div>
                <label htmlFor="po" className={labelCls}>
                  PO number
                  <span className="ml-1 font-normal normal-case tracking-normal">
                    (optional)
                  </span>
                </label>

                <input
                  id="po"
                  value={poNumber}
                  onChange={(e) => setPoNumber(e.target.value)}
                  placeholder="e.g. PO-2026-1187"
                  className={inputCls}
                />
              </div>

              {/* Payment */}
              <div>
                <label htmlFor="terms" className={labelCls}>
                  Payment terms
                </label>

                <select
                  id="terms"
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  className={inputCls}
                >
                  {PAYMENT_TERMS.map((term) => (
                    <option key={term.id} value={term.id}>
                      {term.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelCls}>
                  Account email
                </label>

                <input
                  id="email"
                  value={ACCOUNT.email}
                  disabled
                  className={`${inputCls} cursor-not-allowed bg-slate-50 text-slate-500`}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="mt-5">
              <label htmlFor="notes" className={labelCls}>
                Delivery notes
                <span className="ml-1 font-normal normal-case tracking-normal">
                  (optional)
                </span>
              </label>

              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Delivery address, receiving hours, special instructions..."
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/10"
              />
            </div>

            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <p className="text-xs leading-5 text-slate-500">
                Payment terms and business credit arrangements may require
                account verification. Applicable taxes and delivery charges
                will be confirmed with the final order documentation.
              </p>
            </div>
          </section>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Right */}
        <aside className="h-fit overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-24">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">
              Order summary
            </h2>
          </div>

          <ul className="divide-y divide-slate-100 px-5">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between gap-4 py-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-800">
                    {item.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    SKU: {item.sku}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.qty.toLocaleString("en-IN")} ×{" "}
                    {formatINR(item.unitPrice)} / {item.unit}
                  </p>
                </div>

                <span className="whitespace-nowrap text-sm font-black text-slate-900">
                  {formatINR(item.unitPrice * item.qty)}
                </span>
              </li>
            ))}
          </ul>

          <div className="border-t border-slate-200 px-5 py-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Subtotal
              </span>

              <span className="text-lg font-black text-slate-900">
                {formatINR(subtotal)}
              </span>
            </div>

            <p className="mt-1 text-right text-xs text-slate-400">
              Excluding applicable taxes & delivery charges
            </p>

            <button
              type="submit"
              disabled={placing}
              className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-[#0F4C81] px-5 text-sm font-black uppercase tracking-wider text-white transition hover:bg-[#0b3c66] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {placing ? "Placing order..." : "Place order"}
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}