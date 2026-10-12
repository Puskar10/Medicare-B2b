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
  {
    name: "Dr. Vikram Rao",
    role: "Clinic Owner · Bengaluru",
    quote:
      "Reliable stock availability and fast dispatch have helped us serve patients without delays.",
  },
  {
    name: "Neha Kapoor",
    role: "Hospital Supply Chain Head",
    quote:
      "Their B2B quotation flow saved our team hours every week. Highly recommended for bulk orders.",
  },
  {
    name: "Arjun Iyer",
    role: "Medical Distributor",
    quote:
      "Consistent batch quality, proper invoicing and on-time delivery — exactly what a distributor needs.",
  },
];

export default function Testimonials() {
  /* Duplicate once for seamless loop */
  const loopItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="overflow-hidden border-b border-slate-200 bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 pt-16 sm:px-6 sm:pt-24">
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
              Healthcare organizations rely on CuraMed for dependable products,
              transparent pricing and professional procurement support.
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
      </div>

      {/* ============ MARQUEE ============ */}
      <div
        className="marquee group relative mt-12 w-full"
        role="region"
        aria-label="Customer testimonials"
      >
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent sm:w-24" />

        {/* Track */}
        <div className="marquee__track flex w-max gap-5 py-4">
          {loopItems.map((testimonial, index) => (
            <figure
              key={`${testimonial.name}-${index}`}
              className="marquee__card group/card relative flex w-[300px] shrink-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[360px] sm:p-7"
              aria-hidden={index >= TESTIMONIALS.length}
            >
              {/* Top accent */}
              <div className="absolute left-0 top-0 h-1 w-0 bg-[#14B8A6] transition-all duration-500 group-hover/card:w-full" />

              {/* Icon + index */}
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F4C81]/5">
                  <Quote className="h-5 w-5 text-[#0F4C81]" />
                </div>
                <span className="text-xs font-semibold text-slate-300">
                  {String((index % TESTIMONIALS.length) + 1).padStart(2, "0")}
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
              <blockquote className="mt-5 flex-1 text-base font-medium leading-relaxed text-slate-800 sm:text-lg">
                “{testimonial.quote}”
              </blockquote>

              {/* Author */}
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
      </div>

      {/* Bottom trust statement */}
      <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
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

      {/* ============ STYLES ============ */}
      <style>{`
        .marquee__track {
          animation: marquee-scroll 40s linear infinite;
          will-change: transform;
        }

        /* Pause on hover of the whole marquee */
        .marquee:hover .marquee__track {
          animation-play-state: paused;
        }

        /* Also pause when a card is focused (keyboard users) */
        .marquee:focus-within .marquee__track {
          animation-play-state: paused;
        }

        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .marquee__track {
            animation: none;
            overflow-x: auto;
          }
        }

        /* Mobile: slow it down slightly for readability */
        @media (max-width: 640px) {
          .marquee__track {
            animation-duration: 30s;
          }
        }
      `}</style>
    </section>
  );
}