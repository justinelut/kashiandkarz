"use server";
import {
	CarFeaturesOptions,
	CarInfo,
	CarSpecifications,
	OwnershipDocumentation,
	PricingPayment,
	ReviewSubmit,
	UpdateStatus,
} from "@/types/types";
import { revalidatePath } from "next/cache";
import { Databases, ID, Client, Query, Storage } from "node-appwrite";

import {
	databaseId,
	carinfocollectionId,
	carmakecollectionsId,
	carspecificationscollectionid,
	ownershipdocumentationcollectionid,
	pricingpaymentcollectionid,
	exteriorFeatureCollectionId,
	interiorFeatureCollectionId,
	safetyFeatureCollectionId,
	allcarfeaturescollectionid,
	specificcarfeaturescollectionid,
	carcolorscollectionid,
	carTypeCollectionId,
} from "./constants";

// Initialize Appwrite client
const client = new Client()
	.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
	.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
	.setKey(process.env.APPWRITE_API_KEY!); // Use server-side API key

const database = new Databases(client);
const storage = new Storage(client);




// Add to src/lib/actions.ts
export async function getCallbacks() {
	try {
		const response = await database.listDocuments(
			databaseId,
			"", //callbackscollectionid
		);
		return { data: response.documents };
	} catch (error) {
		console.error("Error fetching callbacks:", error);
		return { error: "Failed to fetch callbacks" };
	}
}

export async function updateCompanyDetails() {
	try {
		const response = await database.listDocuments(
			databaseId,
			"", //callbackscollectionid
		);
		return { data: response.documents };
	} catch (error) {
		console.error("Error fetching callbacks:", error);
		return { error: "Failed to fetch callbacks" };
	}
}

export async function getCompanyDetails() {
	try {
		const response = await database.listDocuments(
			databaseId,
			"", //callbackscollectionid
		);
		return { data: response.documents };
	} catch (error) {
		console.error("Error fetching callbacks:", error);
		return { error: "Failed to fetch callbacks" };
	}
}

export const getCarFeatures = async () => {
	try {
		const response = await database.listDocuments(
			databaseId,
			allcarfeaturescollectionid,
		);

		return { success: true, data: response.documents[0] };
	} catch (error) {
		console.error("Error fetching car features:", error);
		return { success: false, error: "Failed to fetch car features" };
	}
};

export const getCarTypes = async ({
	cursor = null,
	search = "",
	limit = 25,
}: {
	cursor?: string | null;
	search?: string;
	limit?: number;
}) => {
	try {
		const queries: any[] = [];

		if (search) {
			queries.push(Query.search("name", search));
		}

		if (cursor) {
			queries.push(Query.cursorAfter(cursor));
		}

		queries.push(Query.limit(limit));

		const response = await database.listDocuments(
			databaseId,
			carTypeCollectionId,
			queries,
		);

		return { success: true, data: response.documents };
	} catch (error) {
		console.error("Error fetching car types:", error);
		return { success: false, error: "Failed to fetch car types" };
	}
};

export async function saveCarMake(data: CarInfo) {
	try {
		const make = await database.createDocument(
			databaseId,
			carmakecollectionsId,
			ID.unique(),
			{
				name: data.name,
				slug: data.slug,
				image: data.image,
			},
		);
		return { success: true, data: make };
	} catch (error) {
		console.error("Error saving car make:", error);
		return { success: false, error: "Failed to save car make" };
	}
}

export const getCarMakes = async ({
	cursor = null,
	search = "",
	limit = 25,
}: {
	cursor?: string | null;
	search?: string;
	limit?: number;
}) => {
	console.log(search);
	console.log(cursor);
	try {
		const queries: any[] = [];

		// Apply search filter
		if (search) {
			queries.push(Query.search("name", search));
		}

		// Apply cursor for pagination
		if (cursor) {
			queries.push(Query.cursorAfter(cursor));
		}

		// Apply limit
		queries.push(Query.limit(limit));

		// Fetch from database
		const response = await database.listDocuments(
			databaseId,
			carmakecollectionsId,
			queries,
		);

		return { success: true, data: response.documents };
	} catch (error) {
		console.error("Error fetching car makes:", error);
		return { success: false, error: "Failed to fetch car makes" };
	}
};

