"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getCarColors } from "@/lib/actions"

interface CarColor {
  $id: string
  name: string
  hex: string
}

export function ColorSelector() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearch] = useDebounce(searchQuery, 500)
  const [selectedColor, setSelectedColor] = useState<CarColor | null>(null)

  // Fetch car colors with search
  const { data, isLoading, error } = useQuery({
    queryKey: ["carColors", debouncedSearch],
    queryFn: async () => {
      try {
        const result = await getCarColors({
          cursor: "",
          limit: 25,
          search: debouncedSearch,
        })

        if (!result || !result.success) {
          console.error("Error fetching car colors:", result?.error || "Unknown error")
          return { success: false, data: [], error: result?.error || "Failed to fetch car colors" }
        }

        return result
      } catch (err) {
        console.error("Exception fetching car colors:", err)
        return { success: false, data: [], error: "Failed to fetch car colors" }
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const carColorsData = data?.success ? data.data : []

  // Handle initial load with default value from URL
  useEffect(() => {
    const colorFromUrl = searchParams.get("color")
    if (colorFromUrl && carColorsData.length > 0) {
      const color = carColorsData.find((color: CarColor) => color.name.toLowerCase() === colorFromUrl.toLowerCase())
      if (color) {
        setSelectedColor(color)
      }
    }
  }, [searchParams, carColorsData])

  // Handle color selection
  const handleColorSelection = (color: CarColor) => {
    setSelectedColor(color)
    setOpen(false)

    // Update URL search params
    const params = new URLSearchParams(searchParams.toString())
    params.set("color", color.name.toLowerCase())
    router.push(`/dashboard/cars/new?${params.toString()}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a car color"
          className="h-11 w-full justify-between rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
        >
          {selectedColor ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedColor.hex }} />
              <span>{selectedColor.name}</span>
            </div>
          ) : (
            "Select car color"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search car color..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-11"
          />
          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2">Loading...</span>
            </div>
          ) : error ? (
            <CommandList>
              <CommandEmpty>Error loading car colors. Please try again.</CommandEmpty>
            </CommandList>
          ) : carColorsData.length === 0 ? (
            <CommandList>
              <CommandEmpty>No car colors found.</CommandEmpty>
            </CommandList>
          ) : (
            <CommandList>
              <CommandGroup>
                <ScrollArea className="h-[200px]">
                  {carColorsData.map((color: CarColor) => (
                    <CommandItem
                      key={color.$id}
                      value={color.name}
                      onSelect={() => handleColorSelection(color)}
                      className="flex cursor-pointer items-center justify-between px-4 py-2 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color.hex }} />
                        <span>{color.name}</span>
                      </div>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedColor?.$id === color.$id ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  )
}

