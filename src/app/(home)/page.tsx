import CarBrandsCarousel from "@/components/brands-carousel";
import BrowseInventory from "@/components/browse-inventory";
import HeroText from "@/components/hero-text";
import HeroWithNavbar from "@/components/hero-section";
import Testimonials from "@/components/testimonials";
import CarManufacturersPage from "./components/car-makes";

export default function Home() {
  return (
    <div>
      <HeroWithNavbar />
      <HeroText />
      <BrowseInventory />
      <CarManufacturersPage />
      <Testimonials />
      {/* <CarBrandsCarousel /> */}
    </div>
  );
}