export async function saveBasicCarInfo(data: CarInfo) {
	try {
		const carInfo = await database.createDocument(
			databaseId,
			carinfocollectionId,
			ID.unique(),
			data,
		);
		return { success: true, carId: carInfo.$id };
	} catch (error) {
		console.error("Error saving car info:", error);
		return { success: false, error: "Failed to save car info" };
	}
}

export async function saveCarSpecifications(data: CarSpecifications) {
	try {
		const specs = await database.createDocument(
			databaseId,
			carspecificationscollectionid,
			ID.unique(),
			data,
		);
		return { success: true, data: specs };
	} catch (error) {
		console.error("Error saving car specifications:", error);
		return { success: false, error: "Failed to save car specifications" };
	}
}

export async function saveCarFeatures(data: CarFeaturesOptions) {
	try {
		const features = await database.createDocument(
			databaseId,
			specificcarfeaturescollectionid,
			ID.unique(),
			data,
		);
		return { success: true, data: features };
	} catch (error) {
		console.error("Error saving car features:", error);
		return { success: false, error: "Failed to save car features" };
	}
}

export async function saveOwnershipDocumentation(data: OwnershipDocumentation) {
	try {
		const docs = await database.createDocument(
			databaseId,
			ownershipdocumentationcollectionid,
			ID.unique(),
			data,
		);
		return { success: true, data: docs };
	} catch (error) {
		console.error("Error saving ownership documentation:", error);
		return { success: false, error: "Failed to save ownership documentation" };
	}
}

export async function savePricingPayment(data: PricingPayment) {
	try {
		const pricing = await database.createDocument(
			databaseId,
			pricingpaymentcollectionid,
			ID.unique(),
			data,
		);
		return { success: true, data: pricing };
	} catch (error) {
		console.error("Error saving pricing and payment options:", error);
		return {
			success: false,
			error: "Failed to save pricing and payment options",
		};
	}
}

export async function savePhotoVideo(data: CarInfo, carId: string) {
	console.log(data);
	console.log(carId);
	try {
		const photos = await database.updateDocument(
			databaseId,
			carinfocollectionId,
			carId,
			data,
		);
		return { success: true, data: photos };
	} catch (error) {
		console.error("Error saving photo and video data:", error);
		return { success: false, error: "Failed to save photo and video data" };
	}
}

export async function getExteriorFeatures() {
	try {
		const features = await database.listDocuments(
			databaseId,
			exteriorFeatureCollectionId,
		);
		return { success: true, data: features.documents };
	} catch (error) {
		console.error("Error fetching exterior features:", error);
		return { success: false, error: "Failed to fetch exterior features" };
	}
}

export async function getCarColors() {
	try {
		const carcolors = await database.listDocuments(
			databaseId,
			carcolorscollectionid,
		);
		return { success: true, data: carcolors.documents };
	} catch (error) {
		console.error("Error fetching colors", error);
		return { success: false, error: "Failed to fetch colors" };
	}
}

export async function getAllCars() {
	try {
		const carinfo = await database.listDocuments(databaseId, carinfocollectionId);
		return carinfo.documents;
	} catch (error) {
		console.error("Error fetching colors", error);
		return { success: false, error: "Failed to fetch colors" };
	}
}

export async function getInteriorFeatures() {
	try {
		const features = await database.listDocuments(
			databaseId,
			interiorFeatureCollectionId,
		);
		return { success: true, data: features.documents };
	} catch (error) {
		console.error("Error fetching interior features:", error);
		return { success: false, error: "Failed to fetch interior features" };
	}
}

