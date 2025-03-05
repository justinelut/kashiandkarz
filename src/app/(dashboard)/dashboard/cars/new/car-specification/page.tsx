import type { Metadata } from "next"
import CarSpecificationsForm from "@/components/sell-car/car-specifications-form"
import { StepIndicator } from "@/components/sell-car/step-indicator"

export const metadata: Metadata = {
  title: "Sell Your Car - Specifications",
  description: "Provide detailed specifications about your vehicle.",
}

export default function CarSpecificationsPage() {
  return (
    <div className="mx-auto container max-w-5xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Sell Your Car</h1>
        <p className="mt-2 text-muted-foreground">
          Complete all steps to list your car for sale. Now, let's add the technical specifications.
        </p>
      </div>

      <StepIndicator currentStep={2} totalSteps={6} completedSteps={[1]} />

      <div className="mt-8">
        <CarSpecificationsForm />
      </div>
    </div>
  )
}

