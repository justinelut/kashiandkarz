"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Leaf, Zap, Battery, Droplet, ArrowRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface EcoFriendlyShowcaseProps {
  cars: any[]
}

export function EcoFriendlyShowcase({ cars = [] }: EcoFriendlyShowcaseProps) {

  console.log("mother fucker")
  console.log(cars)
 
  const [selectedType, setSelectedType] = useState<string>("all")

  // Determine vehicle type based on data
  const getVehicleType = (car: any) => {
    // Check car_type if available
    if (car.car_type?.slug) {
      if (car.car_type.slug === "electric-vehicle" || car.car_type.slug === "electric-performance") {
        return "electric"
      }
      if (car.car_type.slug === "hybrid") {
        return "hybrid"
      }
      if (car.car_type.slug === "plug-in-hybrid") {
        return "plugin-hybrid"
      }
    }

    // Check car_specifications if available
    if (car.car_specifications?.fuel_type) {
      if (car.car_specifications.fuel_type === "electric") {
        return "electric"
      }
      if (car.car_specifications.fuel_type === "hybrid") {
        return "hybrid"
      }
      if (car.car_specifications.fuel_type === "plugin-hybrid") {
        return "plugin-hybrid"
      }
    }

    // Default to electric if we can't determine
    return "electric"
  }

  // Filter cars based on selected type
  const filteredCars = selectedType === "all" ? cars : cars?.car_info?.filter((car) => getVehicleType(car) === selectedType)

  // Format currency
  const formatCurrency = (amount: number, car?: any) => {
    if (!amount) return "Price on request"

    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: car?.pricing_payments?.currency || "GBP",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Calculate eco score based on available data
  const calculateEcoScore = (car: any) => {
    // Base score
    let score = 80

    // Electric vehicles get higher base score
    if (getVehicleType(car) === "electric") {
      score = 90
    }

    // Adjust based on CO2 emissions if available
    if (car.car_specifications?.co2_emissions) {
      const co2 = Number.parseFloat(car.car_specifications.co2_emissions)
      if (co2 < 0.1) score += 10
      else if (co2 < 0.5) score += 5
      else if (co2 > 1) score -= 5
    }

    // Cap score between 0-100
    return Math.min(100, Math.max(0, score))
  }

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <h2 className="text-3xl font-bold tracking-tight">Eco-Friendly Vehicles</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Discover our range of electric, hybrid, and plug-in hybrid vehicles that help reduce your carbon footprint
              and save you money.
            </p>
          </div>

          <Tabs defaultValue="all" value={selectedType} onValueChange={setSelectedType}>
            <TabsList className="bg-green-100/50">
              <TabsTrigger value="all" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                All
              </TabsTrigger>
              <TabsTrigger value="electric" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                Electric
              </TabsTrigger>
              <TabsTrigger value="hybrid" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                Hybrid
              </TabsTrigger>
              <TabsTrigger
                value="plugin-hybrid"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                Plug-in Hybrid
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCars && filteredCars.length > 0 ? (
            filteredCars.map((car) => {
              const vehicleType = getVehicleType(car)
              const ecoScore = calculateEcoScore(car)

              return (
                <Card key={car.$id} className="overflow-hidden border-green-100 hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={car.images?.[0] || "/placeholder.svg?height=192&width=384"}
                      alt={`${car.car_make?.name || ""} ${car.car_model || ""}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge
                        className={
                          vehicleType === "electric"
                            ? "bg-green-600 text-white"
                            : vehicleType === "hybrid"
                              ? "bg-blue-600 text-white"
                              : "bg-teal-600 text-white"
                        }
                      >
                        {vehicleType === "electric"
                          ? "Electric"
                          : vehicleType === "hybrid"
                            ? "Hybrid"
                            : "Plug-in Hybrid"}
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <h3 className="text-white font-bold">
                        {car.car_make?.name || ""} {car.car_model || ""}
                      </h3>
                      <p className="text-white/80 text-sm">
                        From {formatCurrency(car.pricing_payments?.selling_price || 0, car)}
                      </p>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Leaf className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Eco Score</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={ecoScore}
                          className="h-2 w-24 bg-gray-200"
                          style={
                            {
                              "--progress-background":
                                ecoScore > 90 ? "#16a34a" : ecoScore > 80 ? "#65a30d" : "#ca8a04",
                            } as React.CSSProperties
                          }
                        />
                        <span className="text-sm font-medium">{ecoScore}/100</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Range</span>
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3 text-amber-500" />
                          <span className="text-sm font-medium">{car.car_specifications?.range || "N/A"}</span>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Battery</span>
                        <div className="flex items-center gap-1">
                          <Battery className="h-3 w-3 text-blue-500" />
                          <span className="text-sm font-medium">{car.car_specifications?.battery || "N/A"}</span>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">CO2</span>
                        <div className="flex items-center gap-1">
                          <Droplet className="h-3 w-3 text-green-500" />
                          <span className="text-sm font-medium">
                            {car.car_specifications?.co2_emissions
                              ? `${car.car_specifications.co2_emissions} g/km`
                              : "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Charging</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="flex items-center gap-1">
                              <span className="text-sm font-medium truncate">
                                {car.car_specifications?.charging || "N/A"}
                              </span>
                              <Info className="h-3 w-3 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Fast charging time from 10% to 80%</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Annual savings</span>
                        <span className="text-green-600 font-bold">
                          {vehicleType === "electric" ? "£1,250" : vehicleType === "hybrid" ? "£950" : "£850"}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">Compared to equivalent petrol vehicle</div>
                    </div>

                    <Link href={`/car/${car.slug}`}>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white gap-2">
                        View details <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No eco-friendly vehicles found at the moment.</p>
              <p className="mt-2">Please check back later or adjust your search criteria.</p>
            </div>
          )}
        </div>

        <div className="mt-12 bg-green-100/50 rounded-xl p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Why Choose Eco-Friendly?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Leaf className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <span className="font-medium">Lower emissions</span>
                    <p className="text-sm text-muted-foreground">
                      Reduce your carbon footprint and help combat climate change.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <span className="font-medium">Lower running costs</span>
                    <p className="text-sm text-muted-foreground">Save money on fuel, maintenance, and road tax.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Battery className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <span className="font-medium">Future-proof investment</span>
                    <p className="text-sm text-muted-foreground">
                      Stay ahead of emissions regulations and enjoy better resale value.
                    </p>
                  </div>
                </li>
              </ul>
              <Button className="mt-6 bg-green-600 hover:bg-green-700 text-white">Explore all eco-friendly cars</Button>
            </div>

            <div className="relative h-64 md:h-full rounded-xl overflow-hidden">
              <Image
                src="https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729773746/evo/2024/10/G90%20BMW%20M5%20saloon-13.jpg"
                alt="Electric car charging"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <p className="text-white text-lg font-medium">
                  Government grants of up to £2,500 available on selected models
                </p>
                <Button
                  variant="outline"
                  className="mt-4 bg-white/20 backdrop-blur-sm text-white border-white/40 hover:bg-white/30"
                >
                  Check eligibility
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

