"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
	ArrowRight,
	Star,
	Loader2,
	BadgeCheck,
	Calendar,
	ChevronLeft,
	ChevronRight,
	MousePointer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedLuxuryCars } from "@/lib/luxury-car-actions";

const formatPrice = (price: number) => {
	return new Intl.NumberFormat("en-GB", {
		style: "currency",
		currency: "KES",
		maximumFractionDigits: 0,
	}).format(price);
};

const extractFeatures = (car: any) => {
	const features = [];
	if (car.car_specifications) {
		const specs = car.car_specifications;
		if (specs.horse_power) features.push(`${specs.horse_power} bhp`);
		if (specs.acceleration) features.push(`${specs.acceleration}s 0-62mph`);
		if (specs.top_speed) features.push(`${specs.top_speed} mph top speed`);
		if (specs.transmission_type) {
			features.push(
				specs.transmission_type === "automatic"
					? "Automatic gearbox"
					: "Manual gearbox",
			);
		} else if (specs.engine_capacity) {
			features.push(`${specs.engine_capacity} engine`);
		} else if (specs.fuel_type) {
			features.push(
				specs.fuel_type.charAt(0).toUpperCase() + specs.fuel_type.slice(1),
			);
		}
	}
	while (features.length < 4) {
		features.push("Premium feature");
	}
	return features.slice(0, 4);
};

export function LuxuryCollection() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [width, setWidth] = useState(0);
	const carousel = useRef<HTMLDivElement>(null);
	const [isHovered, setIsHovered] = useState(false);

	const { data, isLoading, isError } = useQuery({
		queryKey: ["luxuryCars"],
		queryFn: async () => {
			const response = await getFeaturedLuxuryCars(4);
			if (!response.success) {
				throw new Error(response.error || "Failed to fetch luxury cars");
			}
			return response.data;
		},
	});

	useEffect(() => {
		if (carousel.current) {
			setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
		}
	}, [data]);

	const handleNext = () => {
		if (!data) return;
		setActiveIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
	};

	const handlePrev = () => {
		if (!data) return;
		setActiveIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
	};

	if (isLoading) {
		return (
			<section className="py-24 bg-gradient-to-b from-[#1c1c1c] to-[#121212] text-white overflow-hidden">
				<div className="container px-4 md:px-6 mx-auto max-w-7xl">
					<div className="mb-12 text-center md:text-left">
						<h2 className="text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
							Luxury Collection
						</h2>
						<p className="text-white/70 max-w-2xl mx-auto md:mx-0 text-lg">
							Discover our handpicked selection of the world's most prestigious and
							high-performance vehicles.
						</p>
					</div>
					<div className="flex items-center justify-center h-96">
						<Loader2 className="h-12 w-12 animate-spin text-primary" />
					</div>
				</div>
			</section>
		);
	}

	if (isError || !data || data.length === 0) {
		return (
			<section className="py-24 bg-gradient-to-b from-[#1c1c1c] to-[#121212] text-white overflow-hidden">
				<div className="container px-4 md:px-6 mx-auto max-w-7xl">
					<div className="mb-12 text-center md:text-left">
						<h2 className="text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
							Luxury Collection
						</h2>
						<p className="text-white/70 max-w-2xl mx-auto md:mx-0 text-lg">
							Discover our handpicked selection of the world's most prestigious and
							high-performance vehicles.
						</p>
					</div>
					<div className="flex flex-col items-center justify-center h-96 text-center">
						<p className="text-xl mb-4">Our luxury collection is being updated.</p>
						<p className="text-white/70">
							Please check back soon to see our premium vehicles.
						</p>
					</div>
				</div>
			</section>
		);
	}

	const luxuryCars = data;
	const activeCar = luxuryCars[activeIndex];

	const carMake = activeCar.car_make?.name || "Premium";
	const carModel = activeCar.car_model || "Luxury Vehicle";
	const carPrice = activeCar.pricing_payments?.selling_price
		? formatPrice(activeCar.pricing_payments.selling_price)
		: "Price on request";
	const carDescription =
		activeCar.description ||
		"Exclusive luxury vehicle with premium features and exceptional performance.";
	const carFeatures = extractFeatures(activeCar);
	const carImage =
		activeCar.images && activeCar.images.length > 0
			? activeCar.images[0]
			: "/placeholder.svg?height=600&width=800";
	const carSlug = activeCar.slug || "";
	const isBigDeal = activeCar.big_deal || false;

	return (
		<section className="py-8 md:py-20 bg-gradient-to-b from-[#101010] via-[#1c1c1c] to-[#121212] text-white overflow-hidden">
			<div className="container px-4 md:px-6 mx-auto max-w-7xl">
				<div className="mb-16 text-center md:text-left">
					<div className="inline-block mb-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
						Exclusive Collection
					</div>
					<h2 className="text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
						Luxury Collection
					</h2>
					<p className="text-white/70 max-w-2xl mx-auto md:mx-0 text-lg">
						Discover our handpicked selection of the world's most prestigious and
						high-performance vehicles.
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-16 items-center">
					<div className="space-y-8 order-2 lg:order-1">
						<motion.div
							className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							onHoverStart={() => setIsHovered(true)}
							onHoverEnd={() => setIsHovered(false)}
						>
							<Image
								src={carImage || "/placeholder.svg"}
								alt={`${carMake} ${carModel}`}
								fill
								className="object-cover transition-transform duration-700 group-hover:scale-105"
								priority
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

							{isHovered && (
								<motion.div
									className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								>
									<Button className="bg-white text-black hover:bg-white/90 font-medium px-6">
										View Gallery
									</Button>
								</motion.div>
							)}

							{isBigDeal && (
								<div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
									<BadgeCheck className="h-4 w-4" />
									<span className="text-sm font-medium">Special Offer</span>
								</div>
							)}
						</motion.div>

						<div className="relative">
							<div className="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-hide -mx-1 px-1">
								{luxuryCars.map((car, index) => {
									const thumbImage =
										car.images?.length > 0
											? car.images[0]
											: "/placeholder.svg?height=200&width=300";
									return (
										<button
											key={car.$id}
											onClick={() => setActiveIndex(index)}
											className={`relative flex-shrink-0 w-28 h-20 rounded-xl overflow-hidden snap-start transition-all duration-300 ${
												index === activeIndex
													? "ring-2 ring-primary scale-105 shadow-xl z-10"
													: "opacity-60 hover:opacity-80 hover:scale-102"
											}`}
										>
											<Image
												src={thumbImage || "/placeholder.svg"}
												alt={`${car.car_make?.name || "Car"} ${car.car_model || "Model"}`}
												fill
												className="object-cover"
											/>
											{car.big_deal && (
												<div className="absolute bottom-1.5 right-1.5 bg-primary h-3 w-3 rounded-full shadow-glow" />
											)}
										</button>
									);
								})}
							</div>

							<div className="absolute -right-2 -left-2 top-1/2 transform -translate-y-1/2 flex justify-between pointer-events-none">
								<button
									onClick={handlePrev}
									className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center shadow-lg pointer-events-auto hover:bg-black/80 transition-colors"
								>
									<ChevronLeft className="h-5 w-5" />
								</button>
								<button
									onClick={handleNext}
									className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center shadow-lg pointer-events-auto hover:bg-black/80 transition-colors"
								>
									<ChevronRight className="h-5 w-5" />
								</button>
							</div>
						</div>
					</div>

					<motion.div
						className="space-y-8 order-1 lg:order-2"
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<div>
							<h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
								{carMake} {carModel}
							</h3>
							<div className="flex items-center gap-1.5 mt-3">
								{Array(5)
									.fill(null)
									.map((_, i) => (
										<Star
											key={i}
											className={`h-5 w-5 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
										/>
									))}
								<span className="text-white/60 text-sm ml-2">5.0 (24 reviews)</span>
							</div>
						</div>

						<div className="flex items-center gap-3">
							<p className="text-3xl font-bold">{carPrice}</p>
							{isBigDeal && (
								<Badge
									variant="outline"
									className="border-primary text-primary py-1 bg-primary/5"
								>
									Special Offer
								</Badge>
							)}
						</div>

						<div className="relative">
							<div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/80 to-primary/10 rounded-full"></div>
							<p className="text-white/80 text-lg leading-relaxed pl-6">
								{carDescription}
							</p>
						</div>

						<div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-2">
							{carFeatures.map((feature, index) => (
								<div key={index} className="flex items-center gap-3 group">
									<div className="h-2.5 w-2.5 rounded-full bg-primary group-hover:scale-125 transition-transform duration-300" />
									<span className="text-white/90">{feature}</span>
								</div>
							))}
						</div>

						<div className="pt-6 space-y-4">
							{/*							<Button
								size="lg"
								className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 hover:translate-y-[-2px]"
							>
								<Link
									href={`/car/${carSlug}`}
									className="w-full h-full flex items-center justify-center gap-2"
								>
									Book a test drive
									<Calendar className="h-4 w-4 ml-1" />
								</Link>
							</Button>
              */}
							<div className="flex flex-col md:flex-row gap-4">
								<Button
									size="lg"
									variant="outline"
									className="bg-transparent text-white border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex-1"
								>
									<Link
										href={`/car/${carSlug}`}
										className="w-full h-full flex items-center justify-center gap-2"
									>
										View details
										<ArrowRight className="h-4 w-4 ml-1" />
									</Link>
								</Button>

								<Button
									size="lg"
									variant="outline"
									className="bg-transparent text-white border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex-1"
								>
									<Link
										href={`/car/${carSlug}`}
										className="w-full h-full flex items-center justify-center gap-2"
									>
										Finance options
									</Link>
								</Button>
							</div>
						</div>
					</motion.div>
				</div>

				<div className="mt-32 relative">
					<button
						onClick={() => {
							if (carousel.current) {
								carousel.current.scrollLeft -= 440;
							}
						}}
						className="absolute -left-4 top-1/2 transform -translate-y-1/2 hidden lg:flex z-10"
					>
						<div className="bg-white/10 backdrop-blur-sm p-2 rounded-full cursor-pointer hover:bg-white/20 transition-colors">
							<ChevronLeft className="h-6 w-6" />
						</div>
					</button>

					<button
						onClick={() => {
							if (carousel.current) {
								carousel.current.scrollLeft += 440;
							}
						}}
						className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden lg:flex z-10"
					>
						<div className="bg-white/10 backdrop-blur-sm p-2 rounded-full cursor-pointer hover:bg-white/20 transition-colors">
							<ChevronRight className="h-6 w-6" />
						</div>
					</button>

					<div className="flex justify-between items-center mb-8">
						<h3 className="text-2xl font-bold text-center md:text-left">
							More Exclusive Vehicles
						</h3>
						<Link
							href="/luxury-collection"
							className="hidden md:flex items-center text-primary hover:text-primary/90 transition-colors"
						>
							View all
							<ArrowRight className="h-4 w-4 ml-1" />
						</Link>
					</div>

					<motion.div
						ref={carousel}
						className="cursor-grab overflow-hidden"
						whileTap={{ cursor: "grabbing" }}
					>
						<motion.div
							drag="x"
							dragConstraints={{ right: 0, left: -width }}
							className="flex gap-6"
						>
							{luxuryCars.map((car) => {
								const cardImage =
									car.images?.length > 0
										? car.images[0]
										: "/placeholder.svg?height=300&width=400";
								const cardMake = car.car_make?.name || "Premium";
								const cardModel = car.car_model || "Luxury Vehicle";
								const cardPrice = car.pricing_payments?.selling_price
									? formatPrice(car.pricing_payments.selling_price)
									: "Price on request";
								const cardSlug = car.slug || "";
								const isCardBigDeal = car.big_deal || false;

								return (
									<motion.div
										key={car.$id}
										className="min-w-[320px] md:min-w-[400px] bg-white/5 rounded-xl p-6 backdrop-blur-md border border-white/5 hover:border-white/10 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 group"
										whileHover={{ y: -5 }}
										transition={{ type: "spring", stiffness: 300 }}
									>
										<div className="flex justify-between items-start mb-4">
											<div>
												<h4 className="font-bold text-lg">{cardMake}</h4>
												<p className="text-white/70">{cardModel}</p>
											</div>
											<div className="text-right">
												<p className="font-semibold">{cardPrice}</p>
												{isCardBigDeal && (
													<Badge
														variant="outline"
														className="mt-1 border-primary/50 text-primary text-xs"
													>
														Special Offer
													</Badge>
												)}
											</div>
										</div>

										<div className="relative h-52 rounded-lg overflow-hidden mb-5 group-hover:shadow-lg transition-all duration-500">
											<Image
												src={cardImage || "/placeholder.svg"}
												alt={`${cardMake} ${cardModel}`}
												fill
												className="object-cover transition-transform duration-700 group-hover:scale-105"
											/>
											{isCardBigDeal && (
												<div className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg">
													<BadgeCheck className="h-3 w-3" />
													<span className="text-xs font-medium">Special</span>
												</div>
											)}
										</div>

										<Button
											variant="ghost"
											className="w-full justify-between group hover:bg-white/5 transition-colors duration-300"
										>
											<Link
												href={`/car/${cardSlug}`}
												className="flex w-full justify-between"
											>
												<span>View details</span>
												<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
											</Link>
										</Button>
									</motion.div>
								);
							})}
						</motion.div>
					</motion.div>

					<p className="text-white/50 text-sm mt-6 text-center flex items-center justify-center gap-2">
						<MousePointer className="h-4 w-4" />
						Drag to explore more luxury vehicles
					</p>

					<div className="text-center mt-8">
						<Link
							href="/luxury-collection"
							className="inline-flex md:hidden items-center text-primary hover:text-primary/90 transition-colors text-sm font-medium"
						>
							View all luxury vehicles
							<ArrowRight className="h-4 w-4 ml-1" />
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
