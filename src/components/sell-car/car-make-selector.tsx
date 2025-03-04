"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import carMakes from "@/lib/data.json"; // Import as a JSON array
import { useCarStore } from "@/store/car-store";

interface CarMake {
  name: string;
  slug: string;
  image: {
    source?: string;
    thumb?: string;
    optimized?: string;
    original?: string;
    localThumb?: string;
    localOptimized?: string;
    localOriginal?: string;
  };
}

interface CarMakeSelectorProps {
  onSelect: (make: CarMake | null) => void;
  defaultValue?: string;
}

export function CarMakeSelector({ onSelect, defaultValue }: CarMakeSelectorProps) {
  const [open, setOpen] = useState(false);
  const [makes, setMakes] = useState<CarMake[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Zustand state
  const selected_make = useCarStore((state) => state.selected_make);
  const setSelectedMake = useCarStore((state) => state.setSelectedMake);

  // Load car makes from local JSON
  useEffect(() => {
    setLoading(true);
    try {
      setMakes(carMakes);

      // If defaultValue is provided, find and select that make
      if (defaultValue && !selected_make) {
        const make = carMakes.find((make) => make.slug === defaultValue);
        if (make) {
          setSelectedMake(make);
          onSelect(make);
        }
      }
    } catch (error) {
      console.error("Error loading car makes:", error);
    } finally {
      setLoading(false);
    }
  }, [defaultValue, selected_make, setSelectedMake, onSelect]);

  // Filter makes based on search query
  const filteredMakes = searchQuery
    ? makes.filter((make) => make.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : makes;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-11 w-full justify-between rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
        >
          {selected_make ? (
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-6 overflow-hidden rounded-sm">
                <Image
                  src={selected_make.image.optimized || "/placeholder.svg"}
                  alt={selected_make.name}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
              <span>{selected_make.name}</span>
            </div>
          ) : (
            "Select car make"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder="Search car make..."
              className="h-9"
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
          </div>
          <CommandList>
            {loading && <p className="text-center py-2">Loading car makes...</p>}
            <CommandEmpty>No car make found.</CommandEmpty>
            <ScrollArea className="h-[300px]">
              <CommandGroup>
                {filteredMakes.map((make) => (
                  <CommandItem
                    key={make.slug}
                    value={make.name}
                    onSelect={() => {
                      setSelectedMake(make);
                      onSelect(make);
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative h-6 w-6 overflow-hidden rounded-sm">
                        <Image
                          src={make.image.optimized || "/placeholder.svg"}
                          alt={make.name}
                          fill
                          className="object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      <span>{make.name}</span>
                    </div>
                    <Check
                      className={cn("ml-auto h-4 w-4", selected_make?.slug === make.slug ? "opacity-100" : "opacity-0")}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
