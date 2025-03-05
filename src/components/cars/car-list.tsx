"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { saveReviewSubmit, updateStatus } from "@/lib/actions"

export type Car = {
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
  status: "published" | "draft"
  availability: boolean
  featured: boolean
}

export type ReviewSubmit = {
  status: "published" | "draft"
  availability: boolean
  slug: string
  featured: boolean
}

interface CarsListProps {
  cars: Car[]
}

export default function CarsList({ cars }: CarsListProps) {
  // Local copy to immediately reflect admin updates.
  const [updatedCars, setUpdatedCars] = useState<Car[]>(cars)

  useEffect(() => {
    setUpdatedCars(cars)
  }, [cars])

  // Call the API update on change. Combines current car review data with the update.
  async function handleUpdate(car: Car, updatedValues: Partial<ReviewSubmit>) {
    const newReviewData: ReviewSubmit = {
      status: updatedValues.status ?? car.status,
      availability: updatedValues.availability ?? car.availability,
      slug: car.slug, // unchanged
      featured: updatedValues.featured ?? car.featured,
    }
    const result = await updateStatus(newReviewData, car.$id)
    if (result.success) {
      toast.success("Car updated successfully")
      setUpdatedCars((prev) =>
        prev.map((c) => (c.$id === car.$id ? { ...c, ...updatedValues } : c)),
      )
    } else {
      toast.error("Error updating car", {
        description: result.error || "",
      })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {updatedCars.map((car) => (
        <Card key={car.$id} className="space-y-4 shadow hover:shadow-xl transition-shadow">
          <Link href={`/dashboard/cars/${car.$id}`}>
            <div className="relative h-48 w-full">
              {car.images?.length ? (
                <Image
                  src={car.images[0]}
                  alt={`${car.car_make.name} ${car.car_model}`}
                  fill
                  className="object-cover rounded-t-md"
                />
              ) : (
                <div className="h-48 w-full bg-muted flex items-center justify-center rounded-t-md">
                  <span>No Image</span>
                </div>
              )}
            </div>
          </Link>
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
          {/* Admin Controls – update onChange */}
          <div className="border-t border-gray-200 px-4 py-3">
            <div className="flex flex-col space-y-3">
              {/* Status: using shadcn Select */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Select
                  value={car.status}
                  onValueChange={(value: "published" | "draft") =>
                    handleUpdate(car, { status: value })
                  }
                >
                  <SelectTrigger className="w-32 text-sm">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Availability: using shadcn Switch */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Availability</span>
                <Switch
                  checked={car.availability}
                  onCheckedChange={(checked) =>
                    handleUpdate(car, { availability: Boolean(checked) })
                  }
                />
              </div>
              {/* Featured: using shadcn Switch */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Featured</span>
                <Switch
                  checked={car.featured}
                  onCheckedChange={(checked) =>
                    handleUpdate(car, { featured: Boolean(checked) })
                  }
                />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
