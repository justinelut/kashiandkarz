"use server";

import { revalidatePath } from "next/cache";
import { Databases, ID, Client, Query, Storage } from "node-appwrite";

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
  .setKey(process.env.APPWRITE_API_KEY!); // Use server-side API key

const databases = new Databases(client);
const storage = new Storage(client);

// Database constants
const databaseId = process.env.APPWRITE_DATABASE_ID!;
const carImagesCollectionId = "car_images";
const storageBucketId = process.env.APPWRITE_STORAGE_BUCKET_ID!;

export async function updateCarPhotos(
  formData: FormData
): Promise<{ success: boolean; data?: { imageIds: string[] }; error?: string }> {
  try {
    const car_id = formData.get("car_id") as string;
    
    if (!car_id) {
      return { success: false, error: "Car ID is missing" };
    }
    
    // Get the file entries from the formData
    const fileKeys = Array.from(formData.keys()).filter(key => key.startsWith("photo_"));
    
    if (fileKeys.length === 0) {
      return { success: false, error: "No files provided" };
    }
    
    const uploadedImageIds: string[] = [];
    
    // Upload each file to storage
    for (const key of fileKeys) {
      const file = formData.get(key) as File;
      
      if (!file) continue;
      
      // Create a unique file name
      const fileName = `${ID.unique()}-${file.name}`;
      
      // Upload to storage
      const uploadedFile = await storage.createFile(
        storageBucketId,
        ID.unique(),
        file
      );
      
      // Get file URL
      const fileUrl = storage.getFileView(
        storageBucketId,
        uploadedFile.$id
      );
      
      // Add the image to the car document
      const result = await databases.createDocument(
        databaseId,
        carImagesCollectionId,
        ID.unique(),
        {
          car_id,
          url: fileUrl,
          file_id: uploadedFile.$id,
          file_name: fileName,
        }
      );
      
      uploadedImageIds.push(result.$id);
    }
    
    // Revalidate the car details page
    revalidatePath(`/dashboard/cars/${car_id}`);
    
    return { 
      success: true, 
      data: { imageIds: uploadedImageIds } 
    };
  } catch (error) {
    console.error("Error uploading photos:", error);
    return { success: false, error: "Failed to upload photos" };
  }
}

export async function deleteCarPhoto(
  car_id: string,
  photo_id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get the photo document to get the file ID
    const photo = await databases.getDocument(
      databaseId,
      carImagesCollectionId,
      photo_id
    );
    
    // Delete the file from storage
    if (photo.file_id) {
      await storage.deleteFile(
        storageBucketId,
        photo.file_id
      );
    }
    
    // Delete the photo document
    await databases.deleteDocument(
      databaseId,
      carImagesCollectionId,
      photo_id
    );
    
    // Revalidate the car details page
    revalidatePath(`/dashboard/cars/${car_id}`);
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting photo:", error);
    return { success: false, error: "Failed to delete photo" };
  }
}
