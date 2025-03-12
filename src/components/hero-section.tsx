import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tag, Percent } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface HeroSectionProps {
  bigDeal?: any // Using any for now, but we could define a proper type
}

export function HeroSection({ bigDeal }: HeroSectionProps) {
  // If no big deal is provided, use the default hero
  if (!bigDeal) {
    return (
      <section className="relative">
        <div className="relative h-[600px] w-full overflow-hidden">
          <Image
            src="https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729773746/evo/2024/10/G90%20BMW%20M5%20saloon-13.jpg"
            alt="BMW M5"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent">
            <div className="container relative flex h-full flex-col justify-center px-4 md:px-6">
              <div className="max-w-md space-y-6">
                <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
                  DRIVE CHANGE
                  <br />
                  WITH KASHI.
                </h1>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Sell my car
                  </Button>
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Find a car
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Use the big deal for the hero
  const heroImage =
    bigDeal.images && bigDeal.images.length > 0
      ? bigDeal.images[0]
      : "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729773746/evo/2024/10/G90%20BMW%20M5%20saloon-13.jpg"

  const price = bigDeal.pricing_payments?.selling_price
    ? formatCurrency(bigDeal.pricing_payments.selling_price, bigDeal.pricing_payments.currency || "KES")
    : "Price on request"

  const makeModel = `${bigDeal.car_make?.name || ""} ${bigDeal.car_model || ""}`.trim()
  const year = bigDeal.year || ""
  const condition = bigDeal.condition || ""

  return (
    <section className="relative">
      <div className="relative h-[600px] w-full overflow-hidden">
        <Image
          src={heroImage || "/placeholder.svg"}
          alt={bigDeal.title || "Featured Car"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent max-w-7xl">
          <div className="container relative flex h-full flex-col justify-center px-4 md:px-6 lg:px-24">
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-sm font-medium text-white">
                  <Tag className="mr-1 h-4 w-4" />
                  BIG DEAL
                </span>
                {bigDeal.pricing_payments?.negotiable === "yes" && (
                  <span className="inline-flex items-center rounded-full bg-green-600 px-3 py-1 text-sm font-medium text-white">
                    <Percent className="mr-1 h-4 w-4" />
                    NEGOTIABLE
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                {bigDeal.title || makeModel}
              </h1>

              <div className="flex flex-wrap gap-2">
                {year && <span className="rounded-md bg-white/20 px-2 py-1 text-sm text-white">{year}</span>}
                {condition && <span className="rounded-md bg-white/20 px-2 py-1 text-sm text-white">{condition}</span>}
                {bigDeal.car_specifications?.fuel_type && (
                  <span className="rounded-md bg-white/20 px-2 py-1 text-sm text-white">
                    {bigDeal.car_specifications.fuel_type}
                  </span>
                )}
                {bigDeal.car_specifications?.transmission_type && (
                  <span className="rounded-md bg-white/20 px-2 py-1 text-sm text-white">
                    {bigDeal.car_specifications.transmission_type}
                  </span>
                )}
              </div>

              <p className="text-xl text-white/90">
                {bigDeal.description ||
                  `Experience luxury and performance with this ${condition.toLowerCase()} ${year} ${makeModel}.`}
              </p>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">{price}</span>
                {bigDeal.pricing_payments?.installment_plans === "yes" && (
                  <span className="text-sm text-white/80">Installment plans available</span>
                )}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href={`/car-details/${bigDeal.$id}`}>View Details</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20">
                  Book Test Drive
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

