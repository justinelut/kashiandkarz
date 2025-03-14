import type { Metadata } from "next"
import { ReviewList } from "@/components/dashboard/reviews/review-list"
import { ReviewStatsCard } from "@/components/dashboard/reviews/review-stats-card"

export const metadata: Metadata = {
  title: "Review Management | Dashboard",
  description: "Manage customer reviews for your vehicles",
}

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Review Management</h1>
        <p className="text-muted-foreground mt-2">Manage and moderate customer reviews for your vehicles.</p>
      </div>

      <ReviewStatsCard />

      <ReviewList />
    </div>
  )
}

