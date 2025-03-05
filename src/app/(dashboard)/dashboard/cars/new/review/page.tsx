import type { Metadata } from "next"
import { StepIndicator } from "@/components/sell-car/step-indicator"
import ReviewSubmitForm from "@/components/sell-car/review"
import ReviewForm from "@/components/sell-car/review"

export const metadata: Metadata = {
  title: "Sell Your Car - Pricing & Payment",
  description: "Set your selling price and payment options for your vehicle.",
}

export default function PricingPaymentPage() {
  return (
    <div className="mx-auto container max-w-5xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Sell Your Car</h1>
        <p className="mt-2 text-muted-foreground">
          Complete all steps to list your car for sale. Now, let's set your pricing and payment options.
        </p>
      </div>

      <StepIndicator currentStep={5} totalSteps={6} completedSteps={[1, 2, 3, 4,5,6]} />

      <div className="mt-8">
        <ReviewSubmitForm />
      </div>
    </div>
  )
}

export function ReviewPage() {
  return <ReviewForm />
}
