
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";

const SAMPLE_CART = [
  {
    id: "cart-1",
    productId: "MED001",
    slug: "paracetamol-500mg",
    name: "Paracetamol 500mg",
    sku: "PCM-500",
    moq: 100,
    qty: 1000,
    unit: "strips",
    unitPrice: 1,
    image: "",
  },
  {
    id: "cart-2",
    productId: "MED002",
    slug: "amoxicillin-500mg",
    name: "Amoxicillin 500mg",
    sku: "AMX-500",
    moq: 100,
    qty: 500,
    unit: "strips",
    unitPrice: 3.9,
    image: "",
  },
  {
    id: "cart-3",
    productId: "MED003",
    slug: "vitamin-c-tablets",
    name: "Vitamin C Tablets",
    sku: "VTC-100",
    moq: 50,
    qty: 500,
    unit: "boxes",
    unitPrice: 3.8,
    image: "",
  },
];

function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function getUnitPrice(product, quantity) {
  // Temporary bulk pricing.
  // Replace this with your backend pricing logic later.
  if (quantity >= 1000) {
    return Number((product.unitPrice * 0.95).toFixed(2));
  }

  if (quantity >= 500) {
    return Number((product.unitPrice * 0.98).toFixed(2));
  }

  return product.unitPrice;
}

export default function CartView() {
  const [items, setItems] = useState([]);
  const [state, setState] = useState("loading");

  const load = useCallback(async () => {
    try {
      // Temporary local cart.
      // Replace this later with CartContext/API.
      await new Promise((resolve) => setTimeout(resolve, 400));

      setItems(SAMPLE_CART);
      setState("ready");
    } catch (error) {
      console.error(error);
      setState("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const refresh = () => {
    window.dispatchEvent(new Event("curamed:cart"));
    load();
  };

  const setQty = async (line, quantity) => {
    const min = line.moq || 1;

    const newQty = Math.max(min, Number(quantity) || min);

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === line.id
          ? {
              ...item,
              qty: newQty,
            }
          : item
      )
    );

    refresh();
  };

  const increaseQty = (line) => {
    setQty(line, line.qty + line.moq);
  };

  const decreaseQty = (line) => {
    setQty(line, Math.max(line.moq, line.qty - line.moq));
  };

  const remove = async (line) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== line.id)
    );

    window.dispatchEvent(new Event("curamed:cart"));
  };

  const subtotal = items.reduce((sum, item) => {
    const unitPrice = getUnitPrice(item, item.qty);

    return sum + unitPrice * item.qty;
  }, 0);

  if (state === "loading") {
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

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#14B8A6]">
          Your procurement
        </p>

        <h1 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight text-slate-900 sm:text-5xl">
          Cart
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Review your selected medicines before proceeding to checkout.
        </p>
      </div>

      {/* Error */}
      {state === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Your cart could not be loaded. Please refresh the page.
        </div>
      )}

      {/* Empty Cart */}
      {state === "ready" && items.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <ShoppingCart className="h-7 w-7 text-slate-500" />
          </div>

          <h2 className="mt-6 text-2xl font-black uppercase tracking-tight text-slate-900">
            Your cart is empty
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
            Add medicines from the catalogue to start your B2B procurement
            order.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-[#0F4C81] px-6 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#0b3c66]"
          >
            Browse medicines
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {/* Cart */}
      {state === "ready" && items.length > 0 && (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Products */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">
                  Selected medicines
                </h2>

                <span className="rounded-full bg-[#0F4C81]/10 px-3 py-1 text-xs font-bold text-[#0F4C81]">
                  {items.length} items
                </span>
              </div>
            </div>

            <div>
              {items.map((line) => {
                const unitPrice = getUnitPrice(line, line.qty);
                const lineTotal = unitPrice * line.qty;

                return (
                  <div
                    key={line.id}
                    className="flex gap-4 border-b border-slate-100 p-5 last:border-b-0 sm:p-6"
                  >
                    {/* Image */}
                    <Link
                      to={`/products/${line.slug}`}
                      className="shrink-0"
                    >
                      {line.image ? (
                        <img
                          src={line.image}
                          alt={line.name}
                          className="h-20 w-20 rounded-xl border border-slate-200 object-cover sm:h-24 sm:w-24"
                        />
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 sm:h-24 sm:w-24">
                          <ShoppingCart className="h-6 w-6 text-slate-300" />
                        </div>
                      )}
                    </Link>

                    {/* Details */}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <Link
                        to={`/products/${line.slug}`}
                        className="text-base font-black uppercase leading-tight text-slate-900 transition hover:text-[#0F4C81]"
                      >
                        {line.name}
                      </Link>

                      <p className="mt-1 text-xs text-slate-500">
                        SKU: {line.sku}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        MOQ: {line.moq.toLocaleString("en-IN")} {line.unit}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        {/* Quantity */}
                        <div className="flex h-9 items-center overflow-hidden rounded-lg border border-slate-200">
                          <button
                            type="button"
                            onClick={() => decreaseQty(line)}
                            className="flex h-full w-9 items-center justify-center text-slate-500 transition hover:bg-slate-50 hover:text-[#0F4C81]"
                            aria-label={`Decrease ${line.name} quantity`}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>

                          <input
                            type="number"
                            min={line.moq || 1}
                            value={line.qty}
                            onChange={(e) =>
                              setQty(line, Number(e.target.value))
                            }
                            className="h-full w-20 border-x border-slate-200 text-center text-sm font-bold text-slate-800 outline-none"
                            aria-label={`${line.name} quantity`}
                          />

                          <button
                            type="button"
                            onClick={() => increaseQty(line)}
                            className="flex h-full w-9 items-center justify-center text-slate-500 transition hover:bg-slate-50 hover:text-[#0F4C81]"
                            aria-label={`Increase ${line.name} quantity`}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => remove(line)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          aria-label={`Remove ${line.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>

                        {/* Price */}
                        <div className="ml-auto text-right">
                          <p className="text-sm font-black text-slate-900">
                            {formatINR(lineTotal)}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            {formatINR(unitPrice)} / {line.unit}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <aside className="h-fit overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-24">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">
                Order summary
              </h2>
            </div>

            <div className="space-y-3 px-5 py-5">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Items</span>

                <span className="font-semibold text-slate-800">
                  {items.length}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>

                <span className="font-bold text-slate-900">
                  {formatINR(subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-xs text-slate-400">
                <span>GST</span>
                <span>Tax invoice</span>
              </div>

              <div className="flex justify-between text-xs text-slate-400">
                <span>Shipping</span>
                <span>Confirmed with order</span>
              </div>
            </div>

            <div className="border-t border-slate-200 px-5 py-5">
              <div className="flex items-end justify-between">
                <span className="text-sm font-semibold text-slate-500">
                  Subtotal
                </span>

                <span className="text-xl font-black text-slate-900">
                  {formatINR(subtotal)}
                </span>
              </div>

              <Link
                to="/checkout"
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0F4C81] text-sm font-black uppercase tracking-wider text-white transition hover:bg-[#0b3c66] active:scale-[0.98]"
              >
                Proceed to checkout
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/products"
                className="mt-4 block text-center text-xs font-bold uppercase tracking-wider text-[#0F4C81] hover:underline"
              >
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}


