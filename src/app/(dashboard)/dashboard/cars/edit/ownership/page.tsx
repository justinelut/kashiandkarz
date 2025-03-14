import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { getSingleCarInfo } from "@/lib/actions"
import EditOwnershipForm from "@/components/edit-car/edit-ownership-form"
import { StepIndicator } from "@/components/sell-car/step-indicator"

export const metadata: Metadata = {
  title: "Edit Car - Ownership",
  description: "Edit the ownership information of your car.",
}

export default async function EditOwnershipPage({
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
        <h1 className="text-3xl font-bold tracking-tight">Edit Ownership Information</h1>
        <p className="mt-2 text-muted-foreground">
          Update the ownership details for your car listing.
        </p>
      </div>

      <StepIndicator currentStep={4} totalSteps={6} />

      <div className="mt-8">
        <EditOwnershipForm car={car} />
      </div>
    </div>
  )
}
