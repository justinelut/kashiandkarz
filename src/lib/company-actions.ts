"use server"

import { ID, Query } from "appwrite"
import { databases, storage } from "./appwrite-config"
import { type CompanyDetails, companyDetailsSchema } from "@/types/dashboard"
import { revalidatePath } from "next/cache"

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!
const COMPANY_COLLECTION_ID = "company_details" // Replace with your actual collection ID
const BUCKET_ID = process.env.APPWRITE_BUCKET_ID!

export async function getCompanyDetails() {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COMPANY_COLLECTION_ID, [Query.limit(1)])

    if (response.documents.length === 0) {
      return null
    }

    return response.documents[0] as unknown as CompanyDetails
  } catch (error) {
    console.error("Error fetching company details:", error)
    throw new Error("Failed to fetch company details")
  }
}

export async function updateCompanyDetails(
  id: string,
  data: Partial<CompanyDetails>,
  logoFile?: File,
  coverImageFile?: File,
) {
  try {
    const validatedData = companyDetailsSchema.partial().parse(data)

    const updateData = {
      ...validatedData,
      updatedAt: new Date(),
    }

    // Upload logo if provided
    if (logoFile) {
      const logoResponse = await storage.createFile(BUCKET_ID, ID.unique(), logoFile)

      const logoUrl = storage.getFileView(BUCKET_ID, logoResponse.$id)
      updateData.logo = logoUrl.href
    }

    // Upload cover image if provided
    if (coverImageFile) {
      const coverImageResponse = await storage.createFile(BUCKET_ID, ID.unique(), coverImageFile)

      const coverImageUrl = storage.getFileView(BUCKET_ID, coverImageResponse.$id)
      updateData.coverImage = coverImageUrl.href
    }

    const response = await databases.updateDocument(DATABASE_ID, COMPANY_COLLECTION_ID, id, updateData)

    revalidatePath("/dashboard/company")
    return response as unknown as CompanyDetails
  } catch (error) {
    console.error("Error updating company details:", error)
    throw new Error("Failed to update company details")
  }
}

export async function createCompanyDetails(data: Omit<CompanyDetails, "id">, logoFile?: File, coverImageFile?: File) {
  try {
    const validatedData = companyDetailsSchema.omit({ id: true }).parse(data)

    const createData = {
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Upload logo if provided
    if (logoFile) {
      const logoResponse = await storage.createFile(BUCKET_ID, ID.unique(), logoFile)

      const logoUrl = storage.getFileView(BUCKET_ID, logoResponse.$id)
      createData.logo = logoUrl.href
    }

    // Upload cover image if provided
    if (coverImageFile) {
      const coverImageResponse = await storage.createFile(BUCKET_ID, ID.unique(), coverImageFile)

      const coverImageUrl = storage.getFileView(BUCKET_ID, coverImageResponse.$id)
      createData.coverImage = coverImageUrl.href
    }

    const response = await databases.createDocument(DATABASE_ID, COMPANY_COLLECTION_ID, ID.unique(), createData)

    revalidatePath("/dashboard/company")
    return response as unknown as CompanyDetails
  } catch (error) {
    console.error("Error creating company details:", error)
    throw new Error("Failed to create company details")
  }
}

