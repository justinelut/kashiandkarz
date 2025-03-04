import type { Metadata } from "next"
import PricingPaymentForm from "@/components/sell-car/pricing-payment-form"
import { StepIndicator } from "@/components/sell-car/step-indicator"

export const metadata: Metadata = {
  title: "Sell Your Car - Pricing & Payment",
  description: "Set your selling price and payment options for your vehicle.",
}

export default function PricingPaymentPage() {
  return (
    <div className="container max-w-5xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Sell Your Car</h1>
        <p className="mt-2 text-muted-foreground">
          Complete all steps to list your car for sale. Now, let's set your pricing and payment options.
        </p>
      </div>

      <StepIndicator currentStep={5} totalSteps={6} completedSteps={[1, 2, 3, 4]} />

      <div className="mt-8">
        <PricingPaymentForm />
      </div>
    </div>
  )
}

