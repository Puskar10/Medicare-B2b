import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import WhyUs from "../components/home/WhyUs";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";
import HeroCarousel from "../components/home/HeroCarousel";
import BannerCarousel from "../components/home/BannerCarousel";
import Catalog from "../components/products/Catalog";


export default function Home() {
  return (
    <>
     {/* <HeroCarousel />
      <Hero /> */}
      {/* <Categories /> */}
      {/* <BannerCarousel /> */}
      <Catalog />
      <WhyUs />
      <Testimonials />
      {/* <CTA /> */}
    </>
  );
}