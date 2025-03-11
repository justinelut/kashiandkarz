"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { saveCarSpecifications, updateCarInfo } from "@/lib/actions";

const carSpecificationSchema = z.object({
	// Common Specifications
	fuel_type: z.string().min(1, "Fuel type is required"),
	transmission_type: z.string().min(1, "Transmission type is required"),
	drive_train: z.string().min(1, "Drive train is required"),
	engine_capacity: z.string().min(1, "Engine capacity is required"),
	horse_power: z.string().min(1, "Horse power is required"),
	torque: z.string().min(1, "Torque is required"),
	mileage: z.string().min(1, "Mileage is required"),
	mileage_unit: z.enum(["km", "miles"]),
	doors: z.preprocess(
		(val) => (val === "" ? undefined : Number(val)),
		z.number().int().positive("Number of doors must be a positive integer"),
	),
	seats: z.preprocess(
		(val) => (val === "" ? undefined : Number(val)),
		z.number().int().positive("Number of seats must be a positive integer"),
	),
	engine_power: z.string().min(1, "Engine power is required"),
	top_speed: z.string().min(1, "Top speed is required"),
	acceleration: z.string().min(1, "Acceleration is required"),
	co2_emissions: z.string().min(1, "CO2 emissions is required"),
	fuel_economy: z.string().min(1, "Fuel economy is required"),

	// Electric Vehicle Specifications (Optional)
	range: z.string().optional(),
	battery: z.string().optional(),
	charging: z.string().optional(),

	// Commercial Vehicle Specifications (Optional)
	lap_time: z.string().optional(),
	load_volume: z.string().optional(),
	payload: z.string().optional(),
	boot_space: z.string().optional(),

	// Additional Ratings (Optional)
	family_score: z.preprocess(
		(val) => (val === "" ? undefined : Number(val)),
		z
			.number()
			.min(0, "Family score must be at least 0")
			.max(10, "Family score must be at most 10")
			.optional(),
	),
	safety_rating: z.preprocess(
		(val) => (val === "" ? undefined : Number(val)),
		z
			.number()
			.min(0, "Safety rating must be at least 0")
			.max(5, "Safety rating must be at most 5")
			.optional(),
	),
});

type CarSpecificationFormValues = z.infer<typeof carSpecificationSchema>;

export default function CarSpecificationForm() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const form = useForm<CarSpecificationFormValues>({
		resolver: zodResolver(carSpecificationSchema),
		defaultValues: {
			fuel_type: "",
			transmission_type: "",
			drive_train: "",
			engine_capacity: "",
			horse_power: "",
			torque: "",
			mileage: "",
			mileage_unit: "km",
			doors: 4,
			seats: 5,
			engine_power: "",
			top_speed: "",
			acceleration: "",
			co2_emissions: "",
			fuel_economy: "",
			// Electric Vehicle Specifications
			range: "",
			battery: "",
			charging: "",
			// Commercial Vehicle Specifications
			lap_time: "",
			load_volume: "",
			payload: "",
			boot_space: "",
			// Additional Ratings
			family_score: "",
			safety_rating: "",
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: CarSpecificationFormValues) => {
			const carId = searchParams.get("carId");
			if (!carId) {
				throw new Error("Car ID not found. Please start from the beginning.");
			}
			const result = await saveCarSpecifications(data);
			if (result.success) {
				await updateCarInfo(
					{
						car_specifications: result?.data?.$id,
					},
					carId,
				);
				return { carId, specificationID: result?.data?.$id };
			}
			throw new Error(result.error || "Failed to save car specifications");
		},

		onSuccess: ({ carId, specificationID }) => {
			toast.success("Success!", {
				description: "Car specifications saved successfully.",
			});
			router.push(
				`/dashboard/cars/new/car-features?carId=${carId}&specificationID=${specificationID}`,
			);
		},
		onError: (error: Error) => {
			toast.error("Error saving car specifications", {
				description:
					error.message || "Failed to save car specifications. Please try again.",
			});
		},
	});

	function onSubmit(data: CarSpecificationFormValues) {
		mutate(data);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{/* Common Specifications */}
				<h3 className="text-lg font-bold mt-8">Common Specifications</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="fuel_type"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Fuel Type</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select fuel type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="petrol">Petrol</SelectItem>
										<SelectItem value="diesel">Diesel</SelectItem>
										<SelectItem value="electric">Electric</SelectItem>
										<SelectItem value="hybrid">Hybrid</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="transmission_type"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Transmission Type</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select transmission type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="manual">Manual</SelectItem>
										<SelectItem value="automatic">Automatic</SelectItem>
										<SelectItem value="cvt">CVT</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="drive_train"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Drive Train</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select drive train" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="fwd">FWD</SelectItem>
										<SelectItem value="rwd">RWD</SelectItem>
										<SelectItem value="awd">AWD</SelectItem>
										<SelectItem value="4wd">4WD</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="engine_capacity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Engine Capacity (cc)</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="horse_power"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Horse Power (hp)</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="torque"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Torque (Nm)</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="mileage"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mileage</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="mileage_unit"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mileage Unit</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select mileage unit" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="km">km</SelectItem>
										<SelectItem value="miles">miles</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="doors"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Number of Doors</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="seats"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Number of Seats</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="engine_power"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Engine Power (kW)</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="top_speed"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Top Speed (km/h)</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="acceleration"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Acceleration (0-100 km/h in seconds)</FormLabel>
								<FormControl>
									<Input type="number" step="0.1" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="co2_emissions"
						render={({ field }) => (
							<FormItem>
								<FormLabel>CO2 Emissions (g/km)</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="fuel_economy"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Fuel Economy (L/100km)</FormLabel>
								<FormControl>
									<Input type="number" step="0.1" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Electric Vehicle Specifications */}
				<h3 className="text-lg font-bold mt-8">
					Electric Vehicle Specifications (Optional)
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="range"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Range (km)</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormDescription>For electric vehicles</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="battery"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Battery Capacity (kWh)</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormDescription>For electric vehicles</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="charging"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Charging Time (hours)</FormLabel>
								<FormControl>
									<Input type="number" step="0.1" {...field} />
								</FormControl>
								<FormDescription>For electric vehicles</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Commercial Vehicle Specifications */}
				<h3 className="text-lg font-bold mt-8">
					Commercial Vehicle Specifications (Optional)
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="lap_time"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Laptime</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
								</FormControl>
								<FormDescription>For commercial or racing vehicles</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="load_volume"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Load Volume (L)</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="payload"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Payload (kg)</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="boot_space"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Boot Space (L)</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Additional Ratings */}
				<h3 className="text-lg font-bold mt-8">Additional Ratings (Optional)</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="family_score"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Family Score (0-10)</FormLabel>
								<FormControl>
									<Input type="number" min="0" max="10" step="0.1" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="safety_rating"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Safety Rating (0-5)</FormLabel>
								<FormControl>
									<Input type="number" min="0" max="5" step="0.1" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit" disabled={isPending}>
					{isPending ? "Saving..." : "Save and Continue"}
				</Button>
			</form>
		</Form>
	);
}
