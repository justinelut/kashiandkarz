"use client"

import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  completedSteps?: number[]
}

export function StepIndicator({ currentStep, totalSteps, completedSteps = [] }: StepIndicatorProps) {
  return (
    <div className="relative px-4">
      <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted" />
      <ol className="relative z-10 flex justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = completedSteps.includes(stepNumber) || stepNumber < currentStep

          return (
            <li key={stepNumber} className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium",
                  isActive && "border-primary bg-primary text-primary-foreground",
                  isCompleted && "border-primary bg-primary text-primary-foreground",
                  !isActive && !isCompleted && "border-muted-foreground/30 bg-background",
                )}
              >
                {isCompleted ? <CheckIcon className="h-5 w-5" /> : stepNumber}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium",
                  isActive && "text-primary",
                  isCompleted && "text-primary",
                  !isActive && !isCompleted && "text-muted-foreground",
                )}
              >
                Step {stepNumber}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

