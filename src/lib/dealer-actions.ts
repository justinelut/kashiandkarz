"use server";

import { database } from "@/lib/appwrite-config";
import { ID, Query } from "node-appwrite";
import type {
	dealer_contact_info,
	dealer_inventory_info,
	dealer_preferences,
	dealer_profile,
	DealerBasicInfo,
} from "@/types/dealer";
import {
	businesscollectionid,
	databaseId,
	usercollectionid,
} from "./constants";
import { getUser } from "./appwrite";

const database_id = process.env.APPWRITE_DATABASE_ID!;
const dealer_collection_id = "dealers"; // Replace with your actual collection ID

// Get dealer profile
export async function getDealerProfile(
	user_id: string,
): Promise<dealer_profile | null> {
	try {
		const response = await database.listDocuments(database_id, usercollectionid, [
			Query.equal("user_id", user_id),
		]);

		if (response.documents.length === 0) {
			return null;
		}

		return response.documents[0] as unknown as dealer_profile;
	} catch (error) {
		console.error("Error fetching dealer profile:", error);
		throw new Error("Failed to fetch dealer profile");
	}
}

// Save basic info
export async function saveDealerBasicInfo(
	user_id: string,
	data: DealerBasicInfo,
): Promise<DealerBasicInfo> {
	try {
		const response = await database.createDocument(
			databaseId,
			businesscollectionid,
			ID.unique(),
			{
				...data,
				user: user_id,
			},
		);
		return response as unknown as DealerBasicInfo;
	} catch (error) {
		console.error("Error saving dealer basic info:", error);
		throw new Error("Failed to save dealer basic info");
	}
}

// Save contact info
export async function save_dealer_contact_info(
	user_id: string,
	data: dealer_contact_info,
): Promise<dealer_contact_info> {
	try {
		const existing_profile = await get_dealer_profile(user_id);

		if (!existing_profile) {
			throw new Error("Please complete the basic information first");
		}

		const response = await database.updateDocument(
			database_id,
			dealer_collection_id,
			existing_profile.$id,
			{
				...data,
				updated_at: new Date().toISOString(),
			},
		);
		return response as unknown as dealer_contact_info;
	} catch (error) {
		console.error("Error saving dealer contact info:", error);
		throw new Error("Failed to save dealer contact info");
	}
}

// Save inventory info
export async function save_dealer_inventory_info(
	user_id: string,
	data: dealer_inventory_info,
): Promise<dealer_inventory_info> {
	try {
		const existing_profile = await get_dealer_profile(user_id);

		if (!existing_profile) {
			throw new Error("Please complete the previous steps first");
		}

		const response = await database.updateDocument(
			database_id,
			dealer_collection_id,
			existing_profile.$id,
			{
				...data,
				updated_at: new Date().toISOString(),
			},
		);
		return response as unknown as dealer_inventory_info;
	} catch (error) {
		console.error("Error saving dealer inventory info:", error);
		throw new Error("Failed to save dealer inventory info");
	}
}

// Save preferences and complete onboarding
export async function save_dealer_preferences(
	user_id: string,
	data: dealer_preferences,
): Promise<dealer_preferences> {
	try {
		const existing_profile = await get_dealer_profile(user_id);

		if (!existing_profile) {
			throw new Error("Please complete the previous steps first");
		}

		const response = await database.updateDocument(
			database_id,
			dealer_collection_id,
			existing_profile.$id,
			{
				...data,
				onboarding_completed: true,
				updated_at: new Date().toISOString(),
			},
		);
		return response as unknown as dealer_preferences;
	} catch (error) {
		console.error("Error saving dealer preferences:", error);
		throw new Error("Failed to save dealer preferences");
	}
}

//get business profile
export async function getBusinessProfile(
	user_id: string,
): Promise<dealer_profile | null> {
	try {
		const response = await database.listDocuments(
			database_id,
			businesscollectionid,
			[Query.equal("user", user_id)],
		);

		if (response.documents.length === 0) {
			return null;
		}

		return response.documents[0] as unknown as dealer_profile;
	} catch (error) {
		console.error("Error fetching business profile:", error);
		throw new Error("Failed to fetch business profile");
	}
}

//check for business profile completness and user account status
export async function checkBusinessProfile() {
	const user = await getUser();
	const businessProfile = await getBusinessProfile(user.$id);
	if (
		user?.status !== "approved" &&
		businessProfile?.onboarding_completed !== true
	) {
		return { account: false, business: false };
	} else if (user?.status !== "approved") {
		return { account: false, business: !!businessProfile };
	} else if (businessProfile?.onboarding_completed !== true) {
		return { account: !!user, business: false };
	}
	return { account: !!user, business: !!businessProfile };
}
