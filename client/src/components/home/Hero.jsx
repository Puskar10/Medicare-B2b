import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HERO_IMAGE =
  "https://images.hostinger.com/ec1df3b5-744f-4eb3-b885-075cbafbc385.png";

const STATS = [
  { value: "10K+", label: "Products Delivered" },
  { value: "500+", label: "Healthcare Partners" },
  { value: "99.8%", label: "Order Accuracy" },
  { value: "24/7", label: "Procurement Support" },
];

export default function Hero() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20">

        {/* Certification */}
        <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-teal-600">
          ISO 13485 · FDA Registered · CE Marked
        </p>

        {/* Heading */}
        <h1 className="mx-auto mt-5 max-w-5xl text-center text-5xl font-semibold uppercase leading-[0.92] tracking-tight text-slate-900 sm:text-7xl lg:text-8xl">
          Bulk medical supplies, institutional grade
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-slate-600 sm:text-lg">
          CuraMed equips hospitals, clinics, pharmacies and distributors with
          certified medical equipment and consumables — at transparent
          wholesale prices, with GST-compliant invoicing and procurement
          support built for healthcare teams.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/products"
            className="inline-flex h-12 items-center bg-[#0F4C81] px-7 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#0F4C81]/90 active:scale-[0.98]"
          >
            Browse the catalogue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>

          <Link
            to="/quote"
            className="inline-flex h-12 items-center border border-slate-300 px-7 text-sm font-semibold uppercase tracking-wider text-slate-900 transition hover:border-[#14B8A6] hover:text-[#14B8A6] active:scale-[0.98]"
          >
            Request a quote
          </Link>
        </div>

        {/* Hero Image */}
        <div className="relative mt-14 overflow-hidden border border-slate-200 bg-slate-100">
          {/* Corner decorations */}
          <span className="absolute left-0 top-0 z-10 h-5 w-5 border-l-2 border-t-2 border-[#14B8A6]" />
          <span className="absolute right-0 top-0 z-10 h-5 w-5 border-r-2 border-t-2 border-[#14B8A6]" />
          <span className="absolute bottom-0 left-0 z-10 h-5 w-5 border-b-2 border-l-2 border-[#14B8A6]" />
          <span className="absolute bottom-0 right-0 z-10 h-5 w-5 border-b-2 border-r-2 border-[#14B8A6]" />

          <img
            src={HERO_IMAGE}
            alt="CuraMed medical supply distribution warehouse"
            className="aspect-[16/9] w-full object-cover"
          />
        </div>

        {/* Stats */}
        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white px-6 py-6 text-center transition hover:bg-slate-50"
            >
              <dd className="text-3xl font-semibold text-[#0F4C81] sm:text-4xl">
                {stat.value}
              </dd>

              <dt className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}