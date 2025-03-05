// app/cars/page.tsx (Server Component)
import React from "react"
 // adjust path as needed
import CarsList from "@/components/cars/car-list"
import { getAllCars } from "@/lib/actions"

export default async function CarsPage() {
  const cars = await getAllCars()

  // Ensure you have a fallback in case of errors or empty array
  if (!cars || !Array.isArray(cars)) {
    return <p>Error loading cars.</p>
  }

  return <CarsList cars={cars} />
}
