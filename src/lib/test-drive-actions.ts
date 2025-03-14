"use server"

import { ID, Query } from "appwrite"
import { databases } from "./appwrite-config"
import { type TestDrive, testDriveSchema } from "@/types/dashboard"
import { revalidatePath } from "next/cache"

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!
const TEST_DRIVE_COLLECTION_ID = "67d15fbb00268b54fd35" // Replace with your actual collection ID

export async function getTestDrives(status?: string, startDate?: string, endDate?: string, page = 1, limit = 10) {
  try {
    const queries = []

    if (status && status !== "all") {
      queries.push(Query.equal("status", status))
    }

    if (startDate) {
      queries.push(Query.greaterThanEqual("scheduledDate", startDate))
    }

    if (endDate) {
      queries.push(Query.lessThanEqual("scheduledDate", endDate))
    }

    queries.push(Query.orderAsc("scheduledDate"))
    queries.push(Query.orderAsc("scheduledTime"))
    queries.push(Query.limit(limit))
    queries.push(Query.offset((page - 1) * limit))

    const response = await databases.listDocuments(DATABASE_ID, TEST_DRIVE_COLLECTION_ID, queries)

    return {
      testDrives: response.documents as unknown as TestDrive[],
      total: response.total,
    }
  } catch (error) {
    console.error("Error fetching test drives:", error)
    throw new Error("Failed to fetch test drives")
  }
}

export async function getTestDriveById(id: string) {
  try {
    const response = await databases.getDocument(DATABASE_ID, TEST_DRIVE_COLLECTION_ID, id)

    return response as unknown as TestDrive
  } catch (error) {
    console.error("Error fetching test drive:", error)
    throw new Error("Failed to fetch test drive")
  }
}

export async function createTestDrive(data: Omit<TestDrive, "id">) {
  try {
    const validatedData = testDriveSchema.omit({ id: true }).parse(data)

    const response = await databases.createDocument(DATABASE_ID, TEST_DRIVE_COLLECTION_ID, ID.unique(), {
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    revalidatePath("/dashboard/test-drives")
    return response as unknown as TestDrive
  } catch (error) {
    console.error("Error creating test drive:", error)
    throw new Error("Failed to create test drive")
  }
}

export async function updateTestDrive(id: string, data: Partial<TestDrive>) {
  try {
    const validatedData = testDriveSchema.partial().parse(data)

    const response = await databases.updateDocument(DATABASE_ID, TEST_DRIVE_COLLECTION_ID, id, {
      ...validatedData,
      updatedAt: new Date(),
    })

    revalidatePath("/dashboard/test-drives")
    revalidatePath(`/dashboard/test-drives/${id}`)
    return response as unknown as TestDrive
  } catch (error) {
    console.error("Error updating test drive:", error)
    throw new Error("Failed to update test drive")
  }
}

export async function deleteTestDrive(id: string) {
  try {
    await databases.deleteDocument(DATABASE_ID, TEST_DRIVE_COLLECTION_ID, id)

    revalidatePath("/dashboard/test-drives")
    return { success: true }
  } catch (error) {
    console.error("Error deleting test drive:", error)
    throw new Error("Failed to delete test drive")
  }
}

export async function getAvailableTimeSlots(date: string, carId: string) {
  try {
    // Get all test drives for the specified date and car
    const existingBookings = await databases.listDocuments(DATABASE_ID, TEST_DRIVE_COLLECTION_ID, [
      Query.equal("scheduledDate", date),
      Query.equal("carId", carId),
      Query.notEqual("status", "cancelled"),
    ])

    // Define business hours (9 AM to 6 PM)
    const businessHours = Array.from({ length: 10 }, (_, i) => `${i + 9}:00`)

    // Filter out already booked time slots
    const bookedTimes = (existingBookings.documents as unknown as TestDrive[]).map((booking) => booking.scheduledTime)

    const availableTimeSlots = businessHours.filter((time) => !bookedTimes.includes(time))

    return availableTimeSlots
  } catch (error) {
    console.error("Error fetching available time slots:", error)
    throw new Error("Failed to fetch available time slots")
  }
}

