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

// Get eco-friendly cars
export const getEcoFriendlyCars = async (limit = 4) => {
  try {
    const queries = [
      Query.equal("status", "published"),
      Query.equal("availability", true),
      Query.limit(limit),
      Query.orderDesc("$createdAt"),
    ]

    // Filter by electric, electric-performance, and hybrid car types
    queries.push(Query.equal("category", "eco-friendly"))

    const response = await database.listDocuments(databaseId, carInfoCollectionId, queries)

    return {
      success: true,
      data: response.documents,
    }
  } catch (error) {
    console.error("Error fetching eco-friendly cars:", error)
    return { success: false, error: "Failed to fetch eco-friendly cars" }
  }
}

// Get family cars
export const getFamilyCars = async (limit = 4) => {
  try {
    const queries = [
      Query.equal("category", "family"),
      Query.equal("status", "published"),
      Query.equal("availability", true),
      Query.limit(limit),
      Query.orderDesc("$createdAt"),
    ]

    const response = await database.listDocuments(databaseId, carInfoCollectionId, queries)

    return {
      success: true,
      data: response.documents,
    }
  } catch (error) {
    console.error("Error fetching family cars:", error)
    return { success: false, error: "Failed to fetch family cars" }
  }
}

// Get commercial vehicles
export const getCommercialVehicles = async (limit = 4) => {
  try {
    const queries = [
      Query.equal("commercial", true),
      Query.equal("status", "published"),
      Query.equal("availability", true),
      Query.limit(limit),
      Query.orderDesc("$createdAt"),
    ]

    const response = await database.listDocuments(databaseId, carInfoCollectionId, queries)

    return {
      success: true,
      data: response.documents,
    }
  } catch (error) {
    console.error("Error fetching commercial vehicles:", error)
    return { success: false, error: "Failed to fetch commercial vehicles" }
  }
}

// Get performance sports cars
export const getPerformanceSportsCars = async (limit = 4) => {
  try {
    const queries = [
      Query.equal("category", "sport"),
      Query.equal("status", "published"),
      Query.equal("availability", true),
      Query.limit(limit),
      Query.orderDesc("$createdAt"),
    ]

    const response = await database.listDocuments(databaseId, carInfoCollectionId, queries)

    return {
      success: true,
      data: response.documents,
    }
  } catch (error) {
    console.error("Error fetching performance sports cars:", error)
    return { success: false, error: "Failed to fetch performance sports cars" }
  }
}

// Get budget-friendly finds
export const getBudgetFriendlyFinds = async (limit = 4) => {
  try {
    // Using a lower price threshold to find budget-friendly cars
    const queries = [
      Query.lessThan("pricing_payments.selling_price", 25000000), // Assuming price is stored in cents/pence
      Query.equal("status", "published"),
      Query.equal("availability", true),
      Query.limit(limit),
      Query.orderAsc("pricing_payments.selling_price"),
    ]

    const response = await database.listDocuments(databaseId, carInfoCollectionId, queries)

    return {
      success: true,
      data: response.documents,
    }
  } catch (error) {
    console.error("Error fetching budget-friendly finds:", error)
    return { success: false, error: "Failed to fetch budget-friendly finds" }
  }
}

// Get vintage classic collection
export const getVintageClassicCollection = async (limit = 4) => {
  try {
    // Assuming vintage cars are from 1950-1980
    const queries = [
      Query.lessThan("year", "1980"),
      Query.greaterThan("year", "1950"),
      Query.equal("status", "published"),
      Query.equal("availability", true),
      Query.limit(limit),
      Query.orderDesc("year"),
    ]

    const response = await database.listDocuments(databaseId, carInfoCollectionId, queries)

    return {
      success: true,
      data: response.documents,
    }
  } catch (error) {
    console.error("Error fetching vintage classic collection:", error)
    return { success: false, error: "Failed to fetch vintage classic collection" }
  }
}

