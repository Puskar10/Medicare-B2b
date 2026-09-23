import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import WhyUs from "../components/home/WhyUs";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <WhyUs />
      <Testimonials />
      <CTA />
    </>
  );
}