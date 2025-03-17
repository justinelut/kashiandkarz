"use server";

import { database } from "@/lib/appwrite-config";
import { ID, Query } from "node-appwrite";
import type {
	DealerInventoryInfo,
	DealerPreferences,
	dealer_profile,
	DealerBasicInfo,
	DealerContactInfo,
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
export async function saveDealerContactInfo(
	business_id: string,
	data: DealerContactInfo,
): Promise<DealerContactInfo> {
	try {
		const response = await database.updateDocument(
			database_id,
			businesscollectionid,
			business_id,
			{
				...data,
			},
		);
		return response as unknown as DealerContactInfo;
	} catch (error) {
		console.error("Error saving dealer contact info:", error);
		throw new Error("Failed to save dealer contact info");
	}
}

// Save inventory info
export async function SaveDealerInventoryInfo(
	business_id: string,
	data: DealerInventoryInfo,
): Promise<DealerInventoryInfo> {
	try {
		const response = await database.updateDocument(
			databaseId,
			businesscollectionid,
			business_id,
			{
				...data,
			},
		);
		return response as unknown as DealerInventoryInfo;
	} catch (error) {
		console.error("Error saving dealer inventory info:", error);
		throw new Error("Failed to save dealer inventory info");
	}
}

// Save preferences and complete onboarding
export async function SaveDealerPreferences(
	business_id: string,
	data: DealerPreferences,
): Promise<DealerPreferences> {
	try {
	
		const response = await database.updateDocument(
			databaseId,
			businesscollectionid,
			business_id,
			{
				...data,
				onboarding_completed: true,
			},
		);
		return response as unknown as DealerPreferences;
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
		return { account: false, business: false, businessProfile };
	} else if (user?.status !== "approved") {
		return { account: false, business: !!businessProfile, businessProfile };
	} else if (businessProfile?.onboarding_completed !== true) {
		return { account: !!user, business: false, businessProfile };
	}
	return { account: !!user, business: !!businessProfile, businessProfile };
}
