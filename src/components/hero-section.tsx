"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tag, Percent, Search, ChevronRight, Car, MapPin, Filter } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface HeroSectionProps {
  bigDeal?: any
}

export function HeroSection({ bigDeal }: HeroSectionProps) {
  const [query, setQuery] = useState("")
  const [searchCategory, setSearchCategory] = useState("all")
  const [isExpanded, setIsExpanded] = useState(false)
  const router = useRouter()

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?s=${encodeURIComponent(query)}&category=${searchCategory}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // Define the heroContent based on whether we have a bigDeal or not
  const getHeroContent = () => {
    if (!bigDeal) {
      return (
        <>
          <h1 className="animate-fade-in text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            DRIVE <span className="text-primary">CHANGE</span>
            <br />
            WITH KASHI.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/80">
            Find your perfect ride from thousands of quality vehicles. Easy search, transparent pricing, seamless experience.
          </p>
        </>
      )
    }

    // For bigDeal hero
    const makeModel = `${bigDeal.car_make?.name || ""} ${bigDeal.car_model || ""}`.trim()
    const year = bigDeal.year || ""
    const condition = bigDeal.condition || ""
    const price = bigDeal.pricing_payments?.selling_price
      ? formatCurrency(bigDeal.pricing_payments.selling_price, bigDeal.pricing_payments.currency || "KES")
      : "Price on request"

    return (
      <>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-sm font-medium text-white">
            <Tag className="mr-1 h-4 w-4" />
            BIG DEAL
          </span>
          {bigDeal.pricing_payments?.negotiable === "yes" && (
            <span className="inline-flex items-center rounded-full bg-green-600 px-3 py-1 text-sm font-medium text-white">
              <Percent className="mr-1 h-4 w-4" />
              NEGOTIABLE
            </span>
          )}
        </div>

        <h1 className="animate-fade-in text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {bigDeal.title || makeModel}
        </h1>

        <div className="flex flex-wrap gap-2">
          {year && <span className="rounded-md bg-white/20 px-2 py-1 text-sm text-white">{year}</span>}
          {condition && <span className="rounded-md bg-white/20 px-2 py-1 text-sm text-white">{condition}</span>}
          {bigDeal.car_specifications?.fuel_type && (
            <span className="rounded-md bg-white/20 px-2 py-1 text-sm text-white">
              {bigDeal.car_specifications.fuel_type}
            </span>
          )}
          {bigDeal.car_specifications?.transmission_type && (
            <span className="rounded-md bg-white/20 px-2 py-1 text-sm text-white">
              {bigDeal.car_specifications.transmission_type}
            </span>
          )}
        </div>

        <p className="text-xl text-white/90">
          {bigDeal.description ||
            `Experience luxury and performance with this ${condition.toLowerCase()} ${year} ${makeModel}.`}
        </p>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">{price}</span>
          {bigDeal.pricing_payments?.installment_plans === "yes" && (
            <span className="text-sm text-white/80">Installment plans available</span>
          )}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href={`/car-details/${bigDeal.$id}`}>View Details</Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20">
            Book Test Drive
          </Button>
        </div>
      </>
    )
  }

  // Get the appropriate hero image based on whether we have a bigDeal
  const heroImage = bigDeal && bigDeal.images && bigDeal.images.length > 0
    ? bigDeal.images[0]
    : "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729773746/evo/2024/10/G90%20BMW%20M5%20saloon-13.jpg"

  return (
    <section className="relative">
      {/* Background Video/Image with Overlay */}
      <div className="relative h-[700px] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt={bigDeal ? bigDeal.title || "Featured Car" : "KASHI Motors Hero"}
          fill
          className="object-cover transition-transform duration-10000 hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent">
          <div className="container relative flex h-full flex-col justify-center px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl space-y-6">
              {getHeroContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Search Panel */}
      <div className="absolute bottom-0 left-1/2 w-full max-w-5xl -translate-x-1/2 translate-y-1/2 transform px-4 md:px-6">
        <div className="rounded-xl bg-white p-2 shadow-2xl transition-all duration-300 ease-in-out md:p-4">
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="relative flex flex-col items-center gap-2 md:flex-row md:gap-4">
              <div className="group relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Search className="h-5 w-5" />
                </div>
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search by make, model, or keyword..."
                  className="h-12 rounded-lg border-none bg-gray-100 pl-10 text-base shadow-inner focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex w-full gap-2 md:w-auto">
                <Button 
                  variant="outline"
                  className={`h-12 border border-gray-200 transition-all duration-200 hover:bg-gray-100 ${isExpanded ? 'bg-gray-100' : ''}`}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <Button 
                  className="h-12 flex-1 gap-2 bg-primary text-white transition-all duration-200 hover:bg-primary/80 hover:shadow-lg md:min-w-[140px]"
                  onClick={handleSearch}
                >
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </Button>
              </div>
            </div>

            {/* Expandable Advanced Search Panel */}
            <div className={`grid grid-cols-1 gap-4 overflow-hidden transition-all duration-300 ease-in-out md:grid-cols-3 ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Price Range</label>
                <div className="flex items-center gap-2">
                  <Input placeholder="Min" className="h-10 bg-gray-100" />
                  <span className="text-gray-500">-</span>
                  <Input placeholder="Max" className="h-10 bg-gray-100" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Vehicle Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="justify-start border-gray-200 bg-gray-100 text-gray-700">
                    <Car className="mr-2 h-4 w-4" /> Sedan
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start border-gray-200 bg-gray-100 text-gray-700">
                    <Car className="mr-2 h-4 w-4" /> SUV
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Location</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <Input placeholder="City or Region" className="h-10 bg-gray-100 pl-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="container relative z-10 mx-auto mt-24 px-4 py-8 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Link href="/sell" className="group rounded-xl bg-white p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
              <Car className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold">Sell Your Car</h3>
            <p className="mt-2 text-sm text-gray-500">Quick, easy, best price</p>
            <ChevronRight className="ml-auto mr-0 mt-2 h-5 w-5 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100" />
          </Link>
          
          <Link href="/new-cars" className="group rounded-xl bg-white p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
              <Tag className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold">New Cars</h3>
            <p className="mt-2 text-sm text-gray-500">Latest models available</p>
            <ChevronRight className="ml-auto mr-0 mt-2 h-5 w-5 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100" />
          </Link>
          
          <Link href="/used-cars" className="group rounded-xl bg-white p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
              <Percent className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold">Used Cars</h3>
            <p className="mt-2 text-sm text-gray-500">Quality pre-owned vehicles</p>
            <ChevronRight className="ml-auto mr-0 mt-2 h-5 w-5 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100" />
          </Link>
          
          <Link href="/financing" className="group rounded-xl bg-white p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Financing</h3>
            <p className="mt-2 text-sm text-gray-500">Flexible payment options</p>
            <ChevronRight className="ml-auto mr-0 mt-2 h-5 w-5 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100" />
          </Link>
        </div>
      </div>
    </section>
  )
}