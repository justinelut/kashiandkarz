"use server"

import { ID, Query } from "appwrite"
import { databases } from "./appwrite-config"
import { type CallbackRequest, callbackRequestSchema } from "@/types/dashboard"
import { revalidatePath } from "next/cache"

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!
const CALLBACK_COLLECTION_ID = "67d15fd400083417092d" // Replace with your actual collection ID

export async function getCallbackRequests(status?: string, page = 1, limit = 10) {
  try {
    const queries = []

    if (status && status !== "all") {
      queries.push(Query.equal("status", status))
    }

    queries.push(Query.orderDesc("$createdAt"))
    queries.push(Query.limit(limit))
    queries.push(Query.offset((page - 1) * limit))

    const response = await databases.listDocuments(DATABASE_ID, CALLBACK_COLLECTION_ID, queries)

    return {
      callbacks: response.documents as unknown as CallbackRequest[],
      total: response.total,
    }
  } catch (error) {
    console.error("Error fetching callback requests:", error)
    throw new Error("Failed to fetch callback requests")
  }
}

export async function getCallbackRequestById(id: string) {
  try {
    const response = await databases.getDocument(DATABASE_ID, CALLBACK_COLLECTION_ID, id)

    return response as unknown as CallbackRequest
  } catch (error) {
    console.error("Error fetching callback request:", error)
    throw new Error("Failed to fetch callback request")
  }
}

export async function createCallbackRequest(data: Omit<CallbackRequest, "id">) {
  try {
    const validatedData = callbackRequestSchema.omit({ id: true }).parse(data)

    const response = await databases.createDocument(DATABASE_ID, CALLBACK_COLLECTION_ID, ID.unique(), {
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    revalidatePath("/dashboard/callbacks")
    return response as unknown as CallbackRequest
  } catch (error) {
    console.error("Error creating callback request:", error)
    throw new Error("Failed to create callback request")
  }
}

export async function updateCallbackRequest(id: string, data: Partial<CallbackRequest>) {
  try {
    const validatedData = callbackRequestSchema.partial().parse(data)

    const response = await databases.updateDocument(DATABASE_ID, CALLBACK_COLLECTION_ID, id, {
      ...validatedData,
      updatedAt: new Date(),
    })

    revalidatePath("/dashboard/callbacks")
    revalidatePath(`/dashboard/callbacks/${id}`)
    return response as unknown as CallbackRequest
  } catch (error) {
    console.error("Error updating callback request:", error)
    throw new Error("Failed to update callback request")
  }
}

export async function deleteCallbackRequest(id: string) {
  try {
    await databases.deleteDocument(DATABASE_ID, CALLBACK_COLLECTION_ID, id)

    revalidatePath("/dashboard/callbacks")
    return { success: true }
  } catch (error) {
    console.error("Error deleting callback request:", error)
    throw new Error("Failed to delete callback request")
  }
}

