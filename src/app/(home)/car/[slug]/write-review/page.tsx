import { redirect } from "next/navigation"
import { ReviewForm } from "@/components/reviews/review-form"
import { getCarBySlug } from "@/lib/car-details-actions"


// Mock function to get the current user ID
// In a real app, this would come from your authentication system
const getCurrentUserId = () => {
  // This is a placeholder - replace with actual auth logic
  return "current-user-id"
}

export default async function WriteReviewPage({ params }: { params: { slug: string } }) {
  const userId = getCurrentUserId()

  // If no user is logged in, redirect to login
  if (!userId) {
    redirect("/login?redirect=/car/" + params.slug + "/write-review")
  }

  // Get car details
  const carResult = await getCarBySlug(params.slug)

  if (!carResult.success) {
    redirect("/not-found")
  }

  const car = carResult.data
  const carName = `${car.car_make?.name || ""} ${car.car_model || ""} ${car.year || ""}`

  return (
    <div className="container py-8 mx-auto max-w-5xl pt-20">
      <ReviewForm carId={car.$id} userId={userId} carName={carName.trim()} />
    </div>
  )
}

