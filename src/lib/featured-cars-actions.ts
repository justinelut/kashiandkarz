"use server"

import { Query } from "node-appwrite"
import { database } from "./appwrite-config"
import { carinfocollectionId, databaseId } from "./constants"



export const getFeaturedNewCars = async (limit = 8) => {
  try {
    const queries = [
      Query.equal("condition", "new"),
      Query.equal("featured", true),
      Query.equal("status", "published"),
      Query.equal("availability", true),
      Query.limit(limit),
    ]

    const response = await database.listDocuments(databaseId, carinfocollectionId, queries)

    return { success: true, data: response.documents }
  } catch (error) {
    console.error("Error fetching featured new cars:", error)
    return { success: false, error: "Failed to fetch featured new cars" }
  }
}

