import BrowseInventory from "@/components/browse-inventory";
import CallToAction from "@/components/CallToAction";
import HeroSection from "@/components/hero-section";
import HeroText from "@/components/hero-text";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <div>
      <HeroSection  />
      <HeroText />
      <BrowseInventory />
      <Testimonials />
      <CallToAction />
    </div>
  );
}
