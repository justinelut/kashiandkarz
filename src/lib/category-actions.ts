import { carTypeCollectionId, database, databaseId } from "@/lib/appwrite-config"
import { Query } from "node-appwrite"

export interface CarType {
  $id: string
  name: string
  slug: string
  car_info?: any[] // Adjust the type of car_info as needed
}



export const getCategoryBySlug = async (slug: string) => {
  try {
    // Simply fetch the car type by slug - car_info is already nested
    const typeResponse = await database.listDocuments(databaseId, carTypeCollectionId, [
      Query.equal("slug", slug),
      Query.limit(1),
    ])

    if (typeResponse.documents.length === 0) {
      return { success: false, error: "Category not found" }
    }

    return { success: true, data: typeResponse.documents[0] }
  } catch (error) {
    console.error("Error fetching category by slug:", error)
    return { success: false, error: "Failed to fetch category" }
  }
}


export const getAllCarTypesWithCars = async () => {
  try {
    // Simply fetch all car types - car_info is already nested in the response
    const typesResponse = await database.listDocuments(databaseId, carTypeCollectionId)

    return {
      success: true,
      data: typesResponse.documents,
    }
  } catch (error) {
    console.error("Error fetching car types with cars:", error)
    return { success: false, error: "Failed to fetch car types with cars" }
  }
}

