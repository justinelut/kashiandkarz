"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Grid, List } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VehicleCard } from "@/components/vehicles/vehicle-card"
import { VehicleListItem } from "@/components/vehicles/vehicle-list-item"

interface CarMakeVehiclesProps {
  carMake: any
  initialSort: string
  initialView: string
}

export function CarMakeVehicles({ carMake, initialSort, initialView }: CarMakeVehiclesProps) {
  const [view, setView] = useState(initialView)
  const [sort, setSort] = useState(initialSort)
  const router = useRouter()
  const pathname = usePathname()

  // Get cars from car_info array
  const cars = carMake.car_info || []

  // Sort cars based on selected option
  const sortedCars = [...cars].sort((a, b) => {
    switch (sort) {
      case "price-low":
        return (a.pricing_payments?.selling_price || 0) - (b.pricing_payments?.selling_price || 0)
      case "price-high":
        return (b.pricing_payments?.selling_price || 0) - (a.pricing_payments?.selling_price || 0)
      case "year-new":
        return Number.parseInt(b.year) - Number.parseInt(a.year)
      case "year-old":
        return Number.parseInt(a.year) - Number.parseInt(b.year)
      case "name-asc":
        return a.title.localeCompare(b.title)
      case "name-desc":
        return b.title.localeCompare(a.title)
      case "newest":
      default:
        return new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
    }
  })

  // Update URL when sort or view changes
  const updateUrlParams = (newSort: string, newView: string) => {
    const params = new URLSearchParams()
    params.set("sort", newSort)
    params.set("view", newView)
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleSortChange = (value: string) => {
    setSort(value)
    updateUrlParams(value, view)
  }

  const handleViewChange = (value: string) => {
    setView(value)
    updateUrlParams(sort, value)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Available Vehicles</h2>
          <p className="text-muted-foreground">
            {cars.length} {cars.length === 1 ? "vehicle" : "vehicles"} from {carMake.name}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={sort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="year-new">Year: Newest First</SelectItem>
              <SelectItem value="year-old">Year: Oldest First</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>

          <Tabs value={view} onValueChange={handleViewChange} className="ml-2">
            <TabsList>
              <TabsTrigger value="grid" className="px-3">
                <Grid className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list" className="px-3">
                <List className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Vehicles */}
      {cars.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No vehicles available</h3>
          <p className="text-muted-foreground mt-2">There are currently no vehicles available from this manufacturer</p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCars.map((car) => (
            <VehicleCard key={car.$id} vehicle={car} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedCars.map((car) => (
            <VehicleListItem key={car.$id} vehicle={car} />
          ))}
        </div>
      )}
    </div>
  )
}

