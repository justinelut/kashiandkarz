"use client";

import Image from "next/image";
import { Flame, ArrowRight, Tag, Percent } from "lucide-react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

interface BigDealsProps {
	deals: any[];
}

export function BigDeals({ deals = [] }: BigDealsProps) {
	// If no deals are provided, use fallback data
	const hasDeals = deals && deals.length > 0;

	return (
		<section className="py-12 bg-gradient-to-b from-white to-gray-50">
			<div className="container px-4 md:px-6">
				<div className="flex items-center gap-3 mb-8">
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00e1e1]/10">
						<Flame className="h-6 w-6 text-[#00e1e1]" />
					</div>
					<div>
						<h2 className="text-2xl font-bold">Big deals on wheels</h2>
						<p className="text-muted-foreground">
							Say hello to the hottest deals on the market
						</p>
					</div>
				</div>

				<Carousel
					opts={{
						align: "start",
						loop: true,
					}}
					className="w-full"
				>
					<CarouselContent>
						{hasDeals
							? deals.map((deal) => {
									// Extract pricing information
									const pricing = deal.pricing_payments || {};
									const price = pricing.selling_price;
									const currency = pricing.currency || "£";
									const formattedPrice = formatCurrency(price, currency);
									const installmentAvailable = pricing.installment_plans === "yes";
									const negotiable = pricing.negotiable === "yes";

									return (
										<CarouselItem
											key={deal.$id}
											className="md:basis-1/2 lg:basis-1/3 py-10"
										>
											<div className="relative flex flex-col rounded-xl bg-gradient-to-b from-white to-gray-50 p-6 pt-10 shadow-lg h-full border border-gray-100">
												{/* Big Deal Badge */}
												<div className="absolute -top-4 left-6 z-10">
													<div className="inline-flex items-center rounded-full bg-black px-3 py-1 text-sm text-[#00e1e1]">
														<Tag className="h-3.5 w-3.5 mr-1" />
														<span className="font-medium">Big Deal</span>
													</div>
												</div>

												{/* Car Make Logo */}
												{deal.car_make?.image && (
													<div className="absolute top-3 right-3">
														<div className="h-8 w-8 relative">
															<Image
																src={deal.car_make.image || "/placeholder.svg"}
																alt={deal.car_make.name || "Car brand"}
																width={32}
																height={32}
																className="object-contain"
															/>
														</div>
													</div>
												)}

												{/* Car Title and Description */}
												<h3 className="text-xl font-bold">{deal.title}</h3>
												<p className="text-sm text-muted-foreground">{deal.description}</p>

												{/* Car Image */}
												<div className="relative my-6 h-[200px] w-full overflow-hidden rounded-lg">
													<Image
														src={deal.images?.[0] || "/placeholder.svg?height=200&width=300"}
														alt={deal.title}
														fill
														className="object-cover"
													/>

													{/* Condition Badge */}
													<div className="absolute top-2 left-2">
														<Badge
															variant="secondary"
															className="bg-black/70 text-white hover:bg-black/80"
														>
															{deal.condition || "Used"}
														</Badge>
													</div>

													{/* Year Badge */}
													{deal.year && (
														<div className="absolute top-2 right-2">
															<Badge variant="outline" className="bg-white/80 border-0">
																{deal.year}
															</Badge>
														</div>
													)}
												</div>

												{/* Features Highlights */}
												<div className="flex flex-wrap gap-1 mb-4">
													{deal.car_specifications?.fuel_type && (
														<Badge variant="outline" className="text-xs capitalize">
															{deal.car_specifications.fuel_type}
														</Badge>
													)}
													{deal.car_specifications?.transmission_type && (
														<Badge variant="outline" className="text-xs capitalize">
															{deal.car_specifications.transmission_type}
														</Badge>
													)}
													{deal.car_specifications?.mileage && (
														<Badge variant="outline" className="text-xs">
															{deal.car_specifications.mileage}{" "}
															{deal.car_specifications.mileage_unit || "km"}
														</Badge>
													)}
												</div>

												{/* Pricing and Action */}
												<div className="mt-auto flex items-center justify-between">
													<div>
														<div className="text-sm text-muted-foreground">Price</div>
														<div className="text-lg font-bold flex items-center">
															{formattedPrice}
															{negotiable && (
																<Percent className="h-3.5 w-3.5 ml-1 text-[#00e1e1]" />
															)}
														</div>
													</div>

													{installmentAvailable && (
														<div>
															<div className="text-sm text-muted-foreground">Installment</div>
															<div className="text-lg font-bold">Available</div>
														</div>
													)}

													<Button
														size="icon"
														className="rounded-full bg-black hover:bg-black/90"
														aria-label={`View details for ${deal.title}`}
													>
														<Link href={`/car/${deal.slug}`}>
															<ArrowRight className="h-4 w-4" />
														</Link>
													</Button>
												</div>
											</div>
										</CarouselItem>
									);
							  })
							: // Fallback data if no deals are provided
							  Array(3)
									.fill(0)
									.map((_, index) => (
										<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
											<div className="relative flex flex-col rounded-xl bg-gradient-to-b from-white to-gray-50 p-6 pt-10 shadow-lg h-full">
												<div className="absolute -top-4 left-6 z-10">
													<div className="inline-flex items-center rounded-full bg-black px-3 py-1 text-sm text-[#00e1e1]">
														<Tag className="h-3.5 w-3.5 mr-1" />
														<span className="font-medium">Big Deal</span>
													</div>
												</div>
												<h3 className="text-xl font-bold">Loading...</h3>
												<p className="text-sm text-muted-foreground">
													Please wait while we fetch the latest deals
												</p>
												<div className="relative my-6 h-[200px] w-full overflow-hidden rounded-lg bg-gray-200 animate-pulse" />
												<div className="mt-auto flex items-center justify-between">
													<div>
														<div className="text-sm text-muted-foreground">Price</div>
														<div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
													</div>
													<Button
														size="icon"
														className="rounded-full bg-black/70 hover:bg-black/90"
													>
														<ArrowRight className="h-4 w-4" />
													</Button>
												</div>
											</div>
										</CarouselItem>
									))}
					</CarouselContent>
					<CarouselPrevious className="absolute -left-4 top-1/2 z-10" />
					<CarouselNext className="absolute -right-4 top-1/2 z-10" />
				</Carousel>
			</div>
		</section>
	);
}
