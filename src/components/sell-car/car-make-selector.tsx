"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getCarMakes } from "@/lib/actions"

interface CarMake {
  $id: string
  name: string
  slug: string
  image: string
}

export function CarMakeSelector() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearch] = useDebounce(searchQuery, 500)
  const [selectedMake, setSelectedMake] = useState<CarMake | null>(null)

  // Fetch car makes with search
  const { data, isLoading, error } = useQuery({
    queryKey: ["carMakes", debouncedSearch],
    queryFn: async () => {
      try {
        const result = await getCarMakes({
          cursor: "",
          limit: 25,
          search: debouncedSearch,
        })

        if (!result || !result.success) {
          console.error("Error fetching car makes:", result?.error || "Unknown error")
          return { success: false, data: [], error: result?.error || "Failed to fetch car makes" }
        }

        return result
      } catch (err) {
        console.error("Exception fetching car makes:", err)
        return { success: false, data: [], error: "Failed to fetch car makes" }
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const carMakesData = data?.success ? data.data : []

  // Handle initial load with default value from URL using the car make's $id
  useEffect(() => {
    const makeFromUrl = searchParams.get("make")
    if (makeFromUrl && carMakesData.length > 0) {
      const make = carMakesData.find((make: CarMake) => make.$id === makeFromUrl)
      if (make) {
        setSelectedMake(make)
      }
    }
  }, [searchParams, carMakesData])

  // Handle make selection: update the URL with the make's $id
  const handleMakeSelection = (make: CarMake) => {
    setSelectedMake(make)
    setOpen(false)

    // Update URL search params
    const params = new URLSearchParams(searchParams.toString())
    params.set("make", make.$id)
    router.push(`/dashboard/cars/new?${params.toString()}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a car make"
          className="h-11 w-full justify-between rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
        >
          {selectedMake ? (
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-6 overflow-hidden rounded-sm">
                <Image
                  src={selectedMake.image || "/placeholder.svg"}
                  alt={selectedMake.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span>{selectedMake.name}</span>
            </div>
          ) : (
            "Select car make"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search car make..."
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
              <CommandEmpty>Error loading car makes. Please try again.</CommandEmpty>
            </CommandList>
          ) : carMakesData.length === 0 ? (
            <CommandList>
              <CommandEmpty>No car makes found.</CommandEmpty>
            </CommandList>
          ) : (
            <CommandList>
              <CommandGroup>
                <ScrollArea className="h-[200px]">
                  {carMakesData.map((make: CarMake) => (
                    <CommandItem
                      key={make.$id}
                      value={make.name}
                      onSelect={() => handleMakeSelection(make)}
                      className="flex cursor-pointer items-center justify-between px-4 py-2 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div className="relative h-6 w-6 overflow-hidden rounded-sm">
                          <Image
                            src={make.image || "/placeholder.svg"}
                            alt={make.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span>{make.name}</span>
                      </div>
                      <Check
                        className={cn("ml-auto h-4 w-4", selectedMake?.$id === make.$id ? "opacity-100" : "opacity-0")}
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
