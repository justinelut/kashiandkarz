

import { HeartIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"


interface CarCardProps {
  item: any
}

export const CarCard = ({ item }: CarCardProps) => {
  // Use the provided data structure
  const id = item.$id
  const name = `${item.car_make.name} ${item.car_model}`
  const year = item.year
  const transmission = item.transmission_type
  const fuelType = item.fuel_type
  const mileage = Number(item.mileage) || 0
  const price = Number(item.selling_price) || 0
  const imageUrl = item.images && item.images.length > 0 ? item.images[0] : ""
  const makeLogoUrl = item.car_make?.image
  const mileageUnit = item.mileage_unit

  return (
    <div className="group transition-all duration-300 hover:shadow-lg">
      <div className="p-4">
        <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-2 bg-white/80 hover:bg-white"
            
          >
            <HeartIcon className="h-5 w-5" />
          </Button>
        </div>

        {/* Car Make Logo + Name */}
        <div className="mb-2 flex items-center space-x-2">
          {makeLogoUrl && (
            <Image
              src={makeLogoUrl}
              alt={item.car_make.name}
              width={24}
              height={24}
              className="object-contain"
            />
          )}
          <h3 className="font-semibold line-clamp-1">{name}</h3>
        </div>

        <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>{year}</span>
          <span>{transmission}</span>
          <span>{fuelType}</span>
          <span>{mileage.toLocaleString()} {mileageUnit}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">Kshs {price.toLocaleString()}</span>
          <Button variant="outline">
            View Details
          </Button>
        </div>
      </div>
    </div>
  )
}
