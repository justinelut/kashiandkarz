import Link from "next/link"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface VehicleCardProps {
  vehicle: any
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
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
  const year = vehicle.year || "N/A"

  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
      <Link href={`/car/${vehicle.slug}`}>
        <div className="relative h-48 w-full">
          <Image src={imageUrl || "/placeholder.svg"} alt={vehicle.title} fill className="object-cover" />
          {vehicle.big_deal && <Badge className="absolute top-2 left-2 bg-primary text-white">Big Deal</Badge>}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-2 mb-1">{vehicle.title}</h3>

          <div className="text-xl font-bold text-primary mb-3">{price}</div>

          <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
            <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
              <span className="font-medium">{year}</span>
              <span className="text-xs">Year</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
              <span className="font-medium capitalize">{transmission}</span>
              <span className="text-xs">Trans</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
              <span className="font-medium capitalize">{fuelType}</span>
              <span className="text-xs">Fuel</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

