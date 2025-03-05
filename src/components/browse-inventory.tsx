import { getAllCars } from "@/lib/actions"
import { CarCard } from "@/components/car-card"

export default async function CarsPage() {
  // Fetch all cars on the server
  const cars = await getAllCars()

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="mb-6 text-2xl font-bold">All Cars</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <CarCard key={car.id} item={car} />
        ))}
      </div>
    </div>
  )
}
