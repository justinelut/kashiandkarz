"use client"

import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ChevronLeft, ChevronRight, ListChecksIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { saveCarFeatures } from "@/lib/actions"

const exteriorFeatures = [
  { id: "alloy-wheels", label: "Alloy Wheels" },
  { id: "sunroof", label: "Sunroof / Moonroof" },
  { id: "fog-lights", label: "Fog Lights" },
  { id: "led-headlights", label: "LED Headlights" },
  { id: "roof-rails", label: "Roof Rails" },
  { id: "tinted-windows", label: "Tinted Windows" },
  { id: "rear-spoiler", label: "Rear Spoiler" },
]

const interiorFeatures = [
  { id: "leather-seats", label: "Leather Seats" },
  { id: "heated-cooled-seats", label: "Heated/Cooled Seats" },
  { id: "touchscreen", label: "Touchscreen Display" },
  { id: "carplay-android", label: "Apple CarPlay / Android Auto" },
  { id: "climate-control", label: "Climate Control / AC" },
  { id: "navigation", label: "Navigation System" },
  { id: "premium-audio", label: "Premium Audio System" },
  { id: "wireless-charging", label: "Wireless Charging" },
]

const safetyFeatures = [
  { id: "airbags", label: "Airbags (Front, Side, Curtain)" },
  { id: "abs", label: "Anti-lock Braking System (ABS)" },
  { id: "traction-control", label: "Traction Control" },
  { id: "lane-assist", label: "Lane Keep Assist" },
  { id: "blind-spot", label: "Blind Spot Monitoring" },
  { id: "parking-sensors", label: "Parking Sensors" },
  { id: "backup-camera", label: "Backup Camera" },
  { id: "adaptive-cruise", label: "Adaptive Cruise Control" },
  { id: "collision-warning", label: "Forward Collision Warning" },
]

const formSchema = z.object({
  exteriorFeatures: z.array(z.string()).optional(),
  interiorFeatures: z.array(z.string()).optional(),
  safetyFeatures: z.array(z.string()).optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function CarFeaturesForm() {
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exteriorFeatures: [],
      interiorFeatures: [],
      safetyFeatures: [],
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      await saveCarFeatures(data)
    },
    onSuccess: () => {
      router.push("/sell-car/step-4") // Navigate to next step
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
            <ListChecksIcon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl">Car Features</CardTitle>
        </div>
        <CardDescription>Select all the features that your vehicle has</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-medium">Exterior Features</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="exteriorFeatures"
                    render={() => (
                      <>
                        {exteriorFeatures.map((feature) => (
                          <FormField
                            key={feature.id}
                            control={form.control}
                            name="exteriorFeatures"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={feature.id}
                                  className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2 hover:bg-muted/50"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(feature.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), feature.id])
                                          : field.onChange(field.value?.filter((value) => value !== feature.id))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{feature.label}</FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="mb-4 text-lg font-medium">Interior Features</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="interiorFeatures"
                    render={() => (
                      <>
                        {interiorFeatures.map((feature) => (
                          <FormField
                            key={feature.id}
                            control={form.control}
                            name="interiorFeatures"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={feature.id}
                                  className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2 hover:bg-muted/50"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(feature.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), feature.id])
                                          : field.onChange(field.value?.filter((value) => value !== feature.id))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{feature.label}</FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="mb-4 text-lg font-medium">Safety Features</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="safetyFeatures"
                    render={() => (
                      <>
                        {safetyFeatures.map((feature) => (
                          <FormField
                            key={feature.id}
                            control={form.control}
                            name="safetyFeatures"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={feature.id}
                                  className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2 hover:bg-muted/50"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(feature.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), feature.id])
                                          : field.onChange(field.value?.filter((value) => value !== feature.id))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{feature.label}</FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </>
                    )}
                  />
                </div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-4">
        <Button variant="outline" onClick={() => router.push("/sell-car/step-2")} className="gap-2">
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