export async function getSafetyFeatures() {
	try {
		const features = await database.listDocuments(
			databaseId,
			safetyFeatureCollectionId,
		);
		return { success: true, data: features.documents };
	} catch (error) {
		console.error("Error fetching safety features:", error);
		return { success: false, error: "Failed to fetch safety features" };
	}
}

export async function uploadFiles(formData: FormData) {
	try {
		const files = formData.getAll("files");
		console.log(files);
		const uploadPromises = files.map(async (file) => {
			const uniqueFileId = ID.unique();

			// Directly pass the file to createFile
			const uploadedFile = await storage.createFile(
				process.env.APPWRITE_BUCKET_ID as string,
				uniqueFileId,
				file, // Pass the file directly
			);

			const fileUrl = `${
				process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string
			}/storage/buckets/${process.env.APPWRITE_BUCKET_ID as string}/files/${
				uploadedFile.$id
			}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string}`;

			return fileUrl;
		});

		const uploadedFilesUrls = await Promise.all(uploadPromises);
		return { success: true, data: uploadedFilesUrls };
	} catch (error) {
		console.error("Error uploading files:", error);
		return { success: false, error: "Failed to upload files" };
	}
}

export async function updateCarInfo(data: CarInfo, carId: string) {
	try {
		const carInfo = await database.updateDocument(
			databaseId,
			carinfocollectionId,
			carId,
			data,
		);
		return { success: true, carId: carInfo.$id };
	} catch (error) {
		console.error("Error updating car info:", error);
		return { success: false, error: "Failed to update car info" };
	}
}
export async function deleteCarListing(carId: string) {
	try {
		const carInfo = await database.deleteDocument(
			databaseId,
			carinfocollectionId,
			carId,
		);
		return { success: true, carId: carInfo.$id };
	} catch (error) {
		console.error("Error updating car info:", error);
		return { success: false, error: "Failed to update car info" };
	}
}

export async function saveReviewSubmit(
	data: ReviewSubmit,
	car_id: string,
): Promise<{ success: boolean; data: null; error?: string }> {
	try {
		await database.updateDocument(databaseId, carinfocollectionId, car_id, {
			status: data.status,
			availability: data.availability,
		});

		return {
			success: true,
			data: null,
		};
	} catch (error) {
		console.error("Error saving review submit:", error);
		return {
			success: false,
			error: "Failed to save review submit",
		};
	}
}

export async function updateStatus(
	data: UpdateStatus,
	car_id: string,
): Promise<{ success: boolean; data: null; error?: string }> {
	try {
		await database.updateDocument(databaseId, carinfocollectionId, car_id, {
			status: data.status,
			availability: data.availability,
			category: data?.category,
			featured: data.featured,
			commercial: data.commercial,
			big_deal: data.big_deal,
		});

		return {
			success: true,
			data: null,
		};
	} catch (error) {
		console.error("Error saving review submit:", error);
		return {
			success: false,
			error: "Failed to save review submit",
		};
	}
}

export async function getSingleCarInfo(
	car_id: string,
): Promise<{ success: boolean; data: CarInfo | null; error?: string }> {
	try {
		const car = await database.getDocument(
			databaseId,
			carinfocollectionId,
			car_id,
		);

		if (!car) {
			return {
				success: false,
				error: "Car not found",
				data: null,
			};
		}

		return {
			success: true,
			data: car as CarInfo,
		};
	} catch (error) {
		console.error("Error fetching car information:", error);
		return {
			success: false,
			error: "Failed to fetch car information",
			data: null,
		};
	}
}

export async function updateBasicCarInfo(
	data: CarInfo & { id: string },
): Promise<{ success: boolean; data?: CarInfo; error?: string }> {
	try {
		// Update the document in your Appwrite database
		const updatedCar = await database.updateDocument(
			databaseId,
			carinfocollectionId,
			data.id,
			data,
		);
		// Revalidate the route so that the updated info is reflected in the UI
		revalidatePath("/dashboard/cars/new/car-specification");
		return { success: true, data: updatedCar };
	} catch (error) {
		console.error("Error updating car information:", error);
		return { success: false, error: "Failed to update car information" };
	}
}

