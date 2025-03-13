import Link from "next/link"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface VehicleListItemProps {
  vehicle: any
}

export function VehicleListItem({ vehicle }: VehicleListItemProps) {
  // Get the first image or use a placeholder
  const imageUrl =
    vehicle.images && vehicle.images.length > 0 ? vehicle.images[0] : `/placeholder.svg?height=200&width=300`

  // Format price
  const price = vehicle.pricing_payments?.selling_price
    ? formatCurrency(vehicle.pricing_payments.selling_price)
    : "Price on request"

  // Get key specs
  const transmission = vehicle.car_specifications?.transmission_type || "N/A"
  const fuelType = vehicle.car_specifications?.fuel_type || "N/A"
  const mileage = vehicle.car_specifications?.mileage
    ? `${vehicle.car_specifications.mileage} ${vehicle.car_specifications.mileage_unit}`
    : "N/A"
  const year = vehicle.year || "N/A"

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/car/${vehicle.slug}`}>
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="relative h-48 md:h-auto md:w-64 flex-shrink-0">
              <Image src={imageUrl || "/placeholder.svg"} alt={vehicle.title} fill className="object-cover" />
              {vehicle.big_deal && <Badge className="absolute top-2 left-2 bg-primary text-white">Big Deal</Badge>}
            </div>

            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="font-semibold text-lg mb-1">{vehicle.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                  {vehicle.description || "No description available"}
                </p>

                <div className="grid grid-cols-4 gap-2 text-sm text-muted-foreground mb-4">
                  <div className="flex flex-col p-2 bg-gray-50 rounded">
                    <span className="font-medium">{year}</span>
                    <span className="text-xs">Year</span>
                  </div>
                  <div className="flex flex-col p-2 bg-gray-50 rounded">
                    <span className="font-medium capitalize">{transmission}</span>
                    <span className="text-xs">Trans</span>
                  </div>
                  <div className="flex flex-col p-2 bg-gray-50 rounded">
                    <span className="font-medium capitalize">{fuelType}</span>
                    <span className="text-xs">Fuel</span>
                  </div>
                  <div className="flex flex-col p-2 bg-gray-50 rounded">
                    <span className="font-medium">{mileage}</span>
                    <span className="text-xs">Mileage</span>
                  </div>
                </div>
              </div>

              <div className="text-xl font-bold text-primary">{price}</div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

