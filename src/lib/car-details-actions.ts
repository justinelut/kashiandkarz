import { database } from "@/lib/appwrite-config";
import { Query } from "node-appwrite";
import { carinfocollectionId, databaseId } from "./constants";

export const getCarBySlug = async (slug: string) => {
	try {
		// Query for car with the given slug
		const queries = [Query.equal("slug", slug), Query.limit(1)];

		const response = await database.listDocuments(
			databaseId,
			carinfocollectionId,
			queries,
		);

		if (response.documents.length === 0) {
			return { success: false, error: "Car not found" };
		}

		// Return the first (and should be only) result
		return { success: true, data: response.documents[0] };
	} catch (error) {
		console.error("Error fetching car by slug:", error);
		return { success: false, error: "Failed to fetch car details" };
	}
};
