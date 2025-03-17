"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, User, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";
import { useMutation } from "@tanstack/react-query";
import { saveDealerContactInfo } from "@/lib/dealer-actions";
import type { DealerContactInfo } from "@/types/dealer";

const form_schema = z.object({
	contact_name: z.string().min(2, { message: "Contact name is required" }),
	email: z.string().email({ message: "Valid email is required" }),
	phone: z.string().min(10, { message: "Valid phone number is required" }),
	address: z.string().min(5, { message: "Address is required" }),
});

export default function ContactDetailsPage({
	business_id,
}: {
	business_id: string;
}) {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<DealerContactInfo>({
		resolver: zodResolver(form_schema),
		defaultValues: {
			contact_name: "",
			email: "",
			phone: "",
			address: "",
		},
	});

	const mutation = useMutation({
		mutationFn: async (data: DealerContactInfo) => {
			const results = await saveDealerContactInfo(business_id as string, data);
			return results;
		},
		onSuccess: (data) => {
			toast("Contact details saved", {
				description: "Let's continue with your inventory details",
			});
			router.push(`/onboarding/inventory-info`);
		},
		onError: (error) => {
			toast("Something went wrong", {
				description:
					error instanceof Error ? error.message : "Please try again later",
			});
		},
	});

	const on_submit = (data: DealerContactInfo) => {
		mutation.mutate(data);
	};

	return (
		<OnboardingLayout current_step="contact-details">
			<div className="space-y-6">
				<div>
					<h2 className="text-2xl font-bold">Contact Details</h2>
					<p className="text-gray-500 mt-1">How can customers reach you?</p>
				</div>

				<form onSubmit={handleSubmit(on_submit)} className="space-y-8">
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="contact_name" className="text-base">
								Contact Name
							</Label>
							<div className="relative">
								<User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
								<Input
									id="contact_name"
									placeholder="Full name"
									className="h-14 text-lg pl-12 rounded-xl"
									{...register("contact_name")}
								/>
							</div>
							{errors.contact_name && (
								<p className="text-sm text-red-500">{errors.contact_name.message}</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="email" className="text-base">
								Email Address
							</Label>
							<div className="relative">
								<Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
								<Input
									id="email"
									type="email"
									placeholder="email@example.com"
									className="h-14 text-lg pl-12 rounded-xl"
									{...register("email")}
								/>
							</div>
							{errors.email && (
								<p className="text-sm text-red-500">{errors.email.message}</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="phone" className="text-base">
								Phone Number
							</Label>
							<div className="relative">
								<Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
								<Input
									id="phone"
									placeholder="Your phone number"
									className="h-14 text-lg pl-12 rounded-xl"
									{...register("phone")}
								/>
							</div>
							{errors.phone && (
								<p className="text-sm text-red-500">{errors.phone.message}</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="address" className="text-base">
								Business Address
							</Label>
							<div className="relative">
								<MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
								<Input
									id="address"
									placeholder="Full address"
									className="h-14 text-lg pl-12 rounded-xl"
									{...register("address")}
								/>
							</div>
							{errors.address && (
								<p className="text-sm text-red-500">{errors.address.message}</p>
							)}
						</div>
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
								onClick={() => router.push("/onboarding/business_info")}
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
			</div>
		</OnboardingLayout>
	);
}
