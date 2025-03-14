import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RatingStars } from "@/components/reviews/rating-stars"
import { ReviewCard } from "@/components/reviews/review-card"
import { getReviewsForCar, getReviewStatsForCar } from "@/lib/review-actions"
import type { Review } from "@/types/review"

interface ReviewsSectionProps {
  carId: string
  slug: string
}

export async function ReviewsSection({ carId, slug }: ReviewsSectionProps) {
  // Get reviews and stats
  const [reviewsResult, statsResult] = await Promise.all([
    getReviewsForCar(carId, 1, 3, "newest"),
    getReviewStatsForCar(carId),
  ])

  const reviews = reviewsResult.success ? reviewsResult.data : []
  const stats = statsResult.success
    ? statsResult.data
    : {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        recommendPercentage: 0,
      }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Customer Reviews</CardTitle>
        <Button asChild>
          <Link href={`/car/${slug}/write-review`}>Write a Review</Link>
        </Button>
      </CardHeader>

      <CardContent>
        {stats.totalReviews > 0 ? (
          <>
            <div className="flex items-center gap-4 mb-6 p-4 bg-muted rounded-lg">
              <div className="text-4xl font-bold">{stats.averageRating.toFixed(1)}</div>
              <div>
                <RatingStars rating={stats.averageRating} size="lg" />
                <div className="text-sm text-muted-foreground mt-1">
                  Based on {stats.totalReviews} {stats.totalReviews === 1 ? "review" : "reviews"}
                </div>
              </div>
              <div className="ml-auto">
                <div className="text-sm font-medium">Would recommend</div>
                <div className="text-2xl font-bold">{Math.round(stats.recommendPercentage)}%</div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {reviews.map((review: Review) => (
                <ReviewCard key={review.$id} review={review} />
              ))}
            </div>

            {stats.totalReviews > 3 && (
              <div className="text-center">
                <Button asChild variant="outline">
                  <Link href={`/car/${slug}/reviews`}>View All {stats.totalReviews} Reviews</Link>
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No reviews yet. Be the first to review this car!</p>
            <Button asChild>
              <Link href={`/car/${slug}/write-review`}>Write a Review</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

