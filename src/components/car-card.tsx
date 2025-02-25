import { HeartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Car } from "@/data/cars";

interface CarCardProps extends Car {
  onViewDetails?: (id: string) => void;
  onFavorite?: (id: string) => void;
}

export const CarCard = ({
  id,
  name,
  year,
  transmission,
  fuelType,
  price,
  mileage,
  imageUrl,
  onViewDetails,
  onFavorite,
}: CarCardProps) => {
  return (
    <Card className="group transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-4">
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
            onClick={() => onFavorite?.(id)}
          >
            <HeartIcon className="h-5 w-5" />
          </Button>
        </div>

        <h3 className="mb-2 font-semibold line-clamp-1">{name}</h3>

        <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>{year}</span>
          <span>{transmission}</span>
          <span>{fuelType}</span>
          <span>{mileage.toLocaleString()} Kms</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">Kshs {price.toLocaleString()}</span>
          <Button variant="outline" onClick={() => onViewDetails?.(id)}>
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
