import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Filter, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getAllCarTypesWithCars } from "@/lib/category-actions"
import { formatCurrency } from "@/lib/utils"

// Loading component
function CategoriesLoading() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 h-10 w-3/4 animate-pulse rounded-md bg-gray-200"></div>
      <div className="mb-8">
        <div className="mb-2 h-5 w-1/4 animate-pulse rounded-md bg-gray-200"></div>
        <div className="flex flex-wrap gap-2">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-10 w-24 animate-pulse rounded-full bg-gray-200"></div>
            ))}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="overflow-hidden rounded-xl bg-gray-100 p-6">
              <div className="space-y-4">
                <div>
                  <div className="mb-2 h-6 w-3/4 animate-pulse rounded-md bg-gray-200"></div>
                  <div className="h-4 w-full animate-pulse rounded-md bg-gray-200"></div>
                </div>
                <div className="relative aspect-[2/1] animate-pulse rounded-lg bg-gray-200"></div>
                <div className="space-y-3">
                  <div className="h-16 animate-pulse rounded-lg bg-gray-200"></div>
                  <div className="h-16 animate-pulse rounded-lg bg-gray-200"></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

// Car card component
function CarCard({ car }: { car: any }) {
  const carName = car.title || `${car.car_make?.name || "Unknown"} ${car.car_model || "Model"}`
  const imageUrl = car.images?.[0] || "/placeholder.svg?height=300&width=600"
  const condition = car.condition || "used"
  const price = car.pricing_payments?.selling_price || 0
  const slug = car.slug || ""

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="space-y-4 p-6">
          <div>
            <h3 className="text-xl font-bold line-clamp-1">{carName}</h3>
            <p className="text-muted-foreground line-clamp-2">{car.description || "No description available"}</p>
          </div>

          {car.car_specifications?.safety_rating && (
            <div className="flex items-center gap-2">
              <Badge className="bg-[#00e1e1] text-black hover:bg-[#00e1e1]/90">
                {car.car_specifications.safety_rating}/10
              </Badge>
              <Link href={`/car/${slug}`} className="text-sm underline hover:text-[#00e1e1]">
                View details
              </Link>
            </div>
          )}

          <div className="relative aspect-[2/1] overflow-hidden rounded-lg">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={carName}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
            {car.big_deal && <Badge className="absolute left-2 top-2 bg-red-500 text-white">Big Deal</Badge>}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
              <div>
                <div className="text-sm text-muted-foreground capitalize">
                  {condition} {carName.split(" ")[0]}
                </div>
                <div className="font-semibold">{price ? `${formatCurrency(price)}` : "Price on request"}</div>
              </div>
              <Button size="icon" className="rounded-full bg-black hover:bg-black/90" asChild>
                <Link href={`/car/${slug}`}>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
              <div>
                <div className="text-sm text-muted-foreground">Specifications</div>
                <div className="flex gap-2 text-sm">
                  {car.car_specifications?.fuel_type && (
                    <span className="capitalize">{car.car_specifications.fuel_type}</span>
                  )}
                  {car.car_specifications?.transmission_type && (
                    <>
                      <span>•</span>
                      <span className="capitalize">{car.car_specifications.transmission_type}</span>
                    </>
                  )}
                  {car.car_specifications?.engine_capacity && (
                    <>
                      <span>•</span>
                      <span>{car.car_specifications.engine_capacity}L</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Categories page component
export default async function EnhancedCategoriesPage({
  searchParams,
}: {
  searchParams: { type?: string }
}) {
  const selectedType = searchParams.type || "all"

  // Fetch car types with their cars
  const { data: carTypesWithCars } = await getAllCarTypesWithCars(6)

  // Create a list of car types for the tabs
  const carTypes = [
    { name: "All", slug: "all" },
    ...(carTypesWithCars || []).map((type: any) => ({
      name: type.name,
      slug: type.slug,
    })),
  ]

  // Filter cars based on selected type
  let displayedCars: any[] = []
  let totalCount = 0

  if (selectedType === "all") {
    // For "All", collect cars from all types
    displayedCars = (carTypesWithCars || []).flatMap((type: any) => type.car_info || [])
    totalCount = displayedCars.length
  } else {
    // For specific type, get cars of that type
    const selectedTypeData = (carTypesWithCars || []).find((type: any) => type.slug === selectedType)
    displayedCars = selectedTypeData?.car_info || []
    totalCount = displayedCars.length
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <h1 className="mb-8 text-3xl font-bold md:text-4xl">
        {selectedType === "all"
          ? "All car types available on carwow"
          : `${carTypes.find((t) => t.slug === selectedType)?.name || ""} cars available on carwow`}
      </h1>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:w-auto">
          <div className="mb-2 text-sm text-muted-foreground">Filter by car type:</div>
          <Tabs defaultValue={selectedType} className="w-full">
            <TabsList className="h-auto flex-wrap bg-transparent p-0">
              {carTypes.map((type) => (
                <TabsTrigger
                  key={type.slug}
                  value={type.slug}
                  className="rounded-full data-[state=active]:bg-[#00e1e1] data-[state=active]:text-black"
                  asChild
                >
                  <Link href={`/categories?type=${type.slug}`}>{type.name}</Link>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search cars..." className="pl-10" />
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-bold">{totalCount} models match filter</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
            <option>Most Popular</option>
          </select>
        </div>
      </div>

      {displayedCars.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedCars.map((car: any) => (
            <CarCard key={car.$id} car={car} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-12 text-center">
          <div className="mb-4 rounded-full bg-gray-100 p-3">
            <Filter className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">No cars found</h3>
          <p className="mb-4 text-muted-foreground">We couldn't find any cars matching your current filters.</p>
          <Button asChild>
            <Link href="/categories">Clear all filters</Link>
          </Button>
        </div>
      )}

      {displayedCars.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="gap-2">
            Load more cars
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

