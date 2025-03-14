"use server"

import { ID, Query } from "appwrite"
import { databases, storage } from "./appwrite-config"
import { type DealerProfile, dealerProfileSchema } from "@/types/dashboard"
import { revalidatePath } from "next/cache"

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!
const PROFILE_COLLECTION_ID = "67d16058002af6428ea6" // Replace with your actual collection ID
const BUCKET_ID = process.env.APPWRITE_BUCKET_ID!

export async function getDealerProfiles(page = 1, limit = 10) {
  try {
    const response = await databases.listDocuments(DATABASE_ID, PROFILE_COLLECTION_ID, [
      Query.orderDesc("$createdAt"),
      Query.limit(limit),
      Query.offset((page - 1) * limit),
    ])

    return {
      profiles: response.documents as unknown as DealerProfile[],
      total: response.total,
    }
  } catch (error) {
    console.error("Error fetching dealer profiles:", error)
    throw new Error("Failed to fetch dealer profiles")
  }
}

export async function getDealerProfileById(id: string) {
  try {
    const response = await databases.getDocument(DATABASE_ID, PROFILE_COLLECTION_ID, id)

    return response as unknown as DealerProfile
  } catch (error) {
    console.error("Error fetching dealer profile:", error)
    throw new Error("Failed to fetch dealer profile")
  }
}

export async function createDealerProfile(data: Omit<DealerProfile, "id">, avatarFile?: File) {
  try {
    const validatedData = dealerProfileSchema.omit({ id: true }).parse(data)

    const createData = {
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Upload avatar if provided
    if (avatarFile) {
      const avatarResponse = await storage.createFile(BUCKET_ID, ID.unique(), avatarFile)

      const avatarUrl = storage.getFileView(BUCKET_ID, avatarResponse.$id)
      createData.avatar = avatarUrl.href
    }

    const response = await databases.createDocument(DATABASE_ID, PROFILE_COLLECTION_ID, ID.unique(), createData)

    revalidatePath("/dashboard/profile")
    return response as unknown as DealerProfile
  } catch (error) {
    console.error("Error creating dealer profile:", error)
    throw new Error("Failed to create dealer profile")
  }
}

export async function updateDealerProfile(id: string, data: Partial<DealerProfile>, avatarFile?: File) {
  try {
    const validatedData = dealerProfileSchema.partial().parse(data)

    const updateData = {
      ...validatedData,
      updatedAt: new Date(),
    }

    // Upload avatar if provided
    if (avatarFile) {
      const avatarResponse = await storage.createFile(BUCKET_ID, ID.unique(), avatarFile)

      const avatarUrl = storage.getFileView(BUCKET_ID, avatarResponse.$id)
      updateData.avatar = avatarUrl.href
    }

    const response = await databases.updateDocument(DATABASE_ID, PROFILE_COLLECTION_ID, id, updateData)

    revalidatePath("/dashboard/profile")
    revalidatePath(`/dashboard/profile/${id}`)
    return response as unknown as DealerProfile
  } catch (error) {
    console.error("Error updating dealer profile:", error)
    throw new Error("Failed to update dealer profile")
  }
}

export async function deleteDealerProfile(id: string) {
  try {
    await databases.deleteDocument(DATABASE_ID, PROFILE_COLLECTION_ID, id)

    revalidatePath("/dashboard/profile")
    return { success: true }
  } catch (error) {
    console.error("Error deleting dealer profile:", error)
    throw new Error("Failed to delete dealer profile")
  }
}

