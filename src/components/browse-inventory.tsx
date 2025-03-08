// app/cars/page.tsx (example path)
import { getAllCars } from "@/lib/actions"
import { CarCard } from "@/components/car-card"
import { ChevronRight, Flame } from "lucide-react"

export default async function CarsPage() {
  // Fetch all cars on the server
  const cars = await getAllCars()

  return (
    <div className="container mx-auto p-4 max-w-6xl bg-gray-100 min-h-screen">
      {/* Header section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Flame className="h-12 w-12 text-teal-500" />
          <h1 className="text-3xl font-bold">Big deals on wheels</h1>
        </div>
        <p className="text-gray-700 text-lg">Say hello to the hottest deals on the market</p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 relative">
        {cars.map((car) => (
          <CarCard key={car.$id} item={car} />
        ))}
        
        {/* Right arrow navigation */}
        <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <div className="bg-white rounded-full shadow-md p-4 cursor-pointer">
            <ChevronRight className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  )
}
