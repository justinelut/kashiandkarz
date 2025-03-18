"use server"

import { Query } from "node-appwrite"
import { databaseId, testimonialsCollectionId } from "./constants"
import { database } from "./appwrite-config"



// Get all testimonials
export const getTestimonials = async (limit = 5) => {
  try {
    const queries = [Query.equal("status", "published"), Query.limit(limit), Query.orderDesc("$createdAt")]

    const response = await database.listDocuments(databaseId, testimonialsCollectionId, queries)

    return {
      success: true,
      data: response.documents,
    }
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return { success: false, error: "Failed to fetch testimonials" }
  }
}

// Get featured testimonials (those marked as featured)
export const getFeaturedTestimonials = async (limit = 3) => {
  try {
    const queries = [
      Query.equal("status", "published"),
      Query.equal("featured", true),
      Query.limit(limit),
      Query.orderDesc("$createdAt"),
    ]

    const response = await database.listDocuments(databaseId, testimonialsCollectionId, queries)

    return {
      success: true,
      data: response.documents,
    }
  } catch (error) {
    console.error("Error fetching featured testimonials:", error)
    return { success: false, error: "Failed to fetch featured testimonials" }
  }
}

// Get success story testimonials (those with car_info and detailed stories)
export const getSuccessStoryTestimonials = async (limit = 3) => {
  try {
    const queries = [
      Query.equal("status", "published"),
      Query.equal("success_story", true),
      Query.limit(limit),
      Query.orderDesc("$createdAt"),
    ]

    const response = await database.listDocuments(databaseId, testimonialsCollectionId, queries)

    return {
      success: true,
      data: response.documents,
    }
  } catch (error) {
    console.error("Error fetching success story testimonials:", error)
    return { success: false, error: "Failed to fetch success story testimonials" }
  }
}

