import type { Metadata } from "next"
import { ReviewDetails } from "@/components/dashboard/reviews/review-details"

interface ReviewPageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: "Review Details | Dashboard",
  description: "View and moderate review details",
}

export default function ReviewPage({ params }: ReviewPageProps) {
  return <ReviewDetails reviewId={params.id} />
}

