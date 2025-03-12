import { Check, Car, CreditCard, ThumbsUp } from "lucide-react"

const steps = [
  {
    icon: Car,
    title: "Find your perfect car",
    description: "Browse thousands of cars from trusted dealers across the country.",
  },
  {
    icon: Check,
    title: "Compare deals",
    description: "Compare prices and offers from multiple dealers to get the best deal.",
  },
  {
    icon: CreditCard,
    title: "Secure financing",
    description: "Choose from various financing options that suit your budget.",
  },
  {
    icon: ThumbsUp,
    title: "Drive away happy",
    description: "Enjoy your new car with our satisfaction guarantee and ongoing support.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">How KashiAndKarz Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've simplified the car buying process to make it easy, transparent, and stress-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

