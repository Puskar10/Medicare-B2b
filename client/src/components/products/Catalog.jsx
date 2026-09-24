import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Check,
  ArrowUpRight,
} from "lucide-react";

import { useCart } from "../../context/CartContext";

import {
  CATEGORIES,
  PRODUCTS,
  getCategoryName,
} from "../../data/products";

import LoginRequiredModal from "../auth/LoginRequiredModal";

function formatINR(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { addToCart, isInCart, getCartItem } = useCart();

  const [message, setMessage] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const category = searchParams.get("category") || "all";
  const q = searchParams.get("q") || "";

  /*
   * Filter products
   */
  const filtered = useMemo(() => {
    const search = q.trim().toLowerCase();

    return PRODUCTS.filter((product) => {
      const matchesCategory =
        category === "all" ||
        product.category === category;

      const matchesSearch =
        search === "" ||
        `${product.name} ${product.sku} ${product.description}`
          .toLowerCase()
          .includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [category, q]);

  /*
   * Search
   */
  const handleSearch = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const searchValue =
      formData.get("q")?.trim() || "";

    const params = {};

    if (category !== "all") {
      params.category = category;
    }

    if (searchValue) {
      params.q = searchValue;
    }

    setSearchParams(params);
  };

  /*
   * Add product to cart
   */
  const handleAddToCart = (product) => {
    // Check if user is logged in
    const token = localStorage.getItem("token");

    if (!token) {
      setShowLoginModal(true);
      return;
    }

    // User is logged in, add product normally
    const result = addToCart(product);

    setMessage(result.message);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  return (
    <section className="min-h-screen bg-white">

      {/* Login Required Modal */}
      <LoginRequiredModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      {/* Success message */}
      {message && (
        <div className="fixed right-5 top-5 z-50 flex max-w-sm items-center gap-3 rounded-xl bg-[#0F4C81] px-5 py-4 text-sm font-semibold text-white shadow-xl">
          <Check className="h-5 w-5 shrink-0 text-[#14B8A6]" />
          <span>{message}</span>
        </div>
      )}

      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl">

          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#14B8A6]">
            Wholesale Medicine Catalogue
          </p>

          <h1 className="mt-3 text-4xl font-bold uppercase leading-[0.95] tracking-tight text-slate-900 sm:text-6xl">
            Medicines in bulk
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Browse medicines available for B2B procurement.
            Find products by category, search by medicine name
            or SKU, and view minimum order quantities and
            wholesale pricing.
          </p>

        </div>

        {/* Filters */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-4">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Categories */}
            <div className="flex flex-wrap gap-2">

              {CATEGORIES.map((item) => {

                const active =
                  category === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {

                      const params = {};

                      if (item.id !== "all") {
                        params.category = item.id;
                      }

                      if (q) {
                        params.q = q;
                      }

                      setSearchParams(params);
                    }}
                    className={`rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                      active
                        ? "bg-[#0F4C81] text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-[#14B8A6] hover:text-[#0F4C81]"
                    }`}
                  >
                    {item.name}
                  </button>
                );

              })}

            </div>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="flex w-full max-w-md items-center gap-2"
            >

              <div className="relative flex-1">

                <Search
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="search"
                  name="q"
                  defaultValue={q}
                  placeholder="Search medicine or SKU..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10"
                />

              </div>

              <button
                type="submit"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0F4C81] text-white transition hover:bg-[#14B8A6]"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>

            </form>

          </div>
        </div>

        {/* Results */}
        <div className="mt-8 flex flex-col justify-between gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">

          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1
              ? "medicine"
              : "medicines"}
          </p>

          {q && (
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0F4C81]">
              Search: "{q}"
            </p>
          )}

        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-16 text-center">

            <Search className="mx-auto h-8 w-8 text-slate-300" />

            <h2 className="mt-4 text-lg font-bold uppercase text-slate-900">
              No medicines found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try another medicine name, SKU or category.
            </p>

            <button
              type="button"
              onClick={() => setSearchParams({})}
              className="mt-5 rounded-xl bg-[#0F4C81] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#14B8A6]"
            >
              Clear filters
            </button>

          </div>
        )}

        {/* Product Grid */}
        {filtered.length > 0 && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filtered.map((product) => {

              const inCart =
                isInCart(product.id);

              const cartItem =
                getCartItem(product.id);

              const isOutOfStock =
                product.stock <= 0;

              const remainingStock =
                product.stock -
                (cartItem?.quantity || 0);

              const cannotAddMore =
                remainingStock < product.moq;

              return (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* Image */}
                  <div className="relative overflow-hidden bg-slate-100">

                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="aspect-square w-full bg-slate-100" />
                    )}

                    {/* Stock */}
                    {isOutOfStock ? (
                      <span className="absolute left-3 top-3 rounded-lg bg-red-600 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        Out of stock
                      </span>
                    ) : (
                      <span className="absolute left-3 top-3 rounded-lg bg-white/90 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 shadow-sm backdrop-blur">
                        In stock
                      </span>
                    )}

                  </div>

                  {/* Content */}
                  <div className="p-5">

                    {/* Category */}
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#14B8A6]">
                      {getCategoryName(
                        product.category
                      )}
                    </p>

                    {/* Product Name */}
                    <h2 className="mt-2 text-lg font-bold leading-tight text-slate-900">
                      {product.name}
                    </h2>

                    {/* SKU */}
                    <p className="mt-2 text-xs text-slate-500">
                      SKU: {product.sku}
                    </p>

                    {/* Price + MOQ */}
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          Starting from
                        </p>

                        <p className="mt-1 text-lg font-bold text-[#0F4C81]">
                          {formatINR(
                            product.price
                          )}
                        </p>
                      </div>

                      <div className="text-right">

                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          MOQ
                        </p>

                        <p className="mt-1 text-xs font-bold text-slate-700">
                          {product.moq}{" "}
                          {product.unit}
                        </p>

                      </div>

                    </div>

                    {/* Cart Status */}
                    {inCart && (
                      <div className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-center text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        {cartItem.quantity}{" "}
                        {product.unit} in cart
                      </div>
                    )}

                    {/* Add To Cart */}
                    <button
                      type="button"
                      disabled={
                        isOutOfStock ||
                        cannotAddMore
                      }
                      onClick={() =>
                        handleAddToCart(product)
                      }
                      className={`mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                        isOutOfStock ||
                        cannotAddMore
                          ? "cursor-not-allowed bg-slate-100 text-slate-400"
                          : inCart
                          ? "bg-[#14B8A6] text-white hover:bg-[#0F4C81]"
                          : "bg-[#0F4C81] text-white hover:bg-[#14B8A6] hover:shadow-md"
                      }`}
                    >

                      {isOutOfStock ? (
                        <>
                          <ShoppingCart className="h-4 w-4" />
                          Out of Stock
                        </>
                      ) : cannotAddMore ? (
                        <>
                          <Check className="h-4 w-4" />
                          Maximum in Cart
                        </>
                      ) : inCart ? (
                        <>
                          <ShoppingCart className="h-4 w-4" />
                          Add More
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4" />
                          Add to Cart
                        </>
                      )}

                    </button>

                    {/* See More */}
                    <Link
                      to={`/products/${product.slug}`}
                      className="group/see-more mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-xs font-bold uppercase tracking-wider text-[#0F4C81] transition-all hover:border-[#14B8A6] hover:bg-slate-50"
                    >

                      <span>
                        See More
                      </span>

                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/see-more:-translate-y-0.5 group-hover/see-more:translate-x-0.5" />

                    </Link>

                    {/* MOQ */}
                    <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">

                      <Check className="h-3 w-3 text-[#14B8A6]" />

                      Minimum order:{" "}
                      {product.moq}{" "}
                      {product.unit}

                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 overflow-hidden rounded-2xl bg-[#0F4C81] p-6 text-white sm:p-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#14B8A6]">
                Bulk procurement
              </p>

              <h2 className="mt-2 text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                Need a custom medicine quotation?
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
                Send your medicine requirements and
                quantities to receive a customized B2B
                quotation.
              </p>

            </div>

            <Link
              to="/quote"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-white px-6 text-xs font-bold uppercase tracking-wider text-[#0F4C81] transition hover:bg-[#14B8A6] hover:text-white"
            >
              Request a Quote
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}