"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { saveCarFeatures, updateCarInfo } from "@/lib/actions";

// Define the schema for all 12 feature fields.
const formSchema = z.object({
	interior_features: z.array(z.string()),
	engine_features: z.array(z.string()),
	wheels_features: z.array(z.string()),
	exterior_features: z.array(z.string()),
	safety_features: z.array(z.string()),
	entertainment_features: z.array(z.string()),
	convenience_features: z.array(z.string()),
	security_features: z.array(z.string()),
	sports_car_features: z.array(z.string()),
	family_car_features: z.array(z.string()),
	ecofriendly_features: z.array(z.string()),
	commercial_car_features: z.array(z.string()),
});

type FormSchemaType = z.infer<typeof formSchema>;

// List of fields to render with display labels.
const featureFields = [
	{ key: "interior_features", label: "Interior Features" },
	{ key: "engine_features", label: "Engine" },
	{ key: "wheels_features", label: "Wheels" },
	{ key: "exterior_features", label: "Exterior Features" },
	{ key: "safety_features", label: "Safety Features" },
	{ key: "entertainment_features", label: "Entertainment Features" },
	{ key: "convenience_features", label: "Convenience Features" },
	{ key: "security_features", label: "Security Features" },
	{ key: "sports_car_features", label: "Sports Car Features" },
	{ key: "family_car_features", label: "Family Car Features" },
	{ key: "ecofriendly_features", label: "Ecofriendly Features" },
	{ key: "commercial_car_features", label: "Commercial Car Features" },
];

// Default available options for each feature category.
// These represent the options to be shown for each category.
const defaultFeatureOptions: Record<keyof FormSchemaType, string[]> = {
	interior_features: ["Air Conditioning", "Heated Seats", "Leather Upholstery"],
	engine_features: ["Turbo", "V6", "V8"],
	wheels_features: ["Alloy Wheels", "Steel Wheels"],
	exterior_features: ["Sunroof", "LED Headlights", "Fog Lights"],
	safety_features: ["Airbags", "ABS", "Traction Control"],
	entertainment_features: ["Bluetooth", "Apple CarPlay", "Android Auto"],
	convenience_features: ["Keyless Entry", "Cruise Control"],
	security_features: ["Alarm System", "Immobilizer"],
	sports_car_features: ["Sport Suspension", "Performance Exhaust"],
	family_car_features: ["Rear Seat Entertainment", "Child Locks"],
	ecofriendly_features: ["Hybrid Engine", "Electric Motor"],
	commercial_car_features: ["Extended Cargo Space", "Roof Rack"],
};

interface CarFeaturesFormProps {
	data?: Partial<Record<keyof FormSchemaType, string[]>>;
}

export function CarFeaturesForm({ data }: CarFeaturesFormProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const carId = searchParams.get("carId");
	const specificationsId = searchParams.get("specificationID");

	// Use provided data for available options if available;
	// otherwise, fall back to default options.
	const availableOptions =
		data && Object.keys(data).length > 0 ? data : defaultFeatureOptions;

	// Initialize the form with empty arrays (no pre-selected features)
	const form = useForm<FormSchemaType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			interior_features: [],
			engine_features: [],
			wheels_features: [],
			exterior_features: [],
			safety_features: [],
			entertainment_features: [],
			convenience_features: [],
			security_features: [],
			sports_car_features: [],
			family_car_features: [],
			ecofriendly_features: [],
			commercial_car_features: [],
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: FormSchemaType) => {
			if (!carId) {
				throw new Error("No car ID found");
			}
			const result = await saveCarFeatures(values);
			if (result.success) {
				await updateCarInfo(
					{
						car_features: result?.data?.$id,
					},
					carId,
				);
				return result.data;
			}
			throw new Error(result.error || "Failed to save car features");
		},
		onSuccess: (resultData) => {
			router.push(
				`/dashboard/cars/new/photo-video?carId=${carId}&specificationID=${specificationsId}&featuresId=${resultData.$id}`,
			);
		},
		onError: (error: Error) => {
			console.error("Failed to save car features:", error.message);
			// Optionally, you could display a toast notification here.
		},
	});

	const onSubmit = (values: FormSchemaType) => {
		mutate(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{/* Render each feature category */}
				<div className="grid grid-cols-1 gap-6">
					{featureFields.map(({ key, label }) => {
						// Get available options for this category.
						const options = availableOptions[key as keyof FormSchemaType] || [];
						return (
							<div
								key={key}
								className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
							>
								<FormField
									control={form.control}
									name={key as keyof FormSchemaType}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-lg font-semibold mb-4 block">
												{label}
											</FormLabel>
											<div className="flex flex-wrap gap-4">
												{options.map((option) => {
													const isChecked = field.value.includes(option);
													return (
														<div key={option} className="flex items-center space-x-2">
															<Checkbox
																checked={isChecked}
																onCheckedChange={(checked) => {
																	const currentValues = field.value || [];
																	if (checked) {
																		field.onChange([...currentValues, option]);
																	} else {
																		field.onChange(
																			currentValues.filter((value) => value !== option),
																		);
																	}
																}}
															/>
															<span className="text-sm">{option}</span>
														</div>
													);
												})}
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						);
					})}
				</div>
				<div className="flex justify-end mt-8">
					<Button type="submit" disabled={isPending} className="px-8 py-2">
						{isPending ? "Saving..." : "Next: Pricing"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
