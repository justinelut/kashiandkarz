"use server"

import { revalidatePath } from "next/cache"
import { Databases, ID, Client } from "node-appwrite"

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!) // Use server-side API key

const database = new Databases(client)

interface CarMake {
  name: string
  slug: string
  image: string
}

interface BasicCarInfo {
  makeId: string
  model: string
  year: string
  vehicleType: string
  condition: string
}

interface CarSpecifications {
  fuelType: string
  transmissionType: string
  drivetrain: string
  engineCapacity: string
  horsepower: string
  torque: string
  mileage?: string
  mileageUnit: "km" | "miles"
}

interface CarFeatures {
  exteriorFeatures?: string[]
  interiorFeatures?: string[]
  safetyFeatures?: string[]
}

interface OwnershipDocumentation {
  vin: string
  registrationNumber: string
  logbookAvailability: "yes" | "no"
  previousOwners: string
  insuranceStatus: "valid" | "expired" | "none"
}

interface PricingPayment {
  sellingPrice: string
  currency: string
  negotiable: "yes" | "no"
  installmentPlans: "yes" | "no"
  paymentMethods: string[]
}

interface PhotoVideo {
  frontView: File
  rearView: File
  leftSideView: File
  rightSideView: File
  interiorPhotos: File[]
  engineBayPhoto: File
  video?: File
}

export async function saveCarMake(data: CarMake) {
  try {
    const make = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_CAR_MAKES_COLLECTION_ID!,
      ID.unique(),
      {
        name: data.name,
        slug: data.slug,
        image: data.image
      }
    )
    return { success: true, data: make }
  } catch (error) {
    console.error("Error saving car make:", error)
    return { success: false, error: "Failed to save car make" }
  }
}

export async function getCarMakes() {
  try {
    const makes = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_CAR_MAKES_COLLECTION_ID!
    )
    return { success: true, data: makes.documents }
  } catch (error) {
    console.error("Error fetching car makes:", error)
    return { success: false, error: "Failed to fetch car makes" }
  }
}

export async function saveBasicCarInfo(data: BasicCarInfo) {
  try {
    const carInfo = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_CARS_COLLECTION_ID!,
      ID.unique(),
      data
    )
    revalidatePath("/dashboard/cars/new")
    return { success: true, data: carInfo }
  } catch (error) {
    console.error("Error saving car info:", error)
    return { success: false, error: "Failed to save car info" }
  }
}

export async function saveCarSpecifications(data: CarSpecifications, carId: string) {
  try {
    const specs = await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_CARS_COLLECTION_ID!,
      carId,
      data
    )
    revalidatePath("/dashboard/cars/new/car-specification")
    return { success: true, data: specs }
  } catch (error) {
    console.error("Error saving car specifications:", error)
    return { success: false, error: "Failed to save car specifications" }
  }
}

export async function saveCarFeatures(data: CarFeatures, carId: string) {
  try {
    const features = await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_CARS_COLLECTION_ID!,
      carId,
      data
    )
    revalidatePath("/dashboard/cars/new/car-features")
    return { success: true, data: features }
  } catch (error) {
    console.error("Error saving car features:", error)
    return { success: false, error: "Failed to save car features" }
  }
}

export async function saveOwnershipDocumentation(data: OwnershipDocumentation, carId: string) {
  try {
    const docs = await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_CARS_COLLECTION_ID!,
      carId,
      data
    )
    revalidatePath("/dashboard/cars/new/ownership")
    return { success: true, data: docs }
  } catch (error) {
    console.error("Error saving ownership documentation:", error)
    return { success: false, error: "Failed to save ownership documentation" }
  }
}

export async function savePricingPayment(data: PricingPayment, carId: string) {
  try {
    const pricing = await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_CARS_COLLECTION_ID!,
      carId,
      data
    )
    revalidatePath("/dashboard/cars/new/pricing")
    return { success: true, data: pricing }
  } catch (error) {
    console.error("Error saving pricing and payment options:", error)
    return { success: false, error: "Failed to save pricing and payment options" }
  }
}

export async function savePhotoVideo(data: PhotoVideo, carId: string) {
  try {
    // Here you would first upload the files to storage and get their IDs
    // Then save the file IDs to the car document
    const photos = await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_CARS_COLLECTION_ID!,
      carId,
      data
    )
    revalidatePath("/dashboard/cars/new/photos")
    return { success: true, data: photos }
  } catch (error) {
    console.error("Error saving photo and video data:", error)
    return { success: false, error: "Failed to save photo and video data" }
  }
}
