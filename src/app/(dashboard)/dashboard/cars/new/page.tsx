import type { Metadata } from "next"
import BasicCarInfoForm from "@/components/sell-car/basic-car-info-form"
import { StepIndicator } from "@/components/sell-car/step-indicator"

export const metadata: Metadata = {
  title: "Sell Your Car - Basic Information",
  description: "Provide the basic details about your car to get started with the selling process.",
}

export default function SellCarPage() {
  return (
    <div className="container max-w-5xl py-10 mx-auto">
      <div className="mb-8 px-4">
        <h1 className="text-3xl font-bold tracking-tight">Sell Your Car</h1>
        <p className="mt-2 text-muted-foreground">
          Complete all steps to list your car for sale. Start by providing basic information.
        </p>
      </div>

      <StepIndicator currentStep={1} totalSteps={6} />

      <div className="mt-8">
        <BasicCarInfoForm />
      </div>
    </div>
  )
}

