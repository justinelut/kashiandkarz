"use client"

import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { z } from "zod"
import { CarIcon, ChevronRight } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { saveBasicCarInfo } from "@/lib/actions"
import { CarMakeSelector } from "./car-make-selector"
import { CarModelSelector } from "./car-model-selector"
import { CarDetailsPreview } from "./car-details-preview"
import { useCarStore } from "@/store/car-store"

const currentYear = new Date().getFullYear()
const yearOptions = Array.from({ length: 30 }, (_, i) => currentYear - i)

const vehicleTypes = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Pickup",
  "Truck",
  "Coupe",
  "Convertible",
  "Wagon",
  "Van",
  "Minivan",
  "Crossover",
  "Other",
]

const conditions = ["Brand New", "Used", "Certified Pre-Owned"]

const formSchema = z.object({
  make_id: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.string().min(1, "Year is required"),
  vehicle_type: z.string().min(1, "Vehicle type is required"),
  condition: z.string().min(1, "Condition is required"),
})

type FormValues = z.infer<typeof formSchema>

export default function BasicCarInfoForm() {
  const router = useRouter()
  const [carDetails, setCarDetails] = useState<any>(null)

  // Zustand store
  const selected_make = useCarStore((state) => state.selected_make)
  const setCarId = useCarStore((state) => state.setCarId)
  const setApiData = useCarStore((state) => state.setApiData)
  const setBasicInfo = useCarStore((state) => state.setBasicInfo)
  const basic_info = useCarStore((state) => state.basic_info)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      make_id: basic_info?.make_id || "",
      model: basic_info?.model || "",
      year: basic_info?.year || "",
      vehicle_type: basic_info?.vehicle_type || "",
      condition: basic_info?.condition || "",
    },
  })

  // Auto-fill form when car details are available
  useEffect(() => {
    if (carDetails) {
      form.setValue("year", carDetails.year.toString())
      form.setValue("vehicle_type", carDetails.type || "")

      // If the vehicle type from API doesn't match our options, set to "Other"
      if (!vehicleTypes.includes(carDetails.type)) {
        form.setValue("vehicle_type", "Other")
      }
    }
  }, [carDetails, form])

  // Pre-fill form with data from store if available
  useEffect(() => {
    if (basic_info) {
      form.setValue("make_id", basic_info.make_id)
      form.setValue("model", basic_info.model)
      form.setValue("year", basic_info.year)
      form.setValue("vehicle_type", basic_info.vehicle_type)
      form.setValue("condition", basic_info.condition)
    }
  }, [basic_info, form])

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      // Save the form data to the store first
      setBasicInfo({
        ...data,
        make_name: selected_make?.name,
        make_image: selected_make?.image,
      })

      // Save API data if available
      if (carDetails) {
        setApiData({
          fuel_type: carDetails.fuel_type,
          transmission_type: carDetails.transmission,
          drivetrain: carDetails.drivetrain,
          engine_capacity: carDetails.engine,
          horsepower: carDetails.horsepower.toString(),
          torque: carDetails.torque.toString(),
        })
      }

      // Then save to the database
      const result = await saveBasicCarInfo(data)
      return result
    },
    onSuccess: (result) => {
      if (result.success) {
        // Store the car ID in the Zustand store
        setCarId(result.data.$id)

        toast.success("Car information saved", {
          description: "Basic car information has been saved successfully.",
        })

        router.push("/dashboard/cars/new/car-specification")
      } else {
        toast.error("Error saving car information", {
          description: result.error || "An error occurred while saving car information.",
        })
      }
    },
    onError: (error) => {
      toast.error("Error saving car information", {
        description: "An unexpected error occurred. Please try again.",
      })
      console.error("Error saving car info:", error)
    },
  })

  function onSubmit(data: FormValues) {
    mutate(data)
  }

  return (
    <Card className="overflow-hidden border-none bg-gradient-to-br from-background to-muted/50 shadow-lg">
      <CardHeader className="space-y-1 bg-muted/30 px-6 py-5">
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-primary/10 p-1.5">
            <CarIcon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl">Basic Car Information</CardTitle>
        </div>
        <CardDescription>Let's start with the essential details about your vehicle</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="make_id"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-base">Make (Brand)</FormLabel>
                    <FormControl>
                      <CarMakeSelector
                        onSelect={(make) => {
                          if (make) {
                            field.onChange(make.$id)
                            // Reset model when make changes
                            form.setValue("model", "")
                            setCarDetails(null)
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
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Model</FormLabel>
                    <FormControl>
                      <CarModelSelector
                        make={selected_make?.name || ""}
                        onSelect={(model, details) => {
                          field.onChange(model)
                          setCarDetails(details)
                        }}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {carDetails && <CarDetailsPreview carDetails={carDetails} makeLogo={selected_make?.image} />}

            <div className="grid gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Year of Manufacture</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {yearOptions.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary">
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary">
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
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-4">
        <Button variant="outline" disabled className="gap-2">
          Back
        </Button>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={isPending}
          className="gap-2 bg-primary px-6 text-primary-foreground hover:bg-primary/90"
        >
          {isPending ? "Saving..." : "Continue"}
          {!isPending && <ChevronRight className="h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  )
}

