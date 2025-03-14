"use client"

import {
  Bluetooth,
  Shield,
  Car,
  Lock,
  FuelIcon as Engine,
  Navigation,
  NavigationIcon as Steering,
  Music,
  Circle,
  Package,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const features = {
  bluetooth: ["Bluetooth connectivity"],
  passiveSafety: [
    "Anti-lock Braking System (ABS)",
    "Electronic Stability Control (ESC)",
    "Multiple airbags",
    "Traction control",
  ],
  exterior: ["LED daytime running lights", "Alloy wheels", "Front fog lights", "Body colored bumpers"],
  security: ["Remote central locking", "Immobilizer", "Alarm system", "Deadlocks"],
  engine: ["Start/Stop technology", "Sports suspension", "Electric power steering", "Hill start assist"],
  convenience: ["Cruise control", "Rain sensing wipers", "Auto headlights", "Parking sensors"],
  interior: [
    "Climate control",
    "Height adjustable driver's seat",
    "Split folding rear seats",
    "Leather steering wheel",
  ],
  entertainment: ["DAB Radio", "USB connection", "Aux input", "Steering wheel mounted controls"],
  wheels: ['17" alloy wheels', "Space saver spare wheel", "Tyre pressure monitoring"],
  packs: ["Style pack", "Winter pack", "Comfort pack"],
}

const featureIcons = {
  bluetooth: Bluetooth,
  passiveSafety: Shield,
  exterior: Car,
  security: Lock,
  engine: Engine,
  convenience: Navigation,
  interior: Steering,
  entertainment: Music,
  wheels: Circle,
  packs: Package,
}

export function FeaturesSection() {
  return (
    <section className="rounded-lg border bg-white p-6">
      <h2 className="mb-6 text-2xl font-bold">Features</h2>

      <div className="mb-4 flex items-center gap-2">
        <Bluetooth className="h-5 w-5" />
        <span>Bluetooth</span>
      </div>

      <Accordion type="multiple" className="space-y-2">
        {Object.entries(features).map(([key, items]) => {
          if (key === "bluetooth") return null // Skip bluetooth as it's shown above
          const Icon = featureIcons[key as keyof typeof featureIcons]

          return (
            <AccordionItem key={key} value={key} className="rounded-lg border px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 py-2">
                  {items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>

      <div className="mt-6 text-sm text-muted-foreground">
        <p>
          Whilst Carwow uses reasonable efforts to ensure accuracy all information and details must be confirmed when
          enquiring. Carwow makes no representations, warranties or guarantees, whether express or implied, that this
          information is accurate, complete or up to date. Carwow will not accept liability for the information
          provided.
        </p>
        <p className="mt-4">Deal ID: 49f1aa88bb1a693687d6f4f5745f272b3</p>
      </div>
    </section>
  )
}

