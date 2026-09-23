import { Link, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  Clock3,
  PackageCheck,
  Truck,
  XCircle,
} from "lucide-react";

const STEPS = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
];

const SAMPLE_ORDERS = [
  {
    id: "ORD-20260923-001",
    created: "2026-09-23T09:30:00",
    poNumber: "PO-2026-0912",
    paymentTerms: "Net 30",
    status: "processing",
    subtotal: 4850,
    items: [
      {
        productId: "MED001",
        name: "Paracetamol 500mg",
        sku: "PCM-500",
        qty: 1000,
        unitPrice: 1.0,
        unit: "strips",
        lineTotal: 1000,
      },
      {
        productId: "MED002",
        name: "Amoxicillin 500mg",
        sku: "AMX-500",
        qty: 500,
        unitPrice: 3.9,
        unit: "strips",
        lineTotal: 1950,
      },
      {
        productId: "MED003",
        name: "Vitamin C Tablets",
        sku: "VTC-100",
        qty: 500,
        unitPrice: 3.8,
        unit: "boxes",
        lineTotal: 1900,
      },
    ],
  },
  {
    id: "ORD-20260918-002",
    created: "2026-09-18T12:15:00",
    poNumber: "PO-2026-0876",
    paymentTerms: "Advance",
    status: "shipped",
    subtotal: 3250,
    items: [
      {
        productId: "MED004",
        name: "Cough Relief Syrup",
        sku: "CRS-100",
        qty: 50,
        unitPrice: 32,
        unit: "bottles",
        lineTotal: 1600,
      },
      {
        productId: "MED005",
        name: "Multivitamin Capsules",
        sku: "MVC-30",
        qty: 25,
        unitPrice: 66,
        unit: "boxes",
        lineTotal: 1650,
      },
    ],
  },
  {
    id: "ORD-20260910-003",
    created: "2026-09-10T10:00:00",
    poNumber: null,
    paymentTerms: "Bank Transfer",
    status: "delivered",
    subtotal: 2100,
    items: [
      {
        productId: "MED001",
        name: "Paracetamol 500mg",
        sku: "PCM-500",
        qty: 2000,
        unitPrice: 1.05,
        unit: "strips",
        lineTotal: 2100,
      },
    ],
  },
];

