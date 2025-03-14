import { getAllCarTypesWithCars } from "@/lib/category-actions"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function CategoriesPage() {
  // Fetch car types with their nested car_info
  const { success, data: carTypes, error } = await getAllCarTypesWithCars()

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <h1 className="mb-8 text-3xl font-bold md:text-4xl">Browse vehicles by category</h1>

      <div className="mb-8">
        <div className="mb-2 text-sm text-muted-foreground">Filter by category type:</div>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="h-auto flex-wrap bg-transparent p-0">
            <TabsTrigger
              value="all"
              className="rounded-full data-[state=active]:bg-[#00e1e1] data-[state=active]:text-black"
            >
              All Categories
            </TabsTrigger>

            {success &&
              carTypes.map((carType) => (
                <TabsTrigger
                  key={carType.slug}
                  value={carType.slug}
                  className="rounded-full data-[state=active]:bg-[#00e1e1] data-[state=active]:text-black"
                >
                  {carType.name}
                </TabsTrigger>
              ))}
          </TabsList>
        </Tabs>
      </div>

      {success ? (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-bold">{carTypes.length} categories available</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {carTypes.map((carType) => (
              <div key={carType.$id} className="overflow-hidden rounded-xl bg-gray-100 p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">{carType.name}</h3>
                    <p className="text-muted-foreground">Browse all {carType.name.toLowerCase()} vehicles</p>
                    {carType.car_info && (
                      <p className="mt-1 text-sm text-muted-foreground">{carType.car_info.length} vehicles available</p>
                    )}
                  </div>

                  <div className="relative aspect-[2/1] overflow-hidden rounded-lg">
                    <Image
                      src={carType?.image}
                      alt={carType?.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {carType.car_info && carType.car_info.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium">Featured vehicles:</h4>
                      {carType.car_info.slice(0, 2).map((car) => (
                        <div key={car.$id} className="flex items-center justify-between rounded-lg bg-white p-4">
                          <div>
                            <div className="font-semibold">{car.title || car.car_model}</div>
                            <div className="text-sm text-muted-foreground">
                              {car.pricing_payments?.selling_price
                                ? `From KES ${car.pricing_payments.selling_price.toLocaleString()}`
                                : "Price on request"}
                            </div>
                          </div>
                          <Link href={`/car/${car.slug}`}>
                            <Button size="icon" className="rounded-full bg-black hover:bg-black/90">
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Link href={`/categories/${carType.slug}`}>
                      <Button className="rounded-full bg-black hover:bg-black/90">
                        View all {carType.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-lg bg-red-50 p-4 text-red-800">
          <p>Error loading categories: {error || "Unknown error"}</p>
        </div>
      )}
    </div>
  )
}

