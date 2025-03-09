"use client"

import Image from "next/image"
import { Flame, ArrowRight } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

const deals = [
  {
    name: "Hyundai Tucson",
    description: "Hyundai's unusual-looking family SUV contender",
    saving: "£4,700",
    cashPrice: "£28,378",
    leasePrice: "£222",
    image:
      "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729773746/evo/2024/10/G90%20BMW%20M5%20saloon-13.jpg",
  },
  {
    name: "Kia Sportage",
    description: "Practical family SUV with stand-out styling",
    saving: "£2,400",
    cashPrice: "£27,187",
    leasePrice: "£255",
    image:
      "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729773746/evo/2024/10/G90%20BMW%20M5%20saloon-13.jpg",
  },
  {
    name: "Volkswagen Tiguan",
    description: "Practical, high-tech family SUV",
    saving: "£3,743",
    cashPrice: "£33,730",
    leasePrice: "£276",
    image:
      "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729773746/evo/2024/10/G90%20BMW%20M5%20saloon-13.jpg",
  },
]

export function BigDeals() {
  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00e1e1]/10">
            <Flame className="h-6 w-6 text-[#00e1e1]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Big deals on wheels</h2>
            <p className="text-muted-foreground">Say hello to the hottest deals on the market</p>
          </div>
        </div>
        <ScrollArea className="w-full">
          <div className="flex gap-6 pb-4">
            {deals.map((deal) => (
              <div
                key={deal.name}
                className="relative flex w-[400px] flex-col rounded-xl bg-gradient-to-b from-white to-gray-50 p-6 pt-10 shadow-lg"
              >
                <div className="absolute -top-4 left-6 z-10">
                  <div className="inline-flex items-center rounded-full bg-black px-3 py-1 text-sm text-[#00e1e1]">
                    <span className="font-medium">Avg saving {deal.saving} off RRP</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold">{deal.name}</h3>
                <p className="text-sm text-muted-foreground">{deal.description}</p>
                <div className="relative my-6 h-[200px] w-full overflow-hidden rounded-lg">
                  <Image src={deal.image || "/placeholder.svg"} alt={deal.name} fill className="object-cover" />
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Cash from</div>
                    <div className="text-lg font-bold">£{deal.cashPrice}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Lease from</div>
                    <div className="text-lg font-bold">£{deal.leasePrice}* / month</div>
                  </div>
                  <Button size="icon" className="rounded-full bg-black hover:bg-black/90">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  )
}

