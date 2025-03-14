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

export const getFamilyCars = async (limit = 4) => {
  try {
    // Fetch cars with category = "family"
    const familyCarsResponse = await database.listDocuments(databaseId, carInfoCollectionId, [
      Query.equal("category", "family"),
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
      data: familyCarsResponse.documents,
    }
  } catch (error) {
    console.error("Error fetching family cars:", error)
    return { success: false, error: "Failed to fetch family cars" }
  }
}

// Get big deal family cars (for highlighting special offers)
export const getFamilyBigDeals = async (limit = 4) => {
  try {
    const familyDealsResponse = await database.listDocuments(databaseId, carInfoCollectionId, [
      Query.equal("category", "family"),
      Query.equal("status", "published"),
      Query.equal("availability", true),
      Query.equal("big_deal", true),
      Query.limit(limit),
    ])

    return {
      success: true,
      data: familyDealsResponse.documents,
    }
  } catch (error) {
    console.error("Error fetching family big deals:", error)
    return { success: false, error: "Failed to fetch family deals" }
  }
}

// Get featured family cars (combining both methods)
export const getFeaturedFamilyCars = async (limit = 4) => {
  try {
    // First try to get big deals
    const bigDealsResult = await getFamilyBigDeals(limit)

    // If we have enough big deals, return them
    if (bigDealsResult.success && bigDealsResult.data.length >= limit) {
      return bigDealsResult
    }

    // Otherwise, get regular family cars
    const familyCarsResult = await getFamilyCars(limit)

    // If big deals failed or had no results, just return family cars
    if (!bigDealsResult.success || bigDealsResult.data.length === 0) {
      return familyCarsResult
    }

    // Combine big deals with regular family cars to reach the limit
    const bigDeals = bigDealsResult.data
    const regularCars = familyCarsResult.success ? familyCarsResult.data : []

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
    console.error("Error fetching featured family cars:", error)
    return { success: false, error: "Failed to fetch family cars" }
  }
}

