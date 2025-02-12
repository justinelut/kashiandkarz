import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] lg:min-h-[85vh] w-full">
      <Image
        src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
        alt="Hero cars"
        fill
        className="object-cover brightness-75"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-start">
          <div className="max-w-2xl space-y-6 mt-20 md:mt-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Find Your Perfect Drive
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-xl">
              Discover the finest selection of premium vehicles for your next
              adventure
            </p>
          </div>

          <div className="w-full max-w-4xl mt-8 md:mt-12">
            <div className="bg-white/95 p-4 md:p-6 rounded-xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <Input
                    placeholder="Enter city or ZIP"
                    className="w-full border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Car Brand
                  </label>
                  <Input
                    placeholder="Select brand"
                    className="w-full border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Price Range
                  </label>
                  <Input
                    placeholder="Set your budget"
                    className="w-full border-gray-200"
                  />
                </div>

                <div className="flex items-end">
                  <Button className="w-full h-[42px] bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center gap-2">
                    <SearchIcon className="w-4 h-4" />
                    <span>Search Cars</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-8 mt-8 text-white">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">1200+</span>
                <span className="text-gray-200">Cars Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">100%</span>
                <span className="text-gray-200">Verified Sellers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">24/7</span>
                <span className="text-gray-200">Support Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
