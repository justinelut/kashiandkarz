import { database } from "@/lib/appwrite-config"
import { ID, Query } from "node-appwrite"
import type {
  dealer_basic_info,
  dealer_contact_info,
  dealer_inventory_info,
  dealer_preferences,
  dealer_profile,
} from "@/types/dealer"

const database_id = process.env.APPWRITE_DATABASE_ID!
const dealer_collection_id = "dealers" // Replace with your actual collection ID

// Get dealer profile
export async function get_dealer_profile(user_id: string): Promise<dealer_profile | null> {
  try {
    const response = await database.listDocuments(database_id, dealer_collection_id, [Query.equal("user_id", user_id)])

    if (response.documents.length === 0) {
      return null
    }

    return response.documents[0] as unknown as dealer_profile
  } catch (error) {
    console.error("Error fetching dealer profile:", error)
    throw new Error("Failed to fetch dealer profile")
  }
}

// Save basic info
export async function save_dealer_basic_info(user_id: string, data: dealer_basic_info): Promise<dealer_basic_info> {
  try {
    const existing_profile = await get_dealer_profile(user_id)

    if (existing_profile) {
      // Update existing profile
      const response = await database.updateDocument(database_id, dealer_collection_id, existing_profile.$id, {
        ...data,
        updated_at: new Date().toISOString(),
      })
      return response as unknown as dealer_basic_info
    } else {
      // Create new profile
      const response = await database.createDocument(database_id, dealer_collection_id, ID.unique(), {
        ...data,
        user_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      return response as unknown as dealer_basic_info
    }
  } catch (error) {
    console.error("Error saving dealer basic info:", error)
    throw new Error("Failed to save dealer basic info")
  }
}

// Save contact info
export async function save_dealer_contact_info(
  user_id: string,
  data: dealer_contact_info,
): Promise<dealer_contact_info> {
  try {
    const existing_profile = await get_dealer_profile(user_id)

    if (!existing_profile) {
      throw new Error("Please complete the basic information first")
    }

    const response = await database.updateDocument(database_id, dealer_collection_id, existing_profile.$id, {
      ...data,
      updated_at: new Date().toISOString(),
    })
    return response as unknown as dealer_contact_info
  } catch (error) {
    console.error("Error saving dealer contact info:", error)
    throw new Error("Failed to save dealer contact info")
  }
}

// Save inventory info
export async function save_dealer_inventory_info(
  user_id: string,
  data: dealer_inventory_info,
): Promise<dealer_inventory_info> {
  try {
    const existing_profile = await get_dealer_profile(user_id)

    if (!existing_profile) {
      throw new Error("Please complete the previous steps first")
    }

    const response = await database.updateDocument(database_id, dealer_collection_id, existing_profile.$id, {
      ...data,
      updated_at: new Date().toISOString(),
    })
    return response as unknown as dealer_inventory_info
  } catch (error) {
    console.error("Error saving dealer inventory info:", error)
    throw new Error("Failed to save dealer inventory info")
  }
}

// Save preferences and complete onboarding
export async function save_dealer_preferences(user_id: string, data: dealer_preferences): Promise<dealer_preferences> {
  try {
    const existing_profile = await get_dealer_profile(user_id)

    if (!existing_profile) {
      throw new Error("Please complete the previous steps first")
    }

    const response = await database.updateDocument(database_id, dealer_collection_id, existing_profile.$id, {
      ...data,
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    })
    return response as unknown as dealer_preferences
  } catch (error) {
    console.error("Error saving dealer preferences:", error)
    throw new Error("Failed to save dealer preferences")
  }
}

