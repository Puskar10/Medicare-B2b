import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Minus,
  Plus,
  ShoppingCart,
  ShieldCheck,
  Truck,
} from "lucide-react";

const SAMPLE_PRODUCTS = {
  "paracetamol-500mg": {
    id: "MED001",
    slug: "paracetamol-500mg",
    name: "Paracetamol 500mg",
    category: "Tablets & Capsules",
    sku: "PCM-500",
    description:
      "Paracetamol 500mg tablets for common healthcare and pharmacy requirements. Suitable for bulk procurement by authorized healthcare businesses.",
    price: 1.2,
    moq: 100,
    unit: "strips",
    stock: 2500,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80",
    manufacturer: "CuraMed Partner Pharma",
    composition: "Paracetamol IP 500mg",
    dosageForm: "Tablet",
    packSize: "10 tablets per strip",
    storage: "Store in a cool, dry place",
    prescription: "As applicable",
    batch: "CM-P500-26",
    expiry: "2028",
    tiers: [
      { qty: 100, price: 1.2 },
      { qty: 500, price: 1.1 },
      { qty: 1000, price: 1.0 },
      { qty: 5000, price: 0.9 },
    ],
  },

  "amoxicillin-500mg": {
    id: "MED002",
    slug: "amoxicillin-500mg",
    name: "Amoxicillin 500mg",
    category: "Antibiotics",
    sku: "AMX-500",
    description:
      "Amoxicillin 500mg capsules for authorized healthcare procurement and pharmacy supply.",
    price: 4.5,
    moq: 100,
    unit: "strips",
    stock: 1200,
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1000&q=80",
    manufacturer: "CuraMed Partner Pharma",
    composition: "Amoxicillin 500mg",
    dosageForm: "Capsule",
    packSize: "10 capsules per strip",
    storage: "Store below recommended temperature",
    prescription: "Prescription medicine",
    batch: "CM-AMX-26",
    expiry: "2028",
    tiers: [
      { qty: 100, price: 4.5 },
      { qty: 500, price: 4.2 },
      { qty: 1000, price: 3.9 },
      { qty: 5000, price: 3.6 },
    ],
  },

  "vitamin-c-tablets": {
    id: "MED003",
    slug: "vitamin-c-tablets",
    name: "Vitamin C Tablets",
    category: "Vitamins",
    sku: "VTC-100",
    description:
      "Vitamin C tablets for pharmacy, wellness and healthcare procurement requirements.",
    price: 2.8,
    moq: 100,
    unit: "boxes",
    stock: 1800,
    image:
      "https://images.unsplash.com/photo-1550572017-edd951aa8ca5?auto=format&fit=crop&w=1000&q=80",
    manufacturer: "CuraMed Partner Pharma",
    composition: "Vitamin C",
    dosageForm: "Tablet",
    packSize: "30 tablets per box",
    storage: "Store in a cool, dry place",
    prescription: "Non-prescription",
    batch: "CM-VTC-26",
    expiry: "2028",
    tiers: [
      { qty: 100, price: 2.8 },
      { qty: 500, price: 2.5 },
      { qty: 1000, price: 2.3 },
      { qty: 5000, price: 2.1 },
    ],
  },
};

