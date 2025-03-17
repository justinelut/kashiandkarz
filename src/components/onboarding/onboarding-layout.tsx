"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import React from "react"

interface OnboardingLayoutProps {
  children: ReactNode
  currentStep: "business-info" | "contact-details" | "inventory" | "preferences"
}

const steps = [
  { id: "business-info", label: "Business Info" },
  { id: "contact-details", label: "Contact Details" },
  { id: "inventory", label: "Inventory" },
  { id: "preferences", label: "Preferences" },
]

export function OnboardingLayout({ children, currentStep }: OnboardingLayoutProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)
  const progress = React.useMemo(() => {
    return ((currentStepIndex + 1) / steps.length) * 100
  }, [currentStepIndex])

  return (
    <div className="flex min-h-screen  flex-col items-center justify-center bg-gradient-to-b p-4">
      <motion.div
        className="w-full max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 rounded-2xl overflow-hidden ">
          <CardContent className="p-0">
            {/* Header & Logo */}
            <div className="text-center space-y-2 p-8 border-b">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
                  Karshi & Karz
                </h1>
                <p className="text-sm text-gray-500">Dealer Onboarding</p>
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full px-8 pt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                {steps.map((step) => (
                  <span
                    key={step.id}
                    className={cn(
                      steps.findIndex((s) => s.id === step.id) <= currentStepIndex ? "text-primary font-medium" : "",
                    )}
                  >
                    {step.label}
                  </span>
                ))}
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-indigo-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-8">{children}</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

