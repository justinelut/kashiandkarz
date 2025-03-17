import Link from "next/link"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Check } from "lucide-react"

interface CertifiedPreOwnedProps {
  cars: any[]
}

export function CertifiedPreOwned({ cars }: CertifiedPreOwnedProps) {
  if (!cars || cars.length === 0) {
    return null
  }

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <h2 className="text-3xl font-bold tracking-tight">Certified Pre-Owned</h2>
            </div>
            <p className="text-muted-foreground">Quality used vehicles with extended warranty and peace of mind</p>
          </div>
          <Link href="/used-cars?certifiedPreOwned=true">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Certified Vehicles
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => {
            // Get the first image or use a placeholder
            const imageUrl =
              car.images && car.images.length > 0 ? car.images[0] : `/placeholder.svg?height=200&width=300`

            // Get key specs
            const transmission = car.car_specifications?.transmission_type || "N/A"
            const fuelType = car.car_specifications?.fuel_type || "N/A"
            const mileage = car.car_specifications?.mileage || "N/A"
            const year = car.year || "N/A"

            return (
              <Card key={car.$id} className="overflow-hidden h-full transition-all hover:shadow-md">
                <Link href={`/car/${car.slug}`}>
                  <div className="relative h-48 w-full">
                    <Image src={imageUrl || "/placeholder.svg"} alt={car.title} fill className="object-cover" />
                    <Badge className="absolute top-2 left-2 bg-blue-600 text-white flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      <span>Certified</span>
                    </Badge>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-2 mb-1">{car.title}</h3>

                    <div className="text-xl font-bold text-primary mb-2">
                      {formatCurrency(car.pricing_payments?.selling_price)}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-4">
                      <div>
                        <span className="font-medium">Year:</span> {year}
                      </div>
                      <div>
                        <span className="font-medium">Mileage:</span> {mileage}{" "}
                        {car.car_specifications?.mileage_unit || "km"}
                      </div>
                      <div>
                        <span className="font-medium">Transmission:</span> {transmission}
                      </div>
                      <div>
                        <span className="font-medium">Fuel Type:</span> {fuelType}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600" />
                        <span>Multi-point inspection</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600" />
                        <span>Extended warranty</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600" />
                        <span>Roadside assistance</span>
                      </div>
                    </div>

                    <Button size="sm" className="w-full">
                      View Details
                    </Button>
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

