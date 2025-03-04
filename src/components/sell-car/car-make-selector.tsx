"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import Image from "next/image"
import { useMutation } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import carMakes from "@/app/(dashboard)/data.json"

type CarMake = {
  id?: string
  name: string
  slug: string
  image: {
    thumb: string
  }
}

interface CarMakeSelectorProps {
  onSelect: (make: CarMake | null) => void
}

export function CarMakeSelector({ onSelect }: CarMakeSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedMake, setSelectedMake] = React.useState<CarMake | null>(null)

  // This mutation would save the car make to your database
  const { mutate: saveMake, isPending } = useMutation({
    mutationFn: async (make: Omit<CarMake, 'id'>) => {
      // Replace this with your actual API call
      const response = await fetch('/api/car-makes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(make),
      })
      const data = await response.json()
      return data
    },
    onSuccess: (data) => {
      // Update the selected make with the returned ID
      setSelectedMake(prev => prev ? { ...prev, id: data.id } : null)
      onSelect(selectedMake)
    },
  })

  const handleSelect = (make: CarMake) => {
    setSelectedMake(make)
    // Save the make to get an ID
    saveMake({
      name: make.name,
      slug: make.slug,
      image: make.image
    })
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={isPending}
        >
          {selectedMake ? (
            <div className="flex items-center gap-2">
              <Image
                src={selectedMake.image.thumb}
                alt={selectedMake.name}
                width={24}
                height={24}
                className="object-contain"
              />
              {selectedMake.name}
            </div>
          ) : (
            "Select car make..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search car make..." className="h-9" />
          <CommandList>
            <CommandEmpty>No car make found.</CommandEmpty>
            <CommandGroup>
              {carMakes.map((make) => (
                <CommandItem
                  key={make.slug}
                  value={make.name}
                  onSelect={() => handleSelect(make)}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={make.image.thumb}
                      alt={make.name}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                    {make.name}
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedMake?.slug === make.slug ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
