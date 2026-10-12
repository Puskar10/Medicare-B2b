import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=2000&q=90",
    badge: "Trusted B2B Healthcare Supply",
    title: "Reliable Medicine Supply",
    highlight: "For Your Business",
    description:
      "Source quality medicines with transparent pricing, dependable supply and seamless B2B procurement.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2000&q=90",
    badge: "Built for Healthcare Businesses",
    title: "Everything Your Pharmacy",
    highlight: "Needs in One Place",
    description:
      "Discover a growing catalogue of medicines and healthcare products designed for professional procurement.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1580281658628-6b8e4c6a5c6f?auto=format&fit=crop&w=2000&q=90",
    badge: "Simple. Secure. Reliable.",
    title: "Smarter Procurement",
    highlight: "Starts Here",
    description:
      "Manage your medicine purchases with an easy-to-use platform built for modern healthcare businesses.",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrent(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="relative h-[calc(100vh-5rem)] min-h-[600px] w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current
              ? "z-10 opacity-100"
              : "z-0 opacity-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-slate-950/55" />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/45 to-slate-950/20" />

          {/* Content */}
          <div className="relative z-20 flex h-full items-center">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
              <div className="max-w-3xl text-white">
                {/* Badge */}
                <div className="mb-5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur-md sm:mb-6 sm:text-sm">
                  <span className="mr-2 h-2 w-2 rounded-full bg-[#14B8A6]" />
                  {slide.badge}
                </div>

                {/* Heading */}
                <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  {slide.title}
                  <span className="mt-2 block text-[#5EEAD4]">
                    {slide.highlight}
                  </span>
                </h1>

                {/* Description */}
                <p className="mt-5 max-w-2xl text-sm leading-6 text-white/80 sm:mt-6 sm:text-base sm:leading-7 md:text-lg">
                  {slide.description}
                </p>

                {/* Buttons */}
                <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                  <a
                    href="/products"
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-[#14B8A6] px-7 text-sm font-bold text-slate-950 transition hover:bg-[#2DD4BF] active:scale-[0.98] sm:h-13"
                  >
                    Browse Medicines
                  </a>

                  <a
                    href="/quote"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-7 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 active:scale-[0.98] sm:h-13"
                  >
                    Request a Quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Previous Button */}
      <button
        type="button"
        onClick={previousSlide}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition hover:bg-white/20 sm:flex lg:left-6"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Next Button */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition hover:bg-white/20 sm:flex lg:right-6"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 sm:bottom-9">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === current
                ? "w-8 bg-white"
                : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Mobile swipe-style arrows */}
      <div className="absolute bottom-6 right-4 z-30 flex gap-2 sm:hidden">
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-24 bg-gradient-to-t from-slate-950/30 to-transparent" />
    </section>
  );
}