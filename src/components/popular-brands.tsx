"use client"

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"



export function PopularBrands({brands}:{brands:any}) {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Popular Brands</h2>
          <p className="text-muted-foreground">Find your favorite car brand and explore their latest models</p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {brands.map((brand) => (
              <CarouselItem key={brand.name} className="basis-1/2 md:basis-1/3 lg:basis-1/5">
                <div className="flex flex-col items-center p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="relative w-20 h-20 mb-3">
                    <Image src={brand.image || "/placeholder.svg"} alt={brand.name} fill className="object-contain" />
                  </div>
                  <span className="font-medium">{brand.name}</span>
                </div>
              </CarouselItem>
            ))}
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

