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

export const getLuxuryCars = async (limit = 4) => {
  try {
    // Fetch cars with category = "luxury"
    const luxuryCarsResponse = await database.listDocuments(databaseId, carInfoCollectionId, [
      Query.equal("category", "luxury"),
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
      data: luxuryCarsResponse.documents,
    }
  } catch (error) {
    console.error("Error fetching luxury cars:", error)
    return { success: false, error: "Failed to fetch luxury cars" }
  }
}

// Get big deal luxury cars (for highlighting special offers)
export const getLuxuryBigDeals = async (limit = 4) => {
  try {
    const luxuryDealsResponse = await database.listDocuments(databaseId, carInfoCollectionId, [
      Query.equal("category", "luxury"),
      Query.equal("status", "published"),
      Query.equal("availability", true),
      Query.equal("big_deal", true),
      Query.limit(limit),
    ])

    return {
      success: true,
      data: luxuryDealsResponse.documents,
    }
  } catch (error) {
    console.error("Error fetching luxury big deals:", error)
    return { success: false, error: "Failed to fetch luxury deals" }
  }
}

// Get featured luxury cars (combining both methods)
export const getFeaturedLuxuryCars = async (limit = 4) => {
  try {
    // First try to get big deals
    const bigDealsResult = await getLuxuryBigDeals(limit)

    // If we have enough big deals, return them
    if (bigDealsResult.success && bigDealsResult.data.length >= limit) {
      return bigDealsResult
    }

    // Otherwise, get regular luxury cars
    const luxuryCarsResult = await getLuxuryCars(limit)

    // If big deals failed or had no results, just return luxury cars
    if (!bigDealsResult.success || bigDealsResult.data.length === 0) {
      return luxuryCarsResult
    }

    // Combine big deals with regular luxury cars to reach the limit
    const bigDeals = bigDealsResult.data
    const regularCars = luxuryCarsResult.success ? luxuryCarsResult.data : []

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
    console.error("Error fetching featured luxury cars:", error)
    return { success: false, error: "Failed to fetch luxury cars" }
  }
}

