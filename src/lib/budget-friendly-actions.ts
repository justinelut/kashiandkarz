import { Query } from "appwrite"
import { database } from "./appwrite-config"
import { carinfocollectionId, databaseId } from "./constants"



export async function getBudgetFriendlyVehicles(limit = 8) {
  try {
    // Find cars with pricing information, ordered by price (ascending)
    const response = await database.listDocuments(databaseId, carinfocollectionId, [
      // Filter for cars with pricing data
      Query.isNotNull("pricing_payments.selling_price"),
      // Order by price (ascending)
      Query.orderAsc("pricing_payments.selling_price"),
      // Limit the number of results
      Query.limit(limit),
    ])

    if (response.documents.length === 0) {
      return {
        success: false,
        message: "No budget-friendly vehicles found",
        data: [],
      }
    }

    return {
      success: true,
      message: "Budget-friendly vehicles fetched successfully",
      data: response.documents,
    }
  } catch (error) {
    console.error("Error fetching budget-friendly vehicles:", error)
    return {
      success: false,
      message: "Failed to fetch budget-friendly vehicles",
      data: [],
    }
  }
}

// Helper function to get budget-friendly vehicles by price range
export async function getBudgetFriendlyVehiclesByPriceRange(
  minPrice = 0,
  maxPrice = 20000000, // 20 million KES as default upper limit
  limit = 8,
) {
  try {
    const response = await database.listDocuments(databaseId, carinfocollectionId, [
      // Filter for cars with pricing data
      Query.isNotNull("pricing_payments.selling_price"),
      // Filter by price range
      Query.greaterThanEqual("pricing_payments.selling_price", minPrice),
      Query.lessThanEqual("pricing_payments.selling_price", maxPrice),
      // Order by price (ascending)
      Query.orderAsc("pricing_payments.selling_price"),
      // Limit the number of results
      Query.limit(limit),
    ])

    if (response.documents.length === 0) {
      return {
        success: false,
        message: "No vehicles found in the specified price range",
        data: [],
      }
    }

    return {
      success: true,
      message: "Vehicles in price range fetched successfully",
      data: response.documents,
    }
  } catch (error) {
    console.error("Error fetching vehicles by price range:", error)
    return {
      success: false,
      message: "Failed to fetch vehicles by price range",
      data: [],
    }
  }
}

