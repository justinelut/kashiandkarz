import { CarDetailsView } from "@/components/car-details/car-details-view"
import { ReviewsSection } from "@/components/car-details/reviews-section"
import { getCarBySlug } from "@/lib/actions"
import { notFound } from "next/navigation"

export default async function CarPage({ params }: { params: { slug: string } }) {
  const result = await getCarBySlug(params.slug)

  if (!result.success) {
    notFound()
  }

  return (
    <div className="container py-8">
      <CarDetailsView car={result.data} />

      <div className="mt-8">
        <ReviewsSection carId={result.data.$id} slug={params.slug} />
      </div>
    </div>
  )
}

