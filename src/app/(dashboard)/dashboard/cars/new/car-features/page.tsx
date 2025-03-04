import type { Metadata } from "next"
import CarFeaturesForm from "@/components/sell-car/car-features-form"
import { StepIndicator } from "@/components/sell-car/step-indicator"

export const metadata: Metadata = {
  title: "Sell Your Car - Features",
  description: "Select the features available in your vehicle.",
}

export default function CarFeaturesPage() {
  return (
    <div className="container max-w-5xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Sell Your Car</h1>
        <p className="mt-2 text-muted-foreground">
          Complete all steps to list your car for sale. Now, let's add the features your car has.
        </p>
      </div>

      <StepIndicator currentStep={3} totalSteps={6} completedSteps={[1, 2]} />

      <div className="mt-8">
        <CarFeaturesForm />
      </div>
    </div>
  )
}

