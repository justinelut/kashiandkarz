"use client"

import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { z } from "zod"
import { ChevronLeft, ChevronRight, GaugeIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { saveCarSpecifications } from "@/lib/actions"
import { useCarStore } from "@/store/car-store"
import { getCarColors } from "@/lib/actions"
import { cn } from "@/lib/utils"

const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric", "LPG", "CNG", "Other"]
const transmissionTypes = ["Automatic", "Manual", "CVT", "Semi-Automatic", "Dual-Clutch"]
const drivetrainTypes = ["FWD", "RWD", "AWD", "4WD"]

const formSchema = z.object({
  fuel_type: z.string().min(1, "Fuel type is required"),
  transmission_type: z.string().min(1, "Transmission type is required"),
  drivetrain: z.string().min(1, "Drivetrain is required"),
  engine_capacity: z.string().min(1, "Engine capacity is required"),
  horsepower: z.string().min(1, "Horsepower is required"),
  torque: z.string().min(1, "Torque is required"),
  mileage: z.string().optional(),
  mileage_unit: z.enum(["km", "miles"]).default("km"),
  color: z.string().min(1, "Color is required"),
})

type FormValues = z.infer<typeof formSchema>

export default function CarSpecificationsForm() {
  const router = useRouter()

  // Zustand store
  const car_id = useCarStore((state) => state.car_id)
  const specifications = useCarStore((state) => state.specifications)
  const setSpecifications = useCarStore((state) => state.setSpecifications)

  //get colors colors with tanstack
  const { data: carColors, isLoading } = useQuery({
    queryKey: ["carColors"],
    queryFn: getCarColors,
  })
  
  // Validate that we have a car ID
  useEffect(() => {
    if (!car_id) {
      toast.error("No car information found", {
        description: "Please start from the beginning to add a new car.",
      })
      router.push("/sell-car")
    }
  }, [car_id, router])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fuel_type: specifications?.fuel_type || "",
      transmission_type: specifications?.transmission_type || "",
      drivetrain: specifications?.drivetrain || "",
      engine_capacity: specifications?.engine_capacity || "",
      horsepower: specifications?.horsepower || "",
      torque: specifications?.torque || "",
      mileage: specifications?.mileage || "",
      mileage_unit: specifications?.mileage_unit || "km",
      color: specifications?.color || "",
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      if (!car_id) {
        throw new Error("No car ID found")
      }
  
      // Find the selected color object based on the color name from the form
      const selectedColor = carColors?.data?.find((c) => c.name === data.color)
  
      // Save to the store with full color details (name and hex)
      setSpecifications({
        ...data,
        color: selectedColor ? { name: selectedColor.name, hex: selectedColor.hex } : data.color,
      })
  
      // Prepare data for DB submission: replace the color field with the $id
      const submissionData = {
        ...data,
        color: selectedColor ? selectedColor.$id : data.color,
      }
  
      return await saveCarSpecifications(submissionData, car_id)
    },
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Specifications saved", {
          description: "Car specifications have been saved successfully.",
        })
        router.push("/dashboard/cars/new/car-features")
      } else {
        toast.error("Error saving specifications", {
          description: result.error || "An error occurred while saving specifications.",
        })
      }
    },
    onError: (error) => {
      toast.error("Error saving specifications", {
        description: "An unexpected error occurred. Please try again.",
      })
      console.error("Error saving car specifications:", error)
    },
  })
  

  function onSubmit(data: FormValues) {
    mutate(data)
  }

  if (!car_id) {
    return (
      <Card className="overflow-hidden border-none bg-gradient-to-br from-background to-muted/50 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-40">
            <p>Loading car information...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden border-none bg-gradient-to-br from-background to-muted/50 shadow-lg">
      <CardHeader className="space-y-1 bg-muted/30 px-6 py-5">
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-primary/10 p-1.5">
            <GaugeIcon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl">Car Specifications</CardTitle>
        </div>
        <CardDescription>Provide the technical details and specifications of your vehicle</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="fuel_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Fuel Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary">
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fuelTypes.map((type) => (
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
                name="transmission_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Transmission Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary">
                          <SelectValue placeholder="Select transmission" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {transmissionTypes.map((type) => (
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
                name="drivetrain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Drivetrain</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary">
                          <SelectValue placeholder="Select drivetrain" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {drivetrainTypes.map((type) => (
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
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="engine_capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Engine Capacity</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 2.0L"
                        className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="horsepower"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Horsepower (HP)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 180"
                        className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="torque"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Torque (Nm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 240"
                        className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormLabel className="text-base">Mileage (if used)</FormLabel>
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="mileage"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter mileage"
                          className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mileage_unit"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex space-x-4">
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="km" />
                            </FormControl>
                            <FormLabel className="font-normal">Kilometers</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="miles" />
                            </FormControl>
                            <FormLabel className="font-normal">Miles</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">Exterior Color</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
                    >
                      {carColors?.data?.map((color) => (
                        <FormItem key={color.name} className="space-y-0">
                          <FormControl>
                            <RadioGroupItem value={color.name} id={`color-${color.name}`} className="sr-only" />
                          </FormControl>
                          <FormLabel
                            htmlFor={`color-${color.name}`}
                            className={cn(
                              "flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground",
                              field.value === color.name && "border-primary",
                            )}
                          >
                            <div className="h-10 w-10 rounded-full border" style={{ backgroundColor: color.hex }} />
                            <span className="mt-2 text-center text-xs">{color.name}</span>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-4">
        <Button variant="outline" onClick={() => router.push("/sell-car")} className="gap-2">
          <ChevronLeft className="h-4 w-4" /> Back
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

