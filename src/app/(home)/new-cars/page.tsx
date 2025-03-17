import { Suspense } from "react"
import { getSpecialOffers, getPopularNewCarMakes } from "@/lib/browse-actions"
import { NewCarsContent } from "@/components/cars/new-cars-content"
import { SpecialOffers } from "@/components/cars/special-offers"
import { PopularCarMakes } from "@/components/makes/popular-car-makes"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "New Cars | Karshi & Karz",
  description: "Browse our selection of brand new vehicles from top manufacturers",
}

// Loading skeleton for the page
function NewCarsLoading() {
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

export default async function NewCarsPage({
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
  const sortBy = searchParams.sortBy as "price-low" | "price-high" | "newest" | "popularity" | undefined
  const specialOffers = searchParams.specialOffers === "true"
  const preOrder = searchParams.preOrder === "true"

  // Fetch data
  const specialOffersData = await getSpecialOffers()
  const popularMakesData = await getPopularNewCarMakes()

  return (
    <main>
      <section className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight mb-4">New Cars</h1>
            <p className="text-xl text-muted-foreground">
              Discover the latest models from top manufacturers with the newest technology and features.
            </p>
          </div>
        </div>
      </section>

      {specialOffersData.success && specialOffersData.data.length > 0 && (
        <SpecialOffers offers={specialOffersData.data} />
      )}

      {popularMakesData.success && popularMakesData.data.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Popular Manufacturers</h2>
            <PopularCarMakes makes={popularMakesData.data} />
          </div>
        </section>
      )}

      <Suspense fallback={<NewCarsLoading />}>
        <NewCarsContent
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
          sortBy={sortBy}
          specialOffers={specialOffers}
          preOrder={preOrder}
        />
      </Suspense>
    </main>
  )
}

