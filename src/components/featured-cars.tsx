"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { formatCurrency } from "@/lib/utils"

interface FeaturedCarsProps {
  cars: any[]
}

export function FeaturedCars({ cars = [] }: FeaturedCarsProps) {
  // If no cars are provided, show a loading state or return null
  if (cars.length === 0) {
    return null
  }

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Featured new cars</h2>
          <Link href="/new-cars" className="flex items-center text-sm font-medium text-primary">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {cars.map((car) => {
              // Extract car details
              const carMake = car.car_make?.name || "Unknown Make"
              const carModel = car.car_model || "Unknown Model"
              const carDescription = car.car_specifications?.engine_capacity
                ? `${car.car_specifications.engine_capacity}L ${car.car_specifications.fuel_type || ""}`
                : car.description || ""

              // Extract pricing information
              const price = car.pricing_payments?.selling_price
                ? formatCurrency(car.pricing_payments.selling_price, car.pricing_payments?.currency || "KES")
                : "Price on request"

              // Calculate monthly payment (if selling price is available)
              const monthlyPayment = car.pricing_payments?.selling_price
                ? formatCurrency(car.pricing_payments.selling_price / 60, car.pricing_payments?.currency || "KES") +
                  "/month"
                : ""

              // Determine badge type
              const badgeText =
                car.condition === "new" ? "New" : car.car_specifications?.fuel_type === "electric" ? "Electric" : ""
              const badgeVariant = car.car_specifications?.fuel_type === "electric" ? "outline" : "default"

              // Get the first image or use a placeholder
              const imageUrl =
                car.images && car.images.length > 0
                  ? car.images[0]
                  : "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729773746/evo/2024/10/G90%20BMW%20M5%20saloon-13.jpg"

              return (
                <CarouselItem key={car.$id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <Card className="overflow-hidden">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={`${carMake} ${carModel}`}
                        fill
                        className="object-cover"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80"
                      >
                        <Heart className="h-4 w-4" />
                        <span className="sr-only">Add to favorites</span>
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      {badgeText && (
                        <Badge className="mb-2" variant={badgeVariant === "outline" ? "outline" : "default"}>
                          {badgeText}
                        </Badge>
                      )}
                      <h3 className="font-semibold">{`${carMake} ${carModel}`}</h3>
                      <p className="text-sm text-muted-foreground">{carDescription}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-lg font-bold">{price}</div>
                        {monthlyPayment && <div className="text-sm text-muted-foreground">{monthlyPayment}</div>}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-4">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  )
}

