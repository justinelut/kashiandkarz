"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"
import { ArrowLeft, BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout"
import { useMutation } from "@tanstack/react-query"
import { save_dealer_preferences } from "@/lib/dealer-actions"
import type { dealer_preferences } from "@/types/dealer"

const form_schema = z.object({
  primary_service: z.enum(["sales", "service", "parts", "financing", "leasing"], {
    required_error: "Please select a primary service",
  }),
  description: z.string().min(10, { message: "Please provide a brief description" }),
  accept_terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
})

export default function DealerPreferencesPage() {
  const router = useRouter()
  const [user_id, set_user_id] = useState(() => {
    // In a real app, you would get this from your auth context
    return "current-user-id"
  })

  const [accept_terms, set_accept_terms] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<dealer_preferences>({
    resolver: zodResolver(form_schema),
    defaultValues: {
      primary_service: "sales",
      description: "",
      accept_terms: false,
    },
  })

  const mutation = useMutation({
    mutationFn: (data: dealer_preferences) => save_dealer_preferences(user_id, data),
    onSuccess: () => {
      toast({
        title: "Onboarding complete!",
        description: "You're all set to start using the platform",
      })

      // Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      })
    },
  })

  const on_submit = (data: dealer_preferences) => {
    mutation.mutate(data)
  }

  return (
    <OnboardingLayout current_step="dealer_preferences">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Final Details</h2>
          <p className="text-gray-500 mt-1">Just a few more details to complete your profile</p>
        </div>

        <form onSubmit={handleSubmit(on_submit)} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base">Primary Service</Label>
              <p className="text-sm text-gray-500">What's your main business focus?</p>

              <RadioGroup defaultValue="sales" className="grid grid-cols-3 gap-3" {...register("primary_service")}>
                {[
                  { value: "sales", label: "Sales" },
                  { value: "service", label: "Service" },
                  { value: "parts", label: "Parts" },
                  { value: "financing", label: "Financing" },
                  { value: "leasing", label: "Leasing" },
                ].map((service) => (
                  <div key={service.value} className="relative">
                    <RadioGroupItem value={service.value} id={`service-${service.value}`} className="peer sr-only" />
                    <Label
                      htmlFor={`service-${service.value}`}
                      className="flex items-center justify-center rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span className="text-base font-medium">{service.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.primary_service && <p className="text-sm text-red-500">{errors.primary_service.message}</p>}
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="text-base">
                Business Description
              </Label>
              <p className="text-sm text-gray-500">Tell potential customers about your business</p>
              <Textarea
                id="description"
                placeholder="Describe what makes your dealership unique..."
                className="min-h-[120px] text-base rounded-xl resize-none"
                {...register("description")}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            </div>

            <div className="pt-4">
              <div
                className={`
                  flex items-start space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-colors
                  ${accept_terms ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"}
                `}
                onClick={() => {
                  const new_value = !accept_terms
                  set_accept_terms(new_value)
                  setValue("accept_terms", new_value, { shouldValidate: true })
                }}
              >
                <Checkbox
                  id="terms"
                  checked={accept_terms}
                  onCheckedChange={(checked) => {
                    const new_value = !!checked
                    // Only update if the value is different to prevent loops
                    if (new_value !== accept_terms) {
                      set_accept_terms(new_value)
                      setValue("accept_terms", new_value, { shouldValidate: true })
                    }
                  }}
                  className="h-5 w-5 mt-0.5"
                />
                <div className="space-y-1">
                  <label htmlFor="terms" className="text-base font-medium leading-none cursor-pointer">
                    Accept Terms and Conditions
                  </label>
                  <p className="text-sm text-gray-500">I agree to the terms of service and privacy policy</p>
                </div>
              </div>
              {errors.accept_terms && <p className="text-sm text-red-500 mt-2">{errors.accept_terms.message}</p>}
            </div>
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
      </div>
    </OnboardingLayout>
  )
}

