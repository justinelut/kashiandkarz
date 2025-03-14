import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { getSingleCarInfo } from "@/lib/actions"
import EditPricingForm from "@/components/edit-car/edit-pricing-form"
import { StepIndicator } from "@/components/sell-car/step-indicator"

export const metadata: Metadata = {
  title: "Edit Car - Pricing",
  description: "Edit the pricing and payment information of your car.",
}

export default async function EditPricingPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  // Get the car ID from search params
  const { id } = searchParams;
  
  if (!id) {
    redirect("/dashboard/cars");
  }
  
  // Fetch car data
  const { success, data: car } = await getSingleCarInfo(id);
  
  if (!success || !car) {
    notFound();
  }

  return (
    <div className="container max-w-5xl py-10 mx-auto">
      <div className="mb-8 px-4">
        <h1 className="text-3xl font-bold tracking-tight">Edit Pricing & Payment</h1>
        <p className="mt-2 text-muted-foreground">
          Update the pricing and payment details for your car listing.
        </p>
      </div>

      <StepIndicator currentStep={5} totalSteps={6} />

      <div className="mt-8">
        <EditPricingForm car={car} />
      </div>
    </div>
  )
}
