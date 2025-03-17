"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { Heart, Users, Shield, Ruler, Car, ArrowRight, Star, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { getFeaturedFamilyCars } from "@/lib/family-car-actions"

export function FamilyCarsShowcase() {
  const [selectedType, setSelectedType] = useState("all")

  // Fetch family cars data
  const {
    data: familyCarsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["familyCars"],
    queryFn: async () => {
      const response = await getFeaturedFamilyCars(4)
      if (!response.success) {
        throw new Error(response.error || "Failed to fetch family cars")
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

  // Get car type
  const getCarType = (car: any) => {
    return car.car_type?.name || "SUV"
  }

  // Get car specifications
  const getCarSpecs = (car: any) => {
    const specs = car.car_specifications || {}
    return {
      seats: specs.seats || 5,
      bootSpace: specs.boot_space || "N/A",
      safetyRating: specs.safety_rating || 5,
      fuelType: specs.fuel_type || "Petrol",
      familyScore: specs.family_score || 90,
    }
  }

  // Get car features
  const getCarFeatures = (car: any) => {
    const features = car.car_features || {}
    // Extract family-related features
    const familyFeatures = []

    if (features.family_car_features && Array.isArray(features.family_car_features)) {
      return features.family_car_features.slice(0, 4)
    }

    // Fallback to some common features from other categories
    const allFeatures = [
      ...(features.interior_features || []),
      ...(features.safety_features || []),
      ...(features.convenience_features || []),
    ]

    return allFeatures.slice(0, 4)
  }

  // Filter cars based on selected type
  const filteredCars = familyCarsData || []

  // Loading state
  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-6 w-6 text-orange-500" />
                <h2 className="text-3xl font-bold tracking-tight">Family-Friendly Vehicles</h2>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                Discover spacious, safe, and practical vehicles designed with families in mind, from versatile SUVs to
                spacious MPVs.
              </p>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="bg-orange-100/50">
                <TabsTrigger value="all" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  All
                </TabsTrigger>
                <TabsTrigger value="SUV" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  SUVs
                </TabsTrigger>
                <TabsTrigger value="MPV" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  MPVs
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <Card key={index} className="overflow-hidden border-orange-100">
                  <div className="relative h-48">
                    <Skeleton className="h-full w-full" />
                  </div>

                  <CardContent className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-4" />

                    <div className="flex items-center justify-between mb-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {Array(4)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="flex flex-col">
                            <Skeleton className="h-3 w-16 mb-1" />
                            <Skeleton className="h-4 w-20" />
                          </div>
                        ))}
                    </div>

                    <Skeleton className="h-16 w-full mb-4" />
                    <Skeleton className="h-10 w-full" />
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
      <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center text-center py-10">
            <AlertTriangle className="h-12 w-12 text-orange-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Unable to Load Family Cars</h2>
            <p className="text-muted-foreground mb-6">
              We're having trouble loading our family vehicles. Please try again later.
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Retry</Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-6 w-6 text-orange-500" />
              <h2 className="text-3xl font-bold tracking-tight">Family-Friendly Vehicles</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Discover spacious, safe, and practical vehicles designed with families in mind, from versatile SUVs to
              spacious MPVs.
            </p>
          </div>

          <Tabs defaultValue="all" value={selectedType} onValueChange={setSelectedType}>
            <TabsList className="bg-orange-100/50">
              <TabsTrigger value="all" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                All
              </TabsTrigger>
              <TabsTrigger value="SUV" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                SUVs
              </TabsTrigger>
              <TabsTrigger value="MPV" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                MPVs
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCars.map((car) => {
            const specs = getCarSpecs(car)
            const features = getCarFeatures(car)
            return (
              <Card key={car.$id} className="overflow-hidden border-orange-100 hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={getCarImage(car) || "/placeholder.svg"}
                    alt={getCarName(car)}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/80">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className="text-white font-bold">{getCarName(car)}</h3>
                    <p className="text-white/80 text-sm">
                      {getCarType(car)} • {specs.fuelType}
                    </p>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium">Family Score</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={specs.familyScore}
                        className="h-2 w-24 bg-gray-200"
                        style={
                          {
                            "--progress-background":
                              specs.familyScore > 90 ? "#f97316" : specs.familyScore > 80 ? "#fb923c" : "#fdba74",
                          } as React.CSSProperties
                        }
                      />
                      <span className="text-sm font-medium">{specs.familyScore}/100</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Seats</span>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-orange-500" />
                        <span className="text-sm font-medium">{specs.seats} seats</span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Boot Space</span>
                      <div className="flex items-center gap-1">
                        <Ruler className="h-3 w-3 text-orange-500" />
                        <span className="text-sm font-medium">{specs.bootSpace}</span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Safety Rating</span>
                      <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3 text-orange-500" />
                        <div className="flex">
                          {Array(specs.safetyRating)
                            .fill(null)
                            .map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-orange-500 text-orange-500" />
                            ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Type</span>
                      <div className="flex items-center gap-1">
                        <Car className="h-3 w-3 text-orange-500" />
                        <span className="text-sm font-medium">{getCarType(car)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-muted-foreground">Family Features</div>
                    <div className="flex flex-wrap gap-2">
                      {features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="bg-orange-50">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="font-bold">From {formatPrice(car)}</div>
                    <Link href={`/car/${car.slug}`}>
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white">View details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 bg-orange-100/50 rounded-xl p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Family Car Buying Guide</h3>
              <p className="text-muted-foreground mb-4">
                Choosing the right family car involves considering space, safety, practicality, and comfort. Our
                comprehensive guide helps you make the best decision.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-3 w-3 text-orange-500" />
                  </div>
                  <div>
                    <span className="font-medium">Safety first</span>
                    <p className="text-sm text-muted-foreground">
                      Look for 5-star NCAP ratings and advanced safety features.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Ruler className="h-3 w-3 text-orange-500" />
                  </div>
                  <div>
                    <span className="font-medium">Space considerations</span>
                    <p className="text-sm text-muted-foreground">
                      Ensure enough room for passengers, car seats, and luggage.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Car className="h-3 w-3 text-orange-500" />
                  </div>
                  <div>
                    <span className="font-medium">Practical features</span>
                    <p className="text-sm text-muted-foreground">
                      Consider ISOFIX points, sliding doors, and storage solutions.
                    </p>
                  </div>
                </li>
              </ul>
              <Button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white gap-2">
                Read full guide <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="relative h-64 md:h-full rounded-xl overflow-hidden">
              <Image
                src="https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729773746/evo/2024/10/G90%20BMW%20M5%20saloon-13.jpg"
                alt="Family with car"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <p className="text-white text-lg font-medium">Book a family car consultation with our experts</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-white/20 backdrop-blur-sm text-white border-white/40 hover:bg-white/30"
                >
                  Book consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

