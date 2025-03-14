"use client"

import { useState } from "react"
import {
  Bluetooth,
  Shield,
  Car,
  Lock,
  FuelIcon as Engine,
  Navigation,
  NavigationIcon as Steering,
  Music,
  Circle,
  Package,
  Users,
  Leaf,
  Truck,
  CheckCircle2,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Map feature categories to their respective icons and colors
const featureIcons = {
  interior_features: { icon: Steering, color: "text-blue-500" },
  exterior_features: { icon: Car, color: "text-indigo-500" },
  safety_features: { icon: Shield, color: "text-red-500" },
  family_car_features: { icon: Users, color: "text-green-500" },
  security_features: { icon: Lock, color: "text-purple-500" },
  engine_features: { icon: Engine, color: "text-orange-500" },
  convenience_features: { icon: Navigation, color: "text-teal-500" },
  entertainment_features: { icon: Music, color: "text-pink-500" },
  wheels_features: { icon: Circle, color: "text-amber-500" },
  sports_car_features: { icon: Car, color: "text-rose-500" },
  ecofriendly_features: { icon: Leaf, color: "text-emerald-500" },
  commercial_car_features: { icon: Truck, color: "text-cyan-500" },
  bluetooth: { icon: Bluetooth, color: "text-blue-600" },
  ideal_for: { icon: Package, color: "text-violet-500" },
}

// Format category names for display
const formatCategoryName = (key: string) => {
  return key
    .replace(/_/g, " ")
    .replace(/features/g, "")
    .trim()
    .replace(/\b\w/g, (l) => l.toUpperCase())
}

export function EnhancedFeaturesSection({ features = {} }: { features?: Record<string, string[]> }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"accordion" | "grid">("accordion")

  // If no features are provided, show a message
  if (!features || Object.keys(features).length === 0) {
    return (
      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">Features</h2>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Package className="mb-4 h-16 w-16 text-muted-foreground opacity-30" />
          <p className="text-muted-foreground">No features available for this vehicle.</p>
        </div>
      </section>
    )
  }

  // Filter out empty feature categories
  const nonEmptyFeatures = Object.entries(features).reduce(
    (acc, [key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        acc[key] = value
      }
      return acc
    },
    {} as Record<string, string[]>,
  )

  // If all feature categories are empty, show a message
  if (Object.keys(nonEmptyFeatures).length === 0) {
    return (
      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">Features</h2>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Package className="mb-4 h-16 w-16 text-muted-foreground opacity-30" />
          <p className="text-muted-foreground">No features available for this vehicle.</p>
        </div>
      </section>
    )
  }

  // Special handling for bluetooth which is often displayed separately
  const hasBluetooth = features.entertainment_features?.some((feature) => feature.toLowerCase().includes("bluetooth"))

  // Count total features
  const totalFeatures = Object.values(nonEmptyFeatures).reduce((total, features) => total + features.length, 0)

  // Filter features based on search term
  const filteredFeatures = Object.entries(nonEmptyFeatures).reduce(
    (acc, [key, items]) => {
      if (searchTerm) {
        const filteredItems = items.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))
        if (filteredItems.length > 0) {
          acc[key] = filteredItems
        }
      } else {
        acc[key] = items
      }
      return acc
    },
    {} as Record<string, string[]>,
  )

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Expand all categories
  const expandAll = () => {
    setExpandedCategories(Object.keys(filteredFeatures))
  }

  // Collapse all categories
  const collapseAll = () => {
    setExpandedCategories([])
  }

  return (
    <section className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Features & Equipment</h2>
          <p className="text-sm text-muted-foreground">
            {totalFeatures} features across {Object.keys(nonEmptyFeatures).length} categories
          </p>
        </div>

        <div className="flex gap-2">
          <Badge
            variant={viewMode === "accordion" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setViewMode("accordion")}
          >
            List View
          </Badge>
          <Badge
            variant={viewMode === "grid" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setViewMode("grid")}
          >
            Grid View
          </Badge>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search features..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {searchTerm ? (
          <Badge variant="secondary" className="whitespace-nowrap">
            {Object.values(filteredFeatures).reduce((total, features) => total + features.length, 0)} results
          </Badge>
        ) : (
          <div className="flex gap-2">
            <button onClick={expandAll} className="flex items-center gap-1 text-xs text-primary hover:underline">
              <ChevronDown className="h-3 w-3" />
              Expand All
            </button>
            <button onClick={collapseAll} className="flex items-center gap-1 text-xs text-primary hover:underline">
              <ChevronUp className="h-3 w-3" />
              Collapse All
            </button>
          </div>
        )}
      </div>

      {hasBluetooth && (
        <div className="mb-4 flex items-center gap-2 rounded-md bg-blue-50 p-3 dark:bg-blue-950">
          <Bluetooth className="h-5 w-5 text-blue-600" />
          <span className="font-medium">Bluetooth Connectivity</span>
        </div>
      )}

      {viewMode === "accordion" ? (
        <Accordion type="multiple" value={expandedCategories} className="space-y-3">
          {Object.entries(filteredFeatures).map(([key, items]) => {
            // Skip bluetooth as it's shown above
            if (key === "bluetooth") return null

            // Get the icon and color for this category
            const { icon: Icon, color } = featureIcons[key as keyof typeof featureIcons] || {
              icon: Package,
              color: "text-gray-500",
            }

            // Format the category name for display
            const categoryName = formatCategoryName(key)

            return (
              <AccordionItem
                key={key}
                value={key}
                className="rounded-lg border px-4 shadow-sm transition-all hover:shadow-md"
              >
                <AccordionTrigger className="hover:no-underline" onClick={() => toggleCategory(key)}>
                  <div className="flex items-center gap-3">
                    <div className={cn("rounded-full p-1.5", color.replace("text-", "bg-").replace("500", "100"))}>
                      <Icon className={cn("h-5 w-5", color)} />
                    </div>
                    <div>
                      <span className="font-medium">{categoryName}</span>
                      <span className="ml-2 text-sm text-muted-foreground">({items.length})</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="grid gap-2 py-3 sm:grid-cols-2">
                    {Array.isArray(items) &&
                      items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(filteredFeatures).map(([key, items]) => {
            // Skip bluetooth as it's shown above
            if (key === "bluetooth") return null

            // Get the icon and color for this category
            const { icon: Icon, color } = featureIcons[key as keyof typeof featureIcons] || {
              icon: Package,
              color: "text-gray-500",
            }

            // Format the category name for display
            const categoryName = formatCategoryName(key)

            return (
              <div key={key} className="rounded-lg border p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <div className={cn("rounded-full p-1.5", color.replace("text-", "bg-").replace("500", "100"))}>
                    <Icon className={cn("h-5 w-5", color)} />
                  </div>
                  <h3 className="font-medium">{categoryName}</h3>
                </div>
                <ul className="space-y-2">
                  {items.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                  {items.length > 3 && (
                    <li className="text-sm text-primary hover:underline">+{items.length - 3} more features</li>
                  )}
                </ul>
              </div>
            )
          })}
        </div>
      )}

      <div className="mt-6 text-sm text-muted-foreground">
        <p>
          Whilst Kashi & Karz uses reasonable efforts to ensure accuracy, all information and details must be confirmed
          when enquiring. Kashi & Karz makes no representations, warranties or guarantees, whether express or implied,
          that this information is accurate, complete or up to date.
        </p>
      </div>
    </section>
  )
}

