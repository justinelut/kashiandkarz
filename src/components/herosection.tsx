"use client";
import Image from "next/image";
import CarSearchForm from "./car-search";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px]">
      <Image
        src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
        alt="Hero cars"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
        <div className="container mx-auto px-4 text-center pt-16">
          <h1 className="text-5xl font-bold text-primary-foreground drop-shadow-md mb-6">
            Find Your Perfect Drive
          </h1>
          <p className="text-lg text-primary-foreground max-w-3xl mx-auto mb-8 drop-shadow-md">
            Discover the finest selection of premium vehicles for your next
            adventure
          </p>
          <div className="max-w-4xl mx-auto">
            <CarSearchForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
