import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SignupPage } from "@/components/auth/dealer-signup-form";

export const metadata: Metadata = {
	title: "Dealer Signup",
	description:
		"Join our network of car dealers and start listing your vehicles today",
};

export default function DealerSignupPage() {
	return (
		<div className="container h-screen relative flex-col items-center justify-center md:grid lg:max-w-none  lg:px-0">
			<Link
				href="/sign-in"
				className="absolute right-4 top-4 md:right-8 md:top-8 text-muted-foreground hover:text-primary"
			>
				Already a dealer? Login
			</Link>


			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">Become a Dealer</h1>
						<p className="text-sm text-muted-foreground">
							Join our network of trusted car dealers and start selling your inventory
							online
						</p>
					</div>
					<SignupPage />
					<p className="px-8 text-center text-sm text-muted-foreground">
						By clicking continue, you agree to our{" "}
						<Link
							href="/terms"
							className="underline underline-offset-4 hover:text-primary"
						>
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link
							href="/privacy"
							className="underline underline-offset-4 hover:text-primary"
						>
							Privacy Policy
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
