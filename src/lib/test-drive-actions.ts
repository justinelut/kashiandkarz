"use server"

import { ID, Query } from "appwrite"
import { database } from "./appwrite-config"
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
      queries.push(Query.greaterThanEqual("preferred_date", startDate))
    }

    if (endDate) {
      queries.push(Query.lessThanEqual("preferred_date", endDate))
    }

    queries.push(Query.orderAsc("preferred_date"))
    queries.push(Query.orderAsc("preferred_time"))
    queries.push(Query.limit(limit))
    queries.push(Query.offset((page - 1) * limit))

    const response = await database.listDocuments(DATABASE_ID, TEST_DRIVE_COLLECTION_ID, queries)

    // Map the response to match the expected structure in the UI
    const testDrives = response.documents.map((doc: any) => ({
      ...doc,
      // Keep the original fields but also add the fields the UI is expecting
      scheduledDate: doc.preferred_date,
      scheduledTime: doc.preferred_time,
    }))

    return {
      testDrives: testDrives as unknown as TestDrive[],
      total: response.total,
    }
  } catch (error) {
    console.error("Error fetching test drives:", error)
    throw new Error("Failed to fetch test drives")
  }
}

export async function getTestDriveById(id: string) {
  try {
    const response = await database.getDocument(DATABASE_ID, TEST_DRIVE_COLLECTION_ID, id)
    
    // Map the document to include the fields expected by the UI
    const testDrive = {
      ...response,
      scheduledDate: response.preferred_date,
      scheduledTime: response.preferred_time,
    }

    return testDrive as unknown as TestDrive
  } catch (error) {
    console.error("Error fetching test drive:", error)
    throw new Error("Failed to fetch test drive")
  }
}

export async function createTestDrive(data: Omit<TestDrive, "id">) {
  try {
    // Extract the fields and map them to match the database structure
    const { scheduledDate, scheduledTime, ...restData } = data
    
    const dbData = {
      ...restData,
      preferred_date: scheduledDate,
      preferred_time: scheduledTime,
    }
    
    const validatedData = testDriveSchema.omit({ id: true }).parse(dbData)

    const response = await database.createDocument(DATABASE_ID, TEST_DRIVE_COLLECTION_ID, ID.unique(), {
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
    // Extract the fields and map them to match the database structure
    const { scheduledDate, scheduledTime, ...restData } = data
    
    const dbData = {
      ...restData,
      ...(scheduledDate && { preferred_date: scheduledDate }),
      ...(scheduledTime && { preferred_time: scheduledTime }),
    }
    
    const validatedData = testDriveSchema.partial().parse(dbData)

    const response = await database.updateDocument(DATABASE_ID, TEST_DRIVE_COLLECTION_ID, id, {
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
    await database.deleteDocument(DATABASE_ID, TEST_DRIVE_COLLECTION_ID, id)

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
    const existingBookings = await database.listDocuments(DATABASE_ID, TEST_DRIVE_COLLECTION_ID, [
      Query.equal("preferred_date", date),
      Query.equal("carId", carId),
      Query.notEqual("status", "cancelled"),
    ])

    // Define business hours (9 AM to 6 PM)
    const businessHours = Array.from({ length: 10 }, (_, i) => `${i + 9}:00`)

    // Filter out already booked time slots
    const bookedTimes = (existingBookings.documents as unknown as TestDrive[]).map((booking) => booking.preferred_time)

    const availableTimeSlots = businessHours.filter((time) => !bookedTimes.includes(time))

    return availableTimeSlots
  } catch (error) {
    console.error("Error fetching available time slots:", error)
    throw new Error("Failed to fetch available time slots")
  }
}