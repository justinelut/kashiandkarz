"use client"

import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { z } from "zod"
import { ChevronRight } from "lucide-react"
import { toast } from "sonner"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { saveBasicCarInfo, updateBasicCarInfo, getCarInformation } from "@/lib/actions"
import { CarMakeSelector } from "./car-make-selector"
import { useCarStore } from "@/store/car-store"
import { Textarea } from "../ui/textarea"

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
  title: z.string().min(10, "Title must be at least 10 characters").max(100, "Title must be less than 100 characters"),
  car_make: z.string().min(1, "Make is required"),
  car_model: z.string().min(1, "Model is required"),
  year: z.string().min(1, "Year is required"),
  vehicle_type: z.string().min(1, "Vehicle type is required"),
  condition: z.string().min(1, "Condition is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
})

type FormValues = z.infer<typeof formSchema>

export default function BasicCarInfoForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode")
  const id = searchParams.get("id")
  const isEditMode = mode === "edit" && id

  const { basic_info, setBasicInfo, car_id, setCarId, selected_make, setSelectedMake, clearStore } = useCarStore()
  const [isLoading, setIsLoading] = useState(false)

  // Set initial values from store
  useEffect(() => {
    if (basic_info) {
      form.reset(basic_info)
    }
  }, [basic_info])

  // Fetch initial data in edit mode
  useEffect(() => {
    const fetchCarData = async () => {
      if (isEditMode) {
        setIsLoading(true)
        const { success, data } = await getCarInformation(id)
        if (success && data) {
          setBasicInfo({
            car_make: data.make,
            car_model: data.car_model,
            year: data.year.toString(),
            vehicle_type: data.vehicle_type,
            condition: data.condition,
            description: data.description,
            title: data.title
          })
          setCarId(id)
        } else {
          toast.error("Failed to fetch car information")
          router.push("/dashboard/cars")
        }
        setIsLoading(false)
      }
    }

    fetchCarData()
  }, [isEditMode, id])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: basic_info || {
      car_make: "",
      car_model: "",
      year: "",
      vehicle_type: "",
      condition: "",
      description: "",
      title: ""
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      if (!selected_make?.$id) {
        throw new Error("Please select a car make first")
      }

      setBasicInfo(data)

      if (isEditMode) {
        const result = await updateBasicCarInfo({ ...data, id: car_id! })
        if (result.success) {
          clearStore()
          return result
        }
      } else {
        const result = await saveBasicCarInfo(data)
        if (result.success && result.carId) {
          setCarId(result.carId)
          router.push("/dashboard/cars/new/car-specification")
          return result
        }
      }
      throw new Error(result?.error || "Failed to save car information")
    },
    onSuccess: () => {
      toast.success("Success!", {
        description: isEditMode 
          ? "Car information has been updated successfully."
          : "Basic car information has been saved successfully.",
      })
    },
    onError: (error: Error) => {
      toast.error("Error saving car information", {
        description: error.message || "An error occurred while saving car information.",
      })
    },
  })

  function onSubmit(data: FormValues) {
    mutate(data)
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
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a catchy title for your listing (e.g., 2018 Rolls-Royce Ghost in Jet Black)"
                      className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                          field.onChange(make.name);
                          setSelectedMake(make);
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

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a detailed description of your vehicle..."
                      className="min-h-[120px] w-full rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  {isEditMode ? "Update" : "Continue"}
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