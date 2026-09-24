import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
const CATEGORIES = [
  {
    id: "surgical",
    name: "Surgical Supplies",
    blurb:
      "Sterile instruments, gloves, masks and essential surgical consumables.",
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "diagnostic",
    name: "Diagnostic Equipment",
    blurb: "Reliable equipment for accurate patient monitoring and diagnosis.",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "hospital",
    name: "Hospital Equipment",
    blurb: "Professional-grade equipment designed for healthcare facilities.",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "pharmacy",
    name: "Pharmacy Supplies",
    blurb: "Everyday medical and pharmaceutical supplies for pharmacies.",
    image:
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ppe",
    name: "PPE & Safety",
    blurb: "Protective equipment for healthcare professionals and patients.",
    image:
      "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=1200&q=80",
  },
];
export default function Categories() {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      {" "}
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        {" "}
        {/* Section Header */}{" "}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {" "}
          <div>
            {" "}
            <div className="flex items-center gap-2">
              {" "}
              <ShieldCheck className="h-4 w-4 text-[#14B8A6]" />{" "}
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#14B8A6]">
                {" "}
                Product Categories{" "}
              </p>{" "}
            </div>{" "}
            <h2 className="mt-3 max-w-2xl text-4xl font-semibold uppercase leading-[0.95] tracking-tight text-slate-900 sm:text-5xl">
              {" "}
              Everything your facility needs, in one place{" "}
            </h2>{" "}
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              {" "}
              Source certified medical supplies and healthcare equipment from a
              single trusted B2B procurement platform.{" "}
            </p>{" "}
          </div>{" "}
          <Link
            to="/products"
            className="group inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#0F4C81]"
          >
            {" "}
            View full catalogue{" "}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />{" "}
          </Link>{" "}
        </div>{" "}
        {/* Category Grid */}{" "}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {" "}
          {CATEGORIES.map((category, index) => (
            <div
              key={category.id}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${index === 0 ? "lg:col-span-2" : ""}`}
            >
              {" "}
              {/* Image */}{" "}
              <div className="relative overflow-hidden">
                {" "}
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className={`w-full object-cover transition duration-500 group-hover:scale-105 ${index === 0 ? "aspect-[16/8] sm:aspect-[16/7]" : "aspect-[16/10]"}`}
                />{" "}
                {/* Image Overlay */}{" "}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-80" />{" "}
                {/* Category Number */}{" "}
                <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-xs font-semibold text-white backdrop-blur-md">
                  {" "}
                  {String(index + 1).padStart(2, "0")}{" "}
                </span>{" "}
                {/* Arrow */}{" "}
                <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0F4C81] opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
                  {" "}
                  <ArrowUpRight className="h-5 w-5" />{" "}
                </div>{" "}
              </div>{" "}
              {/* Content */}{" "}
              <div className="p-5 sm:p-6">
                {" "}
                <div className="flex items-start justify-between gap-4">
                  {" "}
                  <div>
                    {" "}
                    <h3 className="text-xl font-semibold uppercase tracking-tight text-slate-900 sm:text-2xl">
                      {" "}
                      {category.name}{" "}
                    </h3>{" "}
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                      {" "}
                      {category.blurb}{" "}
                    </p>{" "}
                  </div>{" "}
                  <div className="hidden shrink-0 text-[#14B8A6] sm:block">
                    {" "}
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />{" "}
                  </div>{" "}
                </div>{" "}
                {/* Bottom Line */}{" "}
                <div className="mt-5 h-px w-full bg-slate-100">
                  {" "}
                  <div className="h-px w-0 bg-[#14B8A6] transition-all duration-500 group-hover:w-full" />{" "}
                </div>{" "}
                
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
        {/* Bottom Trust Message */}{" "}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-5 sm:flex-row">
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50">
              {" "}
              <ShieldCheck className="h-5 w-5 text-[#14B8A6]" />{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="text-sm font-semibold text-slate-900">
                {" "}
                Trusted healthcare procurement{" "}
              </p>{" "}
              <p className="text-xs text-slate-500">
                {" "}
                Quality products with transparent B2B pricing.{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
          <Link
            to="/quote"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0F4C81] hover:text-[#14B8A6]"
          >
            {" "}
            Request bulk pricing →{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
