import Link from "next/link";
import {
	Flag,
	Shield,
	Award,
	ThumbsUp,
	MapPin,
	Calendar,
	Clock,
	Tag,
	Truck,
	ChevronRight,
	ArrowRight,
	PenSquare,
} from "lucide-react";
import { ImageGallery } from "@/components/car-details/image-gallery";
import { DealerInfo } from "@/components/car-details/dealer-info";
import { ActionButtons } from "@/components/car-details/action-buttons";
import { PriceInfo } from "@/components/car-details/price-info";
import { KeyInformation } from "@/components/car-details/key-information";
import { StatsPerformance } from "@/components/car-details/stats-performance";
import { EnhancedFeaturesSection } from "@/components/car-details/enhanced-features-section";
import { ShareButtons } from "@/components/car-details/share-buttons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { getReviewStatsForCar } from "@/lib/review-actions";
import { ReviewStatsComponent } from "@/components/reviews/review-stats";
import MobileDealerInfo from "./mobile-dealer-info";

export async function CarDetailsView({ car }: { car: any }) {
	// Extract car details
	const carTitle =
		car.title ||
		`${car.car_make?.name || ""} ${car.car_model || ""} (${car.year || ""})`;
	const carDescription = car.description || "";
	const carImages = car.images || [];
	const carCondition = car.condition || "Used";
	const carId = car.$id || "CAR12345";

	// Extract pricing information
	const pricing = car.pricing_payments || {};
	const price = pricing.selling_price
		? formatCurrency(pricing.selling_price, pricing.currency || "KES")
		: "Price on request";
	const isNegotiable = pricing.negotiable === "yes";

	// Extract specifications
	const specs = car.car_specifications || {};

	// Add this near the top of the component, after extracting car details
	const reviewStatsResponse = await getReviewStatsForCar(car.$id);
	const reviewStats = reviewStatsResponse.success
		? reviewStatsResponse.data
		: {
				averageRating: 0,
				totalReviews: 0,
				ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
				recommendPercentage: 0,
		  };

	// Create key information object
	const keyInfo = {
		year: car.year || "N/A",
		mileage: specs.mileage
			? `${specs.mileage} ${specs.mileage_unit || "km"}`
			: "N/A",
		engineSize: specs.engine_capacity ? `${specs.engine_capacity} cc` : "N/A",
		enginePower: specs.engine_power ? `${specs.engine_power} kW` : "N/A",
		transmission: specs.transmission_type
			? specs.transmission_type.charAt(0).toUpperCase() +
			  specs.transmission_type.slice(1)
			: "N/A",
		fuel: specs.fuel_type
			? specs.fuel_type.charAt(0).toUpperCase() + specs.fuel_type.slice(1)
			: "N/A",
		doors: specs.doors?.toString() || "N/A",
		seats: specs.seats?.toString() || "N/A",
		colour: car.color?.name || "N/A",
		registration: car.ownership_documentation?.registration_number || "N/A",
		previousOwners:
			car.ownership_documentation?.previous_owners?.toString() || "N/A",
	};

	// Create stats performance object
	const statsPerf = {
		co2: specs.co2_emissions ? `${specs.co2_emissions} g/km` : "N/A",
		emissionsStandard: "Euro 6",
		insuranceGroup: pricing.insurance_group || "N/A",
		acceleration: specs.acceleration ? `${specs.acceleration}s` : "N/A",
		topSpeed: specs.top_speed ? `${specs.top_speed} mph` : "N/A",
		avgMpg: specs.fuel_economy ? `${specs.fuel_economy} mpg` : "N/A",
		bootSeatsUp: specs.boot_space || "N/A",
		bootSeatsDown: "N/A",
		safetyRating: specs.safety_rating || 5,
	};

	// Mock dealer info for now
	const dealer = {
		name: "Kashi & Karz Motors",
		company: "Premium Auto Dealer",
		isOnline: true,
		distance: "5 miles away",
		reviews: "4.8 (120 reviews)",
		avatar: "/placeholder.svg?height=40&width=40",
	};

	// Page URL and title for sharing
	const pageUrl = `https://kashiandkarz.com/car/${car.slug}`;

	// Car highlights
	const highlights = [
		{
			icon: <Shield className="h-5 w-5 text-blue-500" />,
			text: "Fully inspected",
		},
		{
			icon: <Award className="h-5 w-5 text-amber-500" />,
			text: "Premium condition",
		},
		{
			icon: <ThumbsUp className="h-5 w-5 text-green-500" />,
			text: "Highly rated seller",
		},
		{
			icon: <Calendar className="h-5 w-5 text-purple-500" />,
			text: `${car.year} model`,
		},
	];

	// Warranty information
	const hasWarranty = pricing.warranty && pricing.warranty !== "N/A";
	const dealerId = car?.user?.$id;
	const dealerName = car?.business?.name;
	const dealerPhone = car?.business?.phone;
	const dealerLocation = car?.business?.address;

	return (
		<div className="min-h-screen pb-[120px] md:pb-8">
			<div className="container mx-auto px-4 py-8">
				{/* Breadcrumb */}
				<div className="mb-6 flex items-center justify-between">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Link href="/" className="hover:text-primary">
							Home
						</Link>
						<span>/</span>
						<Link href="/cars" className="hover:text-primary">
							Cars
						</Link>
						<span>/</span>
						<span>{carTitle}</span>
					</div>
					<ShareButtons title={carTitle} url={pageUrl} />
				</div>

				{/* Car Title and Highlights */}
				<div className="mb-6">
					<div className="flex flex-wrap items-center gap-2 mb-2">
						<Badge
							variant="secondary"
							className="bg-[#00e1e1]/10 text-[#00e1e1] font-medium"
						>
							{carCondition}
						</Badge>
						{car.big_deal && (
							<Badge
								variant="secondary"
								className="bg-amber-100 text-amber-800 font-medium"
							>
								Big Deal
							</Badge>
						)}
						{car.featured && (
							<Badge
								variant="secondary"
								className="bg-purple-100 text-purple-800 font-medium"
							>
								Featured
							</Badge>
						)}
						<Badge variant="outline" className="ml-auto">
							ID: {carId}
						</Badge>
					</div>
					<h1 className="text-2xl font-bold md:text-3xl">{carTitle}</h1>
					<p className="text-lg text-muted-foreground">{car.car_model || ""}</p>

					<div className="mt-4 flex flex-wrap gap-4">
						{highlights.map((highlight, index) => (
							<div key={index} className="flex items-center gap-1.5 text-sm">
								{highlight.icon}
								<span>{highlight.text}</span>
							</div>
						))}
					</div>
				</div>

				<div className="grid gap-8 lg:grid-cols-[1fr_400px]">
					<div className="space-y-8">
						<ImageGallery images={carImages} />

						{/* Quick Overview Card */}
						<Card className="overflow-hidden border-none shadow-sm">
							<div className="bg-gradient-to-r from-[#00e1e1]/10 to-[#00e1e1]/5 px-6 py-3">
								<h2 className="text-lg font-semibold">Quick Overview</h2>
							</div>
							<CardContent className="grid gap-6 p-6 sm:grid-cols-2 md:grid-cols-3">
								<div className="flex flex-col">
									<span className="text-sm text-muted-foreground">Make</span>
									<span className="font-medium">{car.car_make?.name || "N/A"}</span>
								</div>
								<div className="flex flex-col">
									<span className="text-sm text-muted-foreground">Model</span>
									<span className="font-medium">{car.car_model || "N/A"}</span>
								</div>
								<div className="flex flex-col">
									<span className="text-sm text-muted-foreground">Year</span>
									<span className="font-medium">{car.year || "N/A"}</span>
								</div>
								<div className="flex flex-col">
									<span className="text-sm text-muted-foreground">Mileage</span>
									<span className="font-medium">{keyInfo.mileage}</span>
								</div>
								<div className="flex flex-col">
									<span className="text-sm text-muted-foreground">Fuel Type</span>
									<span className="font-medium">{keyInfo.fuel}</span>
								</div>
								<div className="flex flex-col">
									<span className="text-sm text-muted-foreground">Transmission</span>
									<span className="font-medium">{keyInfo.transmission}</span>
								</div>
							</CardContent>
						</Card>

						<KeyInformation details={keyInfo} />
						<StatsPerformance stats={statsPerf} />
						<EnhancedFeaturesSection features={car.car_features} />

						{/* Add this section to the JSX, after the FeaturesSection component */}
						<div className="space-y-8">
							<div className="flex items-center justify-between">
								<h2 className="text-2xl font-bold">Customer Reviews</h2>
								<Button asChild>
									<Link href={`/car/${car.slug}/reviews`}>
										View all reviews
										<ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</Button>
							</div>

							<ReviewStatsComponent stats={reviewStats} />

							{reviewStats.totalReviews > 0 ? (
								<div className="mt-4 text-center">
									<Button asChild>
										<Link href={`/car/${car.slug}/write-review`}>
											<PenSquare className="mr-2 h-4 w-4" />
											Write a Review
										</Link>
									</Button>
								</div>
							) : (
								<div className="rounded-lg border bg-muted p-6 text-center">
									<p className="mb-4">
										No reviews yet. Be the first to review this car!
									</p>
									<Button asChild>
										<Link href={`/car/${car.slug}/write-review`}>
											<PenSquare className="mr-2 h-4 w-4" />
											Write a Review
										</Link>
									</Button>
								</div>
							)}
						</div>

						{/* Location and Availability */}
						<Card className="overflow-hidden border-none shadow-sm">
							<div className="bg-gradient-to-r from-gray-100 to-white px-6 py-3">
								<h2 className="text-lg font-semibold">Location & Availability</h2>
							</div>
							<CardContent className="p-6">
								<div className="flex items-start gap-4">
									<div className="rounded-full bg-gray-100 p-3">
										<MapPin className="h-6 w-6 text-gray-500" />
									</div>
									<div>
										<h3 className="font-medium">
											Kashi & Karz Motors - Nairobi Showroom
										</h3>
										<p className="text-sm text-muted-foreground">
											123 Mombasa Road, Nairobi, Kenya
										</p>
										<div className="mt-2 flex items-center gap-4 text-sm">
											<div className="flex items-center gap-1">
												<Clock className="h-4 w-4 text-muted-foreground" />
												<span>Open today: 9am - 6pm</span>
											</div>
											<div className="flex items-center gap-1">
												<Truck className="h-4 w-4 text-muted-foreground" />
												<span>Delivery available</span>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						<PriceInfo
							price={price.replace(/^KSh /, "")}
							description={carDescription}
						/>

						{/* Warranty Information */}
						{hasWarranty && (
							<Card className="overflow-hidden border-none shadow-sm">
								<div className="bg-gradient-to-r from-green-100 to-white px-6 py-3">
									<h2 className="text-lg font-semibold">Warranty</h2>
								</div>
								<CardContent className="p-6">
									<div className="flex items-start gap-4">
										<div className="rounded-full bg-green-100 p-3">
											<Shield className="h-6 w-6 text-green-600" />
										</div>
										<div>
											<h3 className="font-medium">Warranty Coverage</h3>
											<p className="text-sm text-muted-foreground">{pricing.warranty}</p>
											<p className="mt-2 text-sm">
												This vehicle comes with a comprehensive warranty package for your
												peace of mind.
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						)}

						{/* Seller Notes */}
						<Card className="overflow-hidden border-none shadow-sm">
							<div className="bg-gradient-to-r from-gray-100 to-white px-6 py-3">
								<h2 className="text-lg font-semibold">Seller Notes</h2>
							</div>
							<CardContent className="p-6">
								<p className="text-sm leading-relaxed">
									{carDescription || "No additional notes from the seller."}
								</p>
							</CardContent>
						</Card>
					</div>

					<div className="relative hidden lg:block">
						<div className="space-y-8 sticky top-4">
							{/* Price Card */}
							<Card className="overflow-hidden border-none shadow-sm">
								<div className="bg-gradient-to-r from-[#00e1e1]/10 to-[#00e1e1]/5 px-6 py-3">
									<h2 className="text-lg font-semibold">Price</h2>
								</div>
								<CardContent className="p-6">
									<div className="mb-2 text-3xl font-bold">
										{price.replace(/^KSh /, "")}
									</div>
									{isNegotiable && (
										<Badge variant="outline" className="mb-4">
											<Tag className="mr-1 h-3 w-3" /> Negotiable
										</Badge>
									)}
									<Separator className="my-4" />
									<DealerInfo {...dealer} />
								</CardContent>
							</Card>

							<ActionButtons
								dealerId={dealerId}
								dealerName={dealerName}
								dealerPhone={dealerPhone}
								dealerLocation={dealerLocation}
								carId={carId}
								carTitle={carTitle}
							/>

							<Button
								variant="ghost"
								className="w-full justify-start text-muted-foreground"
							>
								<Flag className="mr-2 h-4 w-4" />
								Report this listing
							</Button>

							{/* Similar Cars */}
							<Card className="overflow-hidden border-none shadow-sm">
								<div className="bg-gradient-to-r from-gray-100 to-white px-6 py-3">
									<h2 className="text-lg font-semibold">Similar Cars</h2>
								</div>
								<CardContent className="p-6">
									<div className="text-sm text-muted-foreground">
										<p>Looking for alternatives? Check out similar vehicles.</p>
										<Button variant="link" className="mt-2 p-0 h-auto text-[#00e1e1]">
											View similar cars <ChevronRight className="ml-1 h-3 w-3" />
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile dealer info and action buttons */}
			<MobileDealerInfo price={price} isNegotiable={isNegotiable} />
		</div>
	);
}
