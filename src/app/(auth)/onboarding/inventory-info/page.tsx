"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout"
import { useMutation } from "@tanstack/react-query"
import { save_dealer_inventory_info } from "@/lib/dealer-actions"
import type { dealer_inventory_info } from "@/types/dealer"

const car_makes = [
  { id: "toyota", label: "Toyota" },
  { id: "honda", label: "Honda" },
  { id: "ford", label: "Ford" },
  { id: "bmw", label: "BMW" },
  { id: "mercedes", label: "Mercedes-Benz" },
  { id: "audi", label: "Audi" },
  { id: "lexus", label: "Lexus" },
  { id: "nissan", label: "Nissan" },
  { id: "hyundai", label: "Hyundai" },
  { id: "kia", label: "Kia" },
  { id: "mazda", label: "Mazda" },
  { id: "subaru", label: "Subaru" },
]

const vehicle_types = [
  { id: "sedan", label: "Sedan" },
  { id: "suv", label: "SUV" },
  { id: "truck", label: "Truck" },
  { id: "van", label: "Van" },
  { id: "coupe", label: "Coupe" },
  { id: "convertible", label: "Convertible" },
  { id: "hybrid", label: "Hybrid" },
  { id: "electric", label: "Electric" },
]

const form_schema = z.object({
  car_makes: z.array(z.string()).min(1, { message: "Select at least one car make" }),
  vehicle_types: z.array(z.string()).min(1, { message: "Select at least one vehicle type" }),
})

export default function InventoryInfoPage() {
  const router = useRouter()
  const [user_id, set_user_id] = useState(() => {
    // In a real app, you would get this from your auth context
    return "current-user-id"
  })

  const [selected_makes, set_selected_makes] = useState<string[]>([])
  const [selected_types, set_selected_types] = useState<string[]>([])

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<dealer_inventory_info>({
    resolver: zodResolver(form_schema),
    defaultValues: {
      car_makes: [],
      vehicle_types: [],
    },
  })

  const mutation = useMutation({
    mutationFn: (data: dealer_inventory_info) => save_dealer_inventory_info(user_id, data),
    onSuccess: () => {
      toast({
        title: "Inventory details saved",
        description: "Let's finish with your preferences",
      })
      router.push("/onboarding/dealer_preferences")
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      })
    },
  })

  const toggle_make = (make: string) => {
    const updated_makes = selected_makes.includes(make)
      ? selected_makes.filter((m) => m !== make)
      : [...selected_makes, make]

    set_selected_makes(updated_makes)
    setValue("car_makes", updated_makes, { shouldValidate: true })
  }

  const toggle_type = (type: string) => {
    const updated_types = selected_types.includes(type)
      ? selected_types.filter((t) => t !== type)
      : [...selected_types, type]

    set_selected_types(updated_types)
    setValue("vehicle_types", updated_types, { shouldValidate: true })
  }

  const on_submit = () => {
    if (selected_makes.length === 0 || selected_types.length === 0) {
      toast({
        title: "Missing selections",
        description: "Please select at least one car make and vehicle type",
        variant: "destructive",
      })
      return
    }

    mutation.mutate({
      car_makes: selected_makes,
      vehicle_types: selected_types,
    })
  }

  return (
    <OnboardingLayout current_step="inventory_info">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Inventory Details</h2>
          <p className="text-gray-500 mt-1">What types of vehicles do you sell?</p>
        </div>

        <form onSubmit={handleSubmit(on_submit)} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base">Car Makes</Label>
              <p className="text-sm text-gray-500">Select all the makes you sell</p>

              <div className="grid grid-cols-3 gap-3">
                {car_makes.map((make) => (
                  <div
                    key={make.id}
                    className={`
                      flex items-center space-x-2 rounded-lg border-2 p-3 cursor-pointer transition-colors
                      ${
                        selected_makes.includes(make.id)
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }
                    `}
                    onClick={() => toggle_make(make.id)}
                  >
                    <Checkbox
                      id={`make-${make.id}`}
                      checked={selected_makes.includes(make.id)}
                      onCheckedChange={() => toggle_make(make.id)}
                      className="h-5 w-5"
                    />
                    <label
                      htmlFor={`make-${make.id}`}
                      className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {make.label}
                    </label>
                  </div>
                ))}
              </div>

              {errors.car_makes && <p className="text-sm text-red-500">{errors.car_makes.message}</p>}
            </div>

            <div className="space-y-3">
              <Label className="text-base">Vehicle Types</Label>
              <p className="text-sm text-gray-500">Select all the types you sell</p>

              <div className="grid grid-cols-2 gap-3">
                {vehicle_types.map((type) => (
                  <div
                    key={type.id}
                    className={`
                      flex items-center space-x-2 rounded-lg border-2 p-3 cursor-pointer transition-colors
                      ${
                        selected_types.includes(type.id)
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }
                    `}
                    onClick={() => toggle_type(type.id)}
                  >
                    <Checkbox
                      id={`type-${type.id}`}
                      checked={selected_types.includes(type.id)}
                      onCheckedChange={() => toggle_type(type.id)}
                      className="h-5 w-5"
                    />
                    <label
                      htmlFor={`type-${type.id}`}
                      className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>

              {errors.vehicle_types && <p className="text-sm text-red-500">{errors.vehicle_types.message}</p>}
            </div>
          </div>

          <div className="flex gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button
                type="button"
                variant="outline"
                className="w-full h-14 text-lg rounded-xl"
                onClick={() => router.push("/onboarding/contact_details")}
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
          </div>
        </form>
      </div>
    </OnboardingLayout>
  )
}

