"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
import { fetchCarModels } from "@/lib/actions";

// API Key from environment variable


// Car Model Interface
interface CarModel {
  make: string;
  model: string;
  year: number;
  type: string;
  fuel_type: string;
  transmission: string;
  drivetrain: string;
  engine: string;
  horsepower: number;
  torque: number;
  weight?: number;
  doors?: number;
  mpg_city?: number;
  mpg_highway?: number;
  combined_mpg?: number;
}

interface CarModelSelectorProps {
  make: string;
  onSelect: (model: string, carDetails?: CarModel) => void;
  defaultValue?: string;
}

// Fetch Function for API Request


export function CarModelSelector({ make, onSelect, defaultValue }: CarModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue || "");
  const [selectedModel, setSelectedModel] = useState<string | null>(defaultValue || null);

  // Fetch car models using useQuery
  const { data: models = [], isLoading, error } = useQuery({
    queryKey: ["carModels", make, inputValue],
    queryFn: () => fetchCarModels(make, inputValue),
    enabled: !!make && inputValue.length >= 2, // Only run if make is selected and input has at least 2 chars
  });

  console.log(models)

  // Handle selecting a model
  const handleSelectModel = (model: string) => {
    setSelectedModel(model);
    const selectedCarDetails = models.find((car) => car.model === model);
    onSelect(model, selectedCarDetails);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-11 w-full justify-between rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
          >
            {selectedModel || "Select model"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command shouldFilter={false}>
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandInput
                placeholder="Search car model..."
                value={inputValue}
                onValueChange={setInputValue}
                className="h-9"
              />
            </div>
            <CommandList>
              {isLoading && "Loading models..."}
              <CommandEmpty>{error ? "Failed to fetch car models. Please try again." : "No models found."}</CommandEmpty>
              <ScrollArea className="h-[300px]">
                <CommandGroup>
                  {models.map((car) => (
                    <CommandItem
                      key={`${car.make}-${car.model}-${car.year}`}
                      value={car.model}
                      onSelect={() => handleSelectModel(car.model)}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{car.model}</span>
                        <span className="text-xs text-muted-foreground">
                          {car.type} • {car.year} • {car.engine}
                        </span>
                      </div>
                      <Check
                        className={cn("ml-auto h-4 w-4", selectedModel === car.model ? "opacity-100" : "opacity-0")}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {!make && <p className="text-xs text-muted-foreground">Please select a car make first</p>}
    </div>
  );
}
