"use server"

import { Databases, Client, Query } from "node-appwrite"

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
  .setKey(process.env.APPWRITE_API_KEY!) // Use server-side API key

const database = new Databases(client)
const databaseId = process.env.APPWRITE_DATABASE_ID as string
const carInfoCollectionId = "67cf10af003268a33d9f"

export const getSportsCars = async (limit = 5) => {
  try {
    // Fetch cars with category = "sport"
    const sportsCarResponse = await database.listDocuments(databaseId, carInfoCollectionId, [
      Query.equal("category", "sport"),
      Query.equal("status", "published"),
      Query.equal("availability", true),
      // Add featured cars first if possible
      Query.orderDesc("featured"),
      // Then sort by newest
      Query.orderDesc("$createdAt"),
      Query.limit(limit),
    ])

    return {
      success: true,
      data: sportsCarResponse.documents,
    }
  } catch (error) {
    console.error("Error fetching sports cars:", error)
    return { success: false, error: "Failed to fetch sports cars" }
  }
}

// Get big deal sports cars (for highlighting special offers)
export const getSportsBigDeals = async (limit = 5) => {
  try {
    const sportsDealsResponse = await database.listDocuments(databaseId, carInfoCollectionId, [
      Query.equal("category", "sport"),
      Query.equal("status", "published"),
      Query.equal("availability", true),
      Query.equal("big_deal", true),
      Query.limit(limit),
    ])

    return {
      success: true,
      data: sportsDealsResponse.documents,
    }
  } catch (error) {
    console.error("Error fetching sports big deals:", error)
    return { success: false, error: "Failed to fetch sports deals" }
  }
}

// Get featured sports cars (combining both methods)
export const getFeaturedSportsCars = async (limit = 5) => {
  try {
    // First try to get big deals
    const bigDealsResult = await getSportsBigDeals(limit)

    // If we have enough big deals, return them
    if (bigDealsResult.success && bigDealsResult.data.length >= limit) {
      return bigDealsResult
    }

    // Otherwise, get regular sports cars
    const sportsCarResult = await getSportsCars(limit)

    // If big deals failed or had no results, just return sports cars
    if (!bigDealsResult.success || bigDealsResult.data.length === 0) {
      return sportsCarResult
    }

    // Combine big deals with regular sports cars to reach the limit
    const bigDeals = bigDealsResult.data
    const regularCars = sportsCarResult.success ? sportsCarResult.data : []

    // Filter out cars that are already in big deals
    const bigDealIds = new Set(bigDeals.map((car) => car.$id))
    const additionalCars = regularCars.filter((car) => !bigDealIds.has(car.$id))

    // Combine and limit to requested number
    const combinedCars = [...bigDeals, ...additionalCars].slice(0, limit)

    return {
      success: true,
      data: combinedCars,
    }
  } catch (error) {
    console.error("Error fetching featured sports cars:", error)
    return { success: false, error: "Failed to fetch sports cars" }
  }
}

