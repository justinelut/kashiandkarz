"use client"

import Image from "next/image"
import { Truck, Package, Fuel, Ruler, ArrowRight, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import Link from "next/link"

interface CommercialVehiclesHubProps {
  vehicles: any[]
}

export function CommercialVehiclesHub({ vehicles = [] }: CommercialVehiclesHubProps) {
  const [selectedType, setSelectedType] = useState("all")

  const vanTypes = [
    { name: "All Vans", value: "all" },
    { name: "Small Vans", value: "small-van" },
    { name: "Medium Vans", value: "medium-van" },
    { name: "Large Vans", value: "large-van" },
    { name: "Electric Vans", value: "electric-van" },
  ]

  // Format currency based on the currency in the data or default to KES
  const formatCurrency = (amount: number, currency = "KES") => {
    if (!amount) return "Price on request"

    // Format based on currency
    if (currency === "KES") {
      return `KSh ${amount.toLocaleString()}`
    } else {
      return `${currency} ${amount.toLocaleString()}`
    }
  }

  // Calculate monthly lease price (simple estimation)
  const calculateLeasePrice = (price: number) => {
    // Assuming 36-month lease with 10% down payment
    const monthlyLease = (price * 0.9) / 36
    return `KSh ${Math.round(monthlyLease).toLocaleString()}/month`
  }

  // Get business use cases based on car features
  const getBusinessUses = (vehicle: any) => {
    const uses = []

    if (vehicle.car_features?.commercial_car_features) {
      return vehicle.car_features.commercial_car_features
    }

    // Fallback to generic business uses
    if (vehicle.car_specifications?.load_volume) uses.push("Delivery")
    if (vehicle.car_specifications?.payload) uses.push("Transport")
    if (!uses.length) uses.push("Business")

    return uses
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Truck className="h-6 w-6 text-slate-700" />
              <h2 className="text-3xl font-bold tracking-tight">Commercial Vehicles</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Find the perfect van or commercial vehicle for your business needs, with flexible buying and leasing
              options.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter options</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span>Download brochures</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="md:w-64 space-y-6 flex-shrink-0">
            <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedType}>
              <TabsList className="bg-slate-100 h-auto flex flex-col md:w-full">
                {vanTypes.map((type) => (
                  <TabsTrigger
                    key={type.value}
                    value={type.value}
                    className="justify-start data-[state=active]:bg-[#1c1c1c] data-[state=active]:text-white py-3"
                  >
                    {type.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="space-y-4 bg-slate-50 p-4 rounded-lg">
              <h3 className="font-medium">Business Use</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="delivery" className="mr-2" />
                  <label htmlFor="delivery" className="text-sm">
                    Delivery
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="service" className="mr-2" />
                  <label htmlFor="service" className="text-sm">
                    Service
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="construction" className="mr-2" />
                  <label htmlFor="construction" className="text-sm">
                    Construction
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="mobile-office" className="mr-2" />
                  <label htmlFor="mobile-office" className="text-sm">
                    Mobile Office
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-slate-50 p-4 rounded-lg">
              <h3 className="font-medium">Payload</h3>
              <Select defaultValue="any">
                <SelectTrigger>
                  <SelectValue placeholder="Select payload" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any payload</SelectItem>
                  <SelectItem value="under-750">Under 750 kg</SelectItem>
                  <SelectItem value="750-1000">750 - 1,000 kg</SelectItem>
                  <SelectItem value="1000-1250">1,000 - 1,250 kg</SelectItem>
                  <SelectItem value="over-1250">Over 1,250 kg</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4 bg-slate-50 p-4 rounded-lg">
              <h3 className="font-medium">Fuel Type</h3>
              <Select defaultValue="any">
                <SelectTrigger>
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any fuel type</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-[#1c1c1c] text-white rounded-lg">
              <h3 className="font-medium mb-2">Business Leasing Specialist</h3>
              <p className="text-sm text-gray-50 mb-4">
                Get expert advice on the best commercial vehicle for your business needs.
              </p>
              <Button className="w-full bg-white text-primary hover:bg-slate-200">Contact specialist</Button>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.$id} className="overflow-hidden border-slate-200 hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={vehicle.images?.[0] || "/placeholder.svg?height=192&width=384"}
                      alt={`${vehicle.car_make?.name || "Commercial"} ${vehicle.car_model || "Vehicle"}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge
                        className={
                          vehicle.car_specifications?.fuel_type === "electric"
                            ? "bg-green-500 text-white"
                            : "bg-slate-700 text-white"
                        }
                      >
                        {vehicle.car_type?.name || "Commercial"}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-bold mb-1">
                      {vehicle.car_make?.name || "Commercial"} {vehicle.car_model || "Vehicle"}
                    </h3>

                    <div className="grid grid-cols-2 gap-3 my-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Load Volume</span>
                        <div className="flex items-center gap-1">
                          <Package className="h-3 w-3 text-slate-700" />
                          <span className="text-sm font-medium">
                            {vehicle.car_specifications?.load_volume || "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Payload</span>
                        <div className="flex items-center gap-1">
                          <Ruler className="h-3 w-3 text-slate-700" />
                          <span className="text-sm font-medium">{vehicle.car_specifications?.payload || "N/A"}</span>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Fuel Type</span>
                        <div className="flex items-center gap-1">
                          <Fuel className="h-3 w-3 text-slate-700" />
                          <span className="text-sm font-medium">{vehicle.car_specifications?.fuel_type || "N/A"}</span>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Economy</span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">
                            {vehicle.car_specifications?.fuel_economy || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-muted-foreground">Ideal for</div>
                      <div className="flex flex-wrap gap-2">
                        {getBusinessUses(vehicle).map((use: string, index: number) => (
                          <Badge key={index} variant="outline" className="bg-slate-50">
                            {use}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t">
                      <div>
                        <div className="text-sm text-muted-foreground">From</div>
                        <div className="font-bold">
                          {formatCurrency(vehicle.pricing_payments?.selling_price, vehicle.pricing_payments?.currency)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Lease: {calculateLeasePrice(vehicle.pricing_payments?.selling_price || 0)}
                        </div>
                      </div>
                      <Link href={`/car/${vehicle.slug}`} passHref>
                        <Button className="bg-slate-700 hover:bg-slate-800 text-white">Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 bg-[#1c1c1c] rounded-xl overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 md:p-12 text-white">
              <h3 className="text-2xl font-bold mb-4">Fleet Solutions for Businesses</h3>
              <p className="mb-6 text-slate-300">
                Whether you need one van or a fleet of commercial vehicles, our business specialists can help you find
                the right solution with competitive financing options.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-5 w-5 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <Truck className="h-3 w-3 text-slate-300" />
                  </div>
                  <div className="text-slate-200">Fleet management solutions</div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-5 w-5 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <Truck className="h-3 w-3 text-slate-300" />
                  </div>
                  <div className="text-slate-200">Business contract hire</div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-5 w-5 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <Truck className="h-3 w-3 text-slate-300" />
                  </div>
                  <div className="text-slate-200">Tax-efficient financing options</div>
                </li>
              </ul>
              <Button className="bg-white text-slate-800 hover:bg-slate-100 gap-2">
                Contact fleet specialist <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative h-64 md:h-full">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Fleet of commercial vehicles"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

