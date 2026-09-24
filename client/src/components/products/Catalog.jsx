import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

const CATEGORIES = [
  { id: "all", name: "All Medicines" },
  { id: "tablets", name: "Tablets & Capsules" },
  { id: "syrups", name: "Syrups" },
  { id: "injections", name: "Injections" },
  { id: "antibiotics", name: "Antibiotics" },
  { id: "vitamins", name: "Vitamins" },
];

const PRODUCTS = [
  {
    id: "MED001",
    slug: "paracetamol-500mg",
    name: "Paracetamol 500mg",
    category: "tablets",
    sku: "PCM-500",
    description: "Paracetamol tablets for common healthcare requirements.",
    price: 1.2,
    moq: 100,
    unit: "strips",
    stock: 2500,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "MED002",
    slug: "amoxicillin-500mg",
    name: "Amoxicillin 500mg",
    category: "antibiotics",
    sku: "AMX-500",
    description: "Amoxicillin capsules for authorized healthcare procurement.",
    price: 4.5,
    moq: 100,
    unit: "strips",
    stock: 1200,
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "MED003",
    slug: "vitamin-c-tablets",
    name: "Vitamin C Tablets",
    category: "vitamins",
    sku: "VTC-100",
    description: "Vitamin C tablets for pharmacy and healthcare requirements.",
    price: 2.8,
    moq: 100,
    unit: "boxes",
    stock: 1800,
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "MED004",
    slug: "cough-syrup",
    name: "Cough Relief Syrup",
    category: "syrups",
    sku: "CRS-100",
    description: "Liquid cough medicine for eligible pharmacy procurement.",
    price: 32,
    moq: 50,
    unit: "bottles",
    stock: 850,
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "MED005",
    slug: "multivitamin-capsules",
    name: "Multivitamin Capsules",
    category: "vitamins",
    sku: "MVC-30",
    description: "Multivitamin capsules for regular healthcare supply.",
    price: 65,
    moq: 50,
    unit: "boxes",
    stock: 950,
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "MED006",
    slug: "azithromycin-500mg",
    name: "Azithromycin 500mg",
    category: "antibiotics",
    sku: "AZM-500",
    description: "Azithromycin tablets for authorized medical procurement.",
    price: 7.5,
    moq: 100,
    unit: "strips",
    stock: 0,
    image:
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=900&q=80",
  },
];

function formatINR(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function categoryName(categoryId) {
  const category = CATEGORIES.find((item) => item.id === categoryId);
  return category?.name || categoryId;
}

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "all";
  const q = searchParams.get("q") || "";

  const filtered = useMemo(() => {
    const search = q.trim().toLowerCase();

    return PRODUCTS.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;

      const matchesSearch =
        search === "" ||
        `${product.name} ${product.sku} ${product.description}`
          .toLowerCase()
          .includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [category, q]);

  const handleSearch = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const searchValue = formData.get("q")?.trim() || "";

    const params = {};

    if (category !== "all") {
      params.category = category;
    }

    if (searchValue) {
      params.q = searchValue;
    }

    setSearchParams(params);
  };

  return (
    <section className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#14B8A6]">
            Wholesale Medicine Catalogue
          </p>

          <h1 className="mt-3 text-4xl font-bold uppercase leading-[0.95] tracking-tight text-slate-900 sm:text-6xl">
            Medicines in bulk
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Browse medicines available for B2B procurement. Find products by
            category, search by medicine name or SKU, and view minimum order
            quantities and wholesale pricing.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((item) => {
                const active = category === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      const params = {};

                      if (item.id !== "all") {
                        params.category = item.id;
                      }

                      if (q) {
                        params.q = q;
                      }

                      setSearchParams(params);
                    }}
                    className={`rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                      active
                        ? "bg-[#0F4C81] text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-[#14B8A6] hover:text-[#0F4C81]"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="flex w-full max-w-md items-center gap-2"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="search"
                  name="q"
                  defaultValue={q}
                  placeholder="Search medicine or SKU..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10"
                />
              </div>

              <button
                type="submit"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0F4C81] text-white transition hover:bg-[#14B8A6]"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Results information */}
        <div className="mt-8 flex flex-col justify-between gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "medicine" : "medicines"}
          </p>

          {q && (
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0F4C81]">
              Search: "{q}"
            </p>
          )}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-16 text-center">
            <Search className="mx-auto h-8 w-8 text-slate-300" />

            <h2 className="mt-4 text-lg font-bold uppercase text-slate-900">
              No medicines found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try another medicine name, SKU or category.
            </p>

            <button
              type="button"
              onClick={() => setSearchParams({})}
              className="mt-5 rounded-xl bg-[#0F4C81] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#14B8A6]"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Product grid */}
        {filtered.length > 0 && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-slate-100">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="aspect-square w-full bg-slate-100" />
                  )}

                  {/* Stock */}
                  {product.stock <= 0 ? (
                    <span className="absolute left-3 top-3 rounded-lg bg-red-600 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      Out of stock
                    </span>
                  ) : (
                    <span className="absolute left-3 top-3 rounded-lg bg-white/90 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 shadow-sm backdrop-blur">
                      In stock
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#14B8A6]">
                    {categoryName(product.category)}
                  </p>

                  <h2 className="mt-2 text-lg font-bold leading-tight text-slate-900">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-xs text-slate-500">
                    SKU: {product.sku}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Starting from
                      </p>

                      <p className="mt-1 text-lg font-bold text-[#0F4C81]">
                        {formatINR(product.price)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        MOQ
                      </p>

                      <p className="mt-1 text-xs font-bold text-slate-700">
                        {product.moq} {product.unit}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0F4C81]">
                    <span>View medicine</span>

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom procurement CTA */}
        <div className="mt-12 overflow-hidden rounded-2xl bg-[#0F4C81] p-6 text-white sm:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#14B8A6]">
                Bulk procurement
              </p>

              <h2 className="mt-2 text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                Need a custom medicine quotation?
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
                Send your medicine requirements and quantities to receive a
                customized B2B quotation.
              </p>
            </div>

            <Link
              to="/quote"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-white px-6 text-xs font-bold uppercase tracking-wider text-[#0F4C81] transition hover:bg-[#14B8A6] hover:text-white"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}