"use server"

import { Query } from "node-appwrite"
import { database } from "./appwrite-config"
import { carinfocollectionId, databaseId } from "./constants"

// Initialize Appwrite client


// Get eco-friendly vehicles
export const getEcoFriendlyVehicles = async (limit = 4) => {
  try {
    // First approach: Filter by category
    const queries = [
      Query.equal("status", "published"),
      Query.equal("availability", true),
      Query.limit(limit),
      Query.orderDesc("$createdAt"),
    ]

    // We can use either category field or car_type relationship
    // Option 1: Using category field if it contains eco-friendly values
    const categoryQueries = [...queries, Query.equal("category", "eco-friendly")]

    // Option 2: Using car_type relationship with specific slugs
    // This would require a more complex query or multiple queries

    const response = await database.listDocuments(databaseId, carinfocollectionId, categoryQueries)

    // If no results with category, try alternative approach with car features
    if (response.documents.length === 0) {
      // Alternative: Look for cars with eco-friendly features
      const ecoFeaturesQueries = [...queries, Query.isNotNull("car_features.ecofriendly_features")]

      const ecoFeaturesResponse = await database.listDocuments(databaseId, carinfocollectionId, ecoFeaturesQueries)

      return {
        success: true,
        data: ecoFeaturesResponse.documents,
      }
    }

    return {
      success: true,
      data: response.documents,
    }
  } catch (error) {
    console.error("Error fetching eco-friendly vehicles:", error)
    return { success: false, error: "Failed to fetch eco-friendly vehicles" }
  }
}

