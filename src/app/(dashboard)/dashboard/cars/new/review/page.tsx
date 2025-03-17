import type { Metadata } from "next";
import { StepIndicator } from "@/components/sell-car/step-indicator";
import ReviewSubmitForm from "@/components/sell-car/review";
import { getSingleCarInfo } from "@/lib/actions";
import { getUser } from "@/lib/appwrite";
import { getBusinessProfile } from "@/lib/dealer-actions";

export const metadata: Metadata = {
  title: "Sell Your Car - Pricing & Payment",
  description: "Set your selling price and payment options for your vehicle.",
};

interface PricingPaymentPageProps {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}

export default async function PricingPaymentPage({ searchParams }: PricingPaymentPageProps) {
  // Await the searchParams promise
  const resolvedSearchParams = await searchParams;
  // Extract carId (if it's an array, take the first value)
  const carId = Array.isArray(resolvedSearchParams.carId)
    ? resolvedSearchParams.carId[0]
    : resolvedSearchParams.carId;
  
  // Fetch car info using the extracted carId
  const carinfo = await getSingleCarInfo(carId);
  const user = await getUser();
  const businessProfile  = await getBusinessProfile(user?.$id!);
  
  return (
    <div className="mx-auto container max-w-5xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Sell Your Car</h1>
        <p className="mt-2 text-muted-foreground">
          Complete all steps to list your car for sale. Now, lets set your pricing and payment options.
        </p>
      </div>

      <StepIndicator currentStep={5} totalSteps={6} completedSteps={[1, 2, 3, 4, 5, 6]} />

      <div className="mt-8">
        {/* Pass the resolved carId to your review form */}
        <ReviewSubmitForm business_id={businessProfile?.$id as string} carId={carId} carinfo={carinfo} />
      </div>
    </div>
  );
}

