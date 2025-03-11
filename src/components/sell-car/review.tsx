"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, Eye } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

import { Button } from "@/components/ui/button";
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
import { saveReviewSubmit } from "@/lib/actions";

interface ReviewSubmitFormProps {
  carId: string;
  carinfo: any;
}

// List of feature groups to render dynamically.
const featureFields = [
  { key: "interior_features", label: "Interior Features" },
  { key: "engine_features", label: "Engine Features" },
  { key: "wheels_features", label: "Wheels Features" },
  { key: "exterior_features", label: "Exterior Features" },
  { key: "safety_features", label: "Safety Features" },
  { key: "entertainment_features", label: "Entertainment Features" },
  { key: "convenience_features", label: "Convenience Features" },
  { key: "security_features", label: "Security Features" },
  { key: "sports_car_features", label: "Sports Car Features" },
  { key: "family_car_features", label: "Family Car Features" },
  { key: "ecofriendly_features", label: "Ecofriendly Features" },
  { key: "commercial_car_features", label: "Commercial Car Features" },
];

export default function ReviewSubmitForm({ carId, carinfo }: ReviewSubmitFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Destructure the full car data
  const data = carinfo.data;

  // Basic Information including car make image
  const basic_info = {
    title: data.title,
    car_model: data.car_model,
    year: data.year,
    condition: data.condition,
    description: data.description,
    car_make: data.car_make?.name,
    car_make_image: data.car_make?.image, // Render full image
    car_type: data.car_type?.name,
    color: data.color, // { name, hex }
  };

  // Car Specifications (omit metadata keys)
  const specifications = data.car_specifications;

  // Car Features
  const features = data.car_features;

  // Ownership Documentation
  const ownership = data.ownership_documentation;

  // Pricing & Payment
  const pricing = data.pricing_payments;

  // Photos & Media
  const photos = { images: data.images, video: data.video };

  // Helper: Render Specifications (filter out keys starting with "$")
  const renderSpecifications = () => {
    return (
      <div className="mt-2 grid gap-2 text-sm">
        {Object.entries(specifications)
          .filter(([key]) => !key.startsWith("$"))
          .map(([key, value]) => (
            <div key={key} className="grid grid-cols-2">
              <span className="text-muted-foreground">
                {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}:
              </span>
              <span>{value !== "" && value !== null ? value.toString() : "-"}</span>
            </div>
          ))}
      </div>
    );
  };

  // Helper: Render Features dynamically using featureFields array
  const renderFeatures = () => {
    return (
      <div className="mt-2 grid gap-4 text-sm">
        {featureFields.map(({ key, label }) => {
          const items = features?.[key] as string[] | undefined;
          return (
            <div key={key}>
              <h4 className="font-medium">{label}</h4>
              {items && items.length > 0 ? (
                <ul className="mt-1 list-disc list-inside">
                  {items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">None</p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Helper: Render Ownership Documentation
  const renderOwnership = () => {
    return (
      <div className="mt-2 grid gap-2 text-sm">
        <div className="grid grid-cols-2">
          <span className="text-muted-foreground">VIN:</span>
          <span>{ownership.vin || "-"}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="text-muted-foreground">Registration Number:</span>
          <span>{ownership.registration_number}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="text-muted-foreground">Logbook Available:</span>
          <span>{ownership.logbook_availability === "yes" ? "Yes" : "No"}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="text-muted-foreground">Previous Owners:</span>
          <span>{ownership.previous_owners}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="text-muted-foreground">Insurance Status:</span>
          <span className="capitalize">{ownership.insurance_status}</span>
        </div>
      </div>
    );
  };

  // Helper: Render Pricing & Payment
  const renderPricing = () => {
    return (
      <div className="mt-2 grid gap-2 text-sm">
        <div className="grid grid-cols-2">
          <span className="text-muted-foreground">Selling Price:</span>
          <span className="text-xl font-bold text-primary">
            {pricing.currency} {pricing.selling_price}
          </span>
        </div>
        <div className="grid grid-cols-2">
          <span className="text-muted-foreground">Negotiable:</span>
          <span>{pricing.negotiable === "yes" ? "Yes" : "No"}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="text-muted-foreground">Installment Plans:</span>
          <span>{pricing.installment_plans === "yes" ? "Available" : "Not Available"}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="text-muted-foreground">Payment Methods:</span>
          <span>{pricing.payment_methods.join(", ")}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="text-muted-foreground">Insurance Group:</span>
          <span>{pricing.insurance_group}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="text-muted-foreground">Road Tax:</span>
          <span>{pricing.road_tax}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="text-muted-foreground">Warranty:</span>
          <span>{pricing.warranty}</span>
        </div>
      </div>
    );
  };

  // Helper: Render Photos & Media
  const renderPhotos = () => {
    return (
      <div className="mt-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.images.map((image: string, index: number) => (
            <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={`Car Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 200px"
              />
            </div>
          ))}
        </div>
        {photos.video && (
          <div className="mt-4 text-sm">
            <span className="text-muted-foreground">Video URL:</span>
            <span className="truncate block">{photos.video}</span>
          </div>
        )}
      </div>
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
    
      const result = await saveReviewSubmit(
        { status: "published", availability: true},
        carId
      );
      if (result.success) {
        setShowSuccessDialog(true);
      } else {
        toast.error("Error submitting listing", {
          description: result.error || "An unexpected error occurred. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting car listing:", error);
      toast.error("Error submitting listing", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card className="overflow-hidden border-none bg-gradient-to-br from-background to-muted/50 shadow-lg">
        <CardHeader className="space-y-1 bg-muted/30 px-6 py-5">
          <div className="flex items-center space-x-2">
            <div className="rounded-full bg-primary/10 p-1.5">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-xl">Review & Submit</CardTitle>
          </div>
          <CardDescription>
            Review your car listing details before final submission.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <h3 className="text-lg font-medium">Basic Information</h3>
              <div className="mt-2 grid gap-2 text-sm">
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Title:</span>
                  <span>{basic_info.title}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Model:</span>
                  <span>{basic_info.car_model}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Year:</span>
                  <span>{basic_info.year}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Condition:</span>
                  <span>{basic_info.condition}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Description:</span>
                  <span>{basic_info.description}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Car Make:</span>
                  <div className="flex items-center gap-2">
                    {basic_info.car_make_image && (
                      <div className="relative h-6 w-6 overflow-hidden rounded-sm">
                        <Image
                          src={basic_info.car_make_image}
                          alt={basic_info.car_make}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <span>{basic_info.car_make}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Car Type:</span>
                  <span>{basic_info.car_type}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Color:</span>
                  <div className="flex items-center gap-2">
                    <span
                      className="h-4 w-4 rounded-full border"
                      style={{ backgroundColor: basic_info.color?.hex }}
                    />
                    <span>{basic_info.color?.name}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications */}
            {specifications && (
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <h3 className="text-lg font-medium">Specifications</h3>
                {renderSpecifications()}
              </div>
            )}

            {/* Features */}
            {features && (
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <h3 className="text-lg font-medium">Features</h3>
                {renderFeatures()}
              </div>
            )}

            {/* Ownership */}
            {ownership && (
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <h3 className="text-lg font-medium">Ownership & Documentation</h3>
                {renderOwnership()}
              </div>
            )}

            {/* Pricing */}
            {pricing && (
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <h3 className="text-lg font-medium">Pricing & Payment</h3>
                {renderPricing()}
              </div>
            )}

            {/* Photos & Media */}
            {photos && photos.images && photos.images.length > 0 && (
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <h3 className="text-lg font-medium">Photos & Media</h3>
                {renderPhotos()}
              </div>
            )}

            <div className="rounded-md bg-primary/10 p-4 text-sm text-primary">
              <p>
                By submitting this listing, you confirm that all the information provided is accurate and complete.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-4">
          <Button
            variant="outline"
            onClick={() => router.push("/sell-car/step-6")}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="gap-2 bg-primary px-6 text-primary-foreground hover:bg-primary/90"
          >
            {isSubmitting ? "Submitting..." : "Submit Listing"}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Listing Published Successfully!</DialogTitle>
            <DialogDescription>
              Your car has been successfully listed for sale and is now visible to potential buyers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={() => router.push(`/dashboard/cars/${carId}`)}
            >
              Close
            </Button>
            <Button
              onClick={() => router.push(`/dashboard/cars/${carId}`)}
              className="gap-2"
            >
              <Eye className="h-4 w-4" /> View Listing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
