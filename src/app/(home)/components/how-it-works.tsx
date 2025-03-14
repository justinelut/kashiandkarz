"use client"

import { useState } from "react"
import { Check, Car, CreditCard, ThumbsUp, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const steps = [
  {
    icon: Car,
    title: "Find your perfect car",
    description: "Browse thousands of cars from trusted dealers across the country.",
    color: "bg-blue-500/10",
    textColor: "text-blue-500",
    buttonText: "Browse cars"
  },
  {
    icon: Check,
    title: "Compare deals",
    description: "Compare prices and offers from multiple dealers to get the best deal.",
    color: "bg-green-500/10",
    textColor: "text-green-500",
    buttonText: "See deals"
  },
  {
    icon: CreditCard,
    title: "Secure financing",
    description: "Choose from various financing options that suit your budget.",
    color: "bg-purple-500/10",
    textColor: "text-purple-500",
    buttonText: "Financing options"
  },
  {
    icon: ThumbsUp,
    title: "Drive away happy",
    description: "Enjoy your new car with our satisfaction guarantee and ongoing support.",
    color: "bg-amber-500/10",
    textColor: "text-amber-500",
    buttonText: "Customer stories"
  },
]

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Simple 4-step process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">How KashiAndKarz Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We've simplified the car buying process to make it easy, transparent, and stress-free.
          </p>
        </motion.div>

        {/* Desktop view */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-24 left-0 right-0 h-0.5 bg-gray-200"></div>
            
            <div className="grid grid-cols-4 gap-6 relative">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div 
                    key={index} 
                    className="flex flex-col items-center text-center relative z-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onMouseEnter={() => setActiveStep(index)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    <motion.div 
                      className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center mb-6 relative",
                        step.color,
                        activeStep === index ? "scale-110" : ""
                      )}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Icon className={cn("h-8 w-8", step.textColor)} />
                      <div className="absolute -right-1 -bottom-1 w-6 h-6 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                    </motion.div>
                    
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={cn(
                        "rounded-full transition-all duration-300",
                        activeStep === index ? "bg-primary text-primary-foreground" : ""
                      )}
                    >
                      {step.buttonText}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Mobile view */}
        <div className="lg:hidden">
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-4 p-6 rounded-xl bg-white border border-gray-100 shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center relative",
                    step.color
                  )}>
                    <Icon className={cn("h-6 w-6", step.textColor)} />
                    <div className="absolute -right-1 -bottom-1 w-5 h-5 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{step.description}</p>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full text-xs"
                    >
                      {step.buttonText}
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button size="lg" className="rounded-full px-8">
            Start your journey today
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
