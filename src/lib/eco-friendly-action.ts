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
      Query.equal("ecofriendly", true),
      Query.equal("availability", true),
      Query.limit(limit),
      Query.orderDesc("$createdAt"),
    ]

    

    const response = await database.listDocuments(databaseId, carinfocollectionId, queries)

    // If no results with category, try alternative approach with car features
   

    return {
      success: true,
      data: response.documents,
    }
  } catch (error) {
    console.error("Error fetching eco-friendly vehicles:", error)
    return { success: false, error: "Failed to fetch eco-friendly vehicles" }
  }
}

