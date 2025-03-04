"use client"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CarIcon, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { saveBasicCarInfo } from "@/lib/actions"

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
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.string().min(1, "Year is required"),
  vehicleType: z.string().min(1, "Vehicle type is required"),
  condition: z.string().min(1, "Condition is required"),
})

type FormValues = z.infer<typeof formSchema>

export default function BasicCarInfoForm() {
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      make: "",
      model: "",
      year: "",
      vehicleType: "",
      condition: "",
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      await saveBasicCarInfo(data)
    },
    onSuccess: () => {
      router.push("/sell-car/step-2")
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
                name="make"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Make (Brand)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Toyota, Honda, Mercedes-Benz"
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
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Model</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Corolla, Civic, C-Class"
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
                    <FormLabel className="text-base">Year of Manufacture</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                name="vehicleType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Vehicle Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <Button variant="outline" disabled>
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

