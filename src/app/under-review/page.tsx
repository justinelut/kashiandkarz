// under review component

import UnderReview from "@/components/under-review/under-review";
import { checkBusinessProfile } from "@/lib/dealer-actions";

export default async function UnderReviewPage() {
	const { account, business } = await checkBusinessProfile();

	return <UnderReview account={account} business={business} />;
}
