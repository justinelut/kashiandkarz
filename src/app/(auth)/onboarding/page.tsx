"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
	const router = useRouter();

	useEffect(() => {
		// Redirect to the first step
		router.push("/onboarding/business-info");
	}, [router]);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="animate-pulse">Redirecting to onboarding...</div>
		</div>
	);
}
