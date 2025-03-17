import Link from "next/link"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface SpecialOffersProps {
  offers: any[]
}

export function SpecialOffers({ offers }: SpecialOffersProps) {
  if (!offers || offers.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Special Offers</h2>
            <p className="text-muted-foreground mt-2">Limited-time deals on new vehicles</p>
          </div>
          <Link href="/new-cars?specialOffers=true">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Offers
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((car) => {
            // Get the first image or use a placeholder
            const imageUrl =
              car.images && car.images.length > 0 ? car.images[0] : `/placeholder.svg?height=200&width=300`

            // Calculate discount percentage if available
            const originalPrice = car.pricing_payments?.original_price
            const currentPrice = car.pricing_payments?.selling_price
            const discountPercent =
              originalPrice && currentPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : null

            return (
              <Card key={car.$id} className="overflow-hidden h-full transition-all hover:shadow-md">
                <Link href={`/car/${car.slug}`}>
                  <div className="relative h-48 w-full">
                    <Image src={imageUrl || "/placeholder.svg"} alt={car.title} fill className="object-cover" />
                    <Badge className="absolute top-2 left-2 bg-red-600 text-white">Special Offer</Badge>
                    {discountPercent && (
                      <Badge className="absolute top-2 right-2 bg-green-600 text-white">Save {discountPercent}%</Badge>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-2 mb-1">{car.title}</h3>

                    <div className="flex items-end gap-2 mb-3">
                      <div className="text-xl font-bold text-primary">
                        {formatCurrency(car.pricing_payments?.selling_price)}
                      </div>
                      {originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          {formatCurrency(originalPrice)}
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {car.special_offer_description || "Limited time offer. Contact us for details."}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="font-medium">Offer ends:</span>{" "}
                        {car.special_offer_end_date || "While supplies last"}
                      </div>
                      <Button size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