function formatINR(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function statusLabel(status) {
  const labels = {
    pending: "Pending",
    confirmed: "Confirmed",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  return labels[status] || status;
}

function paymentTermLabel(term) {
  return term || "Advance";
}

function getStepIcon(status) {
  const icons = {
    pending: Clock3,
    confirmed: CheckCircle2,
    processing: PackageCheck,
    shipped: Truck,
    delivered: CheckCircle2,
  };

  return icons[status] || Clock3;
}

export default function OrdersView() {
  const [searchParams] = useSearchParams();

  const placed = searchParams.get("placed") === "1";

  return (
    <section className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Page header */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#14B8A6]">
            Your account
          </p>

          <h1 className="mt-3 text-4xl font-bold uppercase leading-[0.95] tracking-tight text-slate-900 sm:text-6xl">
            Orders & tracking
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
            Track your medicine orders, review purchased products and monitor
            your procurement status.
          </p>
        </div>

        {/* Success message */}
        {placed && (
          <div className="mt-7 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

            <div>
              <p className="font-bold">Order placed successfully.</p>
              <p className="mt-1 text-xs text-emerald-600">
                Your order has been received. Our team will confirm the order
                and provide the required invoice.
              </p>
            </div>
          </div>
        )}

        {/* Summary cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Total orders"
            value={SAMPLE_ORDERS.length}
          />

          <SummaryCard
            label="Active orders"
            value={
              SAMPLE_ORDERS.filter(
                (order) =>
                  order.status !== "delivered" &&
                  order.status !== "cancelled"
              ).length
            }
          />

          <SummaryCard
            label="Delivered"
            value={
              SAMPLE_ORDERS.filter(
                (order) => order.status === "delivered"
              ).length
            }
          />
        </div>

        {/* Empty state */}
        {SAMPLE_ORDERS.length === 0 && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-16 text-center">
            <PackageCheck className="mx-auto h-10 w-10 text-slate-300" />

            <h2 className="mt-4 text-xl font-bold uppercase text-slate-900">
              No orders yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Your medicine orders will appear here after you place an order.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex h-11 items-center rounded-xl bg-[#0F4C81] px-6 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#14B8A6]"
            >
              Browse medicines
            </Link>
          </div>
        )}

        {/* Orders */}
        <div className="mt-8 space-y-6">
          {SAMPLE_ORDERS.map((order) => {
            const stepIndex = STEPS.indexOf(order.status);
            const cancelled = order.status === "cancelled";

            return (
              <article
                key={order.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                {/* Order header */}
                <header className="flex flex-col gap-4 bg-slate-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Order #{order.id}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {formatDate(order.created)}

                      {order.poNumber && (
                        <> · PO {order.poNumber}</>
                      )}

                      {" · "}
                      {paymentTermLabel(order.paymentTerms)}
                    </p>
                  </div>

                  <StatusBadge status={order.status} />
                </header>

                {/* Tracking */}
                {!cancelled && (
                  <div className="border-t border-slate-200 px-5 py-6">
                    {/* Progress line */}
                    <div className="hidden items-center sm:flex">
                      {STEPS.map((step, index) => {
                        const Icon = getStepIcon(step);
                        const completed = index <= stepIndex;

                        return (
                          <div
                            key={step}
                            className="flex flex-1 items-center"
                          >
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${
                                completed
                                  ? "border-[#14B8A6] bg-[#14B8A6] text-white"
                                  : "border-slate-200 bg-white text-slate-300"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>

                            {index < STEPS.length - 1 && (
                              <div
                                className={`h-1 flex-1 ${
                                  index < stepIndex
                                    ? "bg-[#14B8A6]"
                                    : "bg-slate-200"
                                }`}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Mobile progress */}
                    <div className="space-y-3 sm:hidden">
                      {STEPS.map((step, index) => {
                        const Icon = getStepIcon(step);
                        const completed = index <= stepIndex;

                        return (
                          <div
                            key={step}
                            className="flex items-center gap-3"
                          >
                            <div
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                                completed
                                  ? "bg-[#14B8A6] text-white"
                                  : "bg-slate-100 text-slate-300"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>

                            <span
                              className={`text-xs font-bold uppercase tracking-wider ${
                                completed
                                  ? "text-[#0F4C81]"
                                  : "text-slate-400"
                              }`}
                            >
                              {statusLabel(step)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Cancelled message */}
                {cancelled && (
                  <div className="flex items-center gap-3 border-t border-red-100 bg-red-50 px-5 py-4 text-sm text-red-600">
                    <XCircle className="h-5 w-5" />
                    <span>
                      This order has been cancelled.
                    </span>
                  </div>
                )}

                {/* Items */}
                <div className="border-t border-slate-200">
                  <div className="px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Medicines ordered
                    </p>
                  </div>

                  <ul className="divide-y divide-slate-100">
                    {order.items.map((item) => (
                      <li
                        key={item.productId}
                        className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {item.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            SKU {item.sku} · {item.qty} ×{" "}
                            {formatINR(item.unitPrice)} / {item.unit}
                          </p>
                        </div>

                        <p className="text-sm font-bold text-[#0F4C81]">
                          {formatINR(item.lineTotal)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <footer className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs text-slate-500">
                      Subtotal · Excluding GST
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {formatINR(order.subtotal)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 transition hover:border-[#14B8A6] hover:text-[#0F4C81]"
                    >
                      View details
                    </button>

                    <button
                      type="button"
                      className="rounded-xl bg-[#0F4C81] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#14B8A6]"
                    >
                      Invoice
                    </button>
                  </div>
                </footer>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-[#0F4C81]">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-amber-50 text-amber-600 border-amber-200",
    confirmed: "bg-blue-50 text-blue-600 border-blue-200",
    processing: "bg-indigo-50 text-indigo-600 border-indigo-200",
    shipped: "bg-teal-50 text-teal-600 border-teal-200",
    delivered: "bg-emerald-50 text-emerald-600 border-emerald-200",
    cancelled: "bg-red-50 text-red-600 border-red-200",
  };

  return (
    <span
      className={`inline-flex w-fit rounded-lg border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${
        styles[status] || "bg-slate-50 text-slate-500"
      }`}
    >
      {statusLabel(status)}
    </span>
  );
}