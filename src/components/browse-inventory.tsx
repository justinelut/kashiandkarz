"use client";

import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { cars } from "@/data/cars";
import { CarCard } from "./car-card";

const BrowseInventory = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              {...car}
              onViewDetails={(id) => console.log('View details:', id)}
              onFavorite={(id) => console.log('Favorite:', id)}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="text-lg border-gray-950 text-gray-950 hover:bg-gray-950 hover:text-gray-50"
          >
            View All Vehicles <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BrowseInventory;
