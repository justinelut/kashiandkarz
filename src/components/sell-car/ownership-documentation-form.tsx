"use client"

import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { z } from "zod"
import { ChevronLeft, ChevronRight, FileTextIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { saveOwnershipDocumentation } from "@/lib/actions"
import { useCarStore } from "@/store/car-store"

const formSchema = z.object({
  vin: z.string().optional(),
  registration_number: z.string().min(1, "Registration number is required"),
  logbook_availability: z.enum(["yes", "no"]),
  previous_owners: z.string().min(1, "Number of previous owners is required"),
  insurance_status: z.enum(["valid", "expired", "none"]),
})

type FormValues = z.infer<typeof formSchema>

export default function OwnershipDocumentationForm() {
  const router = useRouter()

  // Zustand store
  const car_id = useCarStore((state) => state.car_id)
  const ownership = useCarStore((state) => state.ownership)
  const setOwnership = useCarStore((state) => state.setOwnership)

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
      vin: ownership?.vin || "",
      registration_number: ownership?.registration_number || "",
      logbook_availability: ownership?.logbook_availability || "yes",
      previous_owners: ownership?.previous_owners || "0",
      insurance_status: ownership?.insurance_status || "valid",
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      if (!car_id) {
        throw new Error("No car ID found")
      }

      // Save to store first
      setOwnership(data)

      // Then save to database
      return await saveOwnershipDocumentation(data, car_id)
    },
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Ownership documentation saved", {
          description: "Ownership documentation has been saved successfully.",
        })
        router.push("/dashboard/cars/new/photo-video")
      } else {
        toast.error("Error saving ownership documentation", {
          description: result.error || "An error occurred while saving ownership documentation.",
        })
      }
    },
    onError: (error) => {
      toast.error("Error saving ownership documentation", {
        description: "An unexpected error occurred. Please try again.",
      })
      console.error("Error saving ownership documentation:", error)
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
            <FileTextIcon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl">Ownership & Documentation</CardTitle>
        </div>
        <CardDescription>Provide details about the vehicle's ownership and documentation</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="vin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">VIN (Vehicle Identification Number)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter 17-character VIN"
                        className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>The VIN is a 17-character code unique to your vehicle</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="registration_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Registration Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., ABC 123D"
                        className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="logbook_availability"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">Logbook Availability</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-1">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="previous_owners"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Number of Previous Owners</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary">
                        <SelectValue placeholder="Select number of previous owners" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[0, 1, 2, 3, 4, "5+"].map((number) => (
                        <SelectItem key={number} value={number.toString()}>
                          {number}
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
              name="insurance_status"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">Insurance Status</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-1">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="valid" />
                        </FormControl>
                        <FormLabel className="font-normal">Valid</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="expired" />
                        </FormControl>
                        <FormLabel className="font-normal">Expired</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="none" />
                        </FormControl>
                        <FormLabel className="font-normal">None</FormLabel>
                      </FormItem>
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
        <Button variant="outline" onClick={() => router.push("/sell-car/step-3")} className="gap-2">
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

