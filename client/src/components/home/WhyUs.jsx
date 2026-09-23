import {
  ShieldCheck,
  BadgeCheck,
  Truck,
  FileCheck,
  Headphones,
} from "lucide-react";

const WHY_US = [
  {
    title: "Verified B2B Procurement",
    text: "We work with hospitals, clinics, pharmacies and distributors to provide a procurement experience designed for businesses.",
    icon: ShieldCheck,
  },
  {
    title: "Transparent Bulk Pricing",
    text: "Get quantity-based pricing that makes large-volume purchasing predictable and easier to manage.",
    icon: BadgeCheck,
  },
  {
    title: "Reliable Supply & Logistics",
    text: "Streamlined fulfillment and dependable delivery support help keep your facility stocked.",
    icon: Truck,
  },
  {
    title: "Procurement Documentation",
    text: "Business-ready invoices and documentation simplify purchasing, accounting and compliance workflows.",
    icon: FileCheck,
  },
  {
    title: "Dedicated Support",
    text: "Our team helps with quotations, bulk orders, product information and ongoing procurement requirements.",
    icon: Headphones,
  },
];

const CERTIFICATIONS = [
  {
    code: "ISO",
    label: "ISO 13485 Quality Management",
  },
  {
    code: "FDA",
    label: "FDA Registered Products",
  },
  {
    code: "CE",
    label: "CE Marked Products",
  },
  {
    code: "GST",
    label: "GST Compliant Invoicing",
  },
  {
    code: "B2B",
    label: "Business Procurement",
  },
];

export default function WhyUs() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">

        {/* Main Section */}
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">

          {/* Left Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-[#14B8A6]" />

              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#14B8A6]">
                Why CuraMed
              </p>
            </div>

            <h2 className="mt-4 text-4xl font-semibold uppercase leading-[0.95] tracking-tight text-slate-900 sm:text-5xl">
              Built for B2B procurement
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
              CuraMed is designed around the way healthcare organizations
              actually purchase supplies — bulk quantities, predictable
              pricing, reliable documentation and dependable fulfillment.
            </p>

            {/* Small Info Card */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0F4C81]">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Procurement you can trust
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    From product discovery to delivery, every step is designed
                    for professional healthcare buyers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Features */}
          <div className="lg:col-span-3">
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {WHY_US.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group flex gap-5 py-6 transition-all duration-300"
                  >
                    {/* Number */}
                    <span className="w-9 shrink-0 text-2xl font-semibold leading-none text-[#14B8A6]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Icon */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 transition-all duration-300 group-hover:bg-[#0F4C81]">
                      <Icon className="h-5 w-5 text-[#0F4C81] transition-colors duration-300 group-hover:text-white" />
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-slate-900">
                        {item.title}
                      </h3>

                      <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-500">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-16">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                Certifications & compliance
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Standards and documentation supporting professional healthcare
                procurement.
              </p>
            </div>

            <ShieldCheck className="hidden h-6 w-6 text-[#14B8A6] sm:block" />
          </div>

          {/* Certification Grid */}
          <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-3 lg:grid-cols-5">
            {CERTIFICATIONS.map((certification) => (
              <div
                key={certification.code}
                className="group bg-white px-4 py-7 text-center transition-colors duration-300 hover:bg-slate-50"
              >
                <p className="text-2xl font-bold uppercase tracking-tight text-[#0F4C81]">
                  {certification.code}
                </p>

                <div className="mx-auto mt-3 h-px w-8 bg-[#14B8A6] transition-all duration-300 group-hover:w-14" />

                <p className="mt-3 text-xs leading-snug text-slate-500">
                  {certification.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}