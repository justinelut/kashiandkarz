import { notFound } from "next/navigation";
import { CarMakeHero } from "@/components/makes/car-make-hero";
import { CarMakeVehicles } from "@/components/makes/car-make-vehicles";
import { getCarMakeBySlug } from "@/lib/car-makes";

interface CarMakePageProps {
	params: {
		slug: string;
	};
	searchParams: {
		sort?: string;
		view?: string;
	};
}

export default async function CarMakePage({
	params,
	searchParams,
}: CarMakePageProps) {
	const { slug } = params;
	const sort = searchParams.sort || "newest";
	const view = searchParams.view || "grid";

	const response = await getCarMakeBySlug(slug);

	if (!response.success) {
		notFound();
	}

	const carMake = response.data;

	return (
		<div>
			<CarMakeHero carMake={carMake} />
			<CarMakeVehicles carMake={carMake} initialSort={sort} initialView={view} />
		</div>
	);
}
