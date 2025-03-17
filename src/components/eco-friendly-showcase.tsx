"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Leaf, Zap, Battery, Droplet, ArrowRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const ecoFriendlyCars = [
  {
    id: 1,
    make: "Tesla",
    model: "Model 3",
    type: "electric",
    price: "£42,990",
    range: "374 miles",
    batterySize: "82 kWh",
    chargingTime: "30 min (10-80%)",
    co2: "0 g/km",
    mpg: "N/A",
    image:
      "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729773746/evo/2024/10/G90%20BMW%20M5%20saloon-13.jpg",
    ecoScore: 95,
    savingsPerYear: "£1,250",
    taxBenefits: "£0 road tax, low BIK",
  },
  {
    id: 2,
    make: "Toyota",
    model: "Prius",
    type: "hybrid",
    price: "£30,390",
    range: "600+ miles",
    batterySize: "8.8 kWh",
    chargingTime: "2.5 hours",
    co2: "28 g/km",
    mpg: "83.1 mpg",
    image:
      "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729773746/evo/2024/10/G90%20BMW%20M5%20saloon-13.jpg",
    ecoScore: 85,
    savingsPerYear: "£950",
    taxBenefits: "£10 road tax, low BIK",
  },
  {
    id: 3,
    make: "Hyundai",
    model: "IONIQ 5",
    type: "electric",
    price: "£39,900",
    range: "298 miles",
    batterySize: "73 kWh",
    chargingTime: "18 min (10-80%)",
    co2: "0 g/km",
    mpg: "N/A",
    image:
      "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729773746/evo/2024/10/G90%20BMW%20M5%20saloon-13.jpg",
    ecoScore: 92,
    savingsPerYear: "£1,100",
    taxBenefits: "£0 road tax, low BIK",
  },
  {
    id: 4,
    make: "Kia",
    model: "Niro PHEV",
    type: "plugin-hybrid",
    price: "£33,525",
    range: "40 miles (electric) + 400 miles",
    batterySize: "11.1 kWh",
    chargingTime: "3 hours",
    co2: "18 g/km",
    mpg: "201.8 mpg",
    image:
      "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729773746/evo/2024/10/G90%20BMW%20M5%20saloon-13.jpg",
    ecoScore: 88,
    savingsPerYear: "£850",
    taxBenefits: "£0 road tax, low BIK",
  },
]

export function EcoFriendlyShowcase() {
  const [selectedType, setSelectedType] = useState<string>("all")

  const filteredCars =
    selectedType === "all" ? ecoFriendlyCars : ecoFriendlyCars.filter((car) => car.type === selectedType)

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
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
          {filteredCars.map((car) => (
            <Card key={car.id} className="overflow-hidden border-green-100 hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={car.image || "/placeholder.svg"}
                  alt={`${car.make} ${car.model}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge
                    className={
                      car.type === "electric"
                        ? "bg-green-600 text-white"
                        : car.type === "hybrid"
                          ? "bg-blue-600 text-white"
                          : "bg-teal-600 text-white"
                    }
                  >
                    {car.type === "electric" ? "Electric" : car.type === "hybrid" ? "Hybrid" : "Plug-in Hybrid"}
                  </Badge>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <h3 className="text-white font-bold">
                    {car.make} {car.model}
                  </h3>
                  <p className="text-white/80 text-sm">From {car.price}</p>
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
                      value={car.ecoScore}
                      className="h-2 w-24 bg-gray-200"
                      style={
                        {
                          "--progress-background":
                            car.ecoScore > 90 ? "#16a34a" : car.ecoScore > 80 ? "#65a30d" : "#ca8a04",
                        } as React.CSSProperties
                      }
                    />
                    <span className="text-sm font-medium">{car.ecoScore}/100</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Range</span>
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-amber-500" />
                      <span className="text-sm font-medium">{car.range}</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Battery</span>
                    <div className="flex items-center gap-1">
                      <Battery className="h-3 w-3 text-blue-500" />
                      <span className="text-sm font-medium">{car.batterySize}</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">CO2</span>
                    <div className="flex items-center gap-1">
                      <Droplet className="h-3 w-3 text-green-500" />
                      <span className="text-sm font-medium">{car.co2}</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Charging</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center gap-1">
                          <span className="text-sm font-medium truncate">{car.chargingTime}</span>
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
                    <span className="text-green-600 font-bold">{car.savingsPerYear}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Compared to equivalent petrol vehicle</div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white gap-2">
                  View details <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
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

