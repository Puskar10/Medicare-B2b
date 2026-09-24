import { useEffect } from "react";
import { Link } from "react-router-dom";
import { X, LogIn, ShieldCheck } from "lucide-react";

export default function LoginRequiredModal({
  open,
  onClose,
}) {
  // Disable background scrolling while modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Restore scrolling if component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-y-auto bg-slate-950/60 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-6"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 active:scale-95 sm:right-4 sm:top-4"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="px-5 pb-5 pt-7 text-center sm:px-8 sm:pb-6 sm:pt-9">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F4C81]/10 sm:h-14 sm:w-14 sm:rounded-2xl">
            <LogIn className="h-5 w-5 text-[#0F4C81] sm:h-6 sm:w-6" />
          </div>

          <h2 className="mt-4 text-xl font-black tracking-tight text-slate-900 sm:mt-5 sm:text-2xl">
            Login required
          </h2>

          <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-slate-500 sm:max-w-sm sm:text-sm sm:leading-6">
            Please login to your CuraMed account before adding
            medicines to your cart.
          </p>
        </div>

        {/* Info */}
        <div className="mx-5 rounded-xl bg-slate-50 p-3.5 sm:mx-8 sm:p-4">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#14B8A6]" />

            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 sm:text-sm">
                B2B procurement account
              </p>

              <p className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-xs">
                Login to manage your cart, submit orders and
                access your procurement history.
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5 px-5 pb-5 pt-5 sm:flex-row sm:gap-3 sm:px-8 sm:pb-7 sm:pt-6">
          <Link
            to="/login"
            onClick={onClose}
            className="flex h-11 w-full items-center justify-center rounded-xl bg-[#0F4C81] px-5 text-sm font-bold text-white transition hover:bg-[#0b3c66] active:scale-[0.98] sm:flex-1"
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={onClose}
            className="flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98] sm:flex-1"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}