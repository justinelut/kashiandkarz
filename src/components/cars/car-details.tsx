"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronRight,
  Check,
  Calendar,
  Gauge,
  Fuel,
  Zap,
  Shield,
  Sparkles,
  DollarSign,
  Edit,
  PencilIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CarInformation } from "@/types/types"

interface CarDetailsProps {
  car: CarInformation
}

export default function CarDetails({ car }: CarDetailsProps) {
  const router = useRouter()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  console.log(JSON.stringify(car))

  // Format currency
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: car.currency,
    maximumFractionDigits: 0,
  }).format(Number(car.selling_price))

  // Navigation to edit forms
  const navigateToEdit = (section: string) => {
    switch (section) {
      case "basic":
        router.push(`/dashboard/cars/new?id=${car.$id}&mode=edit`)
        break
      case "specifications":
        router.push(`/dashboard/cars/new/car-specification?id=${car.$id}&mode=edit`)
        break
      case "features":
        router.push(`/dashboard/cars/new/car-features?id=${car.$id}&mode=edit`)
        break
      case "ownership":
        router.push(`/dashboard/cars/new/ownership?id=${car.$id}&mode=edit`)
        break
      case "pricing":
        router.push(`/dashboard/cars/new/pricing?id=${car.$id}&mode=edit`)
        break
      case "photos":
        router.push(`/dashboard/cars/new/photo-video?id=${car.$id}&mode=edit`)
        break
      default:
        break
    }
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/cars" className="hover:text-foreground">
          Cars
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-foreground font-medium truncate">
          {car.year} {car.car_make.name} {car.car_model}
        </span>
      </div>

      {/* Car Title and Status */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {car.year} {car.car_make.name} {car.car_model}
            </h1>
            <button
              onClick={() => navigateToEdit("basic")}
              className="p-1.5 rounded-full hover:bg-muted transition-colors"
              title="Edit basic information"
            >
              <PencilIcon className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <p className="text-muted-foreground mt-1">
            {car.color?.name} • {car.condition} • {Number(car.mileage).toLocaleString()} miles
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={car.availability ? "default" : "secondary"} className="px-3 py-1 text-sm">
            {car.availability ? "Available" : "Sold"}
          </Badge>
          <span className="text-2xl font-bold text-primary">{formattedPrice}</span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-9 space-y-4">
          {/* Main Image */}
          <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
            <Image
              src={car.images[activeImageIndex] || "/placeholder.svg?height=600&width=800"}
              alt={`${car.year} ${car.car_make.name} ${car.car_model}`}
              fill
              className="object-cover"
              priority
            />
            <button
              onClick={() => navigateToEdit("photos")}
              className="absolute top-2 right-2 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              title="Edit photos"
            >
              <Edit className="h-4 w-4 text-white" />
            </button>
          </div>

          {/* Thumbnails */}
          {car.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              {car.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={cn(
                    "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border",
                    activeImageIndex === index ? "ring-2 ring-primary ring-offset-2" : ""
                  )}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${car.year} ${car.car_make.name} ${car.car_model} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Info */}
        <div className="md:col-span-3 space-y-6">
          <div className="rounded-lg border p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Quick Info</h3>
              <button
                onClick={() => navigateToEdit("specifications")}
                className="p-1.5 rounded-full hover:bg-muted transition-colors"
                title="Edit specifications"
              >
                <PencilIcon className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-medium">{car.year}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Mileage</p>
                  <p className="font-medium">{Number(car.mileage).toLocaleString()} miles</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Transmission</p>
                  <p className="font-medium">{car.transmission_type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Fuel className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Fuel Type</p>
                  <p className="font-medium">{car.fuel_type}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-bold text-primary">{formattedPrice}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigateToEdit("pricing")}
                  className="p-1.5 rounded-full hover:bg-muted transition-colors"
                  title="Edit pricing"
                >
                  <PencilIcon className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
              {car.negotiable === "yes" && (
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <p className="text-sm">Negotiable</p>
                </div>
              )}
              {car.installment_plans === "yes" && (
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <p className="text-sm">Installment Plans Available</p>
                </div>
              )}
            </div>

            <Button className="w-full">Contact Seller</Button>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="rounded-lg border p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Description</h3>
          <button
            onClick={() => navigateToEdit("basic")}
            className="p-1.5 rounded-full hover:bg-muted transition-colors"
            title="Edit description"
          >
            <PencilIcon className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <p className="text-muted-foreground whitespace-pre-line">{car.description}</p>
      </div>

      {/* Features Section */}
      <div className="rounded-lg border p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Features</h3>
          <button
            onClick={() => navigateToEdit("features")}
            className="p-1.5 rounded-full hover:bg-muted transition-colors"
            title="Edit features"
          >
            <PencilIcon className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {car.exterior_features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Exterior Features
              </h3>
              <ul className="space-y-2">
                {car.exterior_features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {car.interior_features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Interior Features
              </h3>
              <ul className="space-y-2">
                {car.interior_features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {car.safety_features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Safety Features
              </h3>
              <ul className="space-y-2">
                {car.safety_features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Vehicle Details Section */}
      <div className="rounded-lg border p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Vehicle Details</h3>
          <button
            onClick={() => navigateToEdit("ownership")}
            className="p-1.5 rounded-full hover:bg-muted transition-colors"
            title="Edit specifications"
          >
            <PencilIcon className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="grid grid-cols-2 py-2 border-b">
              <span className="text-muted-foreground">Make</span>
              <span className="font-medium">{car.car_make.name}</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b">
              <span className="text-muted-foreground">Model</span>
              <span className="font-medium">{car.car_model}</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b">
              <span className="text-muted-foreground">Year</span>
              <span className="font-medium">{car.year}</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b">
              <span className="text-muted-foreground">Color</span>
              <span className="font-medium">{car.color?.name}</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b">
              <span className="text-muted-foreground">Condition</span>
              <span className="font-medium">{car.condition}</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b">
              <span className="text-muted-foreground">Transmission</span>
              <span className="font-medium">{car.transmission_type}</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b">
              <span className="text-muted-foreground">Fuel Type</span>
              <span className="font-medium">{car.fuel_type}</span>
            </div>
            <div className="grid grid-cols-2 py-2">
              <span className="text-muted-foreground">Mileage</span>
              <span className="font-medium">{Number(car.mileage).toLocaleString()} miles</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-2 py-2 border-b">
              <span className="text-muted-foreground">VIN</span>
              <span className="font-medium">{car.vin}</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b">
              <span className="text-muted-foreground">Registration Number</span>
              <span className="font-medium">{car.registration_number}</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b">
              <span className="text-muted-foreground">Logbook Available</span>
              <span className="font-medium">{car.logbook_availability === "yes" ? "Yes" : "No"}</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b">
              <span className="text-muted-foreground">Previous Owners</span>
              <span className="font-medium">{car.previous_owners}</span>
            </div>
            <div className="grid grid-cols-2 py-2">
              <span className="text-muted-foreground">Insurance Status</span>
              <span className="font-medium capitalize">{car.insurance_status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="rounded-lg border p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Pricing Information</h3>
          <button
            onClick={() => navigateToEdit("pricing")}
            className="p-1.5 rounded-full hover:bg-muted transition-colors"
            title="Edit pricing"
          >
            <PencilIcon className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <div className="space-y-2">
          <div className="grid grid-cols-2 py-2 border-b">
            <span className="text-muted-foreground">Selling Price</span>
            <span className="font-bold text-primary">{formattedPrice}</span>
          </div>
          <div className="grid grid-cols-2 py-2 border-b">
            <span className="text-muted-foreground">Negotiable</span>
            <span className="font-medium">{car.negotiable === "yes" ? "Yes" : "No"}</span>
          </div>
          <div className="grid grid-cols-2 py-2">
            <span className="text-muted-foreground">Installment Plans</span>
            <span className="font-medium">{car.installment_plans === "yes" ? "Available" : "Not Available"}</span>
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="rounded-lg border p-6 space-y-4">
        <h3 className="text-lg font-semibold">Accepted Payment Methods</h3>
        <div className="flex flex-wrap gap-2">
          {car.payment_methods.map((method, index) => (
            <Badge key={index} variant="outline" className="px-3 py-1">
              {method}
            </Badge>
          ))}
        </div>
      </div>

      {/* Contact Seller Section */}
      <div className="bg-muted/30 p-6 rounded-md">
        <h3 className="text-md font-medium mb-2">Contact the Seller</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Interested in this vehicle? Contact the seller to arrange a viewing or to discuss payment options.
        </p>
        <Button className="w-full sm:w-auto">Contact Seller</Button>
      </div>
    </div>
  )
}
