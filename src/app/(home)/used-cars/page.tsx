import { Suspense } from "react"
import { getCertifiedPreOwnedCars, getPopularUsedCarMakes } from "@/lib/browse-actions"
import { UsedCarsContent } from "@/components/cars/used-cars-content"
import { CertifiedPreOwned } from "@/components/cars/certified-pre-owned"
import { PopularCarMakes } from "@/components/makes/popular-car-makes"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Used Cars | Karshi & Karz",
  description: "Browse our selection of quality pre-owned vehicles at competitive prices",
}

// Loading skeleton for the page
function UsedCarsLoading() {
  return (
    <div className="container px-4 py-8 md:px-6">
      <div className="mb-8">
        <Skeleton className="h-12 w-64 mb-4" />
        <Skeleton className="h-6 w-full max-w-2xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div>
          <Skeleton className="h-[500px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export default async function UsedCarsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Parse search params
  const page = searchParams.page ? Number.parseInt(searchParams.page as string) : 1
  const search = searchParams.search as string | undefined
  const makes = searchParams.makes ? [searchParams.makes as string] : undefined
  const models = searchParams.models ? [searchParams.models as string] : undefined
  const bodyTypes = searchParams.bodyTypes ? [searchParams.bodyTypes as string] : undefined
  const priceMin = searchParams.priceMin ? Number.parseInt(searchParams.priceMin as string) : undefined
  const priceMax = searchParams.priceMax ? Number.parseInt(searchParams.priceMax as string) : undefined
  const colors = searchParams.colors ? [searchParams.colors as string] : undefined
  const fuelTypes = searchParams.fuelTypes ? [searchParams.fuelTypes as string] : undefined
  const transmissions = searchParams.transmissions ? [searchParams.transmissions as string] : undefined
  const yearMin = searchParams.yearMin ? Number.parseInt(searchParams.yearMin as string) : undefined
  const yearMax = searchParams.yearMax ? Number.parseInt(searchParams.yearMax as string) : undefined
  const mileageMin = searchParams.mileageMin ? Number.parseInt(searchParams.mileageMin as string) : undefined
  const mileageMax = searchParams.mileageMax ? Number.parseInt(searchParams.mileageMax as string) : undefined
  const ownersMax = searchParams.ownersMax ? Number.parseInt(searchParams.ownersMax as string) : undefined
  const serviceHistory = searchParams.serviceHistory === "true"
  const accidentFree = searchParams.accidentFree === "true"
  const warrantyRemaining = searchParams.warrantyRemaining === "true"
  const certifiedPreOwned = searchParams.certifiedPreOwned === "true"
  const sortBy = searchParams.sortBy as "price-low" | "price-high" | "newest" | "mileage-low" | "year-new" | undefined

  // Fetch data
  const certifiedCarsData = await getCertifiedPreOwnedCars()
  const popularMakesData = await getPopularUsedCarMakes()

  return (
    <main>
      <section className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Used Cars</h1>
            <p className="text-xl text-muted-foreground">
              Find quality pre-owned vehicles that have been thoroughly inspected and are ready for the road.
            </p>
          </div>
        </div>
      </section>

      {certifiedCarsData.success && certifiedCarsData.data.length > 0 && (
        <CertifiedPreOwned cars={certifiedCarsData.data} />
      )}

      {popularMakesData.success && popularMakesData.data.length > 0 && (
        <section className="py-12 bg-white w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Popular Used Car Makes</h2>
            <PopularCarMakes makes={popularMakesData.data} />
          </div>
        </section>
      )}

      <Suspense fallback={<UsedCarsLoading />}>
        <UsedCarsContent
          page={page}
          search={search}
          makes={makes}
          models={models}
          bodyTypes={bodyTypes}
          priceMin={priceMin}
          priceMax={priceMax}
          colors={colors}
          fuelTypes={fuelTypes}
          transmissions={transmissions}
          yearMin={yearMin}
          yearMax={yearMax}
          mileageMin={mileageMin}
          mileageMax={mileageMax}
          ownersMax={ownersMax}
          serviceHistory={serviceHistory}
          accidentFree={accidentFree}
          warrantyRemaining={warrantyRemaining}
          certifiedPreOwned={certifiedPreOwned}
          sortBy={sortBy}
        />
      </Suspense>
    </main>
  )
}

