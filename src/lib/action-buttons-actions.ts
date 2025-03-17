"use server"

import { Databases, Client, ID } from "node-appwrite"
import type { EnquiryFormData, CallbackFormData, TestDriveFormData, FormSubmissionResult } from "@/types/action-buttons"
import { callbacksCollectionId, messagesCollectionId, testDrivesCollectionId } from "./constants"

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
  .setKey(process.env.APPWRITE_API_KEY!)

const database = new Databases(client)
const databaseId = process.env.APPWRITE_DATABASE_ID as string

// Collection IDs



// Submit enquiry
export async function submitEnquiry(data: EnquiryFormData, carId: string, dealerId: string): Promise<FormSubmissionResult> {
  try {
    await database.createDocument(databaseId, messagesCollectionId, ID.unique(), {
      ...data,
      car_info: carId,
      status: "pending",
      dealer: dealerId,
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
export async function requestCallback(data: CallbackFormData, carId: string, dealerId: string): Promise<FormSubmissionResult> {
  try {
    await database.createDocument(databaseId, callbacksCollectionId, ID.unique(), {
      ...data,
      car_info: carId,
      dealer: dealerId,
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
export async function scheduleTestDrive(data: TestDriveFormData, carId: string, dealerId: string): Promise<FormSubmissionResult> {
  try {
    await database.createDocument(databaseId, testDrivesCollectionId, ID.unique(), {
      ...data,
      car_info: carId,
      dealer: dealerId,
      status: "pending",
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

