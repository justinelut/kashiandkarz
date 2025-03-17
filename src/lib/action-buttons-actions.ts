"use server"

import { Databases, Client, ID } from "node-appwrite"
import type { EnquiryFormData, CallbackFormData, TestDriveFormData, FormSubmissionResult } from "@/types/action-buttons"

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
  .setKey(process.env.APPWRITE_API_KEY!)

const database = new Databases(client)
const databaseId = process.env.APPWRITE_DATABASE_ID as string

// Collection IDs
const enquiriesCollectionId = "enquiries"
const callbacksCollectionId = "callbacks"
const testDrivesCollectionId = "test_drives"

// Submit enquiry
export async function submitEnquiry(data: EnquiryFormData, carId: string): Promise<FormSubmissionResult> {
  try {
    await database.createDocument(databaseId, enquiriesCollectionId, ID.unique(), {
      ...data,
      car_id: carId,
      status: "new",
      created_at: new Date().toISOString(),
    })

    return {
      success: true,
      message: "Enquiry submitted successfully",
    }
  } catch (error) {
    console.error("Error submitting enquiry:", error)
    return {
      success: false,
      message: "Failed to submit enquiry",
    }
  }
}

// Request callback
export async function requestCallback(data: CallbackFormData, carId: string): Promise<FormSubmissionResult> {
  try {
    await database.createDocument(databaseId, callbacksCollectionId, ID.unique(), {
      ...data,
      car: carId,
      status: "pending",
    })

    return {
      success: true,
      message: "Callback request submitted successfully",
    }
  } catch (error) {
    console.error("Error requesting callback:", error)
    return {
      success: false,
      message: "Failed to request callback",
    }
  }
}

// Schedule test drive
export async function scheduleTestDrive(data: TestDriveFormData, carId: string): Promise<FormSubmissionResult> {
  try {
    await database.createDocument(databaseId, testDrivesCollectionId, ID.unique(), {
      ...data,
      car_id: carId,
      status: "scheduled",
      created_at: new Date().toISOString(),
    })

    return {
      success: true,
      message: "Test drive scheduled successfully",
    }
  } catch (error) {
    console.error("Error scheduling test drive:", error)
    return {
      success: false,
      message: "Failed to schedule test drive",
    }
  }
}

