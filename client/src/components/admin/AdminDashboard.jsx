
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  Users,
  FileText,
  Plus,
  Save,
  ArrowUpRight,
  Search,
  ChevronDown,
  Loader2,
  ShieldCheck,
  LogOut,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

/* ---------- Demo Data ---------- */

const SAMPLE_ORDERS = [
  {
    id: "ORD-20260923-001",
    customer: "Apollo Pharmacy",
    email: "procurement@apollo.example",
    total: 4850,
    quantity: 2000,
    terms: "Net 30",
    status: "processing",
    date: "23 Sep 2026",
  },
  {
    id: "ORD-20260918-002",
    customer: "CityCare Pharmacy",
    email: "orders@citycare.example",
    total: 3250,
    quantity: 75,
    terms: "Advance",
    status: "shipped",
    date: "18 Sep 2026",
  },
  {
    id: "ORD-20260910-003",
    customer: "MediPlus Clinic",
    email: "admin@mediplus.example",
    total: 2100,
    quantity: 2000,
    terms: "Bank Transfer",
    status: "delivered",
    date: "10 Sep 2026",
  },
];

const SAMPLE_PRODUCTS = [
  {
    id: "MED001",
    name: "Paracetamol 500mg",
    sku: "PCM-500",
    category: "Tablets & Capsules",
    price: 1,
    moq: 100,
    stock: 5000,
  },
  {
    id: "MED002",
    name: "Amoxicillin 500mg",
    sku: "AMX-500",
    category: "Antibiotics",
    price: 3.9,
    moq: 100,
    stock: 2500,
  },
  {
    id: "MED003",
    name: "Vitamin C Tablets",
    sku: "VTC-100",
    category: "Vitamins & Supplements",
    price: 3.8,
    moq: 50,
    stock: 1800,
  },
  {
    id: "MED004",
    name: "Cough Relief Syrup",
    sku: "CRS-100",
    category: "Syrups & Suspensions",
    price: 32,
    moq: 25,
    stock: 850,
  },
];

const SAMPLE_CUSTOMERS = [
  {
    id: "CUS001",
    company: "Apollo Pharmacy",
    name: "Rahul Sharma",
    email: "procurement@apollo.example",
    phone: "+91 98765 43210",
    role: "pharmacy",
    joined: "20 Sep 2026",
  },
  {
    id: "CUS002",
    company: "CityCare Pharmacy",
    name: "Priya Das",
    email: "orders@citycare.example",
    phone: "+91 98765 12345",
    role: "pharmacy",
    joined: "18 Sep 2026",
  },
  {
    id: "CUS003",
    company: "MediPlus Clinic",
    name: "Dr. Arjun Roy",
    email: "admin@mediplus.example",
    phone: "+91 98765 98765",
    role: "clinic",
    joined: "10 Sep 2026",
  },
];

const SAMPLE_QUOTES = [
  {
    id: "QUO001",
    name: "Rahul Sharma",
    company: "Apollo Pharmacy",
    email: "procurement@apollo.example",
    phone: "+91 98765 43210",
    productInterest: "Paracetamol 500mg",
    quantity: "5000 strips",
    message:
      "We need a bulk quotation for our monthly medicine procurement.",
    status: "new",
    date: "23 Sep 2026",
  },
  {
    id: "QUO002",
    name: "Priya Das",
    company: "CityCare Pharmacy",
    email: "orders@citycare.example",
    phone: "+91 98765 12345",
    productInterest: "Amoxicillin 500mg",
    quantity: "2000 strips",
    message:
      "Please provide bulk pricing and availability.",
    status: "reviewing",
    date: "21 Sep 2026",
  },
];

/* ---------- Helpers ---------- */

function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

const STATUS_STYLES = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  confirmed: "bg-blue-50 text-blue-700 ring-blue-200",
  processing: "bg-purple-50 text-purple-700 ring-purple-200",
  shipped: "bg-cyan-50 text-cyan-700 ring-cyan-200",
  delivered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  new: "bg-blue-50 text-blue-700 ring-blue-200",
  reviewing: "bg-amber-50 text-amber-700 ring-amber-200",
  contacted: "bg-purple-50 text-purple-700 ring-purple-200",
  closed: "bg-slate-100 text-slate-600 ring-slate-200",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ring-1 ring-inset ${
        STATUS_STYLES[status] ||
        "bg-slate-100 text-slate-600 ring-slate-200"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

/* =========================================================
   ADMIN DASHBOARD
========================================================= */

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("orders");
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const tabs = [
    {
      id: "orders",
      label: "Orders",
      icon: ShoppingCart,
      count: 24,
    },
    {
      id: "products",
      label: "Products",
      icon: Package,
      count: 4800,
    },
    {
      id: "customers",
      label: "Customers",
      icon: Users,
      count: 650,
    },
    {
      id: "quotes",
      label: "Quotes",
      icon: FileText,
      count: 18,
    },
  ];

  /* ---------- Verify Admin ---------- */

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login", { replace: true });
          return;
        }

        const response = await fetch(
          `${API_URL}/admin/dashboard`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Admin access denied"
          );
        }

        setAdmin(data.admin);
      } catch (error) {
        console.error(
          "Admin verification failed:",
          error.message
        );

        localStorage.removeItem("token");
        localStorage.removeItem("curamed_user");
        localStorage.removeItem("user");

        window.dispatchEvent(
          new Event("curamed:auth")
        );

        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, [navigate]);

  /* ---------- Logout ---------- */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("curamed_user");
    localStorage.removeItem("user");

    window.dispatchEvent(
      new Event("curamed:auth")
    );

    navigate("/login", { replace: true });
  };

  /* ---------- Loading ---------- */

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2 className="h-6 w-6 animate-spin" />

          <span className="text-sm font-semibold">
            Verifying admin access...
          </span>
        </div>
      </div>
    );
  }

  /* ---------- Dashboard ---------- */

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-14">

      {/* Header */}

      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#14B8A6]" />

            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#14B8A6]">
              CuraMed Staff
            </p>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">

            <h1 className="text-4xl font-black uppercase leading-none tracking-tight text-slate-900 sm:text-5xl">
              Admin Dashboard
            </h1>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-700 ring-1 ring-inset ring-emerald-200">
              <ShieldCheck className="h-3 w-3" />
              Admin
            </span>

          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Manage medicine products, customer accounts, orders and quotation
            requests from one place.
          </p>

          {admin && (
            <p className="mt-2 text-xs font-semibold text-slate-400">
              Logged in as{" "}
              <span className="text-slate-700">
                {admin.name}
              </span>{" "}
              · {admin.email}
            </p>
          )}
        </div>

        <div className="flex gap-2">

          <Link
            to="/"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-xs font-black uppercase tracking-wider text-slate-600 transition hover:border-[#0F4C81] hover:text-[#0F4C81]"
          >
            Back to website

            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-xs font-black uppercase tracking-wider text-red-600 transition hover:bg-red-50"
          >
            <LogOut className="h-3.5 w-3.5" />

            Logout
          </button>

        </div>
      </div>

      {/* Summary */}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <SummaryCard
          icon={ShoppingCart}
          label="Total Orders"
          value="24"
          trend="+12%"
          accent="blue"
        />

        <SummaryCard
          icon={Package}
          label="Medicines"
          value="4,800"
          trend="+128"
          accent="teal"
        />

        <SummaryCard
          icon={Users}
          label="Customers"
          value="650"
          trend="+24"
          accent="violet"
        />

        <SummaryCard
          icon={FileText}
          label="Quote Requests"
          value="18"
          trend="+5"
          accent="amber"
        />

      </div>

      {/* Tabs */}

      <div className="mt-8 flex items-center gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1 shadow-sm">

        {tabs.map((item) => {
          const Icon = item.icon;
          const isActive = tab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`group flex min-w-fit flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-xs font-black uppercase tracking-wider transition ${
                isActive
                  ? "bg-[#0F4C81] text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-[#0F4C81]"
              }`}
            >
              <Icon className="h-4 w-4" />

              <span>{item.label}</span>

              <span
                className={`hidden rounded-full px-2 py-0.5 text-[10px] font-black sm:inline-block ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500 group-hover:bg-white"
                }`}
              >
                {item.count > 999
                  ? `${(item.count / 1000).toFixed(1)}k`
                  : item.count}
              </span>
            </button>
          );
        })}

      </div>

      {/* Content */}

      <div className="mt-6">

        {tab === "orders" && <OrdersTab />}

        {tab === "products" && <ProductsTab />}

        {tab === "customers" && <CustomersTab />}

        {tab === "quotes" && <QuotesTab />}

      </div>
    </div>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