export async function updateCarSpecifications(
	data: CarSpecifications & { car_id: string },
): Promise<{ success: boolean; data?: CarSpecifications; error?: string }> {
	try {
		// First check if specs already exist for this car
		const existingSpecs = await database.listDocuments(
			databaseId,
			carspecificationscollectionid,
			[Query.equal("car_id", data.car_id)],
		);

		// Remove car_id from data to match collection schema
		const { car_id, ...docData } = data;

		if (existingSpecs.documents.length > 0) {
			// Update existing document
			const docId = existingSpecs.documents[0].$id;
			const updatedSpecs = await database.updateDocument(
				databaseId,
				carspecificationscollectionid,
				docId,
				docData,
			);

			// Revalidate paths
			revalidatePath(`/dashboard/cars/${car_id}`);
			revalidatePath(`/dashboard/cars/edit/specifications`);

			return { success: true, data: updatedSpecs as CarSpecifications };
		} else {
			// Create new specification document
			const newSpecs = await saveCarSpecifications(data);
			return newSpecs;
		}
	} catch (error) {
		console.error("Error updating car specifications:", error);
		return { success: false, error: "Failed to update car specifications" };
	}
}

export async function updateCarFeatures(
	data: CarFeaturesOptions & { car_id: string },
): Promise<{ success: boolean; data?: CarFeaturesOptions; error?: string }> {
	try {
		// First check if features already exist for this car
		const existingFeatures = await database.listDocuments(
			databaseId,
			specificcarfeaturescollectionid,
			[Query.equal("car_id", data.car_id)],
		);

		// Remove car_id from data to match collection schema
		const { car_id, ...docData } = data;

		if (existingFeatures.documents.length > 0) {
			// Update existing document
			const docId = existingFeatures.documents[0].$id;
			const updatedFeatures = await database.updateDocument(
				databaseId,
				specificcarfeaturescollectionid,
				docId,
				docData,
			);

			// Revalidate paths
			revalidatePath(`/dashboard/cars/${car_id}`);
			revalidatePath(`/dashboard/cars/edit/features`);

			return { success: true, data: updatedFeatures as CarFeaturesOptions };
		} else {
			// Create new features document
			const newFeatures = await saveCarFeatures(data);
			return newFeatures;
		}
	} catch (error) {
		console.error("Error updating car features:", error);
		return { success: false, error: "Failed to update car features" };
	}
}

export async function updateOwnershipDocumentation(
	data: OwnershipDocumentation & { car_id: string },
): Promise<{
	success: boolean;
	data?: OwnershipDocumentation;
	error?: string;
}> {
	try {
		// First check if ownership docs already exist for this car
		const existingDocs = await database.listDocuments(
			databaseId,
			ownershipdocumentationcollectionid,
			[Query.equal("car_id", data.car_id)],
		);

		// Remove car_id from data to match collection schema
		const { car_id, ...docData } = data;

		if (existingDocs.documents.length > 0) {
			// Update existing document
			const docId = existingDocs.documents[0].$id;
			const updatedDocs = await database.updateDocument(
				databaseId,
				ownershipdocumentationcollectionid,
				docId,
				docData,
			);

			// Revalidate paths
			revalidatePath(`/dashboard/cars/${car_id}`);
			revalidatePath(`/dashboard/cars/edit/ownership`);

			return { success: true, data: updatedDocs as OwnershipDocumentation };
		} else {
			// Create new document
			const newDocs = await saveOwnershipDocumentation(data);
			return newDocs;
		}
	} catch (error) {
		console.error("Error updating ownership documentation:", error);
		return { success: false, error: "Failed to update ownership documentation" };
	}
}

