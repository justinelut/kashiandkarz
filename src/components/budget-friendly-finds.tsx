"use client"

import Image from "next/image"
import { Calculator, Percent, PiggyBank, ThumbsUp, ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import Link from "next/link"

interface BudgetFriendlyFindsProps {
  cars: any[]
}

export function BudgetFriendlyFinds({ cars = [] }: BudgetFriendlyFindsProps) {
  const [priceRange, setPriceRange] = useState<number[]>([15000000])
  const [monthlyPayment, setMonthlyPayment] = useState<number[]>([200])

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

  // Calculate monthly payment (simple estimation)
  const calculateMonthlyPayment = (price: number) => {
    // Assuming 10% down payment, 5-year term, 10% interest rate
    const downPayment = price * 0.1
    const loanAmount = price - downPayment
    const monthlyRate = 0.1 / 12
    const numberOfPayments = 5 * 12

    const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments))

    return `KSh ${Math.round(monthlyPayment).toLocaleString()}/month`
  }

  // Get discount text based on data
  const getDiscountText = (car: any) => {
    if (!car.pricing_payments) return "Special offer"

    if (car.pricing_payments.negotiable === "yes") {
      return "Negotiable price"
    } else if (car.big_deal) {
      return "Big deal"
    } else {
      return "Great value"
    }
  }

  return (
    <section className="py-16 bg-gradient-to-b from-emerald-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <PiggyBank className="h-6 w-6 text-emerald-600" />
              <h2 className="text-3xl font-bold tracking-tight">Budget-Friendly Finds</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Discover affordable cars that don't compromise on quality, with great finance deals and low running costs.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-4 lg:col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
              <h3 className="text-lg font-medium mb-4">Find Your Budget Car</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Maximum budget</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">KSh 5M</span>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={30000000}
                      step={1000000}
                      className="flex-1 [&_[role=slider]]:bg-emerald-600"
                    />
                    <span className="text-sm">KSh 30M</span>
                  </div>
                  <div className="mt-1 text-center text-sm font-medium text-emerald-600">
                    KSh {priceRange[0].toLocaleString()}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Monthly payment</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">KSh 100k</span>
                    <Slider
                      value={monthlyPayment}
                      onValueChange={setMonthlyPayment}
                      max={500}
                      step={25}
                      className="flex-1 [&_[role=slider]]:bg-emerald-600"
                    />
                    <span className="text-sm">KSh 500k</span>
                  </div>
                  <div className="mt-1 text-center text-sm font-medium text-emerald-600">
                    KSh {monthlyPayment[0]}k/month
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Car type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="city-car" className="mr-2" />
                      <label htmlFor="city-car" className="text-sm">
                        City car
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="hatchback" className="mr-2" />
                      <label htmlFor="hatchback" className="text-sm">
                        Hatchback
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="suv" className="mr-2" />
                      <label htmlFor="suv" className="text-sm">
                        Small SUV
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="estate" className="mr-2" />
                      <label htmlFor="estate" className="text-sm">
                        Estate
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Search by make/model</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="e.g. Toyota Vitz" className="pl-10" />
                  </div>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Search</Button>
              </div>
            </div>

            <div className="bg-emerald-600 text-white p-6 rounded-xl">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                <span>Finance Calculator</span>
              </h3>
              <p className="text-white/80 text-sm mb-4">
                See how affordable your next car could be with our easy-to-use finance calculator.
              </p>
              <Button variant="outline" className="w-full border-white text-white hover:bg-white/10">
                Calculate now
              </Button>
            </div>
          </div>

          <div className="md:col-span-8 lg:col-span-9">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <Card key={car.$id} className="overflow-hidden border-emerald-100 hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={car.images?.[0] || "/placeholder.svg?height=192&width=384"}
                      alt={`${car.car_make?.name || "Car"} ${car.car_model || "Model"}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-emerald-600 text-white">Great Value</Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className="bg-white/80 border-0">
                        <Percent className="h-3 w-3 mr-1 text-emerald-600" />
                        {car.pricing_payments?.negotiable === "yes" ? "Negotiable" : "Fixed Price"}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-bold mb-1">
                      {car.car_make?.name || "Car"} {car.car_model || "Model"}
                    </h3>

                    <div className="flex justify-between items-baseline mb-4">
                      <div className="text-xl font-bold text-emerald-600">
                        {formatCurrency(car.pricing_payments?.selling_price, car.pricing_payments?.currency)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        or {calculateMonthlyPayment(car.pricing_payments?.selling_price || 0)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Fuel Economy</span>
                        <span className="text-sm">
                          {car.car_specifications?.fuel_economy ? `${car.car_specifications.fuel_economy} mpg` : "N/A"}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Insurance</span>
                        <span className="text-sm">{car.pricing_payments?.insurance_group || "N/A"}</span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Road Tax</span>
                        <span className="text-sm">
                          {car.pricing_payments?.road_tax ? `${car.pricing_payments.road_tax}/year` : "N/A"}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Warranty</span>
                        <span className="text-sm">{car.pricing_payments?.warranty || "N/A"}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium">
                          {car.condition === "New" ? "New" : `${car.year || ""} ${car.condition || ""}`}
                        </span>
                      </div>
                    </div>

                    <Link href={`/car/${car.slug}`} passHref>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">View details</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Link href="/used-cars?sort=price_asc" passHref>
                <Button variant="outline" className="gap-2">
                  View all budget-friendly cars <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-4">Money-Saving Tips</h3>
              <p className="text-muted-foreground mb-6">
                Get the most value from your car budget with our expert advice on buying, financing, and running a
                vehicle economically.
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <PiggyBank className="h-3 w-3 text-emerald-600" />
                  </div>
                  <div>
                    <span className="font-medium">Consider pre-registered cars</span>
                    <p className="text-sm text-muted-foreground">
                      Save thousands on nearly-new cars with delivery mileage.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <PiggyBank className="h-3 w-3 text-emerald-600" />
                  </div>
                  <div>
                    <span className="font-medium">Look for long warranty periods</span>
                    <p className="text-sm text-muted-foreground">
                      Some manufacturers offer up to 7 years of warranty coverage.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <PiggyBank className="h-3 w-3 text-emerald-600" />
                  </div>
                  <div>
                    <span className="font-medium">Compare insurance groups</span>
                    <p className="text-sm text-muted-foreground">
                      Lower insurance groups mean cheaper annual premiums.
                    </p>
                  </div>
                </li>
              </ul>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                Read our full guide <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative h-64 md:h-full">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Budget car buying"
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

