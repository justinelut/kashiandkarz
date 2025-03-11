"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { CarMakeSelector } from "@/components/sell-car/car-make-selector";
import { CarTypeSelector } from "@/components/sell-car/car-type-selector";
import { ColorSelector } from "@/components/sell-car/color-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { saveBasicCarInfo } from "@/lib/actions";
import type { CarInfo } from "@/types/types";

const schema = z.object({
	car_make: z.string().min(1, "Car make is required"),
	car_model: z.string().min(1, "Car model is required"),
	year: z.string().regex(/^\d{4}$/, "Year must be a 4-digit number"),
	vehicle_type: z.string().min(1, "Vehicle type is required"),
	condition: z.enum(["new", "used"]),
	description: z.string().min(10, "Description must be at least 10 characters"),
	title: z.string().min(5, "Title must be at least 5 characters"),
	color: z.string().min(1, "Color is required"),
	big_deal: z.boolean(),
	status: z.enum(["published", "draft"]),
	availability: z.boolean(),
});

export function BasicCarInfoForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<CarInfo>({
		resolver: zodResolver(schema),
	});

	useEffect(() => {
		// Set initial values from URL params
		setValue("car_make", searchParams.get("make") || "");
		setValue("vehicle_type", searchParams.get("type") || "");
		setValue("color", searchParams.get("color") || "");
	}, [searchParams, setValue]);

	const onSubmit = async (data: CarInfo) => {
		const result = await saveBasicCarInfo(data);
		if (result.success) {
			console.log("Car info saved successfully:", result.carId);
			// Redirect to next step or show success message
		} else {
			console.error("Failed to save car info:", result.error);
			// Show error message to user
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<CarMakeSelector />
					{errors.car_make && (
						<p className="text-red-500 text-sm mt-1">{errors.car_make.message}</p>
					)}
				</div>
				<div>
					<Input
						{...register("car_model")}
						placeholder="Car Model"
						className="w-full"
					/>
					{errors.car_model && (
						<p className="text-red-500 text-sm mt-1">{errors.car_model.message}</p>
					)}
				</div>
				<div>
					<Input {...register("year")} placeholder="Year" className="w-full" />
					{errors.year && (
						<p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
					)}
				</div>
				<div>
					<CarTypeSelector />
					{errors.vehicle_type && (
						<p className="text-red-500 text-sm mt-1">{errors.vehicle_type.message}</p>
					)}
				</div>
				<div>
					<select
						{...register("condition")}
						className="w-full h-11 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
					>
						<option value="">Select Condition</option>
						<option value="new">New</option>
						<option value="used">Used</option>
					</select>
					{errors.condition && (
						<p className="text-red-500 text-sm mt-1">{errors.condition.message}</p>
					)}
				</div>
				<div>
					<ColorSelector />
					{errors.color && (
						<p className="text-red-500 text-sm mt-1">{errors.color.message}</p>
					)}
				</div>
			</div>
			<div>
				<Input {...register("title")} placeholder="Title" className="w-full" />
				{errors.title && (
					<p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
				)}
			</div>
			<div>
				<Textarea
					{...register("description")}
					placeholder="Description"
					className="w-full min-h-[100px]"
				/>
				{errors.description && (
					<p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
				)}
			</div>
			<div className="flex items-center space-x-4">
				<Switch {...register("big_deal")} id="big-deal" />
				<label htmlFor="big-deal">Big Deal</label>
			</div>
			<div className="flex items-center space-x-4">
				<Switch {...register("availability")} id="availability" />
				<label htmlFor="availability">Available</label>
			</div>
			<div>
				<select
					{...register("status")}
					className="w-full h-11 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
				>
					<option value="draft">Draft</option>
					<option value="published">Published</option>
				</select>
			</div>
			<Button type="submit" className="w-full">
				Save Basic Info
			</Button>
		</form>
	);
}

export default BasicCarInfoForm;
