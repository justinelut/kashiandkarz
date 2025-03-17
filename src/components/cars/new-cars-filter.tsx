"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, X } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface NewCarsFilterProps {
  currentFilters: {
    search?: string
    makes?: string[]
    models?: string[]
    bodyTypes?: string[]
    priceMin?: number
    priceMax?: number
    colors?: string[]
    fuelTypes?: string[]
    transmissions?: string[]
    sortBy?: "price-low" | "price-high" | "newest" | "popularity"
    specialOffers?: boolean
    preOrder?: boolean
  }
}

export function NewCarsFilter({ currentFilters }: NewCarsFilterProps) {
  const router = useRouter()

  // State for filters
  const [filters, setFilters] = useState({
    search: currentFilters.search || "",
    makes: currentFilters.makes || [],
    models: currentFilters.models || [],
    bodyTypes: currentFilters.bodyTypes || [],
    priceMin: currentFilters.priceMin || 0,
    priceMax: currentFilters.priceMax || 10000000,
    colors: currentFilters.colors || [],
    fuelTypes: currentFilters.fuelTypes || [],
    transmissions: currentFilters.transmissions || [],
    sortBy: currentFilters.sortBy || "newest",
    specialOffers: currentFilters.specialOffers || false,
    preOrder: currentFilters.preOrder || false,
  })

  // Mock data for filters
  const mockData = {
    makes: [
      { id: "bmw", name: "BMW" },
      { id: "mercedes", name: "Mercedes-Benz" },
      { id: "audi", name: "Audi" },
      { id: "toyota", name: "Toyota" },
      { id: "honda", name: "Honda" },
    ],
    bodyTypes: [
      { id: "sedan", name: "Sedan" },
      { id: "suv", name: "SUV" },
      { id: "hatchback", name: "Hatchback" },
      { id: "coupe", name: "Coupe" },
      { id: "convertible", name: "Convertible" },
    ],
    colors: [
      { id: "black", name: "Black" },
      { id: "white", name: "White" },
      { id: "silver", name: "Silver" },
      { id: "blue", name: "Blue" },
      { id: "red", name: "Red" },
    ],
    fuelTypes: [
      { id: "petrol", name: "Petrol" },
      { id: "diesel", name: "Diesel" },
      { id: "electric", name: "Electric" },
      { id: "hybrid", name: "Hybrid" },
    ],
    transmissions: [
      { id: "automatic", name: "Automatic" },
      { id: "manual", name: "Manual" },
    ],
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value })
  }

  // Handle price range change
  const handlePriceChange = (values: number[]) => {
    setFilters({ ...filters, priceMin: values[0], priceMax: values[1] })
  }

  // Handle checkbox change
  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    if (checked) {
      setFilters({ ...filters, [field]: [...(filters[field as keyof typeof filters] as string[]), value] })
    } else {
      setFilters({
        ...filters,
        [field]: (filters[field as keyof typeof filters] as string[]).filter((item) => item !== value),
      })
    }
  }

  // Handle boolean filter change
  const handleBooleanChange = (field: string, checked: boolean) => {
    setFilters({ ...filters, [field]: checked })
  }

  // Handle sort change
  const handleSortChange = (value: string) => {
    setFilters({ ...filters, sortBy: value as "price-low" | "price-high" | "newest" | "popularity" })
  }

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams()

    if (filters.search) params.set("search", filters.search)
    if (filters.makes.length > 0) params.set("makes", filters.makes[0])
    if (filters.models.length > 0) params.set("models", filters.models[0])
    if (filters.bodyTypes.length > 0) params.set("bodyTypes", filters.bodyTypes[0])
    if (filters.priceMin > 0) params.set("priceMin", filters.priceMin.toString())
    if (filters.priceMax < 10000000) params.set("priceMax", filters.priceMax.toString())
    if (filters.colors.length > 0) params.set("colors", filters.colors[0])
    if (filters.fuelTypes.length > 0) params.set("fuelTypes", filters.fuelTypes[0])
    if (filters.transmissions.length > 0) params.set("transmissions", filters.transmissions[0])
    if (filters.sortBy !== "newest") params.set("sortBy", filters.sortBy)
    if (filters.specialOffers) params.set("specialOffers", "true")
    if (filters.preOrder) params.set("preOrder", "true")

    router.push(`/new-cars?${params.toString()}`)
  }

  // Reset filters
  const resetFilters = () => {
    setFilters({
      search: "",
      makes: [],
      models: [],
      bodyTypes: [],
      priceMin: 0,
      priceMax: 10000000,
      colors: [],
      fuelTypes: [],
      transmissions: [],
      sortBy: "newest",
      specialOffers: false,
      preOrder: false,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2">
          <X className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <Label htmlFor="search" className="text-sm font-medium">
            Search
          </Label>
          <div className="relative mt-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by make, model or keyword"
              className="pl-9"
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Sort By */}
        <div>
          <Label htmlFor="sort" className="text-sm font-medium">
            Sort By
          </Label>
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger id="sort" className="mt-1">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="popularity">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Accordion type="multiple" defaultValue={["price", "make", "special"]}>
          {/* Price Range */}
          <AccordionItem value="price" className="border-b">
            <AccordionTrigger className="text-sm font-medium">Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="pt-4 px-1">
                <div className="flex justify-between mb-4 text-sm">
                  <span>{formatCurrency(filters.priceMin)}</span>
                  <span>{formatCurrency(filters.priceMax)}</span>
                </div>
                <Slider
                  min={0}
                  max={10000000}
                  step={100000}
                  value={[filters.priceMin, filters.priceMax]}
                  onValueChange={handlePriceChange}
                  className="mb-6"
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Make */}
          <AccordionItem value="make" className="border-b">
            <AccordionTrigger className="text-sm font-medium">Make</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {mockData.makes.map((make) => (
                  <div key={make.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`make-${make.id}`}
                      checked={filters.makes.includes(make.id)}
                      onCheckedChange={(checked) => handleCheckboxChange("makes", make.id, checked === true)}
                    />
                    <Label htmlFor={`make-${make.id}`} className="text-sm font-normal cursor-pointer">
                      {make.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Body Type */}
          <AccordionItem value="bodyType" className="border-b">
            <AccordionTrigger className="text-sm font-medium">Body Type</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {mockData.bodyTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`bodyType-${type.id}`}
                      checked={filters.bodyTypes.includes(type.id)}
                      onCheckedChange={(checked) => handleCheckboxChange("bodyTypes", type.id, checked === true)}
                    />
                    <Label htmlFor={`bodyType-${type.id}`} className="text-sm font-normal cursor-pointer">
                      {type.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Fuel Type */}
          <AccordionItem value="fuelType" className="border-b">
            <AccordionTrigger className="text-sm font-medium">Fuel Type</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {mockData.fuelTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`fuelType-${type.id}`}
                      checked={filters.fuelTypes.includes(type.id)}
                      onCheckedChange={(checked) => handleCheckboxChange("fuelTypes", type.id, checked === true)}
                    />
                    <Label htmlFor={`fuelType-${type.id}`} className="text-sm font-normal cursor-pointer">
                      {type.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Transmission */}
          <AccordionItem value="transmission" className="border-b">
            <AccordionTrigger className="text-sm font-medium">Transmission</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {mockData.transmissions.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`transmission-${type.id}`}
                      checked={filters.transmissions.includes(type.id)}
                      onCheckedChange={(checked) => handleCheckboxChange("transmissions", type.id, checked === true)}
                    />
                    <Label htmlFor={`transmission-${type.id}`} className="text-sm font-normal cursor-pointer">
                      {type.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Color */}
          <AccordionItem value="color" className="border-b">
            <AccordionTrigger className="text-sm font-medium">Color</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {mockData.colors.map((color) => (
                  <div key={color.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color.id}`}
                      checked={filters.colors.includes(color.id)}
                      onCheckedChange={(checked) => handleCheckboxChange("colors", color.id, checked === true)}
                    />
                    <Label htmlFor={`color-${color.id}`} className="text-sm font-normal cursor-pointer">
                      {color.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Special Features */}
          <AccordionItem value="special" className="border-b">
            <AccordionTrigger className="text-sm font-medium">Special Features</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="specialOffers"
                    checked={filters.specialOffers}
                    onCheckedChange={(checked) => handleBooleanChange("specialOffers", checked === true)}
                  />
                  <Label htmlFor="specialOffers" className="text-sm font-normal cursor-pointer">
                    Special Offers
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="preOrder"
                    checked={filters.preOrder}
                    onCheckedChange={(checked) => handleBooleanChange("preOrder", checked === true)}
                  />
                  <Label htmlFor="preOrder" className="text-sm font-normal cursor-pointer">
                    Pre-Order Available
                  </Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button className="w-full" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  )
}

