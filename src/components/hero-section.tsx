import { Button } from "./ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <Image
          src="/hero_img1.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 to-gray-950/70" />
      </div>
    </section>
  );
};

export default HeroSection;
