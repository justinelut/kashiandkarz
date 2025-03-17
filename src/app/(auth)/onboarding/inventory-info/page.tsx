//inventory-info
import InventoryInfoPage from "@/components/onboarding/inventory-info";
import { getUser } from "@/lib/appwrite";
import { getBusinessProfile } from "@/lib/dealer-actions";

export default async function InventoryInfo() {
	const user = await getUser();
	const businessProfile = await getBusinessProfile(user?.$id!);
	return <InventoryInfoPage business_id={businessProfile.$id} />;
}
