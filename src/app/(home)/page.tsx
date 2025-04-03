import { HeroSection } from "@/components/hero-section";
import { TrustpilotReviews } from "@/components/trustpilot-reviews";
import { BigDeals } from "./components/big-deals";
import { BrowseSection } from "./components/browse-section";
import { HowItWorks } from "./components/how-it-works";
import { PerformanceSportsCars } from "@/components/performance-sports-cars";
import { FamilyCarsShowcase } from "@/components/family-cars-showcase";
import { EcoFriendlyShowcase } from "@/components/eco-friendly-showcase";
import { Newsletter } from "@/components/newsletter";
import { PopularBrands } from "@/components/popular-brands";
import { CustomerSuccessStories } from "@/components/customer-success-stories";
import { LuxuryCollection } from "@/components/luxury-collection";
import { CommercialVehiclesHub } from "@/components/commercial-vehicles-hub";
import { FeaturedCars } from "@/components/featured-cars";

import { getBigDeals } from "@/lib/actions";
import { getEcoFriendlyVehicles } from "@/lib/eco-friendly-action";
import { getPopularCarMakes } from "@/lib/car-makes";
import { getSuccessStoryTestimonials, getTestimonials } from "@/lib/testimonials-actions";
import { getFeaturedNewCars } from "@/lib/featured-cars-actions";
import { getCommercialVehicles, getPerformanceSportsCars } from "@/lib/homepage-actions";

export default async function Home() {
	const bigDealsResponse = await getBigDeals();
	const bigDeals = bigDealsResponse.success ? bigDealsResponse.data : [];
	const featuredBigDeal = bigDeals.length > 0 ? bigDeals[0] : null;

	const commercialVehiclesResponse = await getCommercialVehicles();
	const performanceSportsCarsResponse = await getPerformanceSportsCars();
	const commercialVehicles = commercialVehiclesResponse.success
		? commercialVehiclesResponse.data
		: [];
	const performanceSportsCars = performanceSportsCarsResponse.success
		? performanceSportsCarsResponse.data
		: [];

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

	const successStoriesResponse = await getSuccessStoryTestimonials(3);
	const successStories = successStoriesResponse.success
		? successStoriesResponse.data
		: [];

	const featuredCarsResponse = await getFeaturedNewCars(8);
	const featuredCars = featuredCarsResponse.success
		? featuredCarsResponse.data
		: [];

	return (
		<div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
			<main className="relative">
				<HeroSection bigDeal={featuredBigDeal} />
				<div className="container mx-auto px-4 space-y-24 py-16 sm:px-6 lg:px-8">
					<BrowseSection />
					<HowItWorks />
					<BigDeals deals={bigDeals} />
					
					<div className="space-y-24">
						<LuxuryCollection />
						<PerformanceSportsCars cars={performanceSportsCars} />
						<FamilyCarsShowcase />
						<EcoFriendlyShowcase cars={ecoFriendlyCars} />
					</div>

					<div className="space-y-24 bg-white -mx-4 px-4 py-24 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
						<TrustpilotReviews testimonials={testimonials} />
						<CustomerSuccessStories successStories={successStories} />
					</div>

					<div className="space-y-24">
						<CommercialVehiclesHub vehicles={commercialVehicles} />
						<PopularBrands brands={popularMakes} />
						<FeaturedCars cars={featuredCars} />
					</div>

					<Newsletter />
				</div>
			</main>
		</div>
	);
}
