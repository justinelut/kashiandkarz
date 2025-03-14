import { getCategoryBySlug } from "@/lib/category-actions"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  // Fetch the category by slug
  const { success, data: category, error } = await getCategoryBySlug(params.slug)

  // If category not found, show 404
  if (!success || !category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold md:text-4xl">{category.name} vehicles</h1>
        <p className="mt-2 text-muted-foreground">Browse our selection of {category.name.toLowerCase()} vehicles</p>
      </div>

      {category.car_info && category.car_info.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {category.car_info.map((car) => (
            <div key={car.$id} className="overflow-hidden rounded-xl bg-gray-100 p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold">{car.title || car.car_model}</h3>
                  <p className="text-muted-foreground">{car.description}</p>
                </div>

                {car.big_deal && (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#00e1e1] text-black hover:bg-[#00e1e1]/90">Big Deal</Badge>
                  </div>
                )}

                <div className="relative aspect-[2/1] overflow-hidden rounded-lg">
                  {car.images && car.images.length > 0 ? (
                    <Image
                      src={car.images[0] || "/placeholder.svg"}
                      alt={car.title || car.car_model}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src="/placeholder.svg?height=300&width=600"
                      alt={car.title || car.car_model}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-white p-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Price</div>
                      <div className="font-semibold">
                        {car.pricing_payments?.selling_price
                          ? `KES ${car.pricing_payments.selling_price.toLocaleString()}`
                          : "Price on request"}
                      </div>
                    </div>
                    <Link href={`/car/${car.slug}`}>
                      <Button size="icon" className="rounded-full bg-black hover:bg-black/90">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg bg-gray-100 p-8 text-center">
          <p className="text-lg">No vehicles available in this category at the moment.</p>
          <Link href="/categories" className="mt-4 inline-block">
            <Button variant="outline">Browse all categories</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

