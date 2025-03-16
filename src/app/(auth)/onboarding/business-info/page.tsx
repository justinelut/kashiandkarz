"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"
import { Building2, Store, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout"
import { useMutation } from "@tanstack/react-query"
import { save_dealer_basic_info } from "@/lib/dealer-actions"
import type { dealer_basic_info } from "@/types/dealer"

const form_schema = z.object({
  business_name: z.string().min(2, { message: "Business name is required" }),
  business_type: z.enum(["independent", "franchise"], {
    required_error: "Please select a dealer type",
  }),
  years_in_business: z.enum(["0-1", "1-5", "6-10", "11-20", "20+"], {
    required_error: "Please select years in business",
  }),
})

export default function BusinessInfoPage() {
  const router = useRouter()
  const [user_id, set_user_id] = useState(() => {
    // In a real app, you would get this from your auth context
    return "current-user-id"
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<dealer_basic_info>({
    resolver: zodResolver(form_schema),
    defaultValues: {
      business_name: "",
      business_type: "independent",
      years_in_business: "1-5",
    },
  })

  const mutation = useMutation({
    mutationFn: (data: dealer_basic_info) => save_dealer_basic_info(user_id, data),
    onSuccess: () => {
      toast({
        title: "Business information saved",
        description: "Let's continue with your contact details",
      })
      router.push("/onboarding/contact_details")
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      })
    },
  })

  const on_submit = (data: dealer_basic_info) => {
    mutation.mutate(data)
  }

  return (
    <OnboardingLayout current_step="business_info">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Business Information</h2>
          <p className="text-gray-500 mt-1">Tell us about your dealership</p>
        </div>

        <form onSubmit={handleSubmit(on_submit)} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="business_name" className="text-base">
                Business Name
              </Label>
              <Input
                id="business_name"
                placeholder="Enter your business name"
                className="h-14 text-lg rounded-xl"
                {...register("business_name")}
              />
              {errors.business_name && <p className="text-sm text-red-500">{errors.business_name.message}</p>}
            </div>

            <div className="space-y-3">
              <Label className="text-base">Dealer Type</Label>
              <RadioGroup defaultValue="independent" className="grid grid-cols-2 gap-4" {...register("business_type")}>
                <div className="relative">
                  <RadioGroupItem value="independent" id="independent" className="peer sr-only" />
                  <Label
                    htmlFor="independent"
                    className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Store className="mb-3 h-8 w-8" />
                    <span className="text-lg font-medium">Independent Dealer</span>
                  </Label>
                </div>

                <div className="relative">
                  <RadioGroupItem value="franchise" id="franchise" className="peer sr-only" />
                  <Label
                    htmlFor="franchise"
                    className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Building2 className="mb-3 h-8 w-8" />
                    <span className="text-lg font-medium">Franchise Dealer</span>
                  </Label>
                </div>
              </RadioGroup>
              {errors.business_type && <p className="text-sm text-red-500">{errors.business_type.message}</p>}
            </div>

            <div className="space-y-3">
              <Label className="text-base">Years in Business</Label>
              <RadioGroup defaultValue="1-5" className="grid grid-cols-5 gap-2" {...register("years_in_business")}>
                {["0-1", "1-5", "6-10", "11-20", "20+"].map((year) => (
                  <div key={year} className="relative">
                    <RadioGroupItem value={year} id={`year-${year}`} className="peer sr-only" />
                    <Label
                      htmlFor={`year-${year}`}
                      className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span className="text-base font-medium">{year}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.years_in_business && <p className="text-sm text-red-500">{errors.years_in_business.message}</p>}
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              className="w-full h-14 text-lg rounded-xl bg-gradient-to-r from-primary to-indigo-500 hover:from-primary/90 hover:to-indigo-500/90"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">⟳</span>
                  Saving...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </OnboardingLayout>
  )
}

