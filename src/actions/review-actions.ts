
import { revalidatePath } from "next/cache"
import { database, databaseId } from "@/actions/appwrite-config"
import { ID, Query } from "node-appwrite"
import { reviewSchema, type ReviewFormData, type Review, type ReviewStats } from "@/types/review"
import { reviewsCollectionId, usersCollectionId } from "@/actions/appwrite-config"




export async function submitReview(data: ReviewFormData, carId: string, userId: string) {
    try {
      // Validate the review data
      const validatedData = reviewSchema.parse(data)
  
      // Create the review document
      const review = await database.createDocument(databaseId, reviewsCollectionId, ID.unique(), {
        ...validatedData,
        car_id: carId,
        user_id: userId,
        helpful_count: 0,
        unhelpful_count: 0,
        reported: false,
      })
  
      // Revalidate the car detail page to show the new review
      revalidatePath(`/car/${carId}`)
  
      return { success: true, data: review }
    } catch (error) {
      console.error("Error submitting review:", error)
      return { success: false, error: "Failed to submit review" }
    }
  }
  
  // Get reviews for a specific car with pagination
  export async function getReviewsForCar(carId: string, page = 1, limit = 5, sort = "newest") {
    try {
      const queries = [Query.equal("car_id", carId)]
  
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
  
      // Fetch user details for each review
      const reviewsWithUsers = await Promise.all(
        response.documents.map(async (review) => {
          try {
            const user = await database.getDocument(databaseId, usersCollectionId, review.user_id)
  
            return {
              ...review,
              user: {
                $id: user.$id,
                name: user.name,
                avatar: user.avatar,
              },
            }
          } catch (error) {
            // If user not found, return review without user details
            return review
          }
        }),
      )
  
      return {
        success: true,
        data: reviewsWithUsers,
        pagination: {
          total: response.total,
          page,
          limit,
          totalPages: Math.ceil(response.total / limit),
        },
      }
    } catch (error) {
      console.error("Error fetching reviews:", error)
      return { success: false, error: "Failed to fetch reviews" }
    }
  }
  
  // Get reviews by a specific user
  export async function getUserReviews(userId: string, page = 1, limit = 10) {
    try {
      const queries = [
        Query.equal("user_id", userId),
        Query.orderDesc("$createdAt"),
        Query.limit(limit),
        Query.offset((page - 1) * limit),
      ]
  
      const response = await database.listDocuments(databaseId, reviewsCollectionId, queries)
  
      return {
        success: true,
        data: response.documents,
        pagination: {
          total: response.total,
          page,
          limit,
          totalPages: Math.ceil(response.total / limit),
        },
      }
    } catch (error) {
      console.error("Error fetching user reviews:", error)
      return { success: false, error: "Failed to fetch user reviews" }
    }
  }
  
  // Get review statistics for a car
  export async function getReviewStatsForCar(
    carId: string,
  ): Promise<{ success: boolean; data?: ReviewStats; error?: string }> {
    try {
      // Fetch all reviews for the car
      const queries = [
        Query.equal("car_id", carId),
        Query.limit(100), // Adjust as needed
      ]
  
      const response = await database.listDocuments(databaseId, reviewsCollectionId, queries)
  
      const reviews = response.documents as Review[]
  
      if (reviews.length === 0) {
        return {
          success: true,
          data: {
            averageRating: 0,
            totalReviews: 0,
            ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
            recommendPercentage: 0,
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
  
      return {
        success: true,
        data: {
          averageRating,
          totalReviews: reviews.length,
          ratingDistribution,
          recommendPercentage,
        },
      }
    } catch (error) {
      console.error("Error fetching review stats:", error)
      return { success: false, error: "Failed to fetch review statistics" }
    }
  }
  
  // Mark a review as helpful/unhelpful
  export async function markReviewHelpful(reviewId: string, helpful: boolean) {
    try {
      // Get the current review
      const review = await database.getDocument(databaseId, reviewsCollectionId, reviewId)
  
      // Update the helpful/unhelpful count
      const field = helpful ? "helpful_count" : "unhelpful_count"
      const updatedCount = (review[field] || 0) + 1
  
      // Update the review
      await database.updateDocument(databaseId, reviewsCollectionId, reviewId, { [field]: updatedCount })
  
      return { success: true }
    } catch (error) {
      console.error("Error marking review:", error)
      return { success: false, error: "Failed to mark review" }
    }
  }
  
  // Report a review
  export async function reportReview(reviewId: string) {
    try {
      await database.updateDocument(databaseId, reviewsCollectionId, reviewId, { reported: true })
  
      return { success: true }
    } catch (error) {
      console.error("Error reporting review:", error)
      return { success: false, error: "Failed to report review" }
    }
  }
  
  