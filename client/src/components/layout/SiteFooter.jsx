import { Link } from "react-router-dom";
import {
  Cross,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

const CATEGORIES = [
  {
    id: "surgical",
    name: "Surgical Supplies",
  },
  {
    id: "diagnostic",
    name: "Diagnostic Equipment",
  },
  {
    id: "hospital",
    name: "Hospital Equipment",
  },
  {
    id: "pharmacy",
    name: "Pharmacy Supplies",
  },
  {
    id: "ppe",
    name: "PPE & Safety",
  },
];

const CONTACT = {
  phone: "+91 98765 43210",
  email: "sales@curamed.in",
  address: "Kolkata, West Bengal, India",
};

export default function SiteFooter() {
  return (
    <footer className="bg-slate-950 text-white">

      {/* Main Footer */}
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">

            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F4C81]">
                <Cross
                  className="h-6 w-6 text-white"
                  strokeWidth={2.5}
                />
              </span>

              <span className="leading-none">
                <span className="block text-2xl font-bold uppercase tracking-tight">
                  CuraMed
                </span>

                <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.3em] text-[#14B8A6]">
                  Medical Supply
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-400">
              Wholesale medical equipment, consumables and healthcare
              products for hospitals, clinics, pharmacies and distributors
              across India.
            </p>

            {/* Trust */}
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#14B8A6]" />

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider">
                  B2B Healthcare Supply
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Built for professional procurement
                </p>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Company
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-slate-300 transition hover:text-[#14B8A6]"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="text-slate-300 transition hover:text-[#14B8A6]"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-slate-300 transition hover:text-[#14B8A6]"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/quote"
                  className="text-slate-300 transition hover:text-[#14B8A6]"
                >
                  Request a Quote
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-slate-300 transition hover:text-[#14B8A6]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Categories
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/products?category=${category.id}`}
                    className="group flex items-center gap-1 text-slate-300 transition hover:text-[#14B8A6]"
                  >
                    {category.name}

                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Contact
            </h3>

            <ul className="mt-5 space-y-4 text-sm">

              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#14B8A6]" />

                <a
                  href={`tel:${CONTACT.phone}`}
                  className="text-slate-300 transition hover:text-white"
                >
                  {CONTACT.phone}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#14B8A6]" />

                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-slate-300 transition hover:text-white"
                >
                  {CONTACT.email}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#14B8A6]" />

                <span className="leading-relaxed text-slate-300">
                  {CONTACT.address}
                </span>
              </li>
            </ul>

            {/* Quote Button */}
            <Link
              to="/quote"
              className="group mt-6 inline-flex h-11 items-center rounded-xl bg-[#14B8A6] px-5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#0F4C81]"
            >
              Request a quote

              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-5 text-xs sm:px-6 md:flex-row md:items-center md:justify-between">

          <p className="text-slate-500">
            © {new Date().getFullYear()} CuraMed Supply Pvt. Ltd. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            <span>ISO 13485</span>
            <span>FDA</span>
            <span>CE</span>
            <span>WHO-GMP</span>
            <span>CDSCO</span>
          </div>

        </div>
      </div>
    </footer>
  );
}