import { Link } from "react-router-dom";
import { X, LogIn, ShieldCheck } from "lucide-react";

export default function LoginRequiredModal({
  open,
  onClose,
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="px-6 pb-6 pt-8 text-center sm:px-8">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F4C81]/10">
            <LogIn className="h-6 w-6 text-[#0F4C81]" />
          </div>

          <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-900">
            Login required
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Please login to your CuraMed account before adding
            medicines to your cart.
          </p>

        </div>

        {/* Trust message */}
        <div className="mx-6 rounded-xl bg-slate-50 p-4 sm:mx-8">

          <div className="flex items-start gap-3">

            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#14B8A6]" />

            <div>
              <p className="text-sm font-bold text-slate-800">
                B2B procurement account
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Login to manage your cart, submit orders and
                access your procurement history.
              </p>
            </div>

          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 px-6 pb-7 pt-6 sm:flex-row sm:px-8">

          <Link
            to="/login"
            className="flex h-11 flex-1 items-center justify-center rounded-xl bg-[#0F4C81] px-5 text-sm font-bold text-white transition hover:bg-[#0b3c66]"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="flex h-11 flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Create account
          </Link>

        </div>

      </div>
    </div>
  );
}