"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { signInSchema, SignInForm } from "@/lib/validation";
import { useAuth } from "@/lib/appwrite-provider";
import { Icons } from "@/components/constants";
import { cn } from "@/lib/utils";
import { OAuthProvider } from "appwrite";
import { redirect } from "next/navigation";

const Login = () => {
	const { loginWithOAuth, signIn } = useAuth();



	const form = useForm<SignInForm>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const signInMutation = useMutation({
		mutationFn: (data: SignInForm) => signIn(data.email, data.password),
		onSuccess: () => {
			toast.success("Logged in");
			redirect("/dashboard");
		},
	});

	const googleLoginMutation = useMutation({
		mutationFn: () => loginWithOAuth(OAuthProvider.Google),
	});

	const onLoginPress = (data: SignInForm) => {
		signInMutation.mutate(data);
	};

	const handleGoogleLogin = () => {
		googleLoginMutation.mutate();
	};

	const isLoading =
		signInMutation.status === "pending" ||
		googleLoginMutation.status === "pending";
	const error = signInMutation.error || googleLoginMutation.error;
	const success =
		signInMutation.status === "success" ||
		googleLoginMutation.status === "success";

	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="flex flex-col items-center mb-4">
						<Image
							src={Icons.Logo}
							alt="Logo"
							width={96}
							height={96}
							className="mb-4 rounded-full"
						/>
						<CardTitle className="text-2xl">Kashi and Karz</CardTitle>
						<CardDescription>Sign in to continue</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onLoginPress)} className="space-y-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className="relative">
												<Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
												<Input
													{...field}
													className={cn(
														"pl-10",
														form.formState.errors.email && "ring-2 ring-destructive",
													)}
													placeholder="Enter your email"
													type="email"
													disabled={isLoading}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className="relative">
												<Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
												<Input
													{...field}
													className={cn(
														"pl-10",
														form.formState.errors.password && "ring-2 ring-destructive",
													)}
													type="password"
													placeholder="Enter your password"
													autoComplete="current-password"
													disabled={isLoading}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Link
								href="/forgot-password"
								className="text-sm text-blue-600 hover:underline"
							>
								Forgot Password?
							</Link>

							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? "Signing In..." : "Sign In"}
							</Button>

							<div className="flex items-center my-4">
								<div className="flex-grow border-t border-gray-300"></div>
								<span className="mx-4 text-gray-500">or</span>
								<div className="flex-grow border-t border-gray-300"></div>
							</div>

							<Button
								type="button"
								variant="outline"
								className="w-full"
								onClick={handleGoogleLogin}
								disabled={isLoading}
							>
								<Image
									src={Icons.google}
									height={20}
									width={20}
									alt="google login"
									className="h-5 w-5 mr-2"
								/>
								Continue with Google
							</Button>

							<div className="text-center mt-4">
								<span className="text-gray-500">Don't have an account? </span>
								<Link
									href="/sign-up"
									className="text-blue-600 font-bold hover:underline"
								>
									Sign Up
								</Link>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>

			<Dialog open={!!error} onOpenChange={() => signInMutation.reset()}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>An Error Occurred</DialogTitle>
						<DialogDescription>
							{error instanceof Error
								? error.message
								: "An error occurred during sign in"}
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>

			<Dialog open={success} onOpenChange={() => signInMutation.reset()}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Successfully Logged In</DialogTitle>
						<DialogDescription>
							You have been successfully logged into your account.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Login;
