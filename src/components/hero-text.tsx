"use client"

import { Button } from "./ui/button";

const HeroText = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center my-10">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-2xl md:text-4xl font-semibold text-gray-50 mb-6">
          Find Your Perfect Drive
        </h1>
        <p className="text-xl text-gray-200 mb-8">
          Cars with quality assurance and exceptional service. Start your
          journey with KashiandKarz today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="text-lg bg-gray-50 text-gray-950 hover:bg-gray-200"
          >
            Browse Inventory
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg text-gray-50 border-gray-50 hover:bg-gray-50/10"
          >
            Schedule Test Drive
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroText;
