import { getUser } from "@/lib/appwrite";
import { getBusinessProfile } from "@/lib/dealer-actions";
import { redirect } from "next/navigation";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";

export const page = async () => {
	const user = await getUser();
	const businessProfile = await getBusinessProfile(user.$id);
	if (!businessProfile?.onboarding_completed) {
		redirect("/onboarding");
	}
	return <div className="px-10 py-10"><DashboardOverview /></div>;
};

export default page;
