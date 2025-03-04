"use client"

import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ChevronLeft, ChevronRight, GaugeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { saveCarSpecifications } from "@/lib/actions"

const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric", "LPG", "CNG", "Other"]
const transmissionTypes = ["Automatic", "Manual", "CVT", "Semi-Automatic", "Dual-Clutch"]
const drivetrainTypes = ["FWD", "RWD", "AWD", "4WD"]

const formSchema = z.object({
  fuelType: z.string().min(1, "Fuel type is required"),
  transmissionType: z.string().min(1, "Transmission type is required"),
  drivetrain: z.string().min(1, "Drivetrain is required"),
  engineCapacity: z.string().min(1, "Engine capacity is required"),
  horsepower: z.string().min(1, "Horsepower is required"),
  torque: z.string().min(1, "Torque is required"),
  mileage: z.string().optional(),
  mileageUnit: z.enum(["km", "miles"]).default("km"),
})

type FormValues = z.infer<typeof formSchema>

export default function CarSpecificationsForm() {
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fuelType: "",
      transmissionType: "",
      drivetrain: "",
      engineCapacity: "",
      horsepower: "",
      torque: "",
      mileage: "",
      mileageUnit: "km",
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      await saveCarSpecifications(data)
    },
    onSuccess: () => {
      router.push("/sell-car/step-3")
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
                name="fuelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Fuel Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                name="transmissionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Transmission Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                name="engineCapacity"
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
                  name="mileageUnit"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
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

