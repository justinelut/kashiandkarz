"use server"

import { revalidatePath } from "next/cache"

interface BasicCarInfo {
  make: string
  model: string
  year: string
  "vehicle-type": string
  condition: string
}

interface CarSpecifications {
  "fuel-type": string
  "transmission-type": string
  drivetrain: string
  "engine-capacity": string
  horsepower: string
  torque: string
  mileage?: string
  "mileage-unit": "km" | "miles"
}

interface CarFeatures {
  "exterior-features"?: string[]
  "interior-features"?: string[]
  "safety-features"?: string[]
}

interface OwnershipDocumentation {
  vin: string
  "registration-number": string
  "logbook-availability": "yes" | "no"
  "previous-owners": string
  "insurance-status": "valid" | "expired" | "none"
}

interface PricingPayment {
  "selling-price": string
  currency: string
  negotiable: "yes" | "no"
  "installment-plans": "yes" | "no"
  "payment-methods": string[]
}

interface PhotoVideo {
  "front-view": File
  "rear-view": File
  "left-side-view": File
  "right-side-view": File
  "interior-photos": File[]
  "engine-bay-photo": File
  video?: File
}

export async function saveBasicCarInfo(data: BasicCarInfo) {
  // Simulate a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real application, you would save this data to a database
  console.log("Saving car info:", data)

  revalidatePath("/sell-car")

  return { success: true }
}

export async function saveCarSpecifications(data: CarSpecifications) {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  console.log("Saving car specifications:", data)
  revalidatePath("/sell-car/step-2")
  return { success: true }
}

export async function saveCarFeatures(data: CarFeatures) {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  console.log("Saving car features:", data)
  revalidatePath("/sell-car/step-3")
  return { success: true }
}

export async function saveOwnershipDocumentation(data: OwnershipDocumentation) {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  console.log("Saving ownership documentation:", data)
  revalidatePath("/sell-car/step-4")
  return { success: true }
}

export async function savePricingPayment(data: PricingPayment) {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  console.log("Saving pricing and payment options:", data)
  revalidatePath("/sell-car/step-5")
  return { success: true }
}

export async function savePhotoVideo(data: PhotoVideo) {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  console.log("Saving photo and video data:", data)
  revalidatePath("/sell-car/step-6")
  return { success: true }
}

