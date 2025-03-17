import DealerPreferencesPage from "@/components/onboarding/dealer-preference";
import { getUser } from "@/lib/appwrite";
import { getBusinessProfile } from "@/lib/dealer-actions";

//dealer preferences page
export default async function DealerPreferences() {
	const user = await getUser();
	const businessProfile = await getBusinessProfile(user?.$id!);
	return <DealerPreferencesPage business_id={businessProfile?.$id as string} />;
}
