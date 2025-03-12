"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Sparkles, Car, Zap, CarIcon as Suv, ParkingCircle, Battery, Briefcase, PiggyBank } from "lucide-react"

const browseItems = [
  {
    label: "Spring Sale",
    icon: Sparkles,
  },
  {
    label: "Used cars",
    icon: Car,
  },
  {
    label: "Electric",
    icon: Zap,
  },
  {
    label: "SUVs",
    icon: Suv,
  },
  {
    label: "Parking sensors",
    icon: ParkingCircle,
  },
  {
    label: "Hybrids",
    icon: Battery,
  },
  {
    label: "Big boot",
    icon: Briefcase,
  },
  {
    label: "Below £30k",
    icon: PiggyBank,
  },
]

export function BrowseSection() {
  return (
    <div className="border-t border-b bg-gray-50/50 backdrop-blur-sm">
      <div className="container px-4 py-4 md:px-6">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium mr-2">Browse:</span>
            <CarouselContent className="-ml-2">
              {browseItems.map((item) => {
                const Icon = item.icon
                return (
                  <CarouselItem key={item.label} className="pl-2 basis-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Button>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <CarouselPrevious className="static translate-y-0 h-8 w-8" />
            <CarouselNext className="static translate-y-0 h-8 w-8" />
          </div>
        </Carousel>
      </div>
    </div>
  )
}

