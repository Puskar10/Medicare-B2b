import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const BANNERS = [
  {
    tag: "B2B HEALTHCARE SUPPLY",
    title: "Your Healthcare Business,",
    highlight: "Our Priority.",
    description:
      "Discover dependable medical supplies and simplify your procurement with CuraMed.",
    button: "Explore Products",
    link: "/products",
    image:
      "https://images.hostinger.com/ec1df3b5-744f-4eb3-b885-075cbafbc385.png",
    background: "bg-[#0F4C81]",
  },
  {
    tag: "BULK PROCUREMENT",
    title: "Bulk Orders,",
    highlight: "Better Procurement.",
    description:
      "Find medical supplies for hospitals, clinics, pharmacies and healthcare distributors.",
    button: "Browse Catalogue",
    link: "/products",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=85",
    background: "bg-slate-900",
  },
  {
    tag: "PERSONALIZED PROCUREMENT",
    title: "Need a Custom",
    highlight: "Supply Quote?",
    description:
      "Tell us what your healthcare business needs and submit a quote request with CuraMed.",
    button: "Request a Quote",
    link: "/quote",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1400&q=85",
    background: "bg-teal-900",
  },
];

export default function BannerCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = () => {
    setActive((prev) => (prev + 1) % BANNERS.length);
  };

  const previous = () => {
    setActive((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % BANNERS.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section className="w-full overflow-hidden bg-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl sm:rounded-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Slides */}
        {BANNERS.map((banner, index) => (
          <div
            key={banner.title}
            className={`${
              index === active
                ? "relative opacity-100"
                : "pointer-events-none absolute inset-0 opacity-0"
            } transition-opacity duration-700`}
            aria-hidden={index !== active}
          >
            <div
              className={`relative flex min-h-[420px] flex-col overflow-hidden ${banner.background} sm:min-h-[360px] md:min-h-[400px] md:flex-row`}
            >
              {/* Image */}
              <div className="absolute inset-0 md:relative md:inset-auto md:w-1/2">
                <img
                  src={banner.image}
                  alt=""
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-slate-950/65 md:bg-gradient-to-r md:from-transparent md:to-slate-950/30" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-12 text-white sm:px-10 sm:py-14 md:px-8 lg:px-12">
                <span className="mb-4 inline-flex w-fit border border-white/30 bg-white/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-sm sm:text-xs">
                  {banner.tag}
                </span>

                <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  {banner.title}
                  <span className="mt-1 block text-teal-300">
                    {banner.highlight}
                  </span>
                </h2>

                <p className="mt-4 max-w-lg text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
                  {banner.description}
                </p>

                <div className="mt-6">
                  <Link
                    to={banner.link}
                    tabIndex={index === active ? 0 : -1}
                    className="inline-flex h-12 items-center justify-center bg-white px-6 text-sm font-bold text-[#0F4C81] transition hover:bg-teal-100 active:scale-[0.98]"
                  >
                    {banner.button}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Previous / Next */}
        <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 sm:bottom-7 sm:right-8">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous banner"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next banner"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-6 z-20 flex items-center gap-2 sm:left-10 md:left-12">
          {BANNERS.map((banner, index) => (
            <button
              key={banner.title}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Go to banner ${index + 1}`}
              aria-current={active === index ? "true" : undefined}
              className={`h-1.5 transition-all duration-300 ${
                active === index
                  ? "w-9 bg-teal-300"
                  : "w-4 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}