import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";

import { useCart } from "../../context/CartContext";

function formatINR(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function CartView() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
  } = useCart();

  if (cart.length === 0) {
    return (
      <section className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-4 py-16">
          <div className="text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
              <ShoppingCart className="h-9 w-9 text-slate-300" />
            </div>

            <h1 className="mt-6 text-2xl font-bold uppercase tracking-tight text-slate-900">
              Your cart is empty
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
              Add medicines from our catalogue to start your B2B order.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0F4C81] px-6 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#14B8A6]"
            >
              Browse Medicines
              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#14B8A6]">
              B2B Procurement
            </p>

            <h1 className="mt-2 text-4xl font-bold uppercase tracking-tight text-slate-900">
              Shopping Cart
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {cart.length}{" "}
              {cart.length === 1 ? "product" : "products"} in your cart
            </p>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="text-xs font-bold uppercase tracking-wider text-red-500 transition hover:text-red-700"
          >
            Clear Cart
          </button>

        </div>

        {/* Cart */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* Products */}
          <div className="space-y-4">

            {cart.map((item) => {
              const itemTotal = item.price * item.quantity;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                >
                  <div className="flex flex-col gap-5 sm:flex-row">

                    {/* Image */}
                    <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-slate-100" />
                      )}
                    </div>

                    {/* Details */}
                    <div className="min-w-0 flex-1">

                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#14B8A6]">
                        Medicine
                      </p>

                      <h2 className="mt-1 text-lg font-bold text-slate-900">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        SKU: {item.sku}
                      </p>

                      <p className="mt-2 text-sm font-semibold text-[#0F4C81]">
                        {formatINR(item.price)} / {item.unit}
                      </p>

                      {/* Controls */}
                      <div className="mt-4 flex flex-wrap items-center gap-4">

                        <div className="flex items-center rounded-xl border border-slate-200">

                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            className="flex h-9 w-9 items-center justify-center text-slate-600 transition hover:bg-slate-50"
                          >
                            <Minus className="h-4 w-4" />
                          </button>

                          <div className="flex h-9 min-w-16 items-center justify-center border-x border-slate-200 px-3">
                            <span className="text-sm font-bold text-slate-900">
                              {item.quantity}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            disabled={
                              item.quantity + item.moq >
                              item.stock
                            }
                            className="flex h-9 w-9 items-center justify-center text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
                          >
                            <Plus className="h-4 w-4" />
                          </button>

                        </div>

                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          MOQ: {item.moq} {item.unit}
                        </span>

                      </div>

                    </div>

                    {/* Price */}
                    <div className="flex flex-row items-center justify-between gap-4 sm:flex-col sm:items-end">

                      <p className="text-lg font-bold text-[#0F4C81]">
                        {formatINR(itemTotal)}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-red-500 transition hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>

                    </div>

                  </div>
                </div>
              );
            })}

          </div>

          {/* Summary */}
          <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#14B8A6]">
              Order Summary
            </p>

            <h2 className="mt-2 text-xl font-bold uppercase text-slate-900">
              Cart Total
            </h2>

            <div className="mt-6 space-y-4 border-b border-slate-100 pb-5">

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Products
                </span>

                <span className="font-semibold text-slate-900">
                  {cart.length}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Total quantity
                </span>

                <span className="font-semibold text-slate-900">
                  {cart.reduce(
                    (total, item) =>
                      total + item.quantity,
                    0
                  )}
                </span>
              </div>

            </div>

            <div className="mt-5 flex items-center justify-between">

              <span className="text-sm font-semibold text-slate-600">
                Estimated Total
              </span>

              <span className="text-2xl font-bold text-[#0F4C81]">
                {formatINR(cartTotal)}
              </span>

            </div>

            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              Final pricing, availability and delivery charges may be
              confirmed during checkout.
            </p>

            <Link
              to="/checkout"
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0F4C81] text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#14B8A6]"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/products"
              className="mt-3 flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 text-xs font-bold uppercase tracking-wider text-[#0F4C81] transition hover:border-[#14B8A6]"
            >
              Continue Shopping
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}