"use server"

import { Databases, Client, Query } from "node-appwrite"
import { revalidatePath } from "next/cache"
import type { Review, ReviewStats, ReviewStatus, ReviewFilterOption } from "@/types/review"

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
  .setKey(process.env.APPWRITE_API_KEY!)

const database = new Databases(client)
const databaseId = process.env.APPWRITE_DATABASE_ID as string

// Collection IDs
const reviewsCollectionId = "car_reviews" // This would be the actual collection ID in your Appwrite database
const usersCollectionId = "users" // This would be the actual users collection ID
const carsCollectionId = "cars" // This would be the actual cars collection ID

// Get all reviews with pagination and filtering for dashboard
export async function getDashboardReviews(
  page = 1,
  limit = 10,
  filter: ReviewFilterOption = "all",
  search = "",
  sort = "newest",
) {
  try {
    const queries = []

    // Add filtering
    if (filter === "pending") {
      queries.push(Query.equal("status", "pending"))
    } else if (filter === "approved") {
      queries.push(Query.equal("status", "approved"))
    } else if (filter === "rejected") {
      queries.push(Query.equal("status", "rejected"))
    } else if (filter === "reported") {
      queries.push(Query.equal("reported", true))
    }

    // Add search
    if (search) {
      queries.push(Query.search("title", search))
    }

    // Add sorting
    if (sort === "newest") {
      queries.push(Query.orderDesc("$createdAt"))
    } else if (sort === "oldest") {
      queries.push(Query.orderAsc("$createdAt"))
    } else if (sort === "highest-rating") {
      queries.push(Query.orderDesc("rating"))
    } else if (sort === "lowest-rating") {
      queries.push(Query.orderAsc("rating"))
    } else if (sort === "most-helpful") {
      queries.push(Query.orderDesc("helpful_count"))
    }

    // Add pagination
    const offset = (page - 1) * limit
    queries.push(Query.limit(limit))
    queries.push(Query.offset(offset))

    // Fetch reviews
    const response = await database.listDocuments(databaseId, reviewsCollectionId, queries)

    // Fetch user and car details for each review
    const reviewsWithDetails = await Promise.all(
      response.documents.map(async (review) => {
        try {
          // Fetch user details
          let user = null
          try {
            user = await database.getDocument(databaseId, usersCollectionId, review.user_id)
          } catch (error) {
            // User might not exist anymore
          }

          // Fetch car details
          let car = null
          try {
            car = await database.getDocument(databaseId, carsCollectionId, review.car_id)
          } catch (error) {
            // Car might not exist anymore
          }

          return {
            ...review,
            user: user
              ? {
                  $id: user.$id,
                  name: user.name,
                  avatar: user.avatar,
                }
              : undefined,
            car: car
              ? {
                  $id: car.$id,
                  title: car.title,
                  slug: car.slug,
                  images: car.images,
                }
              : undefined,
          }
        } catch (error) {
          // If details not found, return review without details
          return review
        }
      }),
    )

    return {
      success: true,
      data: reviewsWithDetails,
      pagination: {
        total: response.total,
        page,
        limit,
        totalPages: Math.ceil(response.total / limit),
      },
    }
  } catch (error) {
    console.error("Error fetching dashboard reviews:", error)
    return { success: false, error: "Failed to fetch reviews" }
  }
}

// Get a single review by ID with user and car details
export async function getDashboardReviewById(reviewId: string) {
  try {
    const review = await database.getDocument(databaseId, reviewsCollectionId, reviewId)

    // Fetch user details
    let user = null
    try {
      user = await database.getDocument(databaseId, usersCollectionId, review.user_id)
    } catch (error) {
      // User might not exist anymore
    }

    // Fetch car details
    let car = null
    try {
      car = await database.getDocument(databaseId, carsCollectionId, review.car_id)
    } catch (error) {
      // Car might not exist anymore
    }

    return {
      success: true,
      data: {
        ...review,
        user: user
          ? {
              $id: user.$id,
              name: user.name,
              avatar: user.avatar,
            }
          : undefined,
        car: car
          ? {
              $id: car.$id,
              title: car.title,
              slug: car.slug,
              images: car.images,
            }
          : undefined,
      },
    }
  } catch (error) {
    console.error("Error fetching review:", error)
    return { success: false, error: "Failed to fetch review" }
  }
}

// Update review status (approve/reject)
export async function updateReviewStatus(reviewId: string, status: ReviewStatus, moderatorNotes?: string) {
  try {
    const updateData: { status: ReviewStatus; moderator_notes?: string } = { status }

    if (moderatorNotes) {
      updateData.moderator_notes = moderatorNotes
    }

    await database.updateDocument(databaseId, reviewsCollectionId, reviewId, updateData)

    // Revalidate paths
    revalidatePath("/dashboard/reviews")
    revalidatePath(`/dashboard/reviews/${reviewId}`)

    return { success: true }
  } catch (error) {
    console.error("Error updating review status:", error)
    return { success: false, error: "Failed to update review status" }
  }
}

// Delete a review
export async function deleteReview(reviewId: string) {
  try {
    await database.deleteDocument(databaseId, reviewsCollectionId, reviewId)

    // Revalidate path
    revalidatePath("/dashboard/reviews")

    return { success: true }
  } catch (error) {
    console.error("Error deleting review:", error)
    return { success: false, error: "Failed to delete review" }
  }
}

// Get review statistics for dashboard
export async function getDashboardReviewStats(): Promise<{ success: boolean; data?: ReviewStats; error?: string }> {
  try {
    // Fetch all reviews (limit to a reasonable number for stats calculation)
    const response = await database.listDocuments(databaseId, reviewsCollectionId, [Query.limit(1000)])

    const reviews = response.documents as Review[]

    if (reviews.length === 0) {
      return {
        success: true,
        data: {
          averageRating: 0,
          totalReviews: 0,
          ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          recommendPercentage: 0,
          pendingReviews: 0,
          approvedReviews: 0,
          rejectedReviews: 0,
        },
      }
    }

    // Calculate average rating
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = totalRating / reviews.length

    // Calculate rating distribution
    const ratingDistribution = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    }

    reviews.forEach((review) => {
      ratingDistribution[review.rating as 1 | 2 | 3 | 4 | 5]++
    })

    // Calculate recommend percentage
    const recommendCount = reviews.filter((review) => review.recommend).length
    const recommendPercentage = (recommendCount / reviews.length) * 100

    // Calculate status counts
    const pendingReviews = reviews.filter((review) => review.status === "pending").length
    const approvedReviews = reviews.filter((review) => review.status === "approved").length
    const rejectedReviews = reviews.filter((review) => review.status === "rejected").length

    return {
      success: true,
      data: {
        averageRating,
        totalReviews: reviews.length,
        ratingDistribution,
        recommendPercentage,
        pendingReviews,
        approvedReviews,
        rejectedReviews,
      },
    }
  } catch (error) {
    console.error("Error fetching dashboard review stats:", error)
    return { success: false, error: "Failed to fetch review statistics" }
  }
}