function formatINR(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function ProductDetail({ slug }) {
  const product = SAMPLE_PRODUCTS[slug];

  const [qty, setQty] = useState(product?.moq || 1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <section className="min-h-[70vh] bg-white">
        <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <ShoppingCart className="h-7 w-7 text-slate-400" />
          </div>

          <h1 className="mt-6 text-3xl font-bold uppercase tracking-tight text-slate-900">
            Medicine not found
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            This medicine may have been removed from the catalogue.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-[#0F4C81] px-6 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#14B8A6]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to catalogue
          </Link>
        </div>
      </section>
    );
  }

  const outOfStock = product.stock <= 0;

  const getUnitPrice = () => {
    let price = product.price;

    product.tiers.forEach((tier) => {
      if (qty >= tier.qty) {
        price = tier.price;
      }
    });

    return price;
  };

  const unitPrice = getUnitPrice();
  const totalPrice = unitPrice * qty;

  const increaseQty = () => {
    setQty((value) => value + 1);
    setAdded(false);
  };

  const decreaseQty = () => {
    setQty((value) => Math.max(product.moq, value - 1));
    setAdded(false);
  };

  const handleQtyChange = (event) => {
    const value = Number(event.target.value);

    setQty(Math.max(product.moq, value || product.moq));
    setAdded(false);
  };

  const addToCart = () => {
    if (outOfStock) return;

    setAdded(true);

    // Connect your CartContext/API here later.
    console.log("Added to cart:", {
      productId: product.id,
      quantity: qty,
      total: totalPrice,
    });
  };

  return (
    <section className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
          <Link
            to="/products"
            className="transition hover:text-[#0F4C81]"
          >
            Products
          </Link>

          <span>/</span>

          <Link
            to={`/products?category=${product.category
              .toLowerCase()
              .replaceAll(" ", "-")}`}
            className="transition hover:text-[#0F4C81]"
          >
            {product.category}
          </Link>

          <span>/</span>

          <span className="text-slate-600">{product.name}</span>
        </nav>

        {/* Main product section */}
        <div className="mt-7 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Product image */}
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <span className="absolute left-0 top-0 z-10 h-6 w-6 border-l-2 border-t-2 border-[#14B8A6]" />
              <span className="absolute right-0 top-0 z-10 h-6 w-6 border-r-2 border-t-2 border-[#14B8A6]" />
              <span className="absolute bottom-0 left-0 z-10 h-6 w-6 border-b-2 border-l-2 border-[#14B8A6]" />
              <span className="absolute bottom-0 right-0 z-10 h-6 w-6 border-b-2 border-r-2 border-[#14B8A6]" />

              <img
                src={product.image}
                alt={product.name}
                className="aspect-square w-full object-cover"
              />

              {outOfStock && (
                <span className="absolute left-5 top-5 rounded-lg bg-red-600 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white">
                  Out of stock
                </span>
              )}
            </div>

            {/* Product info badges */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                <ShieldCheck className="mx-auto h-5 w-5 text-[#14B8A6]" />
                <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Quality
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                <Truck className="mx-auto h-5 w-5 text-[#14B8A6]" />
                <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Delivery
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                <FileText className="mx-auto h-5 w-5 text-[#14B8A6]" />
                <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  GST Invoice
                </p>
              </div>
            </div>
          </div>

          {/* Product details */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#14B8A6]">
              {product.category}
            </p>

            <h1 className="mt-3 text-4xl font-bold uppercase leading-[0.95] tracking-tight text-slate-900 sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-3 text-xs font-medium uppercase tracking-wider text-slate-400">
              SKU: {product.sku} · Sold per {product.unit}
            </p>

            {/* Stock status */}
            <div className="mt-5">
              {outOfStock ? (
                <span className="inline-flex rounded-lg bg-red-50 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-red-600">
                  Out of stock
                </span>
              ) : product.stock < product.moq * 4 ? (
                <span className="inline-flex rounded-lg bg-amber-50 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-amber-600">
                  Low stock · {product.stock} {product.unit} available
                </span>
              ) : (
                <span className="inline-flex rounded-lg bg-emerald-50 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                  In stock · Ready for procurement
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-sm leading-7 text-slate-600">
              {product.description}
            </p>

            {/* Pricing */}
            <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200">
              <div className="flex flex-col gap-2 bg-slate-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Your unit price
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Based on quantity selected
                  </p>
                </div>

                <p className="text-3xl font-bold text-[#0F4C81]">
                  {formatINR(unitPrice)}
                  <span className="ml-1 text-sm font-medium text-slate-400">
                    / {product.unit}
                  </span>
                </p>
              </div>

              {/* Price tiers */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-t border-slate-200 bg-white text-left">
                      <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Quantity
                      </th>

                      <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Unit Price
                      </th>

                      <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Saving
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {product.tiers.map((tier) => {
                      const active = qty >= tier.qty;

                      const saving =
                        tier.price < product.price
                          ? Math.round(
                              (1 - tier.price / product.price) * 100
                            )
                          : 0;

                      return (
                        <tr
                          key={tier.qty}
                          className={`border-t border-slate-100 transition ${
                            active ? "bg-teal-50/60" : ""
                          }`}
                        >
                          <td className="px-5 py-3 font-medium text-slate-700">
                            {tier.qty}+ {product.unit}
                          </td>

                          <td className="px-5 py-3 font-semibold text-[#0F4C81]">
                            {formatINR(tier.price)}
                          </td>

                          <td className="px-5 py-3 text-right font-semibold text-[#14B8A6]">
                            {saving > 0 ? `${saving}%` : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quantity + cart */}
            <div className="mt-6">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Quantity · Minimum {product.moq} {product.unit}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex h-12 w-full rounded-xl border border-slate-200 sm:w-auto">
                  <button
                    type="button"
                    onClick={decreaseQty}
                    className="flex w-12 items-center justify-center text-slate-600 transition hover:bg-slate-50"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <input
                    type="number"
                    min={product.moq}
                    value={qty}
                    onChange={handleQtyChange}
                    className="w-20 border-x border-slate-200 text-center text-sm font-bold text-slate-900 outline-none"
                  />

                  <button
                    type="button"
                    onClick={increaseQty}
                    className="flex w-12 items-center justify-center text-slate-600 transition hover:bg-slate-50"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={addToCart}
                  disabled={outOfStock}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#0F4C81] px-6 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#14B8A6] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ShoppingCart className="h-4 w-4" />

                  {added
                    ? "Added to cart ✓"
                    : outOfStock
                      ? "Out of stock"
                      : `Add to cart · ${formatINR(totalPrice)}`}
                </button>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-slate-400">
                Minimum order quantity: {product.moq} {product.unit}. Final
                taxes and applicable charges are calculated during checkout.
              </p>
            </div>

            {/* Request quote */}
            <div className="mt-6 rounded-2xl border border-[#14B8A6]/20 bg-teal-50/50 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Need a larger quantity?
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Request a custom quotation for institutional orders.
                  </p>
                </div>

                <Link
                  to="/quote"
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-white px-5 text-xs font-bold uppercase tracking-wider text-[#0F4C81] shadow-sm ring-1 ring-slate-200 transition hover:bg-[#0F4C81] hover:text-white"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16 border-t border-slate-200 pt-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#14B8A6]">
            Product information
          </p>

          <h2 className="mt-2 text-3xl font-bold uppercase tracking-tight text-slate-900">
            Medicine specifications
          </h2>

          <div className="mt-6 grid overflow-hidden rounded-2xl border border-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            <Spec label="Composition" value={product.composition} />
            <Spec label="Dosage form" value={product.dosageForm} />
            <Spec label="Pack size" value={product.packSize} />
            <Spec label="Manufacturer" value={product.manufacturer} />
            <Spec label="Storage" value={product.storage} />
            <Spec label="Prescription" value={product.prescription} />
            <Spec label="Batch" value={product.batch} />
            <Spec label="Expiry" value={product.expiry} />
            <Spec label="SKU" value={product.sku} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Spec({ label, value }) {
  return (
    <div className="border-b border-r border-slate-200 bg-white px-5 py-5 last:border-b-0">
      <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </dt>

      <dd className="mt-2 text-sm font-semibold text-slate-800">
        {value}
      </dd>
    </div>
  );
}