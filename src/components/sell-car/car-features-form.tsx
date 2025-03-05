"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useMutation, useQueries } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { z } from "zod"
import { ChevronLeft, ChevronRight, ListChecksIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { saveCarFeatures, getExteriorFeatures, getInteriorFeatures, getSafetyFeatures, getCarInformation } from "@/lib/actions"
import { useCarStore } from "@/store/car-store"

interface Feature {
  $id: string
  name: string
}

const formSchema = z.object({
  exterior_features: z.array(z.string()),
  interior_features: z.array(z.string()),
  safety_features: z.array(z.string()),
})

type FormValues = z.infer<typeof formSchema>

export default function CarFeaturesForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode")
  const id = searchParams.get("id")
  const isEditMode = mode === "edit" && id
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  // Zustand store
  const carId = useCarStore((state) => state.car_id)
  const features = useCarStore((state) => state.features)
  const setFeatures = useCarStore((state) => state.setFeatures)
  const setCarId = useCarStore((state) => state.setCarId)

  // Fetch car data in edit mode
  useEffect(() => {
    const fetchCarData = async () => {
      if (isEditMode) {
        const { success, data } = await getCarInformation(id)
        console.log(data)
        if (success && data) {
          setFeatures({
            exterior_features: data?.exterior_features || [],
            interior_features: data ?.interior_features || [],
            safety_features: data?.safety_features || [],
          })
          setCarId(id)
        } else {
          toast.error("Failed to fetch car information")
          router.push("/dashboard/cars")
        }
      }
    }

    fetchCarData()
  }, [isEditMode, id])

  // Fetch all features
  const featureQueries = useQueries({
    queries: [
      {
        queryKey: ["exteriorFeatures"],
        queryFn: getExteriorFeatures,
      },
      {
        queryKey: ["interiorFeatures"],
        queryFn: getInteriorFeatures,
      },
      {
        queryKey: ["safetyFeatures"],
        queryFn: getSafetyFeatures,
      },
    ],
  })

  const [exteriorFeaturesQuery, interiorFeaturesQuery, safetyFeaturesQuery] = featureQueries
  const isLoading = featureQueries.some((query) => query.isLoading)
  const isError = featureQueries.some((query) => query.isError)

  const exteriorFeatures = exteriorFeaturesQuery.data?.success ? exteriorFeaturesQuery.data.data : []
  const interiorFeatures = interiorFeaturesQuery.data?.success ? interiorFeaturesQuery.data.data : []
  const safetyFeatures = safetyFeaturesQuery.data?.success ? safetyFeaturesQuery.data.data : []

  // Validate that we have a car ID
  useEffect(() => {
    if (!carId) {
      toast.error("No car information found", {
        description: "Please start from the beginning to add a new car.",
      })
      router.push("/dashboard/cars/new")
    }
  }, [carId, router])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exterior_features: features?.exterior_features || [],
      interior_features: features?.interior_features || [],
      safety_features: features?.safety_features || [],
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      if (!carId) {
        throw new Error("No car ID found")
      }

      // Save to store first
      setFeatures(data)

      // Then save to database
      const result = await saveCarFeatures(data, carId)
      if (!result.success) {
        throw new Error(result.error || "Failed to save features")
      }
      return result
    },
    onSuccess: () => {
      if (isEditMode) {
        setShowSuccessDialog(true)
      } else {
        toast.success("Features saved", {
          description: "Car features have been saved successfully.",
        })
        router.push("/dashboard/cars/new/ownership")
      }
    },
    onError: (error: Error) => {
      toast.error("Error saving features", {
        description: error.message || "An unexpected error occurred. Please try again.",
      })
      console.error("Error saving car features:", error)
    },
  })

  function onSubmit(data: FormValues) {
    mutate(data)
  }

  if (!carId || isLoading) {
    return (
      <Card className="overflow-hidden border-none bg-gradient-to-br from-background to-muted/50 shadow-lg">
        <CardHeader className="space-y-1 bg-muted/30 px-6 py-5">
          <div className="flex items-center gap-2">
            <ListChecksIcon className="h-5 w-5" />
            <CardTitle className="text-xl">Car Features</CardTitle>
          </div>
          <CardDescription>Select all the features that your car has.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-8">
            {/* Exterior Features Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="grid gap-4 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </div>

            {/* Interior Features Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="grid gap-4 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Features Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="grid gap-4 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-4">
          <Button variant="outline" disabled className="gap-2">
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
          <Button disabled className="gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading...
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card className="overflow-hidden border-none bg-gradient-to-br from-background to-muted/50 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-40">
            <p className="text-destructive">Error loading features. Please try again.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="overflow-hidden border-none bg-gradient-to-br from-background to-muted/50 shadow-lg">
        <CardHeader className="space-y-1 bg-muted/30 px-6 py-5">
          <div className="flex items-center gap-2">
            <ListChecksIcon className="h-5 w-5" />
            <CardTitle className="text-xl">Car Features</CardTitle>
          </div>
          <CardDescription>Select all the features that your car has.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="p-6">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="font-medium">Exterior Features</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="exterior_features"
                      render={() => (
                        <FormItem>
                          {exteriorFeatures.map((item: Feature) => (
                            <FormField
                              key={item.$id}
                              control={form.control}
                              name="exterior_features"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.$id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.name)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, item.name])
                                            : field.onChange(
                                                field.value?.filter((value) => value !== item.name)
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{item.name}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Interior Features</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="interior_features"
                      render={() => (
                        <FormItem>
                          {interiorFeatures.map((item: Feature) => (
                            <FormField
                              key={item.$id}
                              control={form.control}
                              name="interior_features"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.$id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.name)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, item.name])
                                            : field.onChange(
                                                field.value?.filter((value) => value !== item.name)
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{item.name}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Safety Features</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="safety_features"
                      render={() => (
                        <FormItem>
                          {safetyFeatures.map((item: Feature) => (
                            <FormField
                              key={item.$id}
                              control={form.control}
                              name="safety_features"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.$id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.name)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, item.name])
                                            : field.onChange(
                                                field.value?.filter((value) => value !== item.name)
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{item.name}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> {isEditMode ? "Updating..." : "Saving..."}
                  </>
                ) : (
                  <>
                    {isEditMode ? "Update Features" : "Save & Continue"} <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Features Updated Successfully</DialogTitle>
            <DialogDescription>
              Your car features have been updated successfully.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => router.push(`/dashboard/cars/${carId}`)}>
              Go to Car Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
