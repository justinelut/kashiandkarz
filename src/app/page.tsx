import CarBrands from "@/components/brands";
import CallToAction from "@/components/callToAction";
import HeroSection from "@/components/herosection";
import MostSearched from "@/components/mostSearched";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <MostSearched />
      <CarBrands />
      <CallToAction />
    </div>
  );
}
