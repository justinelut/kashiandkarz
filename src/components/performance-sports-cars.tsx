"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { Gauge, Clock, Zap, Flame, ArrowRight, Play, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { getFeaturedSportsCars } from "@/lib/sports-car-actions"

export function PerformanceSportsCars() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [videoDialog, setVideoDialog] = useState(false)

  // Fetch sports cars data
  const {
    data: sportsCarData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sportsCars"],
    queryFn: async () => {
      const response = await getFeaturedSportsCars(5)
      if (!response.success) {
        throw new Error(response.error || "Failed to fetch sports cars")
      }
      return response.data
    },
  })

  // Format price from the pricing_payments object
  const formatPrice = (car: any) => {
    if (!car.pricing_payments || !car.pricing_payments.selling_price) {
      return "Price on request"
    }

    const price = car.pricing_payments.selling_price
    const currency = car.pricing_payments.currency || "KES"

    // Format the price with commas
    return `${currency} ${price.toLocaleString()}`
  }

  // Get car make and model
  const getCarName = (car: any) => {
    const make = car.car_make?.name || "Unknown Make"
    const model = car.car_model || "Unknown Model"
    return `${make} ${model}`
  }

  // Get car image
  const getCarImage = (car: any) => {
    if (car.images && car.images.length > 0) {
      return car.images[0]
    }
    return "/placeholder.svg?height=400&width=600"
  }

  // Get car specifications
  const getCarSpecs = (car: any) => {
    const specs = car.car_specifications || {}
    return {
      power: specs.horse_power ? `${specs.horse_power} bhp` : "N/A",
      acceleration: specs.acceleration ? `${specs.acceleration}s` : "N/A",
      topSpeed: specs.top_speed ? `${specs.top_speed} mph` : "N/A",
      transmission: specs.transmission_type || "N/A",
      weight: specs.weight || "N/A",
      trackTime: specs.lap_time || "N/A",
      trackName: "Nürburgring", // Default track name
    }
  }

  // Filter cars based on selected category
  const filteredCars = sportsCarData || []

  // Loading state
  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-red-950 to-black text-white w-full">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="h-6 w-6 text-red-500" />
                <h2 className="text-3xl font-bold tracking-tight">Performance & Sports Cars</h2>
              </div>
              <p className="text-white/70 max-w-2xl">
                Discover the most exhilarating high-performance vehicles with breathtaking speed, handling, and design.
              </p>
            </div>

            <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="bg-red-900/50">
                <TabsTrigger value="all" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="Sports Car"
                  className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                >
                  Sports Cars
                </TabsTrigger>
                <TabsTrigger value="Supercar" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                  Supercars
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <Card
                  key={index}
                  className="overflow-hidden bg-gradient-to-b from-red-900/20 to-black/40 border-red-900/30"
                >
                  <div className="relative h-48">
                    <Skeleton className="h-full w-full bg-red-900/20" />
                  </div>

                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-1 bg-red-900/20" />
                    <Skeleton className="h-4 w-1/2 mb-4 bg-red-900/20" />

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {Array(4)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="flex flex-col">
                            <Skeleton className="h-3 w-16 mb-1 bg-red-900/20" />
                            <Skeleton className="h-4 w-20 bg-red-900/20" />
                          </div>
                        ))}
                    </div>

                    <Skeleton className="h-16 w-full mb-4 bg-red-900/20" />
                    <Skeleton className="h-10 w-full bg-red-900/20" />
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-red-950 to-black text-white">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center text-center py-10">
            <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Unable to Load Sports Cars</h2>
            <p className="text-white/70 mb-6">
              We're having trouble loading our performance vehicles. Please try again later.
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white">Retry</Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-b from-red-950 to-black text-white">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="h-6 w-6 text-red-500" />
              <h2 className="text-3xl font-bold tracking-tight">Performance & Sports Cars</h2>
            </div>
            <p className="text-white/70 max-w-2xl">
              Discover the most exhilarating high-performance vehicles with breathtaking speed, handling, and design.
            </p>
          </div>

          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="bg-red-900/50">
              <TabsTrigger value="all" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                All
              </TabsTrigger>
              <TabsTrigger value="Sports Car" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                Sports Cars
              </TabsTrigger>
              <TabsTrigger value="Supercar" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                Supercars
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => {
            const specs = getCarSpecs(car)
            return (
              <Card
                key={car.$id}
                className="overflow-hidden bg-gradient-to-b from-red-900/20 to-black/40 border-red-900/30 hover:border-red-500/50 transition-all"
              >
                <div className="relative h-48">
                  <Image
                    src={getCarImage(car) || "/placeholder.svg"}
                    alt={getCarName(car)}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className={car.big_deal ? "bg-red-600 text-white" : "bg-amber-600 text-white"}>
                      {car.big_deal ? "Special Offer" : "Sport"}
                    </Badge>
                  </div>
                  <Dialog open={videoDialog} onOpenChange={setVideoDialog}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute bottom-2 right-2 h-10 w-10 rounded-full bg-black/50 hover:bg-red-600/80"
                      >
                        <Play className="h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl bg-black border-red-900/30">
                      <div className="aspect-video w-full bg-black">
                        <div className="flex h-full items-center justify-center">
                          <p className="text-white/70">Video would play here</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{getCarName(car)}</h3>
                  <p className="text-white/70 text-sm mb-4">Starting from {formatPrice(car)}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col">
                      <span className="text-xs text-white/50">Power</span>
                      <div className="flex items-center gap-1">
                        <Zap className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">{specs.power}</span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs text-white/50">0-62 mph</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">{specs.acceleration}</span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs text-white/50">Top Speed</span>
                      <div className="flex items-center gap-1">
                        <Gauge className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">{specs.topSpeed}</span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs text-white/50">Transmission</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{specs.transmission}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-900/30 to-black/30 p-3 rounded-lg mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Flame className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">{specs.trackName} Lap Time</span>
                    </div>
                    <div className="text-xl font-bold">{specs.trackTime}</div>
                  </div>

                  <Link href={`/car/${car.slug}`}>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white gap-2">
                      Explore {car.car_model} <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 relative rounded-xl overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729773746/evo/2024/10/G90%20BMW%20M5%20saloon-13.jpg"
              alt="Track day experience"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
          </div>

          <div className="relative z-10 p-8 md:p-12 max-w-2xl">
            <Badge className="bg-red-600 text-white mb-4">Experience</Badge>
            <h3 className="text-3xl font-bold mb-4">Track Day Experiences</h3>
            <p className="text-white/80 mb-6">
              Feel the adrenaline rush behind the wheel of these high-performance machines with our exclusive track day
              experiences. Professional instructors will help you push the limits in a safe environment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-red-600 hover:bg-red-700 text-white">Book track day</Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

