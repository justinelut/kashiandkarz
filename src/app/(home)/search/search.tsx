"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Filter, ArrowRight, Search, Tag, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { searchCars, type CarSearchFilters } from "@/lib/search-actions";
import { useSearchParams } from "next/navigation";

// Custom hook for media query
function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const media = window.matchMedia(query);
		if (media.matches !== matches) {
			setMatches(media.matches);
		}
		const listener = () => setMatches(media.matches);
		window.addEventListener("resize", listener);
		return () => window.removeEventListener("resize", listener);
	}, [matches, query]);

	return matches;
}

// Filter content component to reuse in both sidebar and dialog
function FilterContent({
	filters,
	onFilterChange,
	onClose,
}: {
	filters: CarSearchFilters;
	onFilterChange: (newFilters: Partial<CarSearchFilters>) => void;
	onClose?: () => void;
}) {
	const filterOptions = {
		make: ["Audi", "BMW", "Ford", "Mercedes", "Volkswagen"],
		bodyType: ["Hatchback", "Saloon", "SUV", "Estate", "Coupe"],
		gearbox: ["Manual", "Automatic"],
		fuelType: ["Petrol", "Diesel", "Electric", "Hybrid"],
		colour: ["Black", "White", "Silver", "Blue", "Red"],
		doors: ["2", "3", "4", "5"],
		seats: ["2", "4", "5", "7"],
		safetyRating: ["5", "4", "3"],
	};

	return (
		<div className="w-full max-w-full sm:max-w-[300px]">
			<div className="border-b p-4">
				<div className="font-medium">Sort by</div>
				<Select
					defaultValue={filters.sortBy || "price-low"}
					onValueChange={(value) =>
						onFilterChange({ sortBy: value as CarSearchFilters["sortBy"] })
					}
				>
					<SelectTrigger className="mt-2">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="price-low">Price: low to high</SelectItem>
						<SelectItem value="price-high">Price: high to low</SelectItem>
						<SelectItem value="mileage-low">Mileage: low to high</SelectItem>
						<SelectItem value="mileage-high">Mileage: high to low</SelectItem>
						<SelectItem value="year-new">Year: newest first</SelectItem>
						<SelectItem value="year-old">Year: oldest first</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="max-h-[calc(100vh-200px)] overflow-y-auto">
				<Accordion type="multiple" className="px-4">
					<AccordionItem value="location" className="border-b py-2">
						<AccordionTrigger className="py-2">
							<div className="flex items-center">
								<span>Location</span>
								<span className="ml-2 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] text-white">
									●
								</span>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-4">
								<div className="space-y-2">
									<div className="text-sm">Postcode</div>
									<Input placeholder="Enter Postcode" />
								</div>
								<div className="space-y-2">
									<div className="text-sm">Distance from</div>
									<Select defaultValue="nationwide">
										<SelectTrigger>
											<SelectValue placeholder="Distance from" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="nationwide">Nationwide</SelectItem>
											<SelectItem value="10">Within 10 miles</SelectItem>
											<SelectItem value="20">Within 20 miles</SelectItem>
											<SelectItem value="50">Within 50 miles</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="text-xs text-muted-foreground">
									Please add your postcode so we can show the cars nearest to you
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="price" className="border-b py-2">
						<AccordionTrigger className="py-2">Price</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-4">
								<Input
									type="number"
									placeholder="Min price"
									value={filters.priceMin || ""}
									onChange={(e) =>
										onFilterChange({
											priceMin: e.target.value
												? Number.parseInt(e.target.value)
												: undefined,
										})
									}
								/>
								<Input
									type="number"
									placeholder="Max price"
									value={filters.priceMax || ""}
									onChange={(e) =>
										onFilterChange({
											priceMax: e.target.value
												? Number.parseInt(e.target.value)
												: undefined,
										})
									}
								/>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="newused" className="border-b py-2">
						<AccordionTrigger className="py-2">New/Used</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-2">
								<div className="flex items-center space-x-2">
									<Checkbox
										id="new"
										checked={filters.condition?.includes("new")}
										onCheckedChange={(checked) => {
											const newCondition = [...(filters.condition || [])];
											if (checked) {
												if (!newCondition.includes("new")) newCondition.push("new");
											} else {
												const index = newCondition.indexOf("new");
												if (index !== -1) newCondition.splice(index, 1);
											}
											onFilterChange({ condition: newCondition });
										}}
									/>
									<label htmlFor="new" className="text-sm">
										New
									</label>
								</div>
								<div className="flex items-center space-x-2">
									<Checkbox
										id="used"
										checked={filters.condition?.includes("used")}
										onCheckedChange={(checked) => {
											const newCondition = [...(filters.condition || [])];
											if (checked) {
												if (!newCondition.includes("used")) newCondition.push("used");
											} else {
												const index = newCondition.indexOf("used");
												if (index !== -1) newCondition.splice(index, 1);
											}
											onFilterChange({ condition: newCondition });
										}}
									/>
									<label htmlFor="used" className="text-sm">
										Used
									</label>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="make" className="border-b py-2">
						<AccordionTrigger className="py-2">Make & Model</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-4">
								<Select
									value={
										filters.makes && filters.makes.length > 0
											? filters.makes[0]
											: undefined
									}
									onValueChange={(value) => onFilterChange({ makes: [value] })}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select make" />
									</SelectTrigger>
									<SelectContent>
										{filterOptions.make.map((make) => (
											<SelectItem key={make} value={make.toLowerCase()}>
												{make}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<Select
									value={
										filters.models && filters.models.length > 0
											? filters.models[0]
											: undefined
									}
									onValueChange={(value) => onFilterChange({ models: [value] })}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select model" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All models</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="bodyType" className="border-b py-2">
						<AccordionTrigger className="py-2">Body type</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-2">
								{filterOptions.bodyType.map((type) => (
									<div key={type} className="flex items-center space-x-2">
										<Checkbox
											id={type.toLowerCase()}
											checked={filters.bodyTypes?.includes(type.toLowerCase())}
											onCheckedChange={(checked) => {
												const newBodyTypes = [...(filters.bodyTypes || [])];
												if (checked) {
													if (!newBodyTypes.includes(type.toLowerCase()))
														newBodyTypes.push(type.toLowerCase());
												} else {
													const index = newBodyTypes.indexOf(type.toLowerCase());
													if (index !== -1) newBodyTypes.splice(index, 1);
												}
												onFilterChange({ bodyTypes: newBodyTypes });
											}}
										/>
										<label htmlFor={type.toLowerCase()} className="text-sm">
											{type}
										</label>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="transmission" className="border-b py-2">
						<AccordionTrigger className="py-2">Transmission</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-2">
								{filterOptions.gearbox.map((type) => (
									<div key={type} className="flex items-center space-x-2">
										<Checkbox
											id={type.toLowerCase()}
											checked={filters.transmissions?.includes(type.toLowerCase())}
											onCheckedChange={(checked) => {
												const newTransmissions = [...(filters.transmissions || [])];
												if (checked) {
													if (!newTransmissions.includes(type.toLowerCase()))
														newTransmissions.push(type.toLowerCase());
												} else {
													const index = newTransmissions.indexOf(type.toLowerCase());
													if (index !== -1) newTransmissions.splice(index, 1);
												}
												onFilterChange({ transmissions: newTransmissions });
											}}
										/>
										<label htmlFor={type.toLowerCase()} className="text-sm">
											{type}
										</label>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="fuel" className="border-b py-2">
						<AccordionTrigger className="py-2">Fuel type</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-2">
								{filterOptions.fuelType.map((type) => (
									<div key={type} className="flex items-center space-x-2">
										<Checkbox
											id={type.toLowerCase()}
											checked={filters.fuelTypes?.includes(type.toLowerCase())}
											onCheckedChange={(checked) => {
												const newFuelTypes = [...(filters.fuelTypes || [])];
												if (checked) {
													if (!newFuelTypes.includes(type.toLowerCase()))
														newFuelTypes.push(type.toLowerCase());
												} else {
													const index = newFuelTypes.indexOf(type.toLowerCase());
													if (index !== -1) newFuelTypes.splice(index, 1);
												}
												onFilterChange({ fuelTypes: newFuelTypes });
											}}
										/>
										<label htmlFor={type.toLowerCase()} className="text-sm">
											{type}
										</label>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="colour" className="border-b py-2">
						<AccordionTrigger className="py-2">Colour</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-2">
								{filterOptions.colour.map((color) => (
									<div key={color} className="flex items-center space-x-2">
										<Checkbox
											id={color.toLowerCase()}
											checked={filters.colors?.includes(color.toLowerCase())}
											onCheckedChange={(checked) => {
												const newColors = [...(filters.colors || [])];
												if (checked) {
													if (!newColors.includes(color.toLowerCase()))
														newColors.push(color.toLowerCase());
												} else {
													const index = newColors.indexOf(color.toLowerCase());
													if (index !== -1) newColors.splice(index, 1);
												}
												onFilterChange({ colors: newColors });
											}}
										/>
										<label htmlFor={color.toLowerCase()} className="text-sm">
											{color}
										</label>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="doors" className="border-b py-2">
						<AccordionTrigger className="py-2">Doors</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-2">
								{filterOptions.doors.map((number) => (
									<div key={number} className="flex items-center space-x-2">
										<Checkbox
											id={`doors-${number}`}
											checked={filters.doors?.includes(Number.parseInt(number))}
											onCheckedChange={(checked) => {
												const newDoors = [...(filters.doors || [])];
												if (checked) {
													if (!newDoors.includes(Number.parseInt(number)))
														newDoors.push(Number.parseInt(number));
												} else {
													const index = newDoors.indexOf(Number.parseInt(number));
													if (index !== -1) newDoors.splice(index, 1);
												}
												onFilterChange({ doors: newDoors });
											}}
										/>
										<label htmlFor={`doors-${number}`} className="text-sm">
											{number} doors
										</label>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="seats" className="border-b py-2">
						<AccordionTrigger className="py-2">Seats</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-2">
								{filterOptions.seats.map((number) => (
									<div key={number} className="flex items-center space-x-2">
										<Checkbox
											id={`seats-${number}`}
											checked={filters.seats?.includes(Number.parseInt(number))}
											onCheckedChange={(checked) => {
												const newSeats = [...(filters.seats || [])];
												if (checked) {
													if (!newSeats.includes(Number.parseInt(number)))
														newSeats.push(Number.parseInt(number));
												} else {
													const index = newSeats.indexOf(Number.parseInt(number));
													if (index !== -1) newSeats.splice(index, 1);
												}
												onFilterChange({ seats: newSeats });
											}}
										/>
										<label htmlFor={`seats-${number}`} className="text-sm">
											{number} seats
										</label>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="safety" className="border-b py-2">
						<AccordionTrigger className="py-2">Safety rating</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-2">
								{filterOptions.safetyRating.map((rating) => (
									<div key={rating} className="flex items-center space-x-2">
										<Checkbox
											id={`safety-${rating}`}
											checked={filters.safetyRatings?.includes(Number.parseInt(rating))}
											onCheckedChange={(checked) => {
												const newRatings = [...(filters.safetyRatings || [])];
												if (checked) {
													if (!newRatings.includes(Number.parseInt(rating)))
														newRatings.push(Number.parseInt(rating));
												} else {
													const index = newRatings.indexOf(Number.parseInt(rating));
													if (index !== -1) newRatings.splice(index, 1);
												}
												onFilterChange({ safetyRatings: newRatings });
											}}
										/>
										<label htmlFor={`safety-${rating}`} className="text-sm">
											{rating} stars
										</label>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="year" className="border-b py-2">
						<AccordionTrigger className="py-2">Year</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-4">
								<Input
									type="number"
									placeholder="Min year"
									value={filters.yearMin || ""}
									onChange={(e) =>
										onFilterChange({
											yearMin: e.target.value
												? Number.parseInt(e.target.value)
												: undefined,
										})
									}
								/>
								<Input
									type="number"
									placeholder="Max year"
									value={filters.yearMax || ""}
									onChange={(e) =>
										onFilterChange({
											yearMax: e.target.value
												? Number.parseInt(e.target.value)
												: undefined,
										})
									}
								/>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="mileage" className="border-b py-2">
						<AccordionTrigger className="py-2">Mileage</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-4">
								<Input
									type="number"
									placeholder="Min mileage"
									value={filters.mileageMin || ""}
									onChange={(e) =>
										onFilterChange({
											mileageMin: e.target.value
												? Number.parseInt(e.target.value)
												: undefined,
										})
									}
								/>
								<Input
									type="number"
									placeholder="Max mileage"
									value={filters.mileageMax || ""}
									onChange={(e) =>
										onFilterChange({
											mileageMax: e.target.value
												? Number.parseInt(e.target.value)
												: undefined,
										})
									}
								/>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>

			{onClose && (
				<div className="border-t p-4">
					<Button variant="outline" className="w-full" onClick={onClose}>
						Show Less
					</Button>
				</div>
			)}
		</div>
	);
}

// Car card component with fixed height
function CarCard({ car }: { car: any }) {
	// Format currency based on the currency in pricing_payments
	const formatCurrency = (amount: number, currency = "KES") => {
		if (!amount) return "Price on request";

		switch (currency) {
			case "KES":
				return `KSh ${amount.toLocaleString()}`;
			case "USD":
				return `$${amount.toLocaleString()}`;
			case "EUR":
				return `€${amount.toLocaleString()}`;
			case "GBP":
				return `£${amount.toLocaleString()}`;
			default:
				return `${amount.toLocaleString()}`;
		}
	};

	// Get the main image from the images array
	const mainImage =
		car.images && car.images.length > 0
			? car.images[0]
			: "/placeholder.svg?height=300&width=400";

	// Get specifications for display
	const specs = [];
	if (car.car_specifications) {
		if (car.car_specifications.transmission_type)
			specs.push(car.car_specifications.transmission_type);
		if (car.car_specifications.fuel_type)
			specs.push(car.car_specifications.fuel_type);
		if (car.car_specifications.engine_capacity)
			specs.push(`${car.car_specifications.engine_capacity} L`);
	}

	const specText = specs.join(" • ");

	return (
		<motion.div
			layout
			className="h-full overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
		>
			<div className="relative aspect-[4/3]">
				<Image
					src={mainImage || "/placeholder.svg"}
					alt={car.title || "Car image"}
					fill
					className="object-cover"
				/>
				<div className="absolute left-3 top-3 rounded bg-black px-2 py-1 text-xs text-white">
					{car.condition === "new" ? "New" : "Used"}
				</div>
				{car.big_deal && (
					<div className="absolute right-3 top-3 rounded bg-red-600 px-2 py-1 text-xs text-white flex items-center gap-1">
						<Tag className="h-3 w-3" />
						<span>Big Deal</span>
					</div>
				)}
			</div>
			<div className="flex h-[140px] flex-col p-4">
				<h3 className="text-lg font-semibold line-clamp-1">
					{car.title || `${car.car_make?.name || ""} ${car.car_model || ""}`}
				</h3>
				<p className="text-sm text-muted-foreground">{specText}</p>
				<div className="mt-auto flex items-center justify-between">
					<div>
						<div className="text-lg font-bold flex items-center gap-1">
							{car.pricing_payments
								? formatCurrency(
										car.pricing_payments.selling_price,
										car.pricing_payments.currency,
								  )
								: "Price on request"}
							{car.pricing_payments?.negotiable === "yes" && (
								<Percent className="h-3 w-3 text-green-600" />
							)}
						</div>
						<div className="text-sm text-muted-foreground">
							{car.year} • {car.car_specifications?.mileage || "0"}{" "}
							{car.car_specifications?.mileage_unit || "km"}
						</div>
					</div>
					<Button size="icon" className="rounded-full bg-black hover:bg-black/90">
						<ArrowRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</motion.div>
	);
}

// Car card skeleton component
function CarCardSkeleton() {
	return (
		<div className="h-full overflow-hidden rounded-lg bg-white shadow-sm">
			<div className="relative aspect-[4/3]">
				<Skeleton className="h-full w-full" />
			</div>
			<div className="h-[140px] p-4 space-y-4">
				<Skeleton className="h-6 w-3/4" />
				<Skeleton className="h-4 w-1/2" />
				<div className="flex items-center justify-between pt-2">
					<div className="space-y-2">
						<Skeleton className="h-6 w-20" />
						<Skeleton className="h-4 w-32" />
					</div>
					<Skeleton className="h-10 w-10 rounded-full" />
				</div>
			</div>
		</div>
	);
}

export default function SearchPage() {
	const [isFiltersOpen, setIsFiltersOpen] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [filters, setFilters] = useState<CarSearchFilters>({
		sortBy: "price-low",
		limit: 12,
	});
	const query = useSearchParams();
	const s = query.get("s") as string

	useEffect(() => {
		setSearchQuery(s);
	}, [s]);
	const [cars, setCars] = useState<any[]>([]);
	const [pagination, setPagination] = useState({
		total: 0,
		hasMore: false,
		nextCursor: null as string | null,
	});
	const isMobile = useMediaQuery("(max-width: 768px)");

	// Function to update filters
	const handleFilterChange = (newFilters: Partial<CarSearchFilters>) => {
		setFilters((prev) => ({
			...prev,
			...newFilters,
			// Reset cursor when filters change
			cursor: undefined,
		}));
	};

	// Function to handle search input
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		handleFilterChange({ search: e.target.value });
	};

	// Function to load more results
	const handleLoadMore = () => {
		if (pagination.nextCursor) {
			handleFilterChange({
				cursor: pagination.nextCursor,
				// Don't reset other filters
			});
		}
	};

	// Fetch cars when filters change
	useEffect(() => {
		const fetchCars = async () => {
			setIsLoading(true);
			try {
				const result = await searchCars(filters);
				if (result.success) {
					// If we have a cursor, append the results, otherwise replace them
					if (filters.cursor) {
						setCars((prev) => [...prev, ...result.data]);
					} else {
						setCars(result.data);
					}
					setPagination(result.pagination);
				} else {
					console.error("Error fetching cars:", result.error);
				}
			} catch (error) {
				console.error("Error fetching cars:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCars();
	}, [filters]);

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="container mx-auto px-4 py-8">
				{/* Search input */}
				{/* <div className="mb-6 relative">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							placeholder="Search by make, model or keyword"
							className="pl-10"
							value={searchQuery}
							onChange={handleSearchChange}
						/>
					</div>
				</div> */}

				<div className="mb-6 flex items-center justify-between">
					<div className="flex items-center gap-3">
						{isMobile ? (
							<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
								<DialogTrigger asChild>
									<Button variant="outline" size="icon">
										<Filter className="h-4 w-4" />
									</Button>
								</DialogTrigger>
								<DialogContent className="max-h-[90vh] overflow-auto p-0 sm:max-w-[350px]">
									<DialogHeader className="p-4 pb-0">
										<DialogTitle>Filters</DialogTitle>
									</DialogHeader>
									<FilterContent
										filters={filters}
										onFilterChange={handleFilterChange}
										onClose={() => setDialogOpen(false)}
									/>
								</DialogContent>
							</Dialog>
						) : (
							<Button
								variant="outline"
								size="icon"
								onClick={() => setIsFiltersOpen(!isFiltersOpen)}
							>
								<Filter className="h-4 w-4" />
							</Button>
						)}
						<h1 className="text-xl font-bold">
							{pagination.total} Cars Available Now
						</h1>
					</div>

					{/* Active filters display */}
					<div className="hidden md:flex flex-wrap gap-2">
						{filters.condition?.map((condition) => (
							<Badge
								key={condition}
								variant="outline"
								className="flex items-center gap-1"
							>
								{condition === "new" ? "New" : "Used"}
								<button
									className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
									onClick={() => {
										const newCondition =
											filters.condition?.filter((c) => c !== condition) || [];
										handleFilterChange({
											condition: newCondition.length ? newCondition : undefined,
										});
									}}
								>
									✕
								</button>
							</Badge>
						))}
						{filters.makes?.map((make) => (
							<Badge key={make} variant="outline" className="flex items-center gap-1">
								{make}
								<button
									className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
									onClick={() => handleFilterChange({ makes: undefined })}
								>
									✕
								</button>
							</Badge>
						))}
						{/* Add more badges for other active filters */}
					</div>
				</div>

				<div className="flex gap-6">
					{!isMobile && (
						<AnimatePresence initial={false}>
							{isFiltersOpen && (
								<motion.div
									initial={{ width: 0, opacity: 0 }}
									animate={{ width: 300, opacity: 1 }}
									exit={{ width: 0, opacity: 0 }}
									transition={{ duration: 0.3 }}
									className="sticky top-4 h-[calc(100vh-100px)] overflow-hidden rounded-lg bg-white shadow-sm"
									style={{ flexShrink: 0 }}
								>
									<FilterContent
										filters={filters}
										onFilterChange={handleFilterChange}
										onClose={() => setIsFiltersOpen(false)}
									/>
								</motion.div>
							)}
						</AnimatePresence>
					)}

					<div className="flex-1">
						<LayoutGroup>
							<motion.div
								layout
								className={cn(
									"grid gap-4",
									"sm:grid-cols-2",
									isFiltersOpen ? "lg:grid-cols-3" : "lg:grid-cols-4",
								)}
							>
								{isLoading && cars.length === 0
									? // Show skeletons while loading initial data
									  Array(8)
											.fill(0)
											.map((_, index) => <CarCardSkeleton key={index} />)
									: // Show actual car cards
									  cars.map((car) => <CarCard key={car.$id} car={car} />)}

								{/* Show loading skeletons at the end when loading more */}
								{isLoading &&
									cars.length > 0 &&
									Array(4)
										.fill(0)
										.map((_, index) => <CarCardSkeleton key={`more-${index}`} />)}
							</motion.div>
						</LayoutGroup>

						{/* Pagination / Load More */}
						<div className="mt-8 flex flex-col items-center justify-center gap-4">
							{pagination.hasMore && (
								<Button onClick={handleLoadMore} disabled={isLoading} className="px-8">
									{isLoading ? "Loading..." : "Load More"}
								</Button>
							)}

							{!isLoading && cars.length === 0 && (
								<div className="text-center py-12">
									<h3 className="text-xl font-semibold mb-2">No cars found</h3>
									<p className="text-muted-foreground">
										Try adjusting your filters to see more results
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
