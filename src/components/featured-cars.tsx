import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredCars = [
  {
    id: 1,
    title: "BMW M5",
    description: "4.4L V8 Twin-Turbo",
    price: "£104,995",
    monthly: "£1,299/month",
    badge: "New",
    badgeVariant: "default",
  },
  {
    id: 2,
    title: "Audi RS6 Avant",
    description: "4.0L V8 Twin-Turbo",
    price: "£95,650",
    monthly: "£1,199/month",
    badge: "New",
    badgeVariant: "default",
  },
  {
    id: 3,
    title: "Mercedes-AMG E63",
    description: "4.0L V8 Twin-Turbo",
    price: "£98,370",
    monthly: "£1,249/month",
    badge: "New",
    badgeVariant: "default",
  },
  {
    id: 4,
    title: "Porsche Taycan",
    description: "Dual Motor AWD",
    price: "£83,580",
    monthly: "£999/month",
    badge: "Electric",
    badgeVariant: "outline",
  },
]

export function FeaturedCars() {
  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Featured new cars</h2>
          <Link href="#" className="flex items-center text-sm font-medium text-primary">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredCars.map((car) => (
            <Card key={car.id} className="overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src="https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729773746/evo/2024/10/G90%20BMW%20M5%20saloon-13.jpg"
                  alt={car.title}
                  fill
                  className="object-cover"
                />
                <Button size="icon" variant="ghost" className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80">
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Add to favorites</span>
                </Button>
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2" variant={car.badgeVariant === "outline" ? "outline" : "default"}>
                  {car.badge}
                </Badge>
                <h3 className="font-semibold">{car.title}</h3>
                <p className="text-sm text-muted-foreground">{car.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-lg font-bold">{car.price}</div>
                  <div className="text-sm text-muted-foreground">{car.monthly}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