export async function updatePricingPayment(
	data: PricingPayment & { car_id: string },
): Promise<{ success: boolean; data?: PricingPayment; error?: string }> {
	try {
		// First check if pricing docs already exist for this car
		const existingPricing = await database.listDocuments(
			databaseId,
			pricingpaymentcollectionid,
			[Query.equal("car_id", data.car_id)],
		);

		// Remove car_id from data to match collection schema
		const { car_id, ...docData } = data;

		if (existingPricing.documents.length > 0) {
			// Update existing document
			const docId = existingPricing.documents[0].$id;
			const updatedPricing = await database.updateDocument(
				databaseId,
				pricingpaymentcollectionid,
				docId,
				docData,
			);

			// Revalidate paths
			revalidatePath(`/dashboard/cars/${car_id}`);
			revalidatePath(`/dashboard/cars/edit/pricing`);

			return { success: true, data: updatedPricing as PricingPayment };
		} else {
			// Create new document
			const newPricing = await savePricingPayment(data);
			return newPricing;
		}
	} catch (error) {
		console.error("Error updating pricing information:", error);
		return { success: false, error: "Failed to update pricing information" };
	}
}

export const getBigDeals = async () => {
	try {
		// Query for cars with big_deal flag set to true
		const queries = [
			Query.equal("big_deal", true),
			Query.equal("status", "published"),
			Query.equal("availability", true),
			Query.limit(6), // Limit to 6 cars for the carousel
		];

		const response = await database.listDocuments(
			databaseId,
			carinfocollectionId,
			queries,
		);

		// The car info documents already contain all the nested data we need
		// No need to fetch related entities separately
		return { success: true, data: response.documents };
	} catch (error) {
		console.error("Error fetching big deals:", error);
		return { success: false, error: "Failed to fetch big deals" };
	}
};

export async function updateCarPhotos(formData: FormData): Promise<{
	success: boolean;
	data?: { imageIds: string[] };
	error?: string;
}> {
	try {
		const car_id = formData.get("car_id") as string;

		if (!car_id) {
			return { success: false, error: "Car ID is missing" };
		}

		// Get the file entries from the formData
		const fileKeys = Array.from(formData.keys()).filter((key) =>
			key.startsWith("photo_"),
		);

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
				process.env.APPWRITE_STORAGE_BUCKET_ID!,
				ID.unique(),
				file,
			);

			// Get file URL
			const fileUrl = storage.getFileView(
				process.env.APPWRITE_STORAGE_BUCKET_ID!,
				uploadedFile.$id,
			);

			// Add the image to the car document
			const result = await database.createDocument(
				databaseId,
				"car_images", // Collection ID for car images (Adjust as needed)
				ID.unique(),
				{
					car_id,
					url: fileUrl,
					file_id: uploadedFile.$id,
					file_name: fileName,
				},
			);

			uploadedImageIds.push(result.$id);
		}

		// Revalidate the car details page
		revalidatePath(`/dashboard/cars/${car_id}`);

		return {
			success: true,
			data: { imageIds: uploadedImageIds },
		};
	} catch (error) {
		console.error("Error uploading photos:", error);
		return { success: false, error: "Failed to upload photos" };
	}
}

export async function deleteCarPhoto(
	car_id: string,
	photo_id: string,
): Promise<{ success: boolean; error?: string }> {
	try {
		// Get the photo document to get the file ID
		const photo = await database.getDocument(
			databaseId,
			"car_images", // Collection ID for car images (Adjust as needed)
			photo_id,
		);

		// Delete the file from storage
		if (photo.file_id) {
			await storage.deleteFile(
				process.env.APPWRITE_STORAGE_BUCKET_ID!,
				photo.file_id,
			);
		}

		// Delete the photo document
		await database.deleteDocument(
			databaseId,
			"car_images", // Collection ID for car images (Adjust as needed)
			photo_id,
		);

		// Revalidate the car details page
		revalidatePath(`/dashboard/cars/${car_id}`);

		return { success: true };
	} catch (error) {
		console.error("Error deleting photo:", error);
		return { success: false, error: "Failed to delete photo" };
	}
}
