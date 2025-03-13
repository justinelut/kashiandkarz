import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ReviewsList } from "@/components/reviews/reviews-list"
import { ReviewStatsComponent } from "@/components/reviews/review-stats"
import { getCarBySlug } from "@/lib/actions"
import { getReviewsForCar, getReviewStatsForCar } from "@/lib/review-actions"

export default async function CarReviewsPage({ params }: { params: { slug: string } }) {
  // Get car details
  const carResult = await getCarBySlug(params.slug)

  if (!carResult.success) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Car not found</h1>
        <p className="mb-6">The car you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/stock-cars">Browse Cars</Link>
        </Button>
      </div>
    )
  }

  const car = carResult.data
  const carName = `${car.car_make?.name || ""} ${car.car_model || ""} ${car.year || ""}`

  // Get reviews and stats
  const [reviewsResult, statsResult] = await Promise.all([
    getReviewsForCar(car.$id, 1, 5, "newest"),
    getReviewStatsForCar(car.$id),
  ])

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{carName.trim()} Reviews</h1>
          <p className="text-muted-foreground">
            See what customers are saying about this {car.car_make?.name} {car.car_model}
          </p>
        </div>

        <Button asChild size="lg">
          <Link href={`/car/${params.slug}/write-review`}>Write a Review</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">{statsResult.success && <ReviewStatsComponent stats={statsResult.data} />}</div>

        <div className="lg:col-span-2">
          {reviewsResult.success ? (
            <ReviewsList
              carId={car.$id}
              initialReviews={{
                data: reviewsResult.data,
                pagination: reviewsResult.pagination,
              }}
            />
          ) : (
            <div className="text-center py-8 border rounded-lg bg-muted/50">
              <p className="text-muted-foreground">Failed to load reviews. Please try again later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

