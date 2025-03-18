"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
	Sparkles,
	Car,
	Zap,
	CarIcon as Suv,
	ParkingCircle,
	Battery,
	Briefcase,
	PiggyBank,
	Search,
	ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const browseItems = [
	{
		label: "Spring Sale",
		icon: Sparkles,
		color: "bg-yellow-500/10",
		textColor: "text-yellow-500",
		count: 42,
	},
	{
		label: "Used cars",
		icon: Car,
		color: "bg-blue-500/10",
		textColor: "text-blue-500",
		count: 156,
	},
	{
		label: "Electric",
		icon: Zap,
		color: "bg-green-500/10",
		textColor: "text-green-500",
		count: 38,
	},
	{
		label: "SUVs",
		icon: Suv,
		color: "bg-purple-500/10",
		textColor: "text-purple-500",
		count: 94,
	},
	{
		label: "Parking sensors",
		icon: ParkingCircle,
		color: "bg-indigo-500/10",
		textColor: "text-indigo-500",
		count: 127,
	},
	{
		label: "Hybrids",
		icon: Battery,
		color: "bg-teal-500/10",
		textColor: "text-teal-500",
		count: 53,
	},
	{
		label: "Big boot",
		icon: Briefcase,
		color: "bg-orange-500/10",
		textColor: "text-orange-500",
		count: 67,
	},
	{
		label: "Below £30k",
		icon: PiggyBank,
		color: "bg-rose-500/10",
		textColor: "text-rose-500",
		count: 112,
	},
];

export function BrowseSection() {
	const [activeItem, setActiveItem] = useState<string | null>(null);

	return (
		<div className="border-t border-b bg-white shadow-sm">
			<div className="container px-4 py-6 md:px-6">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						className="flex items-center mb-3 md:mb-0"
					>
						<div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
							<Search className="h-4 w-4 text-primary" />
						</div>
						<div>
							<h3 className="text-lg font-semibold">Quick Browse</h3>
							<p className="text-sm text-muted-foreground">
								Find exactly what you're looking for
							</p>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3, delay: 0.2 }}
					>
						<Button
							variant="link"
							className="p-0 h-auto text-primary flex items-center group"
						>
							View all categories
							<ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
						</Button>
					</motion.div>
				</div>

				<Carousel
					opts={{
						align: "start",
						loop: true,
					}}
					className="w-full"
				>
					<CarouselContent className="-ml-2 md:-ml-4">
						{browseItems.map((item) => {
							const Icon = item.icon;
							return (
								<CarouselItem
									key={item.label}
									className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
								>
									<motion.div
										whileHover={{ y: -5 }}
										transition={{ type: "spring", stiffness: 300 }}
										onMouseEnter={() => setActiveItem(item.label)}
										onMouseLeave={() => setActiveItem(null)}
									>
										<Button
											variant="outline"
											className={cn(
												"w-full h-auto flex-col py-4 space-y-2 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200",
												activeItem === item.label ? "border-primary/50 bg-primary/5" : "",
											)}
										>
											<div
												className={cn(
													"w-10 h-10 rounded-full flex items-center justify-center",
													item.color,
												)}
											>
												<Icon className={cn("h-5 w-5", item.textColor)} />
											</div>
											<div className="text-sm font-medium">{item.label}</div>
											<div className="text-xs text-muted-foreground">
												{item.count} vehicles
											</div>
										</Button>
									</motion.div>
								</CarouselItem>
							);
						})}
					</CarouselContent>

					<div className="flex justify-center mt-4 gap-2">
						<CarouselPrevious className="static translate-y-0 h-8 w-8 rounded-full" />
						<CarouselNext className="static translate-y-0 h-8 w-8 rounded-full" />
					</div>
				</Carousel>

				<div className="mt-6 pt-4 border-t border-gray-100 flex justify-center">
					<div className="inline-flex items-center text-sm text-muted-foreground">
						<span className="mr-2">Can't find what you're looking for?</span>
						<Button variant="link" className="p-0 h-auto text-primary">
							<Link href="/search">Try advanced search</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
