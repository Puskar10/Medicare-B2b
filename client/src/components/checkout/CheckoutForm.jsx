import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Hash,
  Mail,
  MessageSquare,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { useCart } from "../../context/CartContext";

const inputCls =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#0F4C81] focus:ring-4 focus:ring-[#0F4C81]/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500";

const labelCls =
  "mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500";

function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function CheckoutForm() {
  const navigate = useNavigate();

  const { cart, cartTotal, cartQuantity, clearCart } = useCart();

  const [company, setCompany] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [notes, setNotes] = useState("");

  const [email, setEmail] = useState("");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  /* Load logged-in user */
  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem("curamed_user") || localStorage.getItem("user");

      if (!storedUser) return;

      const user = JSON.parse(storedUser);
      setCompany(user.company || "");
      setEmail(user.email || "");
    } catch (err) {
      console.error("Failed to load user:", err);
    }
  }, []);

  const subtotal = Number(cartTotal || 0);

  const placeOrder = async (e) => {
    e.preventDefault();

    if (placing) return;
    if (!cart.length) return setError("Your cart is empty.");
    if (!company.trim())
      return setError("Please enter your company or institution name.");

    setPlacing(true);
    setError("");

    try {
      const orderItems = cart.map((item) => ({
        productId: item.id,
        name: item.name,
        sku: item.sku,
        unit: item.unit,
        qty: Number(item.quantity),
        unitPrice: Number(item.price),
        lineTotal: Number(item.price) * Number(item.quantity),
      }));

      const orderData = {
        company: company.trim(),
        email,
        poNumber: poNumber.trim(),
        items: orderItems,
        subtotal,
        totalQuantity: cartQuantity,
        notes: notes.trim(),
        status: "pending",
      };

      console.log("Order to submit:", orderData);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      clearCart();
      navigate("/orders?placed=1");
    } catch (err) {
      console.error("Order placement error:", err);
      setError(
        err.message ||
          "The order could not be placed. Please try again or contact sales."
      );
      setPlacing(false);
    }
  };

  /* ---------------- EMPTY CART ---------------- */
  if (!cart.length) {
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

  /* ---------------- MAIN ---------------- */
  return (
    <div className="min-h-screen bg-slate-50/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500 transition hover:text-[#0F4C81]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to cart
          </Link>

          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#14B8A6]">
            B2B medicine procurement
          </p>

          <h1 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight text-slate-900 sm:text-5xl">
            Place order
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
            Review your medicine order, provide your business details and
            submit the procurement request.
          </p>

          {/* Stepper */}
          <ol className="mt-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-wider">
            <li className="flex items-center gap-2 text-[#14B8A6]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#14B8A6] text-white">
                ✓
              </span>
              Cart
            </li>
            <li className="h-px w-6 bg-slate-300" />
            <li className="flex items-center gap-2 text-[#0F4C81]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0F4C81] text-white">
                2
              </span>
              Checkout
            </li>
            <li className="h-px w-6 bg-slate-300" />
            <li className="flex items-center gap-2 text-slate-400">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200">
                3
              </span>
              Confirmation
            </li>
          </ol>
        </div>

        <form onSubmit={placeOrder} className="grid gap-6 lg:grid-cols-5">
          {/* ================= LEFT ================= */}
          <div className="space-y-6 lg:col-span-3">
            {/* Billing */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-start gap-4 border-b border-slate-100 px-6 py-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0F4C81]/10">
                  <Building2 className="h-5 w-5 text-[#0F4C81]" />
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

              <div className="p-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Company */}
                  <div>
                    <label htmlFor="company" className={labelCls}>
                      <Building2 className="h-3.5 w-3.5" />
                      Company / institution
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Enter company name"
                      required
                      className={inputCls}
                    />
                  </div>

                  {/* PO Number */}
                  <div>
                    <label htmlFor="po" className={labelCls}>
                      <Hash className="h-3.5 w-3.5" />
                      PO number
                      <span className="ml-1 font-normal normal-case tracking-normal text-slate-400">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="po"
                      type="text"
                      value={poNumber}
                      onChange={(e) => setPoNumber(e.target.value)}
                      placeholder="e.g. PO-2026-1187"
                      className={inputCls}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={labelCls}>
                      <Mail className="h-3.5 w-3.5" />
                      Account email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      disabled
                      className={inputCls}
                    />
                  </div>

                  {/* Cart products */}
                  <div>
                    <label htmlFor="products" className={labelCls}>
                      <Package className="h-3.5 w-3.5" />
                      Cart items
                    </label>
                    <input
                      id="products"
                      value={`${cart.length} product${
                        cart.length !== 1 ? "s" : ""
                      }`}
                      disabled
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="mt-5">
                  <label htmlFor="notes" className={labelCls}>
                    <MessageSquare className="h-3.5 w-3.5" />
                    Delivery notes
                    <span className="ml-1 font-normal normal-case tracking-normal text-slate-400">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    placeholder="Delivery address, receiving hours, special instructions..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#0F4C81] focus:ring-4 focus:ring-[#0F4C81]/10"
                  />
                </div>
              </div>
            </section>

            {/* Trust badges */}
            <div className="grid gap-3 sm:grid-cols-3">
              <TrustBadge
                icon={ShieldCheck}
                title="Verified suppliers"
                text="Licensed pharma partners"
              />
              <TrustBadge
                icon={Truck}
                title="Pan-India delivery"
                text="Cold chain supported"
              />
              <TrustBadge
                icon={CheckCircle2}
                title="GST invoice"
                text="Compliance ready"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}
          </div>

          {/* ================= RIGHT ================= */}
          <aside className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-24">
              {/* Summary header */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">
                  Order summary
                </h2>
                <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 ring-1 ring-slate-200">
                  {cartQuantity.toLocaleString("en-IN")} units
                </span>
              </div>

              {/* Product list */}
              <ul className="max-h-[42vh] divide-y divide-slate-100 overflow-y-auto px-6">
                {cart.map((item) => {
                  const lineTotal =
                    Number(item.price) * Number(item.quantity);

                  return (
                    <li key={item.id} className="flex gap-4 py-4">
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-100">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <ShoppingBag className="h-5 w-5 text-slate-400" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-slate-800">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                          SKU: {item.sku}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {Number(item.quantity).toLocaleString("en-IN")} ×{" "}
                          {formatINR(item.price)}
                          <span className="text-slate-400"> / {item.unit}</span>
                        </p>
                      </div>

                      <span className="whitespace-nowrap text-sm font-black text-slate-900">
                        {formatINR(lineTotal)}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* Totals */}
              <div className="space-y-3 border-t border-slate-100 bg-white px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Subtotal</span>
                  <span className="text-xl font-black text-slate-900">
                    {formatINR(subtotal)}
                  </span>
                </div>

                <div className="space-y-1.5 rounded-xl bg-slate-50 px-3.5 py-3 text-[11px] text-slate-500">
                  <div className="flex items-center justify-between">
                    <span>Total products</span>
                    <span className="font-bold text-slate-700">
                      {cart.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total quantity</span>
                    <span className="font-bold text-slate-700">
                      {cartQuantity.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <p className="text-right text-[11px] italic text-slate-400">
                  Excluding applicable taxes & delivery charges
                </p>

                <button
                  type="submit"
                  disabled={placing}
                  className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0F4C81] px-5 text-sm font-black uppercase tracking-wider text-white shadow-sm transition hover:bg-[#0b3c66] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {placing ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Placing order...
                    </>
                  ) : (
                    <>Place order</>
                  )}
                </button>

                <p className="flex items-center justify-center gap-1.5 text-center text-[10px] text-slate-400">
                  <ShieldCheck className="h-3 w-3" />
                  Secure B2B transaction · Verified account required
                </p>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- */
/*  Sub-components                                                */
/* ------------------------------------------------------------- */

function TrustBadge({ icon: Icon, title, text }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#14B8A6]/10">
        <Icon className="h-4 w-4 text-[#14B8A6]" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-bold uppercase tracking-wider text-slate-800">
          {title}
        </p>
        <p className="truncate text-[10px] text-slate-500">{text}</p>
      </div>
    </div>
  );
}