import { HeroSection } from "@/components/hero-section";
import { TrustpilotReviews } from "@/components/trustpilot-reviews";
import { CarSearch } from "@/components/car-search";
import { FeaturedCars } from "@/components/featured-cars";
import { getBigDeals, getCarFeatures } from "@/lib/actions";
import { BigDeals } from "./components/big-deals";
import { BrowseSection } from "./components/browse-section";
import { HowItWorks } from "./components/how-it-works";

export default async function Home() {
	const allcarfeatures = await getCarFeatures();
	const bigDealsResponse = await getBigDeals();
	const bigDeals = bigDealsResponse.success ? bigDealsResponse.data : [];
	const featuredBigDeal = bigDeals.length > 0 ? bigDeals[0] : null;
	console.log(JSON.stringify(allcarfeatures));

	return (
		<div>
			<main className="flex-1 pt-20">
				<HeroSection bigDeal={featuredBigDeal} />

				<div className="container mx-auto py-10">
					<BrowseSection />
					<HowItWorks />
					<BigDeals deals={bigDeals} />
					<TrustpilotReviews />
				</div>

				<CarSearch />
				<FeaturedCars />
			</main>
		</div>
	);
}
