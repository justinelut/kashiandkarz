"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/appwrite-provider";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Define schema for form validation
const signupSchema = z
	.object({
		name: z.string().min(2, { message: "Name must be at least 2 characters" }),
		email: z.string().email({ message: "Please enter a valid email address" }),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" })
			.regex(/[A-Z]/, {
				message: "Password must contain at least one uppercase letter",
			})
			.regex(/[a-z]/, {
				message: "Password must contain at least one lowercase letter",
			})
			.regex(/[0-9]/, { message: "Password must contain at least one number" }),
		confirmPassword: z.string(),
		terms: z.boolean().refine((val) => val === true, {
			message: "You must accept the terms and conditions",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

// Animated input component with hover and focus effects
const InputWithAnimation = ({
	id,
	type = "text",
	placeholder,
	icon: Icon,
	error,
	register,
	...props
}) => {
	return (
		<motion.div
			className="relative"
			initial={{ opacity: 0.9, y: 5 }}
			animate={{ opacity: 1, y: 0 }}
			whileHover={{ scale: 1.01 }}
			transition={{ duration: 0.2 }}
		>
			<Icon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
			<Input
				id={id}
				type={type}
				placeholder={placeholder}
				className={cn(
					"h-12 pl-10 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white transition-all duration-200",
					error && "border-red-400 focus-visible:ring-red-400",
				)}
				{...register}
				{...props}
			/>
		</motion.div>
	);
};

// Animated button with spring animation
const AnimatedButton = ({ children, className, ...props }) => {
	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			transition={{ type: "spring", stiffness: 400, damping: 10 }}
		>
			<Button
				className={cn("h-12 rounded-xl text-base font-medium", className)}
				{...props}
			>
				{children}
			</Button>
		</motion.div>
	);
};

// Animated checkbox with bounce effect (now uses onCheckedChange and checked)
const AnimatedCheckbox = ({ id, label, error, checked, onCheckedChange }) => {
	return (
		<div className="flex items-start space-x-2">
			<motion.div
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				transition={{ type: "spring", stiffness: 500, damping: 10 }}
				className="mt-1"
			>
				<Checkbox
					id={id}
					className={cn(error && "border-red-400 text-red-400")}
					checked={checked}
					onCheckedChange={onCheckedChange}
				/>
			</motion.div>
			<div className="grid gap-1.5 leading-none">
				<Label
					htmlFor={id}
					className={cn(
						"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
						error && "text-red-500",
					)}
				>
					{label}
				</Label>
				{error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
			</div>
		</div>
	);
};

export function SignupPage() {
	const router = useRouter();
	const { signUp } = useAuth();

	// Form setup with validation
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(signupSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			terms: false,
		},
	});

	// TanStack Query mutation for signup
	const signupMutation = useMutation({
		mutationFn: async (data) => {
			await signUp(data.email, data.password, data.name);
		},
		onSuccess: (userId) => {
			toast("Account created!", {
				description: "Let's complete your profile",
			});

			// Redirect to onboarding
			router.push("/onboarding");
		},
		onError: (error) => {
			toast("Error creating account", {
				description: error.message,
			});
		},
	});

	// Form submission handler
	const onSubmit = (data) => {
		signupMutation.mutate(data);
	};

	return (
		<motion.div
			className="w-full max-w-lg"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-gradient-to-b from-white to-gray-50">
				<CardContent className="space-y-8 p-8">
					<div className="space-y-2 text-center">
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.2, duration: 0.5 }}
						>
							<h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
								Kashi & Karz
							</h1>
							<p className="text-sm text-gray-500">Car Dealership Network</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.4, duration: 0.5 }}
						>
							<h2 className="text-2xl font-bold mt-6">Create Your Account</h2>
							<p className="text-gray-500">
								Join our dealer network and reach thousands of customers.
							</p>
						</motion.div>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<div className="space-y-4">
							<InputWithAnimation
								id="name"
								placeholder="Full Name"
								icon={User}
								error={errors.name}
								register={register("name")}
							/>
							{errors.name && (
								<p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
							)}

							<InputWithAnimation
								id="email"
								type="email"
								placeholder="Email Address"
								icon={Mail}
								error={errors.email}
								register={register("email")}
							/>
							{errors.email && (
								<p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
							)}

							<InputWithAnimation
								id="password"
								type="password"
								placeholder="Password"
								icon={Lock}
								error={errors.password}
								register={register("password")}
							/>
							{errors.password && (
								<p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
							)}

							<InputWithAnimation
								id="confirmPassword"
								type="password"
								placeholder="Confirm Password"
								icon={Lock}
								error={errors.confirmPassword}
								register={register("confirmPassword")}
							/>
							{errors.confirmPassword && (
								<p className="text-sm text-red-500 mt-1">
									{errors.confirmPassword.message}
								</p>
							)}

							<Controller
								name="terms"
								control={control}
								render={({ field }) => (
									<AnimatedCheckbox
										id="terms"
										label="I agree to the terms and conditions"
										error={errors.terms}
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								)}
							/>
						</div>

						<div className="pt-4">
							<AnimatedButton
								type="submit"
								className="w-full bg-gradient-to-r from-primary to-indigo-500 hover:from-primary/90 hover:to-indigo-500/90"
								disabled={signupMutation.isPending}
							>
								{signupMutation.isPending ? (
									<span className="flex items-center justify-center">
										<span className="animate-spin mr-2">⟳</span>
										Creating Account...
									</span>
								) : (
									<span className="flex items-center justify-center">
										Sign Up
										<ArrowRight className="ml-2 h-5 w-5" />
									</span>
								)}
							</AnimatedButton>
						</div>

						<div className="flex flex-col space-y-4 text-center text-sm">
							<p className="text-gray-500">
								Already have an account?{" "}
								<a href="/login" className="font-medium text-primary hover:underline">
									Log in here
								</a>
							</p>

							<p className="text-gray-500">
								Looking to buy a car?{" "}
								<a
									href="/buyer-signup"
									className="font-medium text-primary hover:underline"
								>
									Sign up as a buyer
								</a>
							</p>
						</div>
					</form>
				</CardContent>
			</Card>
		</motion.div>
	);
}
