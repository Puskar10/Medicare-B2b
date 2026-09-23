import { Link } from "react-router-dom";
import CornerFrame from "../common/CornerFrame";
import { CERTIFICATIONS, STATS } from "../../data/content";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop";

export default function AboutContent() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      {/* Header - Refined spacing and typography */}
      <div className="max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#14B8A6]">
          About CuraMed
        </p>
        <h1 className="mt-4 text-4xl font-black uppercase leading-[0.9] tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
          Making medicine procurement{" "}
          <span className="text-[#0F4C81]">simpler</span> for healthcare
          businesses
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
          CuraMed is a B2B medicine procurement platform designed to help
          pharmacies, clinics and healthcare businesses source commonly required
          medicines through a simple digital ordering experience.
        </p>
      </div>

      {/* About Content - Split layout with improved image */}
      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6 text-base leading-8 text-slate-600">
          <p>
            CuraMed focuses on business-to-business medicine procurement,
            helping pharmacies, clinics and healthcare organizations manage
            recurring medicine requirements from one convenient catalogue.
          </p>
          <p>
            Our platform is designed around the way healthcare businesses
            actually purchase medicines — with bulk quantities, minimum order
            quantities, product information, business documentation and
            organized order tracking.
          </p>
          <p>
            From everyday medicines such as tablets and capsules to syrups,
            vitamins and other commonly required pharmaceutical products, our
            goal is to make procurement easier to understand, easier to order
            and easier to manage.
          </p>
        </div>

        {/* Warehouse Image - New high-quality image with refined frame */}
        <CornerFrame className="p-3 bg-white shadow-xl shadow-slate-200/50">
          <img
            src={HERO_IMAGE}
            alt="Modern medicine distribution warehouse with organized shelving"
            className="aspect-[4/3] w-full rounded-xl object-cover transition duration-700 hover:scale-[1.02]"
            loading="lazy"
          />
        </CornerFrame>
      </div>

      {/* Stats - Enhanced visual treatment */}
      <dl className="mt-20 grid grid-cols-2 overflow-hidden rounded-3xl border border-slate-200/60 bg-slate-200/50 md:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="group bg-white px-6 py-8 text-center transition duration-300 hover:bg-slate-50/80 sm:px-8"
          >
            <dd className="text-4xl font-black tracking-tight text-[#0F4C81] transition duration-300 group-hover:text-[#14B8A6] sm:text-5xl">
              {stat.value}
            </dd>
            <dt className="mt-3 text-[11px] font-bold uppercase leading-5 tracking-[0.15em] text-slate-500">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>

      {/* Certifications - Improved card design */}
      <section className="mt-20">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#14B8A6]">
            Our standards
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl">
            Certifications & compliance
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-500">
            Business procurement requires clear documentation and consistent
            processes. The following areas represent the compliance categories
            used across the CuraMed platform.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-slate-200/60 bg-slate-200/50 sm:grid-cols-3 lg:grid-cols-5">
          {CERTIFICATIONS.map((certification) => (
            <div
              key={certification.code}
              className="group bg-white px-5 py-8 text-center transition duration-300 hover:bg-[#0F4C81]"
            >
              <p className="text-2xl font-black uppercase tracking-tight text-[#0F4C81] transition duration-300 group-hover:text-white">
                {certification.code}
              </p>
              <p className="mt-3 text-xs leading-5 text-slate-500 transition duration-300 group-hover:text-slate-200">
                {certification.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA - More engaging design */}
      <section className="relative mt-20 overflow-hidden rounded-3xl border border-[#0F4C81]/10 bg-gradient-to-br from-[#0F4C81]/5 via-white to-[#14B8A6]/5 p-8 text-center shadow-lg shadow-slate-200/30 sm:p-12 lg:p-16">
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#14B8A6]/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#0F4C81]/5 blur-3xl" />

        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#14B8A6]">
            B2B medicine procurement
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl">
            Ready to procure smarter?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-500">
            Create a business account to manage your medicine orders, or send us
            your requirements for a tailored quotation.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#0F4C81] px-8 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-[#0F4C81]/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#0b3c66] hover:shadow-xl hover:shadow-[#0F4C81]/30"
            >
              Create an account
            </Link>
            <Link
              to="/quote"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-8 text-sm font-bold uppercase tracking-wider text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#0F4C81] hover:text-[#0F4C81] hover:shadow-md"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}