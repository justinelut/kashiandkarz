import { RatingStars } from "@/components/reviews/rating-stars"
import { Progress } from "@/components/ui/progress"
import type { ReviewStats } from "@/types/review"

interface ReviewStatsProps {
  stats: ReviewStats
}

export function ReviewStatsComponent({ stats }: ReviewStatsProps) {
  const { averageRating, totalReviews, ratingDistribution, recommendPercentage } = stats

  // Calculate percentages for each rating
  const ratingPercentages = {
    5: totalReviews > 0 ? (ratingDistribution[5] / totalReviews) * 100 : 0,
    4: totalReviews > 0 ? (ratingDistribution[4] / totalReviews) * 100 : 0,
    3: totalReviews > 0 ? (ratingDistribution[3] / totalReviews) * 100 : 0,
    2: totalReviews > 0 ? (ratingDistribution[2] / totalReviews) * 100 : 0,
    1: totalReviews > 0 ? (ratingDistribution[1] / totalReviews) * 100 : 0,
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>

      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{averageRating.toFixed(1)}</div>
          <RatingStars rating={averageRating} size="lg" className="justify-center mb-1" />
          <div className="text-sm text-muted-foreground">
            {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
          </div>
        </div>

        <div className="flex-1">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="w-8 text-right">{rating}</div>
                <Progress value={ratingPercentages[rating as 1 | 2 | 3 | 4 | 5]} className="h-2 flex-1" />
                <div className="w-12 text-sm text-muted-foreground">
                  {ratingDistribution[rating as 1 | 2 | 3 | 4 | 5]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
        <div className="text-sm">Would recommend this car</div>
        <div className="font-medium">{Math.round(recommendPercentage)}%</div>
      </div>
    </div>
  )
}

