"use client";

import Image from "next/image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { useState, useEffect, useCallback, useRef } from "react";

export function PopularBrands({ brands }: { brands: any }) {
	const [scrollPosition, setScrollPosition] = useState(0);
	const [isManualScrolling, setIsManualScrolling] = useState(false);
	const manualScrollTimeout = useRef<NodeJS.Timeout | null>(null);

	const scroll = useCallback(() => {
		if (!isManualScrolling) {
			setScrollPosition((prevPosition) => {
				const newPosition = prevPosition + 0.1;
				return newPosition >= 100 ? 0 : newPosition;
			});
		}
	}, [isManualScrolling]);

	useEffect(() => {
		const intervalId = setInterval(scroll, 20);
		return () => clearInterval(intervalId);
	}, [scroll]);

	// Double the array to create seamless infinite scroll
	const extendedBrands = [...brands, ...brands];

	const handleManualScroll = (direction: "next" | "previous") => {
		setIsManualScrolling(true);

		// Clear any existing timeout
		if (manualScrollTimeout.current) {
			clearTimeout(manualScrollTimeout.current);
		}

		// Update scroll position based on direction
		setScrollPosition((prevPosition) => {
			const increment = direction === "next" ? 10 : -10;
			let newPosition = prevPosition + increment;

			// Wrap if necessary
			if (newPosition >= 100) newPosition = 0;
			if (newPosition < 0) newPosition = 100;

			return newPosition;
		});

		// Resume automatic scroll delay
		manualScrollTimeout.current = setTimeout(() => {
			setIsManualScrolling(false);
		}, 1000);
	};

	return (
		<section className="py-16">
			<div className="container px-4 md:px-6">
				<div className="text-center mb-8">
					<h2 className="text-3xl font-bold tracking-tight mb-2">Popular Brands</h2>
					<p className="text-muted-foreground">
						Find your favorite car brand and explore their latest models
					</p>
				</div>

				<Carousel
					opts={{
						align: "start",
						loop: true,
					}}
					className="w-full"
				>
					<CarouselContent
						style={{
							transform: `translateX(-${scrollPosition}%)`,
							transition: "transform 0.2s linear",
						}}
					>
						{extendedBrands.map((brand, index) => (
							<CarouselItem
								key={`${brand.name}-${index}`}
								className="basis-1/2 md:basis-1/3 lg:basis-1/5"
							>
								<div className="flex flex-col items-center p-4 rounded-lg hover:bg-muted/50 transition-colors">
									<div className="relative w-20 h-20 mb-3">
										<Image
											src={brand.image || "/placeholder.svg"}
											alt={brand.name}
											fill
											className="object-contain"
										/>
									</div>
									<span className="font-medium">{brand.name}</span>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<div className="flex justify-end gap-2 mt-4">
						<CarouselPrevious onClick={() => handleManualScroll("previous")} />
						<CarouselNext onClick={() => handleManualScroll("next")} />
					</div>
				</Carousel>
			</div>
		</section>
	);
}
