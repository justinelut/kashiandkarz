"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";
import { useMutation } from "@tanstack/react-query";
import { SaveDealerInventoryInfo } from "@/lib/dealer-actions";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { DealerInventoryInfo } from "@/types/dealer";

const car_makes = [
	{ id: "toyota", label: "Toyota" },
	{ id: "honda", label: "Honda" },
	{ id: "ford", label: "Ford" },
	{ id: "bmw", label: "BMW" },
	{ id: "mercedes", label: "Mercedes-Benz" },
	{ id: "audi", label: "Audi" },
	{ id: "lexus", label: "Lexus" },
	{ id: "nissan", label: "Nissan" },
	{ id: "hyundai", label: "Hyundai" },
	{ id: "kia", label: "Kia" },
	{ id: "mazda", label: "Mazda" },
	{ id: "subaru", label: "Subaru" },
];

const vehicle_types = [
	{ id: "sedan", label: "Sedan" },
	{ id: "suv", label: "SUV" },
	{ id: "truck", label: "Truck" },
	{ id: "van", label: "Van" },
	{ id: "coupe", label: "Coupe" },
	{ id: "convertible", label: "Convertible" },
	{ id: "hybrid", label: "Hybrid" },
	{ id: "electric", label: "Electric" },
];

const formSchema = z.object({
	car_makes: z
		.array(z.string())
		.min(1, { message: "Select at least one car make" }),
	vehicle_types: z
		.array(z.string())
		.min(1, { message: "Select at least one vehicle type" }),
});

export default function InventoryInfoPage({
	business_id,
}: {
	business_id: string;
}) {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			car_makes: [],
			vehicle_types: [],
		},
	});

	const mutation = useMutation({
		mutationFn: async (data: DealerInventoryInfo) => {
			return await SaveDealerInventoryInfo(business_id, data);
		},
		onSuccess: () => {
			toast("Inventory details saved", {
				description: "Let's finish with your preferences",
			});
			router.push(`/onboarding/dealer-preferences`);
		},
		onError: (error) => {
			toast("Something went wrong", {
				description:
					error instanceof Error ? error.message : "Please try again later",
			});
		},
	});

	function onSubmit(data: z.infer<typeof formSchema>) {
		mutation.mutate({
			car_makes: data.car_makes,
			vehicle_types: data.vehicle_types,
		});
	}

	return (
		<OnboardingLayout current_step="inventory-info">
			<div className="space-y-6">
				<div>
					<h2 className="text-2xl font-bold">Inventory Details</h2>
					<p className="text-gray-500 mt-1">What types of vehicles do you sell?</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="space-y-6">
							<FormField
								control={form.control}
								name="car_makes"
								render={() => (
									<FormItem className="space-y-3">
										<FormLabel className="text-base">Car Makes</FormLabel>
										<p className="text-sm text-gray-500">Select all the makes you sell</p>
										<div className="grid grid-cols-3 gap-3">
											{car_makes.map((make) => (
												<FormField
													key={make.id}
													control={form.control}
													name="car_makes"
													render={({ field }) => {
														return (
															<FormItem
																key={make.id}
																className={`
                                  flex items-center space-x-2 rounded-lg border-2 p-3 cursor-pointer transition-colors
                                  ${
																																			field.value?.includes(make.id)
																																				? "border-primary bg-primary/5"
																																				: "border-gray-200 hover:border-gray-300"
																																		}
                                `}
															>
																<FormControl>
																	<Checkbox
																		checked={field.value?.includes(make.id)}
																		onCheckedChange={(checked) => {
																			const updatedValue = checked
																				? [...field.value, make.id]
																				: field.value?.filter((value) => value !== make.id);
																			field.onChange(updatedValue);
																		}}
																		className="h-5 w-5"
																	/>
																</FormControl>
																<FormLabel
																	htmlFor={`make-${make.id}`}
																	className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
																>
																	{make.label}
																</FormLabel>
															</FormItem>
														);
													}}
												/>
											))}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="vehicle_types"
								render={() => (
									<FormItem className="space-y-3">
										<FormLabel className="text-base">Vehicle Types</FormLabel>
										<p className="text-sm text-gray-500">Select all the types you sell</p>
										<div className="grid grid-cols-2 gap-3">
											{vehicle_types.map((type) => (
												<FormField
													key={type.id}
													control={form.control}
													name="vehicle_types"
													render={({ field }) => {
														return (
															<FormItem
																key={type.id}
																className={`
                                  flex items-center space-x-2 rounded-lg border-2 p-3 cursor-pointer transition-colors
                                  ${
																																			field.value?.includes(type.id)
																																				? "border-primary bg-primary/5"
																																				: "border-gray-200 hover:border-gray-300"
																																		}
                                `}
															>
																<FormControl>
																	<Checkbox
																		checked={field.value?.includes(type.id)}
																		onCheckedChange={(checked) => {
																			const updatedValue = checked
																				? [...field.value, type.id]
																				: field.value?.filter((value) => value !== type.id);
																			field.onChange(updatedValue);
																		}}
																		className="h-5 w-5"
																	/>
																</FormControl>
																<FormLabel
																	htmlFor={`type-${type.id}`}
																	className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
																>
																	{type.label}
																</FormLabel>
															</FormItem>
														);
													}}
												/>
											))}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex gap-4">
							<motion.div
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className="flex-1"
							>
								<Button
									type="button"
									variant="outline"
									className="w-full h-14 text-lg rounded-xl"
									onClick={() => router.push("/onboarding/contact_details")}
								>
									<ArrowLeft className="mr-2 h-5 w-5" />
									Back
								</Button>
							</motion.div>

							<motion.div
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className="flex-1"
							>
								<Button
									type="submit"
									className="w-full h-14 text-lg rounded-xl bg-gradient-to-r from-primary to-indigo-500 hover:from-primary/90 hover:to-indigo-500/90"
									disabled={mutation.isPending}
								>
									{mutation.isPending ? (
										<span className="flex items-center justify-center">
											<span className="animate-spin mr-2">⟳</span>
											Saving...
										</span>
									) : (
										<span className="flex items-center justify-center">
											Continue
											<ArrowRight className="ml-2 h-5 w-5" />
										</span>
									)}
								</Button>
							</motion.div>
						</div>
					</form>
				</Form>
			</div>
		</OnboardingLayout>
	);
}
