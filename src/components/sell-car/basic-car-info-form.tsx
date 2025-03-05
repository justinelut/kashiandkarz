"use client"

import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { z } from "zod"
import { CarIcon, ChevronRight } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { saveBasicCarInfo } from "@/lib/actions"
import { CarMakeSelector } from "./car-make-selector"
import { useCarStore } from "@/store/car-store"

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString())

const vehicleTypes = [
  "Sedan",
  "SUV",
  "Truck",
  "Van",
  "Coupe",
  "Wagon",
  "Convertible",
  "Hatchback",
  "Crossover",
  "Minivan",
  "Pickup",
  "Sports Car",
  "Luxury Car",
  "Electric Vehicle",
  "Hybrid",
  "Other",
]

const conditions = ["Brand New", "Used", "Certified Pre-Owned"]

const formSchema = z.object({
  car_make: z.string().min(1, "Make is required"),
  car_model: z.string().min(1, "Model is required"),
  year: z.string().min(1, "Year is required"),
  vehicle_type: z.string().min(1, "Vehicle type is required"),
  condition: z.string().min(1, "Condition is required"),
})

type FormValues = z.infer<typeof formSchema>

export default function BasicCarInfoForm() {
  const router = useRouter()

  // Zustand store
  const selected_make = useCarStore((state) => state.selected_make)
  const setCarId = useCarStore((state) => state.setCarId)
  const setBasicInfo = useCarStore((state) => state.setBasicInfo)
  const basic_info = useCarStore((state) => state.basic_info)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      car_make: basic_info?.car_make || "",
      car_model: basic_info?.car_model || "",
      year: basic_info?.year || "",
      vehicle_type: basic_info?.vehicle_type || "",
      condition: basic_info?.condition || "",
    },
  })

  // Pre-fill form with data from store if available
  useEffect(() => {
    if (basic_info) {
      form.setValue("car_make", basic_info.car_make)
      form.setValue("car_model", basic_info.car_model)
      form.setValue("year", basic_info.year)
      form.setValue("vehicle_type", basic_info.vehicle_type)
      form.setValue("condition", basic_info.condition)
    }
  }, [basic_info, form])

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      // Make sure we have a selected make
      if (!selected_make?.$id) {
        throw new Error("Please select a car make first")
      }

      // Prepare the basic info data with the correct structure
      const basicInfoData = {
        ...data,
        car_make: selected_make.$id, // Use the database ID from the saved make
        car_model: selected_make.name
      }

      console.log(basicInfoData)

      // Save to store first
      setBasicInfo(basicInfoData)

      // Then save to the database
      const result = await saveBasicCarInfo(basicInfoData)

      if (result.success && result.carId) {
        // Set the car ID in the store
        setCarId(result.carId)
        return result
      }
      throw new Error(result.error || "Failed to save car information")
    },
    onSuccess: () => {
      toast.success("Success!", {
        description: "Basic car information has been saved successfully.",
      })
      router.push("/dashboard/cars/new/car-specification")
    },
    onError: (error: Error) => {
      toast.error("Error saving car information", {
        description: error.message || "An error occurred while saving car information.",
      })
    },
  })

  function onSubmit(data: FormValues) {
    console.log(data)
    // mutate(data)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Basic Car Information</CardTitle>
        <CardDescription>
          Let&apos;s start with the basic information about your car. This will help buyers find your listing more easily.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="car_make"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-base">Make (Brand)</FormLabel>
                    <FormControl>
                      <CarMakeSelector
                        onSelect={(make) => {
                          if (make) {
                            field.onChange(make.$id) // Use the database ID
                          }
                        }}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="car_model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Model</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter car model"
                        className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Year</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vehicle_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Vehicle Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vehicleTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Condition</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {conditions.map((condition) => (
                          <SelectItem key={condition} value={condition}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                "Saving..."
              ) : (
                <>
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
