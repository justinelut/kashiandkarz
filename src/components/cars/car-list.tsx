"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  Eye,
  Tag,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CarInformation } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { saveReviewSubmit, updateStatus, deleteCarListing } from "@/lib/actions";

export type Car = {
  $id: string;
  slug: string;
  car_model: string;
  year: string;
  condition: string;
  fuel_type: string;
  transmission_type: string;
  car_make: {
    name: string;
    slug: string;
    image?: string;
  };
  images: string[];
  pricing_payments: {
    selling_price: number;
    currency: string;
    negotiable: string;
    installment_plans: string;
    payment_methods: string[];
    insurance_group?: string;
    road_tax?: string;
    warranty?: string;
  };
  status: "published" | "draft";
  availability: boolean;
  featured: boolean;
  big_deal: boolean;
  // Updated fields for admin category controls:
  category?: "sport" | "family" | "luxury"; // now includes luxury
  commercial?: boolean; // switch for commercial vehicles
  // Other fields...
};

export type ReviewSubmit = {
  status: "published" | "draft";
  availability: boolean;
  slug: string;
  featured: boolean;
  big_deal: boolean;
  category?: "sport" | "family" | "luxury";
  commercial?: boolean;
};

interface CarsListProps {
  cars: Car[];
}

export default function CarsList({ cars }: CarsListProps) {
  // Local copy to immediately reflect admin updates.
  const [updatedCars, setUpdatedCars] = useState<Car[]>(cars);
  const router = useRouter();

  useEffect(() => {
    setUpdatedCars(cars);
  }, [cars]);

  // Call the API update on change.
  async function handleUpdate(car: Car, updatedValues: Partial<ReviewSubmit>) {
    // Build new review data with additional fields.
    const newReviewData: ReviewSubmit = {
      status: updatedValues.status ?? car.status,
      availability: updatedValues.availability ?? car.availability,
      slug: car.slug, // unchanged
      featured: updatedValues.featured ?? car.featured,
      big_deal: updatedValues.big_deal ?? car.big_deal,
      category: updatedValues.category ?? car.category,
      commercial: updatedValues.commercial ?? car.commercial,
    };
    const result = await updateStatus(newReviewData, car.$id);
    if (result.success) {
      toast.success("Car updated successfully");
      setUpdatedCars((prev) =>
        prev.map((c) => (c.$id === car.$id ? { ...c, ...updatedValues } : c))
      );
    } else {
      toast.error("Error updating car", {
        description: result.error || "",
      });
    }
  }

  // Helper function to determine if a car is luxury based on price or other criteria
  const isLuxuryCar = (car: Car) => {
    // You might want to define your own criteria for luxury cars
    // This is just an example - using a high price threshold
    const price = car.pricing_payments?.selling_price;
    return price > 30000000; // Example threshold
  }

  // Render category control with Luxury as a separate switch
  const renderCategoryControl = (car: Car) => {
    // For luxury cars, we show a different UI
    if (car.category === "luxury") {
      return (
        <>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Luxury</span>
            <Switch
              checked={car.category === "luxury"}
              onCheckedChange={(checked) =>
                handleUpdate(car, { 
                  category: checked ? "luxury" : (isLuxuryCar(car) ? "sport" : "family") 
                })
              }
            />
          </div>
          {/* When luxury is enabled, we hide the sport/family selection */}
        </>
      );
    }

    // For non-luxury cars, we show the radio group and a luxury switch
    return (
      <>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Category</span>
          <RadioGroup
            value={car.category || "sport"}
            onValueChange={(value: "sport" | "family") =>
              handleUpdate(car, { category: value })
            }
            className="flex items-center space-x-4"
          >
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="sport" id={`sport-${car.$id}`} />
              <label htmlFor={`sport-${car.$id}`} className="text-sm">
                Sport Car
              </label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="family" id={`family-${car.$id}`} />
              <label htmlFor={`family-${car.$id}`} className="text-sm">
                Family Car
              </label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Luxury</span>
          <Switch
            checked={false}
            onCheckedChange={(checked) =>
              handleUpdate(car, { category: checked ? "luxury" : car.category })
            }
          />
        </div>
      </>
    );
  };

  const renderCommercialControl = (car: Car) => {
    return (
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Commercial</span>
        <Switch
          checked={car.commercial ?? false}
          onCheckedChange={(checked) =>
            handleUpdate(car, { commercial: Boolean(checked) })
          }
        />
      </div>
    );
  };

  // New function to render Big Deal switch
  const renderBigDealControl = (car: Car) => {
    return (
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Big Deal</span>
        <Switch
          checked={car.big_deal ?? false}
          onCheckedChange={(checked) =>
            handleUpdate(car, { big_deal: Boolean(checked) })
          }
        />
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {updatedCars.map((car) => (
        <Card key={car.$id} className={cn(
          "space-y-4 shadow hover:shadow-xl transition-shadow",
          car.big_deal && "ring-2 ring-orange-400"
        )}>
          <Link href={`/dashboard/cars/${car.$id}`}>
            <div className="relative h-48 w-full">
              {car.images?.length ? (
                <Image
                  src={car.images[0]}
                  alt={`${car.car_make.name} ${car.car_model}`}
                  fill
                  className="object-cover rounded-t-md"
                />
              ) : (
                <div className="h-48 w-full bg-muted flex items-center justify-center rounded-t-md">
                  <span>No Image</span>
                </div>
              )}
              {/* Badge container for the top-right corner */}
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                {/* Big Deal badge */}
                {car.big_deal && (
                  <Badge className="bg-orange-500 text-white px-2 py-1">
                    <Tag className="h-3 w-3 mr-1" /> Big Deal
                  </Badge>
                )}
                {/* Luxury badge */}
                {car.category === "luxury" && (
                  <Badge className="bg-yellow-400 text-black px-2 py-1">Luxury</Badge>
                )}
              </div>
            </div>
          </Link>
          <CardContent className="p-4">
            <h3 className="text-xl font-bold">
              {car.year} {car.car_make.name} {car.car_model}
            </h3>
            <p className="text-sm text-muted-foreground">{car.condition}</p>
            <p className="mt-2 font-semibold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: car.pricing_payments?.currency || "USD",
                maximumFractionDigits: 0,
              }).format(Number(car.pricing_payments?.selling_price || 0))}
            </p>
            {/* Display category badges */}
            <div className="mt-2 flex flex-wrap gap-2">
              {car.category && (
                <Badge variant={car.category === "luxury" ? "secondary" : "outline"}>
                  {car.category === "sport" 
                    ? "Sport" 
                    : car.category === "family" 
                      ? "Family" 
                      : "Luxury"}
                </Badge>
              )}
              {car.commercial && <Badge variant="outline">Commercial</Badge>}
              {car.featured && <Badge variant="outline" className="bg-blue-50">Featured</Badge>}
            </div>
          </CardContent>
          {/* Admin Controls – update onChange */}
          <div className="border-t border-gray-200 px-4 py-3 space-y-3">
            {/* Status: using shadcn Select */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              <Select
                value={car.status}
                onValueChange={(value: "published" | "draft") =>
                  handleUpdate(car, { status: value })
                }
              >
                <SelectTrigger className="w-32 text-sm">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Availability: using shadcn Switch */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Availability</span>
              <Switch
                checked={car.availability}
                onCheckedChange={(checked) =>
                  handleUpdate(car, { availability: Boolean(checked) })
                }
              />
            </div>
            {/* Featured: using shadcn Switch */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Featured</span>
              <Switch
                checked={car.featured}
                onCheckedChange={(checked) =>
                  handleUpdate(car, { featured: Boolean(checked) })
                }
              />
            </div>
            {/* Big Deal: using shadcn Switch */}
            {renderBigDealControl(car)}
            {/* Category controls */}
            {renderCategoryControl(car)}
            {/* Commercial: Switch control */}
            {renderCommercialControl(car)}
          </div>
        </Card>
      ))}
    </div>
  );
}