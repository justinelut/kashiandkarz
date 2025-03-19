"use server"

import { ID, Query } from "appwrite"
import { type Message, messageSchema } from "@/types/dashboard"
import { revalidatePath } from "next/cache"
import { database } from "./appwrite-config"

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!
const MESSAGE_COLLECTION_ID = "67d15fc7003e6140fb31" // Replace with your actual collection ID

export async function getMessages(isRead?: boolean, isReplied?: boolean, page = 1, limit = 10) {
  try {
    const queries = []

    if (isRead !== undefined) {
      queries.push(Query.equal("isRead", isRead))
    }

    if (isReplied !== undefined) {
      queries.push(Query.equal("isReplied", isReplied))
    }

    queries.push(Query.orderDesc("$createdAt"))
    queries.push(Query.limit(limit))
    queries.push(Query.offset((page - 1) * limit))

    const response = await database.listDocuments(DATABASE_ID, MESSAGE_COLLECTION_ID, queries)

    return {
      messages: response.documents as unknown as Message[],
      total: response.total,
    }
  } catch (error) {
    console.error("Error fetching messages:", error)
    throw new Error("Failed to fetch messages")
  }
}

export async function getMessageById(id: string) {
  try {
    const response = await database.getDocument(DATABASE_ID, MESSAGE_COLLECTION_ID, id)

    return response as unknown as Message
  } catch (error) {
    console.error("Error fetching message:", error)
    throw new Error("Failed to fetch message")
  }
}

export async function createMessage(data: Omit<Message, "id">) {
  try {
    const validatedData = messageSchema.omit({ id: true }).parse(data)

    const response = await database.createDocument(DATABASE_ID, MESSAGE_COLLECTION_ID, ID.unique(), {
      ...validatedData,
      isRead: false,
      isReplied: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    revalidatePath("/dashboard/messages")
    return response as unknown as Message
  } catch (error) {
    console.error("Error creating message:", error)
    throw new Error("Failed to create message")
  }
}

export async function updateMessage(id: string, data: Partial<Message>) {
  try {
    const validatedData = messageSchema.partial().parse(data)

    const response = await database.updateDocument(DATABASE_ID, MESSAGE_COLLECTION_ID, id, {
      ...validatedData,
      updatedAt: new Date(),
    })

    revalidatePath("/dashboard/messages")
    revalidatePath(`/dashboard/messages/${id}`)
    return response as unknown as Message
  } catch (error) {
    console.error("Error updating message:", error)
    throw new Error("Failed to update message")
  }
}

export async function markMessageAsRead(id: string) {
  try {
    const response = await database.updateDocument(DATABASE_ID, MESSAGE_COLLECTION_ID, id, {
      isRead: true,
      updatedAt: new Date(),
    })

    revalidatePath("/dashboard/messages")
    revalidatePath(`/dashboard/messages/${id}`)
    return response as unknown as Message
  } catch (error) {
    console.error("Error marking message as read:", error)
    throw new Error("Failed to mark message as read")
  }
}

export async function markMessageAsReplied(id: string) {
  try {
    const response = await database.updateDocument(DATABASE_ID, MESSAGE_COLLECTION_ID, id, {
      isReplied: true,
      updatedAt: new Date(),
    })

    revalidatePath("/dashboard/messages")
    revalidatePath(`/dashboard/messages/${id}`)
    return response as unknown as Message
  } catch (error) {
    console.error("Error marking message as replied:", error)
    throw new Error("Failed to mark message as replied")
  }
}

export async function deleteMessage(id: string) {
  try {
    await database.deleteDocument(DATABASE_ID, MESSAGE_COLLECTION_ID, id)

    revalidatePath("/dashboard/messages")
    return { success: true }
  } catch (error) {
    console.error("Error deleting message:", error)
    throw new Error("Failed to delete message")
  }
}

