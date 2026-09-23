import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#0F4C81] text-white">
      {/* Background decoration */}
      <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#14B8A6]/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">

          {/* Content */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <span className="h-px w-8 bg-[#14B8A6]" />

              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                Custom & large-volume orders
              </p>
            </div>

            <h2 className="max-w-3xl text-4xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
              Need a tailored quotation?
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              From tender quantities and custom kitting to private labelling
              and scheduled supply contracts, our institutional sales team is
              ready to help you build the right procurement plan.
            </p>

            {/* Features */}
            <div className="mt-7 flex flex-wrap gap-5">
              <div className="flex items-center gap-2 text-xs font-medium text-white/80">
                <ShieldCheck className="h-4 w-4 text-[#14B8A6]" />
                Certified products
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-white/80">
                <Truck className="h-4 w-4 text-[#14B8A6]" />
                Bulk delivery
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-white/80">
                <FileText className="h-4 w-4 text-[#14B8A6]" />
                GST invoices
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div className="w-full lg:w-[300px]">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Procurement support
              </p>

              <p className="mt-3 text-lg font-semibold">
                Tell us what your facility needs.
              </p>

              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Submit your requirements and receive a customized quotation
                from our team.
              </p>

              <Link
                to="/quote"
                className="group mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold uppercase tracking-wider text-[#0F4C81] transition-all duration-300 hover:bg-[#14B8A6] hover:text-white active:scale-[0.98]"
              >
                Request a quote

                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom response message */}
        <div className="mt-10 border-t border-white/15 pt-5">
          <p className="text-xs uppercase tracking-[0.16em] text-white/50">
            Institutional sales · Bulk procurement · Custom orders
          </p>
        </div>
      </div>
    </section>
  );
}