import { Quote, Star, ShieldCheck } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Dr. Ananya Sen",
    role: "Hospital Procurement Manager",
    quote:
      "CuraMed has simplified our medical procurement process. Product quality is consistent and bulk ordering is straightforward.",
  },
  {
    name: "Rahul Mehta",
    role: "Pharmacy Operations Lead",
    quote:
      "The transparent pricing and reliable delivery have made CuraMed one of our regular suppliers.",
  },
  {
    name: "Priya Sharma",
    role: "Healthcare Distribution Partner",
    quote:
      "From quotation to delivery, the entire process is professional and easy to manage for large-volume orders.",
  },
];

export default function Testimonials() {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-[#14B8A6]" />

              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#14B8A6]">
                Trusted by procurement teams
              </p>
            </div>

            <h2 className="mt-3 max-w-2xl text-4xl font-semibold uppercase leading-[0.95] tracking-tight text-slate-900 sm:text-5xl">
              What our buyers say
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Healthcare organizations rely on CuraMed for dependable
              products, transparent pricing and professional procurement
              support.
            </p>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50">
              <ShieldCheck className="h-5 w-5 text-[#14B8A6]" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-900">
                Trusted supplier
              </p>

              <p className="text-xs text-slate-500">
                Built for healthcare procurement
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <figure
              key={testimonial.name}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7"
            >
              {/* Top accent */}
              <div className="absolute left-0 top-0 h-1 w-0 bg-[#14B8A6] transition-all duration-500 group-hover:w-full" />

              {/* Quote icon */}
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F4C81]/5">
                  <Quote className="h-5 w-5 text-[#0F4C81]" />
                </div>

                <span className="text-xs font-semibold text-slate-300">
                  0{index + 1}
                </span>
              </div>

              {/* Stars */}
              <div className="mt-5 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-4 w-4 fill-[#14B8A6] text-[#14B8A6]"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mt-5 flex-1 text-lg font-medium leading-relaxed text-slate-800">
                “{testimonial.quote}”
              </blockquote>

              {/* User */}
              <figcaption className="mt-7 border-t border-slate-100 pt-5">
                <p className="text-sm font-semibold text-slate-900">
                  {testimonial.name}
                </p>

                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  {testimonial.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Bottom trust statement */}
        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            Helping hospitals, clinics, pharmacies and distributors simplify
            medical procurement.
          </p>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0F4C81]">
            <ShieldCheck className="h-4 w-4 text-[#14B8A6]" />
            Quality you can rely on
          </div>
        </div>
      </div>
    </section>
  );
}