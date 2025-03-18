"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CarInfo {
  $id: string
  title: string
  car_model: string
  car_make: {
    name: string
  }
  images: string[]
  pricing_payments?: {
    selling_price: number
    currency: string
  }
}

interface SuccessStory {
  $id: string
  author_name: string
  location: string
  quote: string
  author_image?: string
  car_info?: CarInfo
  saving_amount?: number
  currency?: string
}

interface CustomerSuccessStoriesProps {
  successStories: SuccessStory[]
}

export function CustomerSuccessStories({ successStories = [] }: CustomerSuccessStoriesProps) {
  const [activeStory, setActiveStory] = useState(0)

  // If no success stories are provided, use fallback data
  const stories =
    successStories.length > 0
      ? successStories
      : [
          {
            $id: "1",
            author_name: "Sarah Johnson",
            location: "London",
            quote:
              "I was hesitant about buying a car online, but KashiAndKarz made it so easy. The comparison tools helped me find exactly what I wanted, and I saved thousands compared to my local dealership!",
            author_image: "/placeholder.svg?height=400&width=400",
            car_info: {
              $id: "car1",
              title: "BMW 3 Series",
              car_model: "3 Series",
              car_make: {
                name: "BMW",
              },
              images: [
                "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729773746/evo/2024/10/G90%20BMW%20M5%20saloon-13.jpg",
              ],
              pricing_payments: {
                selling_price: 35000,
                currency: "GBP",
              },
            },
            saving_amount: 3450,
            currency: "GBP",
          },
          // ... other fallback stories
        ]

  const nextStory = () => {
    setActiveStory((prev) => (prev + 1) % stories.length)
  }

  const prevStory = () => {
    setActiveStory((prev) => (prev - 1 + stories.length) % stories.length)
  }

  const story = stories[activeStory]

  // Format currency
  const formatCurrency = (amount: number, currency = "GBP") => {
    const currencySymbol = currency === "GBP" ? "£" : currency === "USD" ? "$" : "€"
    return `${currencySymbol}${amount.toLocaleString()}`
  }

  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Customer Success Stories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real people, real savings. See how KashiAndKarz has helped customers find their perfect car.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src={story.car_info?.images?.[0] || "/placeholder.svg?height=800&width=1200"}
              alt={story.car_info?.title || "Car"}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              {story.saving_amount && (
                <Badge className="self-start mb-2 bg-primary text-primary-foreground">
                  Saved {formatCurrency(story.saving_amount, story.currency)}
                </Badge>
              )}
              <h3 className="text-xl font-bold text-white">
                {story.car_info?.car_make?.name} {story.car_info?.car_model}
              </h3>
              <p className="text-white/80">
                {story.author_name} from {story.location}
              </p>
            </div>
          </div>

          <Card className="relative border-none shadow-lg bg-gradient-to-br from-background to-muted">
            <CardContent className="p-8">
              <Quote className="h-12 w-12 text-primary/20 absolute top-6 left-6" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary">
                    <Image
                      src={story.author_image || "/placeholder.svg?height=200&width=200"}
                      alt={story.author_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{story.author_name}</h4>
                    <p className="text-muted-foreground">{story.location}</p>
                  </div>
                </div>

                <blockquote className="text-lg italic mb-8">"{story.quote}"</blockquote>

                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    {stories.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveStory(index)}
                        className={cn(
                          "w-3 h-3 rounded-full transition-colors",
                          index === activeStory ? "bg-primary" : "bg-muted-foreground/30",
                        )}
                        aria-label={`View story ${index + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={prevStory} className="rounded-full h-10 w-10">
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextStory} className="rounded-full h-10 w-10">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

