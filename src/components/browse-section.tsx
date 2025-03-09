import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Sparkles, Car, Zap, CarIcon as Suv, ParkingCircle, Battery, Briefcase, PiggyBank } from "lucide-react"

const browseItems = [
  {
    label: "Spring Sale",
    icon: Sparkles,
  },
  {
    label: "Used cars",
    icon: Car,
  },
  {
    label: "Electric",
    icon: Zap,
  },
  {
    label: "SUVs",
    icon: Suv,
  },
  {
    label: "Parking sensors",
    icon: ParkingCircle,
  },
  {
    label: "Hybrids",
    icon: Battery,
  },
  {
    label: "Big boot",
    icon: Briefcase,
  },
  {
    label: "Below £30k",
    icon: PiggyBank,
  },
]

export function BrowseSection() {
  return (
    <div className="border-t border-b bg-gray-50/50 backdrop-blur-sm">
      <div className="container px-4 py-4 md:px-6">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Browse:</span>
            <div className="flex gap-2">
              {browseItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.label}
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                )
              })}
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}

