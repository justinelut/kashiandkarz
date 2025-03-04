import type { Metadata } from "next"
import OwnershipDocumentationForm from "@/components/sell-car/ownership-documentation-form"
import { StepIndicator } from "@/components/sell-car/step-indicator"

export const metadata: Metadata = {
  title: "Sell Your Car - Ownership & Documentation",
  description: "Provide ownership and documentation details for your vehicle.",
}

export default function OwnershipDocumentationPage() {
  return (
    <div className="container max-w-5xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Sell Your Car</h1>
        <p className="mt-2 text-muted-foreground">
          Complete all steps to list your car for sale. Now, let's add ownership and documentation details.
        </p>
      </div>

      <StepIndicator currentStep={4} totalSteps={6} completedSteps={[1, 2, 3]} />

      <div className="mt-8">
        <OwnershipDocumentationForm />
      </div>
    </div>
  )
}

