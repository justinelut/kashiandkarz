import { Suspense } from "react";
import { CarMakesGrid } from "@/components/makes/car-makes-grid";
import { PopularCarMakes } from "@/components/makes/popular-car-makes";
import { CarMakesSearch } from "@/components/makes/car-makes-search";
import { Pagination } from "@/components/ui/pagination";
import { getAllCarMakes, getPopularCarMakes } from "@/actions/car-makes";

interface CarMakesPageProps {
	searchParams: {
		page?: string;
		search?: string;
	};
}

export default async function CarMakesPage({
	searchParams,
}: CarMakesPageProps) {
	const page = searchParams.page ? Number.parseInt(searchParams.page) : 1;
	const search = searchParams.search || "";

	// Fetch popular car makes
	const popularMakesResponse = await getPopularCarMakes();
	const popularMakes = popularMakesResponse.success
		? popularMakesResponse.data
		: [];

	// Fetch all car makes with pagination
	const allMakesResponse = await getAllCarMakes({
		page,
		search,
	});

	const allMakes = allMakesResponse.success ? allMakesResponse.data : [];
	const pagination = allMakesResponse.success
		? allMakesResponse.pagination
		: {
				total: 0,
				page: 1,
				limit: 25,
				totalPages: 1,
		  };

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">Car Makes</h1>
				<p className="text-muted-foreground">
					Browse vehicles by manufacturer. Find your perfect car from top brands
					worldwide.
				</p>
			</div>

			{/* Search bar */}
			<div className="mb-8">
				<CarMakesSearch initialSearch={search} />
			</div>

			{/* Popular car makes */}
			{popularMakes?.length > 0 && (
				<div className="mb-12">
					<h2 className="text-2xl font-semibold mb-4">Popular Manufacturers</h2>
					<Suspense fallback={<div>Loading popular makes...</div>}>
						<PopularCarMakes makes={popularMakes} />
					</Suspense>
				</div>
			)}

			{/* All car makes */}
			<div>
				<h2 className="text-2xl font-semibold mb-4">All Manufacturers</h2>
				<p className="text-muted-foreground mb-6">
					{search
						? `Search results for "${search}" (${pagination.total} results)`
						: `Showing all car manufacturers (${pagination.total} total)`}
				</p>

				<Suspense fallback={<div>Loading car makes...</div>}>
					<CarMakesGrid makes={allMakes} />
				</Suspense>

				{/* Pagination */}
				{pagination.totalPages > 1 && (
					<div className="mt-8 flex justify-center">
						<Pagination
							currentPage={pagination.page}
							totalPages={pagination.totalPages}
							baseUrl={`/makes${search ? `?search=${search}&` : "?"}`}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
