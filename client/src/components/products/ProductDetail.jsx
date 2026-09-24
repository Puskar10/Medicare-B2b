import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";

import { useCart } from "../../context/CartContext";

import {
  getProductBySlug,
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

export default function ProductDetails() {
  const { slug } = useParams();

  const { addToCart } = useCart();

  const product = getProductBySlug(slug);

  const [quantity, setQuantity] = useState(
    product?.moq || 1
  );

  const [added, setAdded] = useState(false);

  // Login popup state
  const [showLoginModal, setShowLoginModal] =
    useState(false);

  // Product not found
  if (!product) {
    return (
      <section className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-4 py-16">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#14B8A6]">
              Medicine Catalogue
            </p>

            <h1 className="mt-3 text-4xl font-bold uppercase tracking-tight text-slate-900">
              Medicine Not Found
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500">
              The medicine you are looking for does not exist
              in our current catalogue.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0F4C81] px-6 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#14B8A6]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Medicines
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const isOutOfStock = product.stock <= 0;

  /*
   * Decrease quantity
   */
  const handleDecrease = () => {
    setQuantity((current) =>
      Math.max(
        product.moq,
        current - product.moq
      )
    );
  };

  /*
   * Increase quantity
   */
  const handleIncrease = () => {
    setQuantity((current) => {
      const nextQuantity =
        current + product.moq;

      if (nextQuantity > product.stock) {
        return current;
      }

      return nextQuantity;
    });
  };

  /*
   * Add to cart
   */
  const handleAddToCart = () => {
    // Check login first
    const token = localStorage.getItem("token");

    if (!token) {
      setShowLoginModal(true);
      return;
    }

    // User is logged in
    const result = addToCart(
      product,
      quantity
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  const canIncrease =
    !isOutOfStock &&
    quantity + product.moq <= product.stock;

  return (
    <section className="min-h-screen bg-slate-50">

      {/* Login Required Modal */}
      <LoginRequiredModal
        open={showLoginModal}
        onClose={() =>
          setShowLoginModal(false)
        }
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">

        {/* Back */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition hover:text-[#0F4C81]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Medicines
        </Link>

        {/* Product */}
        <div className="mt-8 grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">

          {/* Image */}
          <div className="relative bg-slate-100">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full min-h-[360px] w-full object-cover lg:min-h-[600px]"
              />
            ) : (
              <div className="min-h-[360px] bg-slate-100 lg:min-h-[600px]" />
            )}

            {/* Stock */}
            {isOutOfStock ? (
              <span className="absolute left-5 top-5 rounded-xl bg-red-600 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white">
                Out of Stock
              </span>
            ) : (
              <span className="absolute left-5 top-5 rounded-xl bg-white/95 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600 shadow-sm backdrop-blur">
                In Stock
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">

            {/* Category */}
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#14B8A6]">
              {getCategoryName(product.category)}
            </p>

            {/* Name */}
            <h1 className="mt-3 text-3xl font-bold uppercase leading-tight tracking-tight text-slate-900 sm:text-5xl">
              {product.name}
            </h1>

            {/* SKU */}
            <p className="mt-4 text-sm text-slate-500">
              SKU:{" "}
              <span className="font-semibold text-slate-700">
                {product.sku}
              </span>
            </p>

            {/* Description */}
            <p className="mt-6 text-sm leading-7 text-slate-600 sm:text-base">
              {product.description}
            </p>

            {/* Price */}
            <div className="mt-8 rounded-2xl bg-slate-50 p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Wholesale Price
              </p>

              <div className="mt-2 flex items-end gap-2">
                <span className="text-3xl font-bold text-[#0F4C81]">
                  {formatINR(product.price)}
                </span>

                <span className="pb-1 text-xs text-slate-500">
                  / {product.unit}
                </span>
              </div>
            </div>

            {/* Product information */}
            <div className="mt-6 grid grid-cols-2 gap-3">

              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  MOQ
                </p>

                <p className="mt-1 text-sm font-bold text-slate-900">
                  {product.moq} {product.unit}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Available
                </p>

                <p className="mt-1 text-sm font-bold text-slate-900">
                  {product.stock} {product.unit}
                </p>
              </div>

            </div>

            {/* Quantity */}
            {!isOutOfStock && (
              <div className="mt-7">

                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Quantity
                </p>

                <div className="mt-3 flex items-center">

                  {/* Decrease */}
                  <button
                    type="button"
                    onClick={handleDecrease}
                    disabled={
                      quantity <= product.moq
                    }
                    className="flex h-11 w-11 items-center justify-center rounded-l-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  {/* Quantity */}
                  <div className="flex h-11 min-w-24 items-center justify-center border-y border-slate-200 bg-white px-4">
                    <span className="text-sm font-bold text-slate-900">
                      {quantity}
                    </span>
                  </div>

                  {/* Increase */}
                  <button
                    type="button"
                    onClick={handleIncrease}
                    disabled={!canIncrease}
                    className="flex h-11 w-11 items-center justify-center rounded-r-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
                  >
                    <Plus className="h-4 w-4" />
                  </button>

                </div>

                <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Quantity increases by{" "}
                  {product.moq} {product.unit}
                </p>

              </div>
            )}

            {/* Add to Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`mt-7 flex h-13 w-full items-center justify-center gap-2 rounded-xl px-6 text-xs font-bold uppercase tracking-wider transition-all ${
                isOutOfStock
                  ? "cursor-not-allowed bg-slate-100 text-slate-400"
                  : added
                  ? "bg-emerald-600 text-white"
                  : "bg-[#0F4C81] text-white hover:bg-[#14B8A6] hover:shadow-lg"
              }`}
            >

              {isOutOfStock ? (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  Out of Stock
                </>
              ) : added ? (
                <>
                  <Check className="h-4 w-4" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </>
              )}

            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-xs font-bold uppercase tracking-wider text-[#0F4C81] transition hover:border-[#14B8A6] hover:bg-slate-50"
            >
              View Cart
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* MOQ note */}
            <div className="mt-6 flex items-start gap-2 rounded-xl bg-[#0F4C81]/5 p-4">

              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#14B8A6]" />

              <p className="text-xs leading-relaxed text-slate-600">
                Minimum order quantity is{" "}
                <span className="font-bold text-slate-900">
                  {product.moq} {product.unit}
                </span>
                . Final pricing and availability may be
                confirmed during checkout.
              </p>

            </div>

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 flex flex-col justify-between gap-5 rounded-2xl bg-[#0F4C81] p-6 text-white sm:p-8 md:flex-row md:items-center">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#14B8A6]">
              Bulk Procurement
            </p>

            <h2 className="mt-2 text-2xl font-bold uppercase tracking-tight">
              Need a larger quantity?
            </h2>

            <p className="mt-2 text-sm text-white/70">
              Request a custom quotation for your medicine
              requirements.
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
    </section>
  );
}