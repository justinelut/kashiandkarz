import { redirect } from "next/navigation"
import { ReviewForm } from "@/components/reviews/review-form"
import { getCarBySlug } from "@/lib/car-details-actions"
import { getUser, isAuthenticated } from "@/lib/appwrite"


// Mock function to get the current user ID
// In a real app, this would come from your authentication system


export default async function WriteReviewPage({ params }: { params: { slug: string } }) {
  const authenticated = await isAuthenticated();
  const user = await getUser();

  // If no user is logged in, redirect to login
  if (!authenticated) {
    redirect("/login?redirect=/car/" + params.slug + "/write-review")
  }

  // Get car details
  const carResult = await getCarBySlug(params.slug)

  if (!carResult.success) {
    redirect("/not-found")
  }

  const car = carResult.data
  const carName = `${car?.car_make?.name || ""} ${car?.car_model || ""} ${car?.year || ""}`

  return (
    <div className="container py-8 mx-auto max-w-5xl pt-20">
      <ReviewForm dealer={car?.user?.$id as string} businessId={car?.business?.$id as string} carId={car?.$id as string} userId={user?.$id} carName={carName.trim()} />
    </div>
  )
}

