// app/manufacturers/page.tsx
import { Suspense } from "react";

import CarManufacturersClient from "./car-manufacturers-client";
import { getCarMakes } from "@/lib/actions";

export const metadata = {
  title: "Browse Car Manufacturers",
  description: "Find and browse vehicles by car manufacturer"
};

export default async function ManufacturersPage() {
  // Fetch initial car makes data on the server
  const initialData = await getCarMakes({limit: 30});

 
  
  return (
    <main className="container py-8 px-4 md:px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Browse by car manufacturer</h1>
      
      <Suspense fallback={<div className="flex justify-center py-12"><CarManufacturersLoading /></div>}>
        <CarManufacturersClient initialData={initialData} />
      </Suspense>
    </main>
  );
}

// Loading skeleton component
function CarManufacturersLoading() {
  return (
    <div className="w-full max-w-6xl mx-auto container">
      <div className="h-10 bg-gray-200 rounded-md animate-pulse mb-8"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Array.from({ length: 15 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3 p-4 rounded-lg border border-gray-200">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
          </div>
        ))}
      </div>
    </div>
  );
}