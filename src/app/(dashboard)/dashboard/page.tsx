import { getUser } from "@/lib/appwrite";
import { getBusinessProfile } from "@/lib/dealer-actions";
import { redirect } from "next/navigation";

export const page = async () => {
	const user = await getUser();
	const businessProfile = await getBusinessProfile(user.$id);
	if (!businessProfile?.onboarding_completed) {
		redirect("/onboarding");
	}
	return <div></div>;
};

export default page;
