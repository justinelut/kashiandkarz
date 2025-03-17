import { getUsedCars } from "@/lib/browse-actions"
import { VehicleCard } from "@/components/vehicles/vehicle-card"
import { UsedCarsFilter } from "@/components/cars/used-cars-filter"
import { Pagination } from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"

interface UsedCarsContentProps {
  page: number
  search?: string
  makes?: string[]
  models?: string[]
  bodyTypes?: string[]
  priceMin?: number
  priceMax?: number
  colors?: string[]
  fuelTypes?: string[]
  transmissions?: string[]
  yearMin?: number
  yearMax?: number
  mileageMin?: number
  mileageMax?: number
  ownersMax?: number
  serviceHistory?: boolean
  accidentFree?: boolean
  warrantyRemaining?: boolean
  certifiedPreOwned?: boolean
  sortBy?: "price-low" | "price-high" | "newest" | "mileage-low" | "year-new"
}

export async function UsedCarsContent({
  page,
  search,
  makes,
  models,
  bodyTypes,
  priceMin,
  priceMax,
  colors,
  fuelTypes,
  transmissions,
  yearMin,
  yearMax,
  mileageMin,
  mileageMax,
  ownersMax,
  serviceHistory,
  accidentFree,
  warrantyRemaining,
  certifiedPreOwned,
  sortBy,
}: UsedCarsContentProps) {
  // Fetch cars with filters
  const carsResult = await getUsedCars({
    page,
    search,
    makes,
    models,
    bodyTypes,
    priceMin,
    priceMax,
    colors,
    fuelTypes,
    transmissions,
    yearMin,
    yearMax,
    mileageMin,
    mileageMax,
    ownersMax,
    serviceHistory,
    accidentFree,
    warrantyRemaining,
    certifiedPreOwned,
    sortBy,
    limit: 12,
  })

  // Handle pagination
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams()

    // Add all current filters
    if (search) params.set("search", search)
    if (makes) params.set("makes", makes[0])
    if (models) params.set("models", models[0])
    if (bodyTypes) params.set("bodyTypes", bodyTypes[0])
    if (priceMin) params.set("priceMin", priceMin.toString())
    if (priceMax) params.set("priceMax", priceMax.toString())
    if (colors) params.set("colors", colors[0])
    if (fuelTypes) params.set("fuelTypes", fuelTypes[0])
    if (transmissions) params.set("transmissions", transmissions[0])
    if (yearMin) params.set("yearMin", yearMin.toString())
    if (yearMax) params.set("yearMax", yearMax.toString())
    if (mileageMin) params.set("mileageMin", mileageMin.toString())
    if (mileageMax) params.set("mileageMax", mileageMax.toString())
    if (ownersMax) params.set("ownersMax", ownersMax.toString())
    if (serviceHistory) params.set("serviceHistory", "true")
    if (accidentFree) params.set("accidentFree", "true")
    if (warrantyRemaining) params.set("warrantyRemaining", "true")
    if (certifiedPreOwned) params.set("certifiedPreOwned", "true")
    if (sortBy) params.set("sortBy", sortBy)

    // Set the page number
    params.set("page", pageNumber.toString())

    return `/used-cars?${params.toString()}`
  }

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <div className="lg:col-span-1">
            <UsedCarsFilter
              currentFilters={{
                search,
                makes,
                models,
                bodyTypes,
                priceMin,
                priceMax,
                colors,
                fuelTypes,
                transmissions,
                yearMin,
                yearMax,
                mileageMin,
                mileageMax,
                ownersMax,
                serviceHistory,
                accidentFree,
                warrantyRemaining,
                certifiedPreOwned,
                sortBy,
              }}
            />
          </div>

          {/* Cars grid */}
          <div className="lg:col-span-3">
            {carsResult.success ? (
              <>
                {carsResult.data.length > 0 ? (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">{carsResult.pagination.total} Used Cars Available</h2>
                      <div className="text-sm text-muted-foreground">
                        Page {page} of {carsResult.pagination.totalPages}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {carsResult.data.map((car) => (
                        <VehicleCard key={car.$id} vehicle={car} />
                      ))}
                    </div>

                    {carsResult.pagination.totalPages > 1 && (
                      <div className="flex justify-center mt-8">
                        <Pagination
                          currentPage={page}
                          totalPages={carsResult.pagination.totalPages}
                          baseUrl={createPageURL(1).split("page=")[0]}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No cars found</h3>
                    <p className="text-muted-foreground mb-6">Try adjusting your filters to see more results</p>
                    <Button asChild>
                      <a href="/used-cars">Clear All Filters</a>
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">Error loading cars</h3>
                <p className="text-muted-foreground">{carsResult.error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

