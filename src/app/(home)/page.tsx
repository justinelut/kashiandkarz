import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { BrowseSection } from "@/components/browse-section"
import { BigDeals } from "@/components/big-deals"
import { TrustpilotReviews } from "@/components/trustpilot-reviews"
import { CarSearch } from "@/components/car-search"
import { FeaturedCars } from "@/components/featured-cars"
import { Footer } from "@/components/footer"
import { getCarFeatures } from "@/lib/actions"

export default async function Home() {
  const allcarfeatures = await getCarFeatures()
  console.log(JSON.stringify(allcarfeatures))

  return (
   <div>
      <main className="flex-1">
        <HeroSection />
        <BrowseSection />
        <BigDeals />
        <TrustpilotReviews />
        <CarSearch />
        <FeaturedCars />
      </main>
      <Footer />
    </div>
  )
}

