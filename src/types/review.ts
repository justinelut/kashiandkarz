import { z } from "zod"

// Zod schema for review form validation
export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
  comment: z
    .string()
    .min(20, "Review must be at least 20 characters")
    .max(2000, "Review must be less than 2000 characters"),
  pros: z.array(z.string()).optional(),
  cons: z.array(z.string()).optional(),
  recommend: z.boolean(),
  ownership_duration: z.enum(["less-than-month", "1-6-months", "6-12-months", "1-3-years", "3-plus-years"]),
  purchase_type: z.enum(["new", "used", "leased", "rented", "test-drive"]),
  verified_purchase: z.boolean(),
})

// Type for review form data
export type ReviewFormData = z.infer<typeof reviewSchema>

// Type for review document
export interface Review extends ReviewFormData {
  $id: string
  $createdAt: string
  $updatedAt: string
  user_id: string
  car_id: string
  helpful_count: number
  unhelpful_count: number
  reported: boolean
  user?: {
    $id: string
    name: string
    avatar?: string
  }
}

// Type for review statistics
export interface ReviewStats {
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
  recommendPercentage: number
}

// Type for review pagination
export interface ReviewPagination {
  total: number
  page: number
  limit: number
  totalPages: number
}

// Type for review sort options
export type ReviewSortOption = "newest" | "oldest" | "highest-rating" | "lowest-rating" | "most-helpful"

