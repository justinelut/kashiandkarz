import { getCarFeatures } from "@/lib/actions"
import { CarFeaturesForm } from "@/components/dashboard/car-features-form"

export default async function CarFeaturesPage() {
  const featuresResult = await getCarFeatures()
 

  if (!featuresResult.success) {
    return <div>Error loading car features. Please try again.</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Select Car Features</h1>
      <CarFeaturesForm data={featuresResult.data} />
    </div>
  )
}