const ACCENT_MAP = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    ring: "ring-blue-100",
  },
  teal: {
    bg: "bg-teal-50",
    text: "text-teal-600",
    ring: "ring-teal-100",
  },
  violet: {
    bg: "bg-violet-50",
    text: "text-violet-600",
    ring: "ring-violet-100",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    ring: "ring-amber-100",
  },
};

function SummaryCard({
  icon: Icon,
  label,
  value,
  trend,
  accent = "blue",
}) {
  const styles =
    ACCENT_MAP[accent] || ACCENT_MAP.blue;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles.bg} ring-1 ring-inset ${styles.ring}`}
        >
          <Icon className={`h-5 w-5 ${styles.text}`} />
        </div>

        {trend && (
          <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-600 ring-1 ring-inset ring-emerald-100">
            <ArrowUpRight className="h-3 w-3" />
            {trend}
          </span>
        )}

      </div>

      <p className="mt-4 text-3xl font-black tracking-tight text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>

    </div>
  );
}

/* =========================================================
   TABLE SHELL
========================================================= */

function TableShell({
  title,
  description,
  action,
  children,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {(title || action) && (
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center">

          <div>
            {title && (
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-1 text-xs text-slate-500">
                {description}
              </p>
            )}
          </div>

          {action}

        </div>
      )}

      <div className="overflow-x-auto">
        {children}
      </div>

    </div>
  );
}

const TH =
  "px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.14em] text-slate-500";

/* =========================================================
   ORDERS
========================================================= */

function OrdersTab() {
  const [orders, setOrders] =
    useState(SAMPLE_ORDERS);

  const updateStatus = (id, status) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === id
          ? { ...order, status }
          : order
      )
    );
  };

  return (
    <TableShell
      title="Recent orders"
      description={`${orders.length} orders in this view`}
      action={
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="search"
            placeholder="Search orders..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/10 sm:w-64"
          />
        </div>
      }
    >
      <table className="w-full min-w-[900px] text-left text-sm">

        <thead className="border-b border-slate-200 bg-slate-50/70">
          <tr>
            <th className={TH}>Order</th>
            <th className={TH}>Customer</th>
            <th className={TH}>Quantity</th>
            <th className={TH}>Total</th>
            <th className={TH}>Terms</th>
            <th className={TH}>Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">

          {orders.map((order) => (
            <tr
              key={order.id}
              className="group transition hover:bg-slate-50/70"
            >

              <td className="px-5 py-4">
                <p className="font-mono text-xs font-bold text-slate-900">
                  {order.id}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {order.date}
                </p>
              </td>

              <td className="px-5 py-4">
                <p className="font-semibold text-slate-800">
                  {order.customer}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {order.email}
                </p>
              </td>

              <td className="px-5 py-4 font-semibold text-slate-700">
                {order.quantity.toLocaleString("en-IN")}
              </td>

              <td className="px-5 py-4 font-black text-slate-900">
                {formatINR(order.total)}
              </td>

              <td className="px-5 py-4">
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                  {order.terms}
                </span>
              </td>

              <td className="px-5 py-4">

                <div className="flex items-center gap-2">

                  <StatusBadge status={order.status} />

                  <div className="relative">

                    <select
                      value={order.status}
                      onChange={(event) =>
                        updateStatus(
                          order.id,
                          event.target.value
                        )
                      }
                      className="h-9 cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-xs font-bold outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/10"
                    >
                      <option value="pending">
                        Pending
                      </option>

                      <option value="confirmed">
                        Confirmed
                      </option>

                      <option value="processing">
                        Processing
                      </option>

                      <option value="shipped">
                        Shipped
                      </option>

                      <option value="delivered">
                        Delivered
                      </option>
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />

                  </div>
                </div>

              </td>

            </tr>
          ))}

        </tbody>
      </table>
    </TableShell>
  );
}

/* =========================================================
   PRODUCTS
========================================================= */

function ProductsTab() {
  const [products, setProducts] =
    useState(SAMPLE_PRODUCTS);

  const [editing, setEditing] =
    useState({});

  const updateField = (
    id,
    field,
    value
  ) => {
    setEditing((current) => ({
      ...current,
      [id]: {
        ...(current[id] || {}),
        [field]: value,
      },
    }));
  };

  const saveProduct = (product) => {
    const draft = editing[product.id];

    if (!draft) return;

    setProducts((current) =>
      current.map((item) =>
        item.id === product.id
          ? {
              ...item,
              price:
                draft.price !== undefined
                  ? Number(draft.price)
                  : item.price,
              moq:
                draft.moq !== undefined
                  ? Number(draft.moq)
                  : item.moq,
              stock:
                draft.stock !== undefined
                  ? Number(draft.stock)
                  : item.stock,
            }
          : item
      )
    );

    setEditing((current) => {
      const next = { ...current };

      delete next[product.id];

      return next;
    });
  };

  const isDirty = (product) =>
    Boolean(editing[product.id]);

  return (
    <TableShell
      title="Medicine catalogue"
      description={`${products.length} medicines · Update pricing, MOQ and stock`}
      action={
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#0F4C81] px-4 text-xs font-black uppercase tracking-wider text-white transition hover:bg-[#0b3c66]"
        >
          <Plus className="h-4 w-4" />
          Add medicine
        </button>
      }
    >

      <table className="w-full min-w-[900px] text-left text-sm">

        <thead className="border-b border-slate-200 bg-slate-50/70">
          <tr>
            <th className={TH}>Medicine</th>
            <th className={TH}>Category</th>
            <th className={TH}>Price (₹)</th>
            <th className={TH}>MOQ</th>
            <th className={TH}>Stock</th>
            <th className={TH}>Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">

          {products.map((product) => {

            const draft =
              editing[product.id] || {};

            const dirty =
              isDirty(product);

            const stockLow =
              (draft.stock ??
                product.stock) < 500;

            return (
              <tr
                key={product.id}
                className={`transition hover:bg-slate-50/70 ${
                  dirty
                    ? "bg-[#0F4C81]/[0.03]"
                    : ""
                }`}
              >

                <td className="px-5 py-4">
                  <p className="font-bold text-slate-900">
                    {product.name}
                  </p>

                  <p className="mt-1 font-mono text-xs text-slate-400">
                    SKU: {product.sku}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                    {product.category}
                  </span>
                </td>

                <td className="px-5 py-4">

                  <div className="relative">

                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      ₹
                    </span>

                    <input
                      type="number"
                      value={
                        draft.price !== undefined
                          ? draft.price
                          : product.price
                      }
                      onChange={(event) =>
                        updateField(
                          product.id,
                          "price",
                          event.target.value
                        )
                      }
                      className="h-9 w-24 rounded-lg border border-slate-200 pl-6 pr-2 text-sm font-semibold outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/10"
                    />

                  </div>

                </td>

                <td className="px-5 py-4">

                  <input
                    type="number"
                    value={
                      draft.moq !== undefined
                        ? draft.moq
                        : product.moq
                    }
                    onChange={(event) =>
                      updateField(
                        product.id,
                        "moq",
                        event.target.value
                      )
                    }
                    className="h-9 w-20 rounded-lg border border-slate-200 px-2 text-sm font-semibold outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/10"
                  />

                </td>

                <td className="px-5 py-4">

                  <div className="flex items-center gap-2">

                    <input
                      type="number"
                      value={
                        draft.stock !== undefined
                          ? draft.stock
                          : product.stock
                      }
                      onChange={(event) =>
                        updateField(
                          product.id,
                          "stock",
                          event.target.value
                        )
                      }
                      className="h-9 w-24 rounded-lg border border-slate-200 px-2 text-sm font-semibold outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/10"
                    />

                    {stockLow && (
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-700 ring-1 ring-inset ring-amber-200">
                        Low
                      </span>
                    )}

                  </div>

                </td>

                <td className="px-5 py-4">

                  <button
                    type="button"
                    onClick={() =>
                      saveProduct(product)
                    }
                    disabled={!dirty}
                    className={`inline-flex h-9 items-center gap-2 rounded-lg px-4 text-xs font-black uppercase tracking-wider transition ${
                      dirty
                        ? "border border-[#0F4C81] text-[#0F4C81] hover:bg-[#0F4C81] hover:text-white"
                        : "cursor-not-allowed border border-slate-200 text-slate-400"
                    }`}
                  >
                    <Save className="h-3.5 w-3.5" />

                    {dirty
                      ? "Save"
                      : "Saved"}
                  </button>

                </td>

              </tr>
            );
          })}

        </tbody>
      </table>
    </TableShell>
  );
}

/* =========================================================
   CUSTOMERS
========================================================= */

function CustomersTab() {
  return (
    <TableShell
      title="Business customers"
      description={`${SAMPLE_CUSTOMERS.length} registered accounts`}
    >

      <table className="w-full min-w-[850px] text-left text-sm">

        <thead className="border-b border-slate-200 bg-slate-50/70">
          <tr>
            <th className={TH}>Company</th>
            <th className={TH}>Contact</th>
            <th className={TH}>Type</th>
            <th className={TH}>Joined</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">

          {SAMPLE_CUSTOMERS.map(
            (customer) => {

              const initials =
                customer.company
                  .split(" ")
                  .map((word) => word[0])
                  .slice(0, 2)
                  .join("");

              return (
                <tr
                  key={customer.id}
                  className="transition hover:bg-slate-50/70"
                >

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0F4C81]/10 text-xs font-black text-[#0F4C81]">
                        {initials}
                      </div>

                      <p className="font-bold text-slate-900">
                        {customer.company}
                      </p>

                    </div>

                  </td>

                  <td className="px-5 py-4">

                    <p className="font-semibold text-slate-800">
                      {customer.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {customer.email}
                    </p>

                    <p className="text-xs text-slate-400">
                      {customer.phone}
                    </p>

                  </td>

                  <td className="px-5 py-4">

                    <span className="inline-flex rounded-full bg-[#0F4C81]/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#0F4C81]">
                      {customer.role}
                    </span>

                  </td>

                  <td className="px-5 py-4 text-xs text-slate-500">
                    {customer.joined}
                  </td>

                </tr>
              );
            }
          )}

        </tbody>

      </table>

    </TableShell>
  );
}

/* =========================================================
   QUOTES
========================================================= */

function QuotesTab() {

  const [quotes, setQuotes] =
    useState(SAMPLE_QUOTES);

  const updateStatus = (
    id,
    status
  ) => {
    setQuotes((current) =>
      current.map((quote) =>
        quote.id === id
          ? {
              ...quote,
              status,
            }
          : quote
      )
    );
  };

  if (quotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-20 text-center">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <FileText className="h-6 w-6 text-slate-400" />
        </div>

        <p className="mt-4 text-sm font-bold text-slate-900">
          No quote requests
        </p>

        <p className="mt-1 max-w-sm text-xs text-slate-500">
          New quote and contact requests from customers will appear here.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between">

        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
          {quotes.length} active request
          {quotes.length !== 1
            ? "s"
            : ""}
        </p>

      </div>

      {quotes.map((quote) => (

        <article
          key={quote.id}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md"
        >

          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 bg-slate-50/50 p-5 sm:flex-row sm:items-start">

            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-2">

                <p className="font-bold text-slate-900">
                  {quote.name}
                </p>

                <span className="text-slate-300">
                  ·
                </span>

                <p className="text-sm text-slate-500">
                  {quote.company}
                </p>

                <span className="font-mono text-[10px] font-bold text-slate-400">
                  #{quote.id}
                </span>

              </div>

              <p className="mt-1.5 text-xs text-slate-400">
                {quote.email} ·{" "}
                {quote.phone} ·{" "}
                {quote.date}
              </p>

            </div>

            <div className="flex items-center gap-2">

              <StatusBadge
                status={quote.status}
              />

              <div className="relative">

                <select
                  value={quote.status}
                  onChange={(event) =>
                    updateStatus(
                      quote.id,
                      event.target.value
                    )
                  }
                  className="h-9 cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-xs font-bold outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/10"
                >

                  <option value="new">
                    New
                  </option>

                  <option value="reviewing">
                    Reviewing
                  </option>

                  <option value="contacted">
                    Contacted
                  </option>

                  <option value="closed">
                    Closed
                  </option>

                </select>

                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />

              </div>

            </div>

          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-[1fr_2fr]">

            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#0F4C81]">
                Product interest
              </p>

              <p className="mt-1.5 text-sm font-bold text-slate-800">
                {quote.productInterest}
              </p>

              {quote.quantity && (
                <p className="mt-0.5 text-xs text-slate-500">
                  {quote.quantity}
                </p>
              )}

            </div>

            <div>

              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                Message
              </p>

              <p className="mt-1.5 text-sm leading-6 text-slate-600">
                {quote.message}
              </p>

            </div>

          </div>

        </article>

      ))}

    </div>
  );
}

