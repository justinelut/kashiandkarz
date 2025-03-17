"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"
import { ArrowLeft, BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout"
import { useMutation } from "@tanstack/react-query"
import { SaveDealerPreferences } from "@/lib/dealer-actions"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { DealerPreferences } from "@/types/dealer"

const formSchema = z.object({
  primary_service: z.enum(["sales", "service", "parts", "financing", "leasing"], {
    required_error: "Please select a primary service",
  }),
  description: z.string().min(10, { message: "Please provide a brief description" }),
  accept_terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
})

export default function DealerPreferencesPage({ business_id }: { business_id: string }) {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primary_service: "sales",
      description: "",
      accept_terms: false,
    },
  })

  const mutation = useMutation({
    mutationFn: (data: DealerPreferences) => SaveDealerPreferences(business_id, data),
    onSuccess: () => {
      toast("Onboarding complete!",{
        description: "You're all set to start using the platform",
      })

     
        router.push("/under-review")
     
    },
    onError: (error) => {
      toast("Something went wrong",{
       
        description: error instanceof Error ? error.message : "Please try again later",
       
      })
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutation.mutate(data)
  }

  return (
    <OnboardingLayout current_step="dealer_preferences">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Final Details</h2>
          <p className="text-gray-500 mt-1">Just a few more details to complete your profile</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="primary_service"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base">Primary Service</FormLabel>
                    <FormDescription className="text-sm text-gray-500">
                      What's your main business focus?
                    </FormDescription>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-3 gap-3"
                      >
                        {[
                          { value: "sales", label: "Sales" },
                          { value: "service", label: "Service" },
                          { value: "parts", label: "Parts" },
                          { value: "financing", label: "Financing" },
                          { value: "leasing", label: "Leasing" },
                        ].map((service) => (
                          <div key={service.value} className="relative">
                            <RadioGroupItem
                              value={service.value}
                              id={`service-${service.value}`}
                              className="peer sr-only"
                            />
                            <FormLabel
                              htmlFor={`service-${service.value}`}
                              className="flex items-center justify-center rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <span className="text-base font-medium">{service.label}</span>
                            </FormLabel>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base">Business Description</FormLabel>
                    <FormDescription className="text-sm text-gray-500">
                      Tell potential customers about your business
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what makes your dealership unique..."
                        className="min-h-[120px] text-base rounded-xl resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accept_terms"
                render={({ field }) => (
                  <FormItem className="pt-4">
                    <div
                      className={`
          flex items-start space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-colors
          ${field.value ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"}
        `}
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="terms"
                          className="h-5 w-5 mt-0.5"
                        />
                      </FormControl>
                      <div className="space-y-1">
                        <FormLabel htmlFor="terms" className="text-base font-medium leading-none cursor-pointer">
                          Accept Terms and Conditions
                        </FormLabel>
                        <FormDescription className="text-sm text-gray-500">
                          I agree to the terms of service and privacy policy
                        </FormDescription>
                      </div>
                    </div>
                    <FormMessage className="mt-2" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-14 text-lg rounded-xl"
                  onClick={() => router.push("/onboarding/inventory_info")}
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                <Button
                  type="submit"
                  className="w-full h-14 text-lg rounded-xl bg-gradient-to-r from-primary to-indigo-500 hover:from-primary/90 hover:to-indigo-500/90"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin mr-2">⟳</span>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Complete Setup
                      <BadgeCheck className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </Button>
              </motion.div>
            </div>
          </form>
        </Form>
      </div>
    </OnboardingLayout>
  )
}

