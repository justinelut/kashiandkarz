import type { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"
import { getSingleCarInfo } from "@/lib/actions"
import CarDetails from "@/components/cars/car-details"

type Props = {
  params: Promise<{ id: string }>
}

// Generate metadata for SEO
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Get the car ID from params
  const { id } = await params
  
  // Fetch car data
  const { success, data } = await getSingleCarInfo(id)
  
  // If car not found, use default metadata
  if (!success || !data) {
    return {
      title: "Car Not Found",
      description: "The requested car could not be found."
    }
  }
  
  // Return car-specific metadata
  return {
    title: `${data.year} ${data.make} ${data.model} | Car Marketplace`,
    description: data?.description?.substring(0, 160), // Limit description to 160 characters for SEO
    openGraph: {
      title: `${data.year} ${data.make} ${data.model}`,
      description: data.description?.substring(0, 160),
      images: data.images.length > 0 ? [data.images[0]] : [],
    },
  }
}

export default async function CarPage({ params }: Props) {
  // Get the car ID from params
  const { id } = await params
  
  // Fetch car data
  const carinfo = await getSingleCarInfo(id)
  
  console.log(carinfo)
 
  
  return (
    <div className="container max-w-5xl py-10 mx-auto">
      <CarDetails car={carinfo.data} />
    </div>
  )
}
