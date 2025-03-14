"use client"

import { useState, useEffect } from "react"
import { ReviewCard } from "@/components/reviews/review-card"
import { Pagination } from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getReviewsForCar } from "@/lib/review-actions"
import type { Review, ReviewPagination, ReviewSortOption } from "@/types/review"

interface ReviewsListProps {
  carId: string
  initialReviews?: {
    data: Review[]
    pagination: ReviewPagination
  }
}

export function ReviewsList({ carId, initialReviews }: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews?.data || [])
  const [pagination, setPagination] = useState<ReviewPagination>(
    initialReviews?.pagination || { total: 0, page: 1, limit: 5, totalPages: 0 },
  )
  const [sortOption, setSortOption] = useState<ReviewSortOption>("newest")
  const [isLoading, setIsLoading] = useState(false)

  const fetchReviews = async (page: number, sort: ReviewSortOption) => {
    setIsLoading(true)

    try {
      const result = await getReviewsForCar(carId, page, pagination.limit, sort)

      if (result.success) {
        setReviews(result.data)
        setPagination(result.pagination)
      }
    } catch (error) {
      console.error("Error fetching reviews:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!initialReviews) {
      fetchReviews(1, sortOption)
    }
  }, [initialReviews, carId])

  const handlePageChange = (page: number) => {
    fetchReviews(page, sortOption)
  }

  const handleSortChange = (value: string) => {
    const sort = value as ReviewSortOption
    setSortOption(sort)
    fetchReviews(1, sort)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Customer Reviews</h2>

        <Select value={sortOption} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
            <SelectItem value="highest-rating">Highest rating</SelectItem>
            <SelectItem value="lowest-rating">Lowest rating</SelectItem>
            <SelectItem value="most-helpful">Most helpful</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : reviews.length > 0 ? (
        <>
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.$id} review={review} />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8 border rounded-lg bg-muted/50">
          <p className="text-muted-foreground">No reviews yet. Be the first to review this car!</p>
        </div>
      )}
    </div>
  )
}

