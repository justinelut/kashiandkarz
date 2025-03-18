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
import { getEcoFriendlyVehicles } from "@/lib/eco-friendly-action";
import { getPopularCarMakes } from "@/lib/car-makes";
import { PopularBrands } from "@/components/popular-brands";
import {
	getSuccessStoryTestimonials,
	getTestimonials,
} from "@/lib/testimonials-actions";
import { CustomerSuccessStories } from "@/components/customer-success-stories";
import { LuxuryCollection } from "@/components/luxury-collection";
import { BudgetFriendlyFinds } from "@/components/budget-friendly-finds";
import { CommercialVehiclesHub } from "@/components/commercial-vehicles-hub";
import { getFeaturedNewCars } from "@/lib/featured-cars-actions";
import { getBudgetFriendlyVehicles } from "@/lib/budget-friendly-actions";

export default async function Home() {
	// const allcarfeatures = await getCarFeatures();
	const bigDealsResponse = await getBigDeals();
	const bigDeals = bigDealsResponse.success ? bigDealsResponse.data : [];
	const featuredBigDeal = bigDeals.length > 0 ? bigDeals[0] : null;
	// const ecoFriendlyCarsResponse = await getEcoFriendlyCars();
	// const familyCarsResponse = await getFamilyCars();
	const commercialVehiclesResponse = await getCommercialVehicles();
	const performanceSportsCarsResponse = await getPerformanceSportsCars();
	// const budgetFriendlyFindsResponse = await getBudgetFriendlyFinds();
	// const vintageClassicCollectionResponse = await getVintageClassicCollection();

	// const ecoFriendlyCars = ecoFriendlyCarsResponse.success
	// 	? ecoFriendlyCarsResponse.data
	// 	: [];
	// const familyCars = familyCarsResponse.success ? familyCarsResponse.data : [];
	const commercialVehicles = commercialVehiclesResponse.success
		? commercialVehiclesResponse.data
		: [];
	const performanceSportsCars = performanceSportsCarsResponse.success
		? performanceSportsCarsResponse.data
		: [];
	// const budgetFriendlyFinds = budgetFriendlyFindsResponse.success
	// 	? budgetFriendlyFindsResponse.data
	// 	: [];
	// const vintageClassicCollection = vintageClassicCollectionResponse.success
	// 	? vintageClassicCollectionResponse.data
	// 	: [];

	const ecoFriendlyResponse = await getEcoFriendlyVehicles(4);
	const ecoFriendlyCars = ecoFriendlyResponse.success
		? ecoFriendlyResponse.data
		: [];

	const popularMakesResponse = await getPopularCarMakes();
	const popularMakes = popularMakesResponse.success
		? popularMakesResponse.data
		: [];

	const testimonialsResponse = await getTestimonials(5);
	const testimonials = testimonialsResponse.success
		? testimonialsResponse.data
		: [];

	// Fetch success story testimonials for CustomerSuccessStories
	const successStoriesResponse = await getSuccessStoryTestimonials(3);
	const successStories = successStoriesResponse.success
		? successStoriesResponse.data
		: [];

	const featuredCarsResponse = await getFeaturedNewCars(8);
	const featuredCars = featuredCarsResponse.success
		? featuredCarsResponse.data
		: [];

// 		const budgetFriendlyResponse = await getBudgetFriendlyVehicles(6)
//   const budgetFriendlyCars = budgetFriendlyResponse.success ? budgetFriendlyResponse.data : []

	return (
		<div>
			<main className="flex-1 pt-20">
				<HeroSection bigDeal={featuredBigDeal} />
				<CarSearch />
				<div className="container mx-auto py-10">
					<BrowseSection />
					<HowItWorks />
					<BigDeals deals={bigDeals} />
				</div>
				<LuxuryCollection />
				<PerformanceSportsCars cars={performanceSportsCars} />
				<FamilyCarsShowcase />
				<EcoFriendlyShowcase cars={ecoFriendlyCars} />
				<TrustpilotReviews testimonials={testimonials} />
				<CustomerSuccessStories successStories={successStories} />
				{/* <BudgetFriendlyFinds cars={budgetFriendlyCars} /> */}
				<CommercialVehiclesHub vehicles={commercialVehicles} />
				<PopularBrands brands={popularMakes} />
				
				<FeaturedCars cars={featuredCars} />
				<Newsletter />
				<FeaturedCars />
			</main>
		</div>
	);
}
