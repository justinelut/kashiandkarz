// components/CarsList.tsx (Client Component)
"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Car {
  $id: string
  slug: string
  car_model: string
  year: string
  condition: string
  fuel_type: string
  transmission_type: string
  car_make: {
    name: string
    slug: string
    image?: string
  }
  images: string[]
  selling_price: string
  currency: string
}

interface CarsListProps {
  cars: Car[]
}

export default function CarsList({ cars }: CarsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {cars.map((car) => (
        <Link key={car.$id} href={`/dashboard/cars/${car.$id}`}>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            {car.images?.length ? (
              <div className="relative h-48 w-full">
                <Image
                  src={car.images[0]}
                  alt={`${car.car_make.name} ${car.car_model}`}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-48 w-full bg-muted flex items-center justify-center">
                <span>No Image</span>
              </div>
            )}
            <CardContent className="p-4">
              <h3 className="text-xl font-bold">
                {car.year} {car.car_make.name} {car.car_model}
              </h3>
              <p className="text-sm text-muted-foreground">{car.condition}</p>
              <p className="mt-2 font-semibold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: car.currency,
                  maximumFractionDigits: 0,
                }).format(Number(car.selling_price))}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
