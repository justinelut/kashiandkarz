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
import { getCarTypes } from "@/lib/actions"

interface CarType {
  $id: string
  name: string
  slug: string
}

export function CarTypeSelector() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearch] = useDebounce(searchQuery, 500)
  const [selectedType, setSelectedType] = useState<CarType | null>(null)

  // Fetch car types with search
  const { data, isLoading, error } = useQuery({
    queryKey: ["carTypes", debouncedSearch],
    queryFn: async () => {
      try {
        const result = await getCarTypes({
          cursor: "",
          limit: 25,
          search: debouncedSearch,
        })

        if (!result || !result.success) {
          console.error("Error fetching car types:", result?.error || "Unknown error")
          return { success: false, data: [], error: result?.error || "Failed to fetch car types" }
        }

        return result
      } catch (err) {
        console.error("Exception fetching car types:", err)
        return { success: false, data: [], error: "Failed to fetch car types" }
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const carTypesData = data?.success ? data.data : []

  // Handle initial load with default value from URL using the car type's $id
  useEffect(() => {
    const typeFromUrl = searchParams.get("type")
    if (typeFromUrl && carTypesData.length > 0) {
      const type = carTypesData.find((type: CarType) => type.$id === typeFromUrl)
      if (type) {
        setSelectedType(type)
      }
    }
  }, [searchParams, carTypesData])

  // Handle type selection: update the URL search params with the car type's $id
  const handleTypeSelection = (type: CarType) => {
    setSelectedType(type)
    setOpen(false)

    const params = new URLSearchParams(searchParams.toString())
    params.set("type", type.$id)
    router.push(`/dashboard/cars/new?${params.toString()}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a car type"
          className="h-11 w-full justify-between rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
        >
          {selectedType ? <span>{selectedType.name}</span> : "Select car type"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search car type..."
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
              <CommandEmpty>Error loading car types. Please try again.</CommandEmpty>
            </CommandList>
          ) : carTypesData.length === 0 ? (
            <CommandList>
              <CommandEmpty>No car types found.</CommandEmpty>
            </CommandList>
          ) : (
            <CommandList>
              <CommandGroup>
                <ScrollArea className="h-[200px]">
                  {carTypesData.map((type: CarType) => (
                    <CommandItem
                      key={type.$id}
                      value={type.name}
                      onSelect={() => handleTypeSelection(type)}
                      className="flex cursor-pointer items-center justify-between px-4 py-2 text-sm"
                    >
                      <span>{type.name}</span>
                      <Check
                        className={cn("ml-auto h-4 w-4", selectedType?.$id === type.$id ? "opacity-100" : "opacity-0")}
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
