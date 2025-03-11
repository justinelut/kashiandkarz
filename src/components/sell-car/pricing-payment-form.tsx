"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ChevronLeft, ChevronRight, DollarSignIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	savePricingPayment,
	getCarInformation,
	updateCarInfo,
} from "@/lib/actions";

const currencies = [
	{ value: "USD", label: "USD ($)" },
	{ value: "EUR", label: "EUR (€)" },
	{ value: "GBP", label: "GBP (£)" },
	{ value: "KES", label: "KES (KSh)" },
];

const paymentMethods = [
	{ id: "cash", label: "Cash" },
	{ id: "bank-transfer", label: "Bank Transfer" },
	{ id: "mobile-money", label: "Mobile Money" },
	{ id: "financing", label: "Financing" },
];

const formSchema = z.object({
	selling_price: z.preprocess(
		(val) =>
			typeof val === "string" || typeof val === "number" ? Number(val) : val,
		z
			.number({ invalid_type_error: "Price must be a number" })
			.min(0, "Price must be greater than or equal to 0"),
	),
	currency: z.string().min(1, "Currency is required"),
	negotiable: z.enum(["yes", "no"]),
	installment_plans: z.enum(["yes", "no"]),
	payment_methods: z
		.array(z.string())
		.min(1, "Select at least one payment method"),
	insurance_group: z.string().min(1, "Insurance group is required"),
	road_tax: z.string().min(1, "Road tax is required"),
	warranty: z.string().min(1, "Warranty is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function PricingPaymentForm() {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Determine mode & IDs from URL parameters
	const mode = searchParams.get("mode");
	const editId = searchParams.get("id"); // used to determine edit mode
	const isEditMode = mode === "edit" && editId;
	const carId = searchParams.get("carId");

	// Local state for the pricing data (fetched in edit mode)
	const [pricingData, setPricingData] = useState<FormValues | null>(null);
	// Local state for success dialog (in edit mode)
	const [showSuccessDialog, setShowSuccessDialog] = useState(false);

	// Fetch car data in edit mode and pre-populate the form
	useEffect(() => {
		const fetchCarData = async () => {
			if (isEditMode && carId) {
				const { success, data } = await getCarInformation(carId);
				if (success && data) {
					setPricingData({
						selling_price: data?.selling_price || 0,
						currency: data?.currency || "USD",
						negotiable: data?.negotiable || "no",
						installment_plans: data?.installment_plans || "no",
						payment_methods: data?.payment_methods || ["cash"],
						insurance_group: data?.insurance_group || "",
						road_tax: data?.road_tax || "",
						warranty: data?.warranty || "",
					});
				} else {
					toast.error("Failed to fetch car information");
					router.push("/dashboard/cars");
				}
			}
		};
		fetchCarData();
	}, [isEditMode, carId, router]);

	// Validate that we have a car ID; if not, redirect to start over
	useEffect(() => {
		if (!carId) {
			toast.error("No car information found", {
				description: "Please start from the beginning to add a new car.",
			});
			router.push(isEditMode ? "/dashboard/cars" : "/sell-car");
		}
	}, [carId, router, isEditMode]);

	// Initialize the form using pricingData if available or fallback default values
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: pricingData || {
			selling_price: 0,
			currency: "USD",
			negotiable: "no",
			installment_plans: "no",
			payment_methods: ["cash"],
			insurance_group: "",
			road_tax: "",
			warranty: "",
		},
	});

	// Reset the form if pricingData changes (for edit mode)
	useEffect(() => {
		if (pricingData) {
			form.reset(pricingData);
		}
	}, [pricingData, form]);

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: FormValues) => {
			if (!carId) {
				throw new Error("No car ID found");
			}
			const result = await savePricingPayment(data, carId);
			await updateCarInfo(
				{
					pricing_payments: result?.data?.$id,
				},
				carId,
			);
			return result;
		},
		onSuccess: (result) => {
			if (result.success) {
				if (isEditMode) {
					setShowSuccessDialog(true);
				} else {
					toast.success("Pricing and payment options saved", {
						description: "Pricing and payment options have been saved successfully.",
					});
					router.push(
						`/dashboard/cars/new/ownership?carId=${carId}&specificationID=${searchParams.get(
							"specificationID",
						)}&featuresId=${searchParams.get(
							"featuresId",
						)}&photoVideoId=${searchParams.get("photoVideoId")}&pricingId=${
							result.data.$id
						}`,
					);
				}
			} else {
				toast.error("Error saving pricing and payment options", {
					description:
						result.error ||
						"An error occurred while saving pricing and payment options.",
				});
			}
		},
		onError: (error) => {
			toast.error("Error saving pricing and payment options", {
				description: "An unexpected error occurred. Please try again.",
			});
			console.error("Error saving pricing and payment options:", error);
		},
	});

	function onSubmit(data: FormValues) {
		mutate(data);
	}

	if (!carId) {
		return (
			<Card className="overflow-hidden border-none bg-gradient-to-br from-background to-muted/50 shadow-lg">
				<CardContent className="p-6">
					<div className="flex items-center justify-center h-40">
						<p>Loading car information...</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<>
			<Card className="overflow-hidden border-none bg-gradient-to-br from-background to-muted/50 shadow-lg">
				<CardHeader className="space-y-1 bg-muted/30 px-6 py-5">
					<div className="flex items-center space-x-2">
						<div className="rounded-full bg-primary/10 p-1.5">
							<DollarSignIcon className="h-5 w-5 text-primary" />
						</div>
						<CardTitle className="text-xl">Pricing &amp; Payment Options</CardTitle>
					</div>
					<CardDescription>
						Set your selling price and preferred payment methods along with insurance,
						road tax, and warranty details.
					</CardDescription>
				</CardHeader>
				<CardContent className="p-6">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<div className="grid gap-6 md:grid-cols-2">
								<FormField
									control={form.control}
									name="selling_price"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-base">Selling Price</FormLabel>
											<FormControl>
												<Input
													type="number"
													placeholder="Enter price"
													className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="currency"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-base">Currency</FormLabel>
											<Select onValueChange={field.onChange} value={field.value}>
												<FormControl>
													<SelectTrigger className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary">
														<SelectValue placeholder="Select currency" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{currencies.map((currency) => (
														<SelectItem key={currency.value} value={currency.value}>
															{currency.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="negotiable"
								render={({ field }) => (
									<FormItem className="space-y-3">
										<FormLabel className="text-base">Is the price negotiable?</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												value={field.value}
												className="flex flex-col space-y-1"
											>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="yes" />
													</FormControl>
													<FormLabel className="font-normal">Yes</FormLabel>
												</FormItem>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="no" />
													</FormControl>
													<FormLabel className="font-normal">No</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="installment_plans"
								render={({ field }) => (
									<FormItem className="space-y-3">
										<FormLabel className="text-base">
											Are installment plans available?
										</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												value={field.value}
												className="flex flex-col space-y-1"
											>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="yes" />
													</FormControl>
													<FormLabel className="font-normal">Yes</FormLabel>
												</FormItem>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="no" />
													</FormControl>
													<FormLabel className="font-normal">No</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="payment_methods"
								render={() => (
									<FormItem>
										<div className="mb-4">
											<FormLabel className="text-base">Payment Methods Accepted</FormLabel>
											<FormDescription>
												Select all payment methods you're willing to accept
											</FormDescription>
										</div>
										{paymentMethods.map((method) => (
											<FormField
												key={method.id}
												control={form.control}
												name="payment_methods"
												render={({ field }) => (
													<FormItem className="flex flex-row items-start space-x-3 space-y-0">
														<FormControl>
															<Checkbox
																checked={field.value?.includes(method.id)}
																onCheckedChange={(checked) =>
																	checked
																		? field.onChange([...field.value, method.id])
																		: field.onChange(
																				field.value.filter((value) => value !== method.id),
																		  )
																}
															/>
														</FormControl>
														<FormLabel className="font-normal">{method.label}</FormLabel>
													</FormItem>
												)}
											/>
										))}
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Additional Fields for Insurance Group, Road Tax, and Warranty */}
							<div className="grid gap-6 md:grid-cols-3">
								<FormField
									control={form.control}
									name="insurance_group"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-base">Insurance Group</FormLabel>
											<FormControl>
												<Input
													type="text"
													placeholder="Enter insurance group"
													className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="road_tax"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-base">Road Tax</FormLabel>
											<FormControl>
												<Input
													type="text"
													placeholder="Enter road tax amount"
													className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="warranty"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-base">Warranty</FormLabel>
											<FormControl>
												<Input
													type="text"
													placeholder="Enter warranty details"
													className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-4">
					<Button
						variant="outline"
						onClick={() =>
							router.push(isEditMode ? `/dashboard/cars/${carId}` : "/sell-car/step-4")
						}
						className="gap-2"
					>
						<ChevronLeft className="h-4 w-4" /> Back
					</Button>
					<Button
						onClick={form.handleSubmit(onSubmit)}
						disabled={isPending}
						className="gap-2 bg-primary px-6 text-primary-foreground hover:bg-primary/90"
					>
						{isPending ? "Saving..." : isEditMode ? "Update Pricing" : "Continue"}
						{!isPending && <ChevronRight className="h-4 w-4" />}
					</Button>
				</CardFooter>
			</Card>

			<Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Pricing &amp; Payment Updated Successfully</DialogTitle>
						<DialogDescription>
							Your pricing and payment details have been updated successfully.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button onClick={() => router.push(`/dashboard/cars/${carId}`)}>
							Go to Car Details
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
