// app/car-manufacturers/page.tsx
import { Suspense } from "react";
import { getCarMakes } from "@/lib/actions";
import CarManufacturerGrid from "@/components/car-manufacturer-grid";

export const metadata = {
  title: "Browse Car Manufacturers",
  description: "Browse vehicles by car manufacturer"
};

export default async function CarManufacturersPage() {
  // Fetch car makes on the server
  const carMakes = await getCarMakes({limit: 30});

  console.log(carMakes)
  
  return (
    <main className="mx-auto container max-w-6xl py-10">
      <h1 className="text-3xl font-bold mb-8">Browse by car manufacturer</h1>
      
      <Suspense fallback={<div className="text-center py-12">Loading car manufacturers...</div>}>
        <CarManufacturerGrid carMakes={carMakes.data} />
      </Suspense>
    </main>
  );
}