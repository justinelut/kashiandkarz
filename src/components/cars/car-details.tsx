"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Check,
  Calendar,
  Gauge,
  Fuel,
  Zap,
  Shield,
  DollarSign,
  PencilIcon,
  ChevronLeft,
  ChevronDown,
  Heart,
  Share,
  MapPin,
  Award,
  FileText,
  Settings,
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
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Assume deleteCarListing is an API function that deletes the car listing
import { deleteCarListing } from "@/lib/actions";
import { toast } from "sonner";

interface CarDetailsProps {
  car: CarInformation;
}

export default function CarDetails({ car }: CarDetailsProps) {
  const router = useRouter();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Format currency
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: car.pricing_payments?.currency || "USD",
    maximumFractionDigits: 0,
  }).format(Number(car.pricing_payments?.selling_price) || 0);

  // Navigation to edit forms for various sections
  const navigateToEdit = (section: string) => {
    switch (section) {
      case "basic":
        router.push(`/dashboard/cars/new?id=${car.$id}&mode=edit`);
        break;
      case "specifications":
        router.push(`/dashboard/cars/new/car-specification?id=${car.$id}&mode=edit`);
        break;
      case "features":
        router.push(`/dashboard/cars/new/car-features?id=${car.$id}&mode=edit`);
        break;
      case "ownership":
        router.push(`/dashboard/cars/new/ownership?id=${car.$id}&mode=edit`);
        break;
      case "pricing":
        router.push(`/dashboard/cars/new/pricing?id=${car.$id}&mode=edit`);
        break;
      case "photos":
        router.push(`/dashboard/cars/new/photo-video?id=${car.$id}&mode=edit`);
        break;
      default:
        break;
    }
  };

  // Delete listing handler
  const handleDelete = async () => {
    try {
      const result = await deleteCarListing(car.$id);
      if (result.success) {
        toast({
          title: "Success",
          description: "Listing deleted successfully.",
        });
        router.push("/dashboard/cars");
      } else {
        toast({
          title: "Error",
          description: result.error || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
    setShowDeleteDialog(false);
  };

  // Next and previous buttons for gallery
  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  // Get feature groupings
  const getFeaturesByCategory = (category) => {
    const features = car.car_features?.[category];
    if (!features || features.length === 0) return null;
    
    return (
      <div className="space-y-1">
        <h4 className="text-sm font-medium">{category.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()).replace("Features", "")}</h4>
        <div className="flex flex-wrap gap-2">
          {features.map((feature, idx) => (
            <Badge key={idx} variant="outline" className="flex items-center gap-1">
              <Check className="h-3 w-3" /> {feature}
            </Badge>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header Section with Actions */}
      <div className="border-b pb-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/cars")}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Cars
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {car.year} {car.car_make?.name} {car.car_model}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-1 text-sm">
              <Badge variant={car.availability ? "success" : "outline"} className="capitalize">
                {car.availability ? "Available" : "Sold"}
              </Badge>
              <span>•</span>
              <span>ID: {car.$id}</span>
              <span>•</span>
              <span>Created: {new Date(car.$createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateToEdit("basic")}>
              <PencilIcon className="h-4 w-4 mr-2" /> Edit
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Gallery and Key Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gallery */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Photo Gallery</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => navigateToEdit("photos")}
                >
                  <PencilIcon className="h-3 w-3 mr-1" /> Edit Photos
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              {/* Main Image with Controls */}
              <div className="relative aspect-[16/9] rounded-md overflow-hidden border mb-4">
                {car.images && car.images.length > 0 ? (
                  <>
                    <Image
                      src={car.images[activeImageIndex] || "/placeholder.svg"}
                      alt={`${car.car_make?.name} ${car.car_model}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 800px"
                      priority
                    />
                    
                    {car.images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                          {activeImageIndex + 1} / {car.images.length}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full bg-muted">
                    <p className="text-muted-foreground">No images available</p>
                  </div>
                )}
              </div>
              
              {/* Thumbnails */}
              {car.images && car.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {car.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={cn(
                        "aspect-square relative rounded-md overflow-hidden border",
                        activeImageIndex === index ? "ring-2 ring-primary" : ""
                      )}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${car.car_make?.name} ${car.car_model} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Car Description */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Description</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => navigateToEdit("basic")}
                >
                  <PencilIcon className="h-3 w-3 mr-1" /> Edit
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line text-muted-foreground">
                {car.description || "No description provided."}
              </p>
            </CardContent>
          </Card>
          
          {/* Tabs for Detailed Information */}
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="features" className="flex-1">Features</TabsTrigger>
              <TabsTrigger value="specifications" className="flex-1">Specifications</TabsTrigger>
              <TabsTrigger value="ownership" className="flex-1">Ownership</TabsTrigger>
            </TabsList>
            
            {/* Features Tab */}
            <TabsContent value="features" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Features & Equipment</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => navigateToEdit("features")}
                    >
                      <PencilIcon className="h-3 w-3 mr-1" /> Edit Features
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {car.car_features ? (
                      <>
                        {getFeaturesByCategory("interior_features")}
                        {getFeaturesByCategory("exterior_features")}
                        {getFeaturesByCategory("safety_features")}
                        {getFeaturesByCategory("engine_features")}
                        {getFeaturesByCategory("wheels_features")}
                        {getFeaturesByCategory("convenience_features")}
                        {getFeaturesByCategory("entertainment_features")}
                        {getFeaturesByCategory("security_features")}
                        {getFeaturesByCategory("sports_car_features")}
                        {getFeaturesByCategory("family_car_features")}
                        {getFeaturesByCategory("ecofriendly_features")}
                        {getFeaturesByCategory("commercial_car_features")}
                      </>
                    ) : (
                      <p className="text-muted-foreground">No features added yet.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Specifications Tab */}
            <TabsContent value="specifications" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Technical Specifications</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => navigateToEdit("specifications")}
                    >
                      <PencilIcon className="h-3 w-3 mr-1" /> Edit Specs
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {car.car_specifications ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                      <div className="grid grid-cols-2 gap-y-2">
                        <span className="text-muted-foreground">Fuel Type:</span>
                        <span className="capitalize">{car.car_specifications.fuel_type}</span>
                        
                        <span className="text-muted-foreground">Transmission:</span>
                        <span className="capitalize">{car.car_specifications.transmission_type}</span>
                        
                        <span className="text-muted-foreground">Drive Train:</span>
                        <span className="uppercase">{car.car_specifications.drive_train}</span>
                        
                        <span className="text-muted-foreground">Engine Capacity:</span>
                        <span>{car.car_specifications.engine_capacity} L</span>
                        
                        <span className="text-muted-foreground">Horsepower:</span>
                        <span>{car.car_specifications.horse_power} hp</span>
                        
                        <span className="text-muted-foreground">Torque:</span>
                        <span>{car.car_specifications.torque} Nm</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-y-2">
                        <span className="text-muted-foreground">Mileage:</span>
                        <span>{Number(car.car_specifications.mileage).toLocaleString()} {car.car_specifications.mileage_unit}</span>
                        
                        <span className="text-muted-foreground">Top Speed:</span>
                        <span>{car.car_specifications.top_speed} km/h</span>
                        
                        <span className="text-muted-foreground">Acceleration (0-100):</span>
                        <span>{car.car_specifications.acceleration} sec</span>
                        
                        <span className="text-muted-foreground">CO2 Emissions:</span>
                        <span>{car.car_specifications.co2_emissions} g/km</span>
                        
                        <span className="text-muted-foreground">Fuel Economy:</span>
                        <span>{car.car_specifications.fuel_economy} mpg</span>
                        
                        <span className="text-muted-foreground">Doors/Seats:</span>
                        <span>{car.car_specifications.doors}d / {car.car_specifications.seats}s</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No specifications added yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Ownership Tab */}
            <TabsContent value="ownership" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Ownership & Documentation</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => navigateToEdit("ownership")}
                    >
                      <PencilIcon className="h-3 w-3 mr-1" /> Edit Details
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {car.ownership_documentation ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">VIN</p>
                            <p className="font-medium">{car.ownership_documentation.vin || "Not provided"}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Registration Number</p>
                            <p className="font-medium">{car.ownership_documentation.registration_number}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Logbook Available</p>
                            <p className="font-medium">{car.ownership_documentation.logbook_availability === "yes" ? "Yes" : "No"}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Previous Owners</p>
                            <p className="font-medium">{car.ownership_documentation.previous_owners}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Insurance Status</p>
                            <p className="font-medium capitalize">{car.ownership_documentation.insurance_status}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No ownership information added yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right Column - Pricing and Key Info */}
        <div className="space-y-6">
          {/* Price Card */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Pricing Information</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => navigateToEdit("pricing")}
                >
                  <PencilIcon className="h-3 w-3 mr-1" /> Edit
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Selling Price</p>
                  <p className="text-3xl font-bold text-primary">{formattedPrice}</p>
                  
                  {car.pricing_payments?.negotiable === "yes" && (
                    <Badge variant="outline" className="mt-1">Negotiable</Badge>
                  )}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  {car.pricing_payments?.payment_methods && car.pricing_payments.payment_methods.length > 0 && (
                    <div className="grid grid-cols-2 gap-y-1">
                      <span className="text-sm text-muted-foreground">Payment Methods:</span>
                      <span className="text-sm capitalize">
                        {car.pricing_payments.payment_methods.join(", ").replace(/-/g, " ")}
                      </span>
                    </div>
                  )}
                  
                  {car.pricing_payments?.installment_plans && (
                    <div className="grid grid-cols-2 gap-y-1">
                      <span className="text-sm text-muted-foreground">Installments:</span>
                      <span className="text-sm">{car.pricing_payments.installment_plans === "yes" ? "Available" : "Not Available"}</span>
                    </div>
                  )}
                  
                  {car.pricing_payments?.warranty && (
                    <div className="grid grid-cols-2 gap-y-1">
                      <span className="text-sm text-muted-foreground">Warranty:</span>
                      <span className="text-sm">{car.pricing_payments.warranty}</span>
                    </div>
                  )}
                  
                  {car.pricing_payments?.insurance_group && (
                    <div className="grid grid-cols-2 gap-y-1">
                      <span className="text-sm text-muted-foreground">Insurance Group:</span>
                      <span className="text-sm">{car.pricing_payments.insurance_group}</span>
                    </div>
                  )}
                  
                  {car.pricing_payments?.road_tax && (
                    <div className="grid grid-cols-2 gap-y-1">
                      <span className="text-sm text-muted-foreground">Road Tax:</span>
                      <span className="text-sm">{car.pricing_payments.road_tax}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Key Info Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Key Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
                    <Calendar className="h-5 w-5 text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground">Year</span>
                    <span className="font-medium">{car.year}</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
                    <Gauge className="h-5 w-5 text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground">Mileage</span>
                    <span className="font-medium">{Number(car.car_specifications?.mileage).toLocaleString()} {car.car_specifications?.mileage_unit}</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
                    <Fuel className="h-5 w-5 text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground">Fuel</span>
                    <span className="font-medium capitalize">{car.car_specifications?.fuel_type || "N/A"}</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
                    <Zap className="h-5 w-5 text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground">Transmission</span>
                    <span className="font-medium capitalize">{car.car_specifications?.transmission_type || "N/A"}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Body Type</p>
                      <p className="font-medium">{car.car_type?.name || "Not specified"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Condition</p>
                      <p className="font-medium capitalize">{car.condition || "Not specified"}</p>
                    </div>
                  </div>
                  
                  {car.color && (
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-4 w-4 rounded-full border"
                        style={{ backgroundColor: car.color.hex || "#000000" }}
                      />
                      <div>
                        <p className="text-sm text-muted-foreground">Color</p>
                        <p className="font-medium">{car.color.name}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Listing Status Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Listing Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <Badge variant={car.status === "published" ? "success" : "secondary"} className="mb-2">
                    {car.status === "published" ? "Published" : "Draft"}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {car.status === "published" 
                      ? "This listing is live and visible to the public." 
                      : "This listing is not yet published. Complete all required fields and publish when ready."}
                  </p>
                </div>
                
                <Button className="w-full" variant={car.status === "published" ? "outline" : "default"}>
                  {car.status === "published" ? "Edit Listing" : "Publish Listing"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this listing? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}