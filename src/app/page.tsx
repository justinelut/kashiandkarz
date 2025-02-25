import BrowseInventory from "@/components/browse-inventory";
import HeroSection from "@/components/hero-section";
import HeroText from "@/components/hero-text";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <HeroText />
      <BrowseInventory />
    </div>
  );
}
