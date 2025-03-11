"use server";
import { CarFeaturesOptions, CarInfo, CarSpecifications, OwnershipDocumentation, PhotoVideo, PricingPayment } from "@/types/types";
import { revalidatePath } from "next/cache";
import { Databases, ID, Client, Query, Storage } from "node-appwrite";

// Initialize Appwrite client
const client = new Client()
	.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
	.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
	.setKey(process.env.APPWRITE_API_KEY!); // Use server-side API key

const database = new Databases(client);
const storage = new Storage(client);
const databaseId = process.env.APPWRITE_DATABASE_ID as string;

const carinfocollectionId = "67cf10af003268a33d9f"; //step one create basic deatails, also this is the main collection which we will be updating with other collections ids using relationships
const specificcarfeaturescollectionid = "67cf1666001ed0b21def"; //in relation to the cainfocollection
const carspecificationscollectionid = "67cf13670024a02affcb"; //in relation to the cainfocollection
const ownershipdocumentationcollectionid = "67cf18060032a0e926cd"; //in relation to the cainfocollection
const pricingpaymentcollectionid = "67cf18f100055d893194"; //in relation to the cainfocollection

//the below collections should only be used for fetching data not creating
const allcarfeaturescollectionid = "67cee7db000302166d7b";
const carcolorscollectionid = "67c86a92000277171665";
const carTypeCollectionId = "67cee30c001fd65329ac";
const carmakecollectionsId = "67c72fe00000db170b7b";

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

export async function saveOwnershipDocumentation(
	data: OwnershipDocumentation,
) {
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
	console.log(data)
	console.log(carId)
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


export async function updateCarInfo(data: CarInfo, carId:string) {
	const databases = new Databases(client);
	try {
		const carInfo = await databases.updateDocument(databaseId, carinfocollectionId, carId, data);
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

export async function getSingleCarInfo(
	car_id: string,
): Promise<{ success: boolean; data: CarInfo | null; error?: string }> {
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
