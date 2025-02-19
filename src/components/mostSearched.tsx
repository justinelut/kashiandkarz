"use client";

import { CarCard } from "./car-card";
import { Button } from "./ui/button";
import { MOCK_CARS } from "@/app/data";

const MostSearched = () => {
  const handleViewDetails = (id: string) => {
    console.log(`View details for car ${id}`);
  };

  const handleFavorite = (id: string) => {
    console.log(`Toggle favorite for car ${id}`);
  };

  return (
    <section className="container mx-auto py-8 md:py-16">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Most searched</h2>
        <Button variant="link" className="self-start sm:self-center">
          View all
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {MOCK_CARS.map((car) => (
          <CarCard
            key={car.id}
            {...car}
            onViewDetails={handleViewDetails}
            onFavorite={handleFavorite}
          />
        ))}
      </div>
    </section>
  );
};

export default MostSearched;
