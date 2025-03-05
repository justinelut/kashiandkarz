"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { ChevronLeft, CheckCircle, Check, Eye } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useCarStore } from "@/store/car-store"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { saveReviewSubmit } from "@/lib/actions"

export default function ReviewSubmitForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  // Zustand store - get all data directly from the store
  const { car_id, basic_info, specifications, features, ownership, pricing, photos, clearStore } = useCarStore()

  // Validate that we have a car ID and all required data
  if (!car_id || !basic_info) {
    return (
      <Card className="overflow-hidden border-none bg-gradient-to-br from-background to-muted/50 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-40">
            <p>Loading car information...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Call the API to mark the car as published
      const result = await saveReviewSubmit(
        {
          status: "published",
          availability: true,
        },
        car_id,
      )

      if (result.success) {
        // Show success dialog instead of toast
        setShowSuccessDialog(true)
      } else {
        toast.error("Error submitting listing", {
          description: result.error || "An unexpected error occurred. Please try again.",
        })
      }
    } catch (error) {
      console.error("Error submitting car listing:", error)
      toast.error("Error submitting listing", {
        description: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <CardDescription>Review your car listing details before final submission</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Basic Info Summary */}
            <div className="rounded-lg border bg-card p-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              <div className="mt-2 grid gap-2 text-sm">
               
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Model:</span>
                  <span>{basic_info.car_model}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Year:</span>
                  <span>{basic_info.year}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Vehicle Type:</span>
                  <span>{basic_info.vehicle_type}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Condition:</span>
                  <span>{basic_info.condition}</span>
                </div>
              </div>
            </div>

            {/* Specifications Summary */}
            {specifications && (
              <div className="rounded-lg border bg-card p-4">
                <h3 className="text-lg font-medium">Specifications</h3>
                <div className="mt-2 grid gap-2 text-sm">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Fuel Type:</span>
                    <span>{specifications.fuel_type}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Transmission:</span>
                    <span>{specifications.transmission_type}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Drivetrain:</span>
                    <span>{specifications.drivetrain}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Engine:</span>
                    <span>{specifications.engine_capacity}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Horsepower:</span>
                    <span>{specifications.horsepower} HP</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Torque:</span>
                    <span>{specifications.torque} Nm</span>
                  </div>
                  {specifications.mileage && (
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground">Mileage:</span>
                      <span>
                        {specifications.mileage} {specifications.mileage_unit}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Features Summary */}
            {features && (
              <div className="rounded-lg border bg-card p-4">
                <h3 className="text-lg font-medium">Features</h3>
                <div className="mt-2 grid gap-4 text-sm md:grid-cols-3">
                  {features.exterior_features && features.exterior_features.length > 0 && (
                    <div>
                      <h4 className="font-medium">Exterior Features</h4>
                      <ul className="mt-1 list-inside list-disc">
                        {features.exterior_features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {features.interior_features && features.interior_features.length > 0 && (
                    <div>
                      <h4 className="font-medium">Interior Features</h4>
                      <ul className="mt-1 list-inside list-disc">
                        {features.interior_features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {features.safety_features && features.safety_features.length > 0 && (
                    <div>
                      <h4 className="font-medium">Safety Features</h4>
                      <ul className="mt-1 list-inside list-disc">
                        {features.safety_features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Ownership Summary */}
            {ownership && (
              <div className="rounded-lg border bg-card p-4">
                <h3 className="text-lg font-medium">Ownership & Documentation</h3>
                <div className="mt-2 grid gap-2 text-sm">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">VIN:</span>
                    <span>{ownership.vin}</span>
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
              </div>
            )}

            {/* Pricing Summary */}
            {pricing && (
              <div className="rounded-lg border bg-card p-4">
                <h3 className="text-lg font-medium">Pricing & Payment</h3>
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
                </div>
              </div>
            )}

            {/* Photos Summary */}
            {photos && photos.images && photos.images.length > 0 && (
              <div className="rounded-lg border bg-card p-4">
                <h3 className="text-lg font-medium">Photos & Media</h3>
                <div className="mt-2 text-sm">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Number of Photos:</span>
                    <span>{photos.images.length}</span>
                  </div>
                  {photos.video && (
                    <div className="grid grid-cols-2 mt-2">
                      <span className="text-muted-foreground">Video URL:</span>
                      <span className="truncate">{photos.video}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="rounded-md bg-primary/10 p-4 text-sm text-primary">
              <p>By submitting this listing, you confirm that all the information provided is accurate and complete.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-4">
          <Button variant="outline" onClick={() => router.push("/sell-car/step-6")} className="gap-2">
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

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl pt-4">Listing Published Successfully!</DialogTitle>
            <DialogDescription className="text-center">
              Your car has been successfully listed for sale and is now visible to potential buyers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowSuccessDialog(false)
                clearStore()
                router.push(`/dashboard/cars/${car_id}`)
              }}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setShowSuccessDialog(false)
                clearStore()
                router.push(`/dashboard/cars/${car_id}`)
              }}
              className="gap-2"
            >
              <Eye className="h-4 w-4" /> View Listing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

