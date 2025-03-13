import { Query } from "node-appwrite";
import { carmakecollectionsId, database, databaseId } from "./appwrite-config";

// Get all car makes with pagination
export const getAllCarMakes = async ({ page = 1, limit = 25, search = "" }) => {
	try {
		const queries = [];

		if (search) {
			queries.push(Query.search("name", search));
		}

		// Calculate offset for pagination
		const offset = (page - 1) * limit;
		queries.push(Query.limit(limit));
		queries.push(Query.offset(offset));

		// Order by name
		queries.push(Query.orderAsc("name"));

		const response = await database.listDocuments(
			databaseId,
			carmakecollectionsId,
			queries,
		);

		return {
			success: true,
			data: response.documents,
			pagination: {
				total: response.total,
				page,
				limit,
				totalPages: Math.ceil(response.total / limit),
			},
		};
	} catch (error) {
		console.error("Error fetching all car makes:", error);
		return { success: false, error: "Failed to fetch car makes" };
	}
};

//get all popular car makes
export const getPopularCarMakes = async () => {
	try {
		const queries = [
			Query.equal("popular", true),
			Query.limit(10), // Limit to top 10 popular makes
		];

		const response = await database.listDocuments(
			databaseId,
			carmakecollectionsId,
			queries,
		);

		return {
			success: true,
			data: response.documents,
		};
	} catch (error) {
		console.error("Error fetching popular car makes:", error);
		return { success: false, error: "Failed to fetch popular car makes" };
	}
};

//get car make by slug
export const getCarMakeBySlug = async (slug: string) => {
	try {
		// Simply fetch the car make by slug - car_info is already nested
		const makeResponse = await database.listDocuments(
			databaseId,
			carmakecollectionsId,
			[Query.equal("slug", slug), Query.limit(1)],
		);

		if (makeResponse.documents.length === 0) {
			return { success: false, error: "Car make not found" };
		}

		return { success: true, data: makeResponse.documents[0] };
	} catch (error) {
		console.error("Error fetching car make by slug:", error);
		return { success: false, error: "Failed to fetch car make" };
	}
};
