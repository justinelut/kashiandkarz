import CarBrandsCarousel from "@/components/brands-carousel";
import BrowseInventory from "@/components/browse-inventory";
import CallToAction from "@/components/CallToAction";
import HeroText from "@/components/hero-text";
import HeroWithNavbar from "@/components/hero-section";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <div>
      <HeroWithNavbar />
      <HeroText />
      <BrowseInventory />
      <Testimonials />
      <CallToAction />
      <CarBrandsCarousel />
    </div>
  );
}
