import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Cross,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  ShoppingCart,
  X,
} from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About Us" },
  { to: "/quote", label: "Request a Quote" },
  { to: "/contact", label: "Contact" },
];

const CONTACT = {
  phone: "+91 98765 43210",
  email: "sales@curamed.in",
};

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Temporary UI state
  // Replace these with your AuthContext later
  const isAuthed = false;
  const isAdmin = false;
  const cartCount = 0;

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
      {/* Top information bar */}
      <div className="bg-[#0F4C81] text-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] sm:px-6 sm:text-[11px]">
          <p className="truncate">
            Quality healthcare supply for professional procurement
          </p>

          <p className="hidden shrink-0 text-white/80 md:block">
            {CONTACT.phone} · {CONTACT.email}
          </p>
        </div>
      </div>

      {/* Main navigation */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex items-center gap-3"
        >
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-[#0F4C81] text-white shadow-sm transition-all duration-300 group-hover:bg-[#14B8A6]">
            <Cross
              className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90"
              strokeWidth={2.5}
            />

            <span className="absolute bottom-0 left-0 h-1 w-full bg-[#14B8A6] transition-colors group-hover:bg-white" />
          </span>

          <span className="leading-none">
            <span className="block text-xl font-bold uppercase tracking-tight text-slate-900 sm:text-2xl">
              CuraMed
            </span>

            <span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.32em] text-[#14B8A6] sm:text-[9px]">
              Medical Supply
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative py-2 text-xs font-bold uppercase tracking-[0.13em] transition-colors duration-200 ${
                  isActive
                    ? "text-[#0F4C81]"
                    : "text-slate-500 hover:text-[#0F4C81]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}

                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#14B8A6] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-all duration-200 hover:border-[#14B8A6] hover:text-[#0F4C81] hover:shadow-sm"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-4.5 w-4.5" />

            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#14B8A6] px-1 text-[10px] font-bold text-white shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Authenticated user */}
          {isAuthed ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="hidden h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-bold uppercase tracking-wider text-slate-700 transition-all hover:border-[#14B8A6] hover:text-[#0F4C81] sm:flex"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Admin
                </Link>
              )}

              <Link
                to="/orders"
                className="hidden h-10 items-center rounded-xl border border-slate-200 px-4 text-xs font-bold uppercase tracking-wider text-slate-700 transition-all hover:border-[#14B8A6] hover:text-[#0F4C81] sm:flex"
              >
                Orders
              </Link>

              <button
                type="button"
                className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-all hover:border-red-300 hover:text-red-600 sm:flex"
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="hidden h-10 items-center gap-2 rounded-xl bg-[#0F4C81] px-4 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:bg-[#14B8A6] hover:shadow-md sm:flex"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-all hover:border-[#14B8A6] hover:text-[#0F4C81] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        className={`overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 lg:hidden ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center justify-between border-b border-slate-100 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "text-[#0F4C81]"
                    : "text-slate-700 hover:text-[#0F4C81]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>

                  <span
                    className={`h-1.5 w-1.5 rounded-full bg-[#14B8A6] transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}

          {/* Mobile account links */}
          {isAuthed ? (
            <>
              <Link
                to="/orders"
                onClick={closeMenu}
                className="block border-b border-slate-100 py-4 text-sm font-bold uppercase tracking-wider text-slate-700"
              >
                My Orders
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={closeMenu}
                  className="block border-b border-slate-100 py-4 text-sm font-bold uppercase tracking-wider text-slate-700"
                >
                  Admin Dashboard
                </Link>
              )}

              <button
                type="button"
                onClick={closeMenu}
                className="flex w-full items-center gap-2 py-4 text-left text-sm font-bold uppercase tracking-wider text-red-600"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="mt-3 flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0F4C81] text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#14B8A6]"
            >
              <LogIn className="h-4 w-4" />
              Sign In / Register
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}