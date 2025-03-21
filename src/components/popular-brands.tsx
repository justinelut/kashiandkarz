"use client";
import Image from "next/image";
import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  
  return matches;
};

export function PopularBrands({ brands }: { brands: any }) {
	const isLargeScreen = useMediaQuery("(min-width: 1024px)");
	const [autoplay, setAutoplay] = useState(true);
	const [speed, setSpeed] = useState(30); // Lower number = faster speed
	const [initialized, setInitialized] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Clone the brands to create a seamless loop effect
	const fullBrandsList = [...brands, ...brands, ...brands, ...brands];

	// Handle manual navigation for animated carousel
	const scroll = (direction: "left" | "right") => {
		if (!containerRef.current) return;

		setAutoplay(false);
		if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);

		const scrollAmount = containerRef.current.clientWidth * 0.2;
		containerRef.current.scrollBy({
			left: direction === "left" ? -scrollAmount : scrollAmount,
			behavior: "smooth",
		});

		pauseTimeoutRef.current = setTimeout(() => setAutoplay(true), 2000);
	};

	// Initialize scroll position for animated carousel
	useLayoutEffect(() => {
		if (!isLargeScreen) return;

		const container = containerRef.current;
		if (container && !initialized) {
			// Set initial scroll position to start at beginning of the second set
			const itemWidth = container.scrollWidth / fullBrandsList.length;
			container.scrollLeft = brands.length * itemWidth;
			setInitialized(true);
		}
	}, [brands.length, fullBrandsList.length, initialized, isLargeScreen]);

	// Handle the infinite scroll effect for animated carousel
	useEffect(() => {
		if (!isLargeScreen) return;

		const container = containerRef.current;
		if (!container || !initialized) return;

		let animationFrameId: number;
		let lastTime = 0;
		const itemSetWidth = container.scrollWidth / 4; // Width of one complete set

		// Create a seamless loop by resetting position when needed
		const checkPosition = () => {
			if (!container) return;

			if (container.scrollLeft > itemSetWidth * 2.5) {
				container.scrollLeft -= itemSetWidth;
			} else if (container.scrollLeft < itemSetWidth * 0.5) {
				container.scrollLeft += itemSetWidth;
			}
		};

		const animate = (timestamp: number) => {
			if (!autoplay) {
				animationFrameId = requestAnimationFrame(animate);
				return;
			}

			// Throttle animation for smoother scrolling
			if (!lastTime || timestamp - lastTime > 16) {
				// ~60fps
				if (container) {
					container.scrollLeft += 1 / speed;
					checkPosition();
				}
				lastTime = timestamp;
			}

			animationFrameId = requestAnimationFrame(animate);
		};

		// Start animation
		animationFrameId = requestAnimationFrame(animate);

		// Clean up
		return () => {
			cancelAnimationFrame(animationFrameId);
			if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
		};
	}, [autoplay, speed, brands.length, initialized, isLargeScreen]);

	// Render different carousel based on screen size
	return (
		<section className="py-16 relative overflow-hidden">
			<div className="container px-4 md:px-6">
				<div className="text-center mb-8">
					<h2 className="text-3xl font-bold tracking-tight mb-2">Popular Brands</h2>
					<p className="text-muted-foreground">
						Pick your favorite brand and explore
					</p>
				</div>

				{isLargeScreen ? (
					// Animated carousel for large screens
					<div className="relative group">
						<div
							ref={containerRef}
							className="overflow-x-hidden w-full"
							style={{
								scrollbarWidth: "none",
								msOverflowStyle: "none",
								WebkitOverflowScrolling: "touch",
							}}
						>
							<div className="flex">
								{fullBrandsList.map((brand, index) => (
									<div key={`${brand.name}-${index}`} className="flex-none px-2 w-1/5">
										<div className="flex flex-col items-center p-4 rounded-lg hover:bg-muted/50 transition-colors">
											<div className="relative w-20 h-20 mb-3">
												<Image
													src={brand.image || "/placeholder.svg"}
													alt={brand.name}
													fill
													className="object-contain"
													loading="eager"
													priority={index < 10}
												/>
											</div>
											<span className="font-medium">{brand.name}</span>
										</div>
									</div>
								))}
							</div>
						</div>

						<button
							onClick={() => scroll("left")}
							className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background rounded-full p-2 shadow-md flex items-center justify-center z-20"
							aria-label="Previous brands"
						>
							<ChevronLeft className="h-5 w-5" />
						</button>

						<button
							onClick={() => scroll("right")}
							className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background rounded-full p-2 shadow-md flex items-center justify-center z-20"
							aria-label="Next brands"
						>
							<ChevronRight className="h-5 w-5" />
						</button>

						<div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
						<div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
					</div>
				) : (
					// Regular carousel for small and medium screens
					<Carousel
						opts={{
							align: "start",
							loop: true,
						}}
						className="w-full"
					>
						<CarouselContent>
							{brands.map((brand, index) => (
								<CarouselItem
									key={`${brand.name}-${index}`}
									className="basis-1/2 md:basis-1/3"
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
						<div className="flex justify-center gap-2 mt-4">
							<CarouselPrevious />
							<CarouselNext />
						</div>
					</Carousel>
				)}
			</div>
		</section>
	);
}
