"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Star, Loader2, BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import { getFeaturedLuxuryCars } from "@/lib/luxury-car-actions"

// Helper function to format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(price)
}

// Helper function to extract features from car data
const extractFeatures = (car: any) => {
  const features = []

  if (car.car_specifications) {
    const specs = car.car_specifications

    if (specs.horse_power) features.push(`${specs.horse_power} bhp`)
    if (specs.acceleration) features.push(`${specs.acceleration}s 0-62mph`)
    if (specs.top_speed) features.push(`${specs.top_speed} mph top speed`)

    // Add a fourth feature based on what's available
    if (specs.transmission_type) {
      features.push(specs.transmission_type === "automatic" ? "Automatic gearbox" : "Manual gearbox")
    } else if (specs.engine_capacity) {
      features.push(`${specs.engine_capacity} engine`)
    } else if (specs.fuel_type) {
      features.push(specs.fuel_type.charAt(0).toUpperCase() + specs.fuel_type.slice(1))
    }
  }

  // Ensure we have at least 4 features
  while (features.length < 4) {
    features.push("Premium feature")
  }

  return features.slice(0, 4)
}

export function LuxuryCollection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)

  // Fetch luxury cars data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["luxuryCars"],
    queryFn: async () => {
      const response = await getFeaturedLuxuryCars(4)
      if (!response.success) {
        throw new Error(response.error || "Failed to fetch luxury cars")
      }
      return response.data
    },
  })

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [data])

  // If loading, show skeleton
  if (isLoading) {
    return (
      <section className="py-20 bg-black text-white overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="mb-12">
            <Badge className="bg-primary text-primary-foreground mb-4">Exclusive</Badge>
            <h2 className="text-4xl font-bold tracking-tight mb-2">Luxury Collection</h2>
            <p className="text-white/70 max-w-2xl">
              Discover our handpicked selection of the world's most prestigious and high-performance vehicles.
            </p>
          </div>

          <div className="flex items-center justify-center h-96">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  // If error or no data, show fallback
  if (isError || !data || data.length === 0) {
    return (
      <section className="py-20 bg-black text-white overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="mb-12">
            <Badge className="bg-primary text-primary-foreground mb-4">Exclusive</Badge>
            <h2 className="text-4xl font-bold tracking-tight mb-2">Luxury Collection</h2>
            <p className="text-white/70 max-w-2xl">
              Discover our handpicked selection of the world's most prestigious and high-performance vehicles.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center h-96 text-center">
            <p className="text-xl mb-4">Our luxury collection is being updated.</p>
            <p className="text-white/70">Please check back soon to see our premium vehicles.</p>
          </div>
        </div>
      </section>
    )
  }

  const luxuryCars = data
  const activeCar = luxuryCars[activeIndex]

  // Extract car details
  const carMake = activeCar.car_make?.name || "Premium"
  const carModel = activeCar.car_model || "Luxury Vehicle"
  const carPrice = activeCar.pricing_payments?.selling_price
    ? formatPrice(activeCar.pricing_payments.selling_price)
    : "Price on request"
  const carDescription =
    activeCar.description || "Exclusive luxury vehicle with premium features and exceptional performance."
  const carFeatures = extractFeatures(activeCar)
  const carImage =
    activeCar.images && activeCar.images.length > 0 ? activeCar.images[0] : "/placeholder.svg?height=600&width=800"
  const carSlug = activeCar.slug || ""
  const isBigDeal = activeCar.big_deal || false

  return (
    <section className="py-20 bg-black text-white overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="mb-12">
          <Badge className="bg-primary text-primary-foreground mb-4">Exclusive</Badge>
          <h2 className="text-4xl font-bold tracking-tight mb-2">Luxury Collection</h2>
          <p className="text-white/70 max-w-2xl">
            Discover our handpicked selection of the world's most prestigious and high-performance vehicles.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
              <Image
                src={carImage || "/placeholder.svg"}
                alt={`${carMake} ${carModel}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {isBigDeal && (
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full flex items-center gap-1.5">
                  <BadgeCheck className="h-4 w-4" />
                  <span className="text-sm font-medium">Special Offer</span>
                </div>
              )}
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
              {luxuryCars.map((car, index) => {
                const thumbImage =
                  car.images && car.images.length > 0 ? car.images[0] : "/placeholder.svg?height=200&width=300"

                return (
                  <button
                    key={car.$id}
                    onClick={() => setActiveIndex(index)}
                    className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden snap-start ${
                      index === activeIndex ? "ring-2 ring-primary" : "opacity-70"
                    }`}
                  >
                    <Image
                      src={thumbImage || "/placeholder.svg"}
                      alt={`${car.car_make?.name || "Car"} ${car.car_model || "Model"}`}
                      fill
                      className="object-cover"
                    />
                    {car.big_deal && (
                      <div className="absolute bottom-0 right-0 bg-primary h-3 w-3 rounded-full m-0.5" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold">
                {carMake} {carModel}
              </h3>
              <div className="flex items-center gap-1 mt-2">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < 5 ? "fill-yellow-500 text-yellow-500" : "text-gray-400"}`}
                    />
                  ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <p className="text-xl font-semibold">{carPrice}</p>
              {isBigDeal && (
                <Badge variant="outline" className="border-primary text-primary">
                  Special Offer
                </Badge>
              )}
            </div>

            <p className="text-white/80">{carDescription}</p>

            <div className="grid grid-cols-2 gap-4">
              {carFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href={`/car/${carSlug}`} className="w-full h-full flex items-center">
                  Book a test drive
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
                <Link href={`/car/${carSlug}`} className="w-full h-full flex items-center">
                  View details
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <motion.div ref={carousel} className="cursor-grab overflow-hidden">
            <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="flex gap-6">
              {luxuryCars.map((car) => {
                const cardImage =
                  car.images && car.images.length > 0 ? car.images[0] : "/placeholder.svg?height=300&width=400"
                const cardMake = car.car_make?.name || "Premium"
                const cardModel = car.car_model || "Luxury Vehicle"
                const cardPrice = car.pricing_payments?.selling_price
                  ? formatPrice(car.pricing_payments.selling_price)
                  : "Price on request"
                const cardSlug = car.slug || ""
                const isCardBigDeal = car.big_deal || false

                return (
                  <motion.div
                    key={car.$id}
                    className="min-w-[300px] md:min-w-[400px] bg-white/5 rounded-xl p-6 backdrop-blur-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-lg">{cardMake}</h4>
                        <p className="text-white/70">{cardModel}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{cardPrice}</p>
                        {isCardBigDeal && (
                          <Badge variant="outline" className="mt-1 border-primary/50 text-primary text-xs">
                            Special Offer
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={cardImage || "/placeholder.svg"}
                        alt={`${cardMake} ${cardModel}`}
                        fill
                        className="object-cover"
                      />
                      {isCardBigDeal && (
                        <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-0.5 rounded-full flex items-center gap-1">
                          <BadgeCheck className="h-3 w-3" />
                          <span className="text-xs font-medium">Special</span>
                        </div>
                      )}
                    </div>
                    <Button variant="ghost" className="w-full justify-between group">
                      <Link href={`/car/${cardSlug}`} className="flex w-full justify-between">
                        <span>View details</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
          <p className="text-white/50 text-sm mt-4 text-center">Drag to explore more luxury vehicles</p>
        </div>
      </div>
    </section>
  )
}

