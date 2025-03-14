import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { getSingleCarInfo } from "@/lib/actions"
import EditPhotosForm from "@/components/edit-car/edit-photos-form"
import { StepIndicator } from "@/components/sell-car/step-indicator"

export const metadata: Metadata = {
  title: "Edit Car - Photos",
  description: "Edit the photos and media for your car listing.",
}

export default async function EditPhotosPage({
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
        <h1 className="text-3xl font-bold tracking-tight">Edit Photos & Media</h1>
        <p className="mt-2 text-muted-foreground">
          Update the photos and media files for your car listing.
        </p>
      </div>

      <StepIndicator currentStep={6} totalSteps={6} />

      <div className="mt-8">
        <EditPhotosForm car={car} />
      </div>
    </div>
  )
}
