import { HeroSection } from "@/components/hero-section";
import { TrustpilotReviews } from "@/components/trustpilot-reviews";
import { CarSearch } from "@/components/car-search";
import { FeaturedCars } from "@/components/featured-cars";
import { getBigDeals, getCarFeatures } from "@/lib/actions";
import { BigDeals } from "./components/big-deals";
import { BrowseSection } from "./components/browse-section";
import { HowItWorks } from "./components/how-it-works";
import { PerformanceSportsCars } from "@/components/performance-sports-cars";

import {
	getEcoFriendlyCars,
	getFamilyCars,
	getCommercialVehicles,
	getPerformanceSportsCars,
	getBudgetFriendlyFinds,
	getVintageClassicCollection,
} from "@/lib/homepage-actions";
import { FamilyCarsShowcase } from "@/components/family-cars-showcase";
import { EcoFriendlyShowcase } from "@/components/eco-friendly-showcase";
import { Newsletter } from "@/components/newsletter";

export default async function Home() {
	const allcarfeatures = await getCarFeatures();
	const bigDealsResponse = await getBigDeals();
	const bigDeals = bigDealsResponse.success ? bigDealsResponse.data : [];
	const featuredBigDeal = bigDeals.length > 0 ? bigDeals[0] : null;
	const ecoFriendlyCarsResponse = await getEcoFriendlyCars();
	const familyCarsResponse = await getFamilyCars();
	const commercialVehiclesResponse = await getCommercialVehicles();
	const performanceSportsCarsResponse = await getPerformanceSportsCars();
	const budgetFriendlyFindsResponse = await getBudgetFriendlyFinds();
	const vintageClassicCollectionResponse = await getVintageClassicCollection();

	const ecoFriendlyCars = ecoFriendlyCarsResponse.success
		? ecoFriendlyCarsResponse.data
		: [];
	const familyCars = familyCarsResponse.success ? familyCarsResponse.data : [];
	const commercialVehicles = commercialVehiclesResponse.success
		? commercialVehiclesResponse.data
		: [];
	const performanceSportsCars = performanceSportsCarsResponse.success
		? performanceSportsCarsResponse.data
		: [];
	const budgetFriendlyFinds = budgetFriendlyFindsResponse.success
		? budgetFriendlyFindsResponse.data
		: [];
	const vintageClassicCollection = vintageClassicCollectionResponse.success
		? vintageClassicCollectionResponse.data
		: [];

	return (
		<div>
			<main className="flex-1 pt-20">
				<HeroSection bigDeal={featuredBigDeal} />

				<CarSearch />

				<div className="container mx-auto py-10">
					<BrowseSection />
					<HowItWorks />
					<BigDeals deals={bigDeals} />

					<TrustpilotReviews />
				</div>

				<PerformanceSportsCars cars={performanceSportsCars} />
				<FamilyCarsShowcase />
				
        <EcoFriendlyShowcase />
        {/* <BudgetFriendlyFinds />
        <CommercialVehiclesHub />
        <VintageClassicCollection />
        <PopularBrands />
        <CarComparisonTool />
        <CustomerSuccessStories />
        <AutomotiveLifestyleHub /> */}
        <TrustpilotReviews />
       
        <FeaturedCars />

        <Newsletter />

				
				<FeaturedCars />
			</main>
		</div>
	);
}
