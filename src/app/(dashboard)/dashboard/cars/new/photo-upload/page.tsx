import type { Metadata } from "next"
import PhotoVideoUploadForm from "@/components/sell-car/photo-video-upload-form"
import { StepIndicator } from "@/components/sell-car/step-indicator"

export const metadata: Metadata = {
  title: "Sell Your Car - Upload Photos & Video",
  description: "Upload photos and video of your vehicle to attract potential buyers.",
}

export default function PhotoVideoUploadPage() {
  return (
    <div className="container max-w-5xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Sell Your Car</h1>
        <p className="mt-2 text-muted-foreground">
          Complete all steps to list your car for sale. Now, let's add photos and video of your vehicle.
        </p>
      </div>

      <StepIndicator currentStep={6} totalSteps={6} completedSteps={[1, 2, 3, 4, 5]} />

      <div className="mt-8">
        <PhotoVideoUploadForm />
      </div>
    </div>
  )
}

