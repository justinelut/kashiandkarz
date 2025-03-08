"use server";
import { revalidatePath } from "next/cache";
import { Databases, ID, Client, Query, Storage } from "node-appwrite";

// Initialize Appwrite client
const client = new Client()
	.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
	.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
	.setKey(process.env.APPWRITE_API_KEY!); // Use server-side API key

const database = new Databases(client);
const storage = new Storage(client);

interface CarMake {
	name: string;
	slug: string;
	image: string;
}

interface BasicCarInfo {
	car_make: string;
	car_model: string;
	year: string;
	vehicle_type: string;
	condition: string;
	description: string;
	title: string;
}

interface CarSpecifications {
	fuel_type: string;
	transmission_type: string;
	drivetrain: string;
	engine_capacity: string;
	horsepower: string;
	torque: string;
	mileage?: string;
	mileage_unit: "km" | "miles";
	color?: string;
}

interface CarFeatures {
	exterior_features?: string[];
	interior_features?: string[];
	safety_features?: string[];
}

interface OwnershipDocumentation {
	vin?: string;
	registration_number: string;
	logbook_availability: "yes" | "no";
	previous_owners: string;
	insurance_status: "valid" | "expired" | "none";
}

interface PhotoVideo {
	images?: string[];
	video?: string;
}

interface PricingPayment {
	selling_price: string;
	currency: string;
	negotiable: "yes" | "no";
	installment_plans: "yes" | "no";
	payment_methods: string[];
}

interface ReviewSubmit {
	status: "published" | "draft";
	availability: boolean;
	slug: string;
}
interface UpdateStatus {
	status: "published" | "draft";
	availability: boolean;
	slug: string;
	featured: string;
}

interface CarInformation {
	// Basic Info
	car_id: string;
	make: string;
	model: string;
	year: number;
	mileage: number;
	color: string;

	transmission: string;
	fuel_type: string;
	condition: string;
	description: string;

	// Features
	exterior_features: string[];
	interior_features: string[];
	safety_features: string[];

	vin?: string;
	registration_number: string;
	logbook_availability: "yes" | "no";
	previous_owners: string;
	insurance_status: "valid" | "expired" | "none";

	// Pricing
	selling_price: string;
	currency: string;
	negotiable: "yes" | "no";
	installment_plans: "yes" | "no";
	payment_methods: string[];

	// Photos & Video
	images: string[];
	video?: string;

	// Status
	status: "draft" | "published";
	availability: boolean;
}

const databaseId = process.env.APPWRITE_DATABASE_ID as string;
const carmakecollectionsId = "67c72fe00000db170b7b";
const carinfocollectionId = "67c731e80028573f6eaf";
const exteriorFeatureCollectionId = "67c840c7003442c3231a";
const interiorFeatureCollectionId = "67c840e000034786123d";
const safetyFeatureCollectionId = "67c840ee000d9d33ac5f";
const colorscollectionid = "67c86a92000277171665";

export async function saveCarMake(data: CarMake) {
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
	console.log(search)
	console.log(cursor)
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

export async function saveBasicCarInfo(data: BasicCarInfo) {
	try {
		const carInfo = await database.createDocument(
			databaseId,
			carinfocollectionId,
			ID.unique(),
			data,
		);
		revalidatePath("/dashboard/cars/new");
		return { success: true, carId: carInfo.$id };
	} catch (error) {
		console.error("Error saving car info:", error);
		return { success: false, error: "Failed to save car info" };
	}
}

export async function saveCarSpecifications(
	data: CarSpecifications,
	carId: string,
) {
	try {
		const specs = await database.updateDocument(
			databaseId,
			carinfocollectionId,
			carId,
			data,
		);
		revalidatePath("/dashboard/cars/new/car-specification");
		return { success: true, data: specs };
	} catch (error) {
		console.error("Error saving car specifications:", error);
		return { success: false, error: "Failed to save car specifications" };
	}
}

export async function saveCarFeatures(data: CarFeatures, carId: string) {
	try {
		const features = await database.updateDocument(
			databaseId,
			carinfocollectionId,
			carId,
			data,
		);
		revalidatePath("/dashboard/cars/new/car-features");
		return { success: true, data: features };
	} catch (error) {
		console.error("Error saving car features:", error);
		return { success: false, error: "Failed to save car features" };
	}
}

export async function saveOwnershipDocumentation(
	data: OwnershipDocumentation,
	carId: string,
) {
	try {
		const docs = await database.updateDocument(
			databaseId,
			carinfocollectionId,
			carId,
			data,
		);
		revalidatePath("/dashboard/cars/new/ownership");
		return { success: true, data: docs };
	} catch (error) {
		console.error("Error saving ownership documentation:", error);
		return { success: false, error: "Failed to save ownership documentation" };
	}
}

export async function savePricingPayment(data: PricingPayment, carId: string) {
	try {
		const pricing = await database.updateDocument(
			databaseId,
			carinfocollectionId,
			carId,
			data,
		);
		revalidatePath("/dashboard/cars/new/pricing");
		return { success: true, data: pricing };
	} catch (error) {
		console.error("Error saving pricing and payment options:", error);
		return {
			success: false,
			error: "Failed to save pricing and payment options",
		};
	}
}

export async function savePhotoVideo(data: PhotoVideo, carId: string) {
	try {
		// Here you would first upload the files to storage and get their IDs
		// Then save the file IDs to the car document
		const photos = await database.updateDocument(
			databaseId,
			carinfocollectionId,
			carId,
			data,
		);
		revalidatePath("/dashboard/cars/new/photos");
		return { success: true, data: photos };
	} catch (error) {
		console.error("Error saving photo and video data:", error);
		return { success: false, error: "Failed to save photo and video data" };
	}
}

const apiKey = process.env.RAPID_API_KEY as string;

//get car models
export const fetchCarModels = async (make: string, searchQuery: string) => {
	if (!apiKey) {
		throw new Error("API Key not found");
	}
	if (!make || searchQuery.length < 2) return [];

	try {
		const url = `https://car-data.p.rapidapi.com/cars?model=${searchQuery.toLowerCase()}&limit=10`;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				"x-rapidapi-key": apiKey,
				"x-rapidapi-host": "car-data.p.rapidapi.com",
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				`API Error: ${response.status} - ${errorData.message || "Unknown error"}`,
			);
		}

		const data = await response.json();

		// Remove duplicates by model name
		return Array.from(new Map(data.map((car: any) => [car.model, car])).values());
	} catch (error) {
		console.error("Error fetching car models:", error);
		return [];
	}
};

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
			colorscollectionid,
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

export async function saveReviewSubmit(
	data: ReviewSubmit,
	car_id: string,
): Promise<{ success: boolean; data: null; error?: string }> {
	try {
		const databases = new Databases(client);

		await databases.updateDocument(databaseId, carinfocollectionId, car_id, {
			status: data.status,
			availability: data.availability,
			slug: data.slug,
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
		const databases = new Databases(client);

		await databases.updateDocument(databaseId, carinfocollectionId, car_id, {
			status: data.status,
			availability: data.availability,
			slug: data.slug,
			featured: data.featured,
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

export async function getCarInformation(
	car_id: string,
): Promise<{ success: boolean; data: CarInformation | null; error?: string }> {
	try {
		const databases = new Databases(client);

		const car = await databases.getDocument(
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
			data: car as CarInformation,
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
	data: BasicCarInfo & { id: string },
): Promise<{ success: boolean; data?: BasicCarInfo; error?: string }> {
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
