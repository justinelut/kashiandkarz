"use client"
import type React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calculator, Check, ChevronRight, Clock, FileText, Shield, Star, Users as Usergroup, Building } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

// export const metadata: Metadata = {
//   title: "Car Leasing | KashiAndKarz",
//   description:
//     "Explore flexible car leasing options with KashiAndKarz. Find the perfect lease deal for personal or business use.",
// }

interface LeaseDealProps {
  id: string
  title: string
  image: string
  monthlyPayment: number
  initialPayment: number
  term: number
  mileage: number
  featured?: boolean
}

interface LeaseTypeProps {
  id: string
  title: string
  description: string
  suitableFor: string[]
  icon: React.ReactNode
}

interface TestimonialProps {
  name: string
  location: string
  quote: string
  rating: number
  image: string
}

const leaseDeals: LeaseDealProps[] = [
  {
    id: "toyota-rav4-lease",
    title: "Toyota RAV4 2.5 Hybrid",
    image: "/placeholder.svg?height=300&width=500",
    monthlyPayment: 45000,
    initialPayment: 135000,
    term: 36,
    mileage: 10000,
    featured: true,
  },
  {
    id: "honda-crv-lease",
    title: "Honda CR-V 1.5T Elegance",
    image: "/placeholder.svg?height=300&width=500",
    monthlyPayment: 42000,
    initialPayment: 126000,
    term: 36,
    mileage: 10000,
  },
  {
    id: "vw-tiguan-lease",
    title: "Volkswagen Tiguan 2.0 TSI",
    image: "/placeholder.svg?height=300&width=500",
    monthlyPayment: 48000,
    initialPayment: 144000,
    term: 36,
    mileage: 10000,
  },
  {
    id: "mercedes-glc-lease",
    title: "Mercedes-Benz GLC 300",
    image: "/placeholder.svg?height=300&width=500",
    monthlyPayment: 65000,
    initialPayment: 195000,
    term: 36,
    mileage: 10000,
    featured: true,
  },
  {
    id: "bmw-x3-lease",
    title: "BMW X3 xDrive20d",
    image: "/placeholder.svg?height=300&width=500",
    monthlyPayment: 62000,
    initialPayment: 186000,
    term: 36,
    mileage: 10000,
  },
  {
    id: "audi-q5-lease",
    title: "Audi Q5 45 TFSI quattro",
    image: "/placeholder.svg?height=300&width=500",
    monthlyPayment: 60000,
    initialPayment: 180000,
    term: 36,
    mileage: 10000,
  },
]

const leaseTypes: LeaseTypeProps[] = [
  {
    id: "personal",
    title: "Personal Leasing",
    description:
      "Ideal for individuals looking for a fixed-cost motoring solution without the commitment of ownership.",
    suitableFor: ["Individuals", "Families", "Professionals"],
    icon: <Usergroup className="h-8 w-8" />,
  },
  {
    id: "business",
    title: "Business Leasing",
    description:
      "Perfect for companies looking to provide vehicles to employees without the hassle of fleet management.",
    suitableFor: ["Small Businesses", "Corporations", "Self-employed"],
    icon: <Building className="h-8 w-8" />,
  },
  {
    id: "flexible",
    title: "Flexible Leasing",
    description: "Short-term leasing options with the flexibility to change vehicles or terms as your needs evolve.",
    suitableFor: ["Temporary Residents", "Project-based Needs", "Uncertain Timelines"],
    icon: <Clock className="h-8 w-8" />,
  },
]

const testimonials: TestimonialProps[] = [
  {
    name: "James Mwangi",
    location: "Nairobi",
    quote:
      "Leasing through KashiAndKarz was the best decision for my business. The process was smooth, and the monthly payments fit perfectly into our budget.",
    rating: 5,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Sarah Omondi",
    location: "Mombasa",
    quote:
      "I wanted a new car every few years without the hassle of selling my old one. The personal lease option was perfect for my lifestyle.",
    rating: 4,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "David Kimani",
    location: "Nakuru",
    quote:
      "The flexible leasing option allowed me to have a car during my 6-month contract in Kenya. The team was incredibly helpful throughout the process.",
    rating: 5,
    image: "/placeholder.svg?height=200&width=200",
  },
]

const faqs = [
  {
    question: "What is car leasing?",
    answer:
      "Car leasing is a long-term rental agreement that allows you to use a car for a predetermined period (typically 2-4 years) while making regular monthly payments. Unlike buying, you don't own the vehicle at the end of the lease term, but you have the option to purchase it or lease a new vehicle.",
  },
  {
    question: "What's included in a lease agreement?",
    answer:
      "Our lease agreements typically include the vehicle rental, road tax, and manufacturer warranty. Maintenance packages and insurance can be added for an additional cost. Each agreement specifies the lease term, mileage allowance, and payment schedule.",
  },
  {
    question: "Can I end my lease early?",
    answer:
      "Yes, you can end your lease early, but early termination fees may apply. These fees are outlined in your lease agreement and typically depend on how much time is left on your lease and the vehicle's current value.",
  },
  {
    question: "What happens at the end of the lease?",
    answer:
      "At the end of your lease, you have several options: return the vehicle and lease a new one, extend your current lease, or purchase the vehicle at a predetermined price (if your lease includes a purchase option).",
  },
  {
    question: "Are there mileage restrictions?",
    answer:
      "Yes, lease agreements include annual mileage limits (e.g., 10,000, 15,000, or 20,000 kilometers per year). Exceeding these limits will result in additional charges at the end of the lease, typically calculated per extra kilometer.",
  },
  {
    question: "Can I modify the leased vehicle?",
    answer:
      "Any modifications to the vehicle must be approved in advance. Unauthorized modifications may result in additional charges when you return the vehicle. The vehicle should be returned in its original condition, allowing for normal wear and tear.",
  },
]

// Missing components for the imports
// const Users = ({ className }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//     <circle cx="9" cy="7" r="4" />
//     <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
//     <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//   </svg>
// )

// const Building = ({ className }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
//     <path d="M9 22v-4h6v4" />
//     <path d="M8 6h.01" />
//     <path d="M16 6h.01" />
//     <path d="M12 6h.01" />
//     <path d="M12 10h.01" />
//     <path d="M12 14h.01" />
//     <path d="M16 10h.01" />
//     <path d="M16 14h.01" />
//     <path d="M8 10h.01" />
//     <path d="M8 14h.01" />
//   </svg>
// )

const LeaseDealCard = ({ deal }: { deal: LeaseDealProps }) => {
  return (
    <Card className={`h-full flex flex-col ${deal.featured ? "border-primary" : ""}`}>
      {deal.featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge>Featured Deal</Badge>
        </div>
      )}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={deal.image || "/placeholder.svg"}
          alt={deal.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{deal.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-muted p-3 rounded-md text-center">
            <p className="text-xs text-muted-foreground mb-1">Monthly Payment</p>
            <p className="text-lg font-bold">KES {deal.monthlyPayment.toLocaleString()}</p>
          </div>
          <div className="bg-muted p-3 rounded-md text-center">
            <p className="text-xs text-muted-foreground mb-1">Initial Payment</p>
            <p className="text-lg font-bold">KES {deal.initialPayment.toLocaleString()}</p>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Term:</span>
            <span className="font-medium">{deal.term} months</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Annual Mileage:</span>
            <span className="font-medium">{deal.mileage.toLocaleString()} km</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/car-leasing/${deal.id}`} className="w-full">
          <Button variant={deal.featured ? "default" : "outline"} className="w-full">
            View Deal
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

const LeaseTypeCard = ({ type }: { type: LeaseTypeProps }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
          {type.icon}
        </div>
        <CardTitle className="text-xl">{type.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
        <div>
          <h4 className="text-sm font-semibold mb-2">Suitable for:</h4>
          <ul className="space-y-1">
            {type.suitableFor.map((item, index) => (
              <li key={index} className="flex items-start text-sm">
                <Check className="h-4 w-4 mr-2 text-primary flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/car-leasing/types/${type.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            Learn More
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialProps }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={testimonial.image || "/placeholder.svg"}
              alt={testimonial.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div>
            <CardTitle className="text-lg">{testimonial.name}</CardTitle>
            <CardDescription>{testimonial.location}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative">
          <div className="absolute -top-4 -left-2 text-4xl text-primary opacity-20">"</div>
          <p className="text-sm italic relative z-10">{testimonial.quote}</p>
          <div className="absolute -bottom-4 -right-2 text-4xl text-primary opacity-20">"</div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
            />
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}

export default function CarLeasingPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Car Leasing Made Simple</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Enjoy the freedom of a new car without the commitment of ownership. Explore our flexible leasing options for
          personal and business use.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Why Lease With KashiAndKarz?</h2>
          <p className="text-lg mb-6">
            Leasing a car offers numerous advantages over buying, including lower monthly payments, the ability to drive
            a new car every few years, and simplified maintenance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start">
              <Shield className="h-5 w-5 mr-2 text-primary mt-1" />
              <div>
                <h3 className="font-bold">Manufacturer Warranty</h3>
                <p className="text-sm text-muted-foreground">Vehicles covered under manufacturer warranty</p>
              </div>
            </div>
            <div className="flex items-start">
              <Calculator className="h-5 w-5 mr-2 text-primary mt-1" />
              <div>
                <h3 className="font-bold">Fixed Monthly Costs</h3>
                <p className="text-sm text-muted-foreground">Predictable payments for easier budgeting</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-5 w-5 mr-2 text-primary mt-1" />
              <div>
                <h3 className="font-bold">Flexible Terms</h3>
                <p className="text-sm text-muted-foreground">Choose lease durations that suit your needs</p>
              </div>
            </div>
            <div className="flex items-start">
              <FileText className="h-5 w-5 mr-2 text-primary mt-1" />
              <div>
                <h3 className="font-bold">Simple Process</h3>
                <p className="text-sm text-muted-foreground">Streamlined application and approval</p>
              </div>
            </div>
          </div>
          <Link href="#lease-calculator">
            <Button size="lg">
              Calculate Your Lease
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        <div className="relative rounded-lg overflow-hidden h-[400px]">
          <Image
            src="/placeholder.svg?height=800&width=1200"
            alt="Car leasing"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Lease Deals</h2>
          <Link href="/car-leasing/all-deals">
            <Button variant="outline">
              View All Deals
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all">
          <div className="flex justify-start mb-8 overflow-x-auto pb-2">
            <TabsList>
              <TabsTrigger value="all">All Vehicles</TabsTrigger>
              <TabsTrigger value="suv">SUVs</TabsTrigger>
              <TabsTrigger value="sedan">Sedans</TabsTrigger>
              <TabsTrigger value="luxury">Luxury</TabsTrigger>
              <TabsTrigger value="electric">Electric</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leaseDeals.map((deal) => (
                <LeaseDealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="suv">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leaseDeals
                .filter(
                  (deal) =>
                    deal.title.includes("RAV4") ||
                    deal.title.includes("CR-V") ||
                    deal.title.includes("Tiguan") ||
                    deal.title.includes("GLC") ||
                    deal.title.includes("X3") ||
                    deal.title.includes("Q5"),
                )
                .map((deal) => (
                  <LeaseDealCard key={deal.id} deal={deal} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="sedan">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">
                  No sedan lease deals currently available. Please check back soon or view our other categories.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="luxury">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leaseDeals
                .filter(
                  (deal) =>
                    deal.title.includes("Mercedes") || deal.title.includes("BMW") || deal.title.includes("Audi"),
                )
                .map((deal) => (
                  <LeaseDealCard key={deal.id} deal={deal} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="electric">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">
                  No electric vehicle lease deals currently available. Please check back soon or view our other
                  categories.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Separator className="my-16" />

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Leasing Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leaseTypes.map((type) => (
            <LeaseTypeCard key={type.id} type={type} />
          ))}
        </div>
      </div>

      <div className="bg-muted p-8 rounded-lg mb-16" id="lease-calculator">
        <h2 className="text-2xl font-bold text-center mb-8">Lease Calculator</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="vehicle-value">Vehicle Value (KES)</Label>
              <Input id="vehicle-value" type="number" defaultValue="3000000" />
            </div>
            <div>
              <Label htmlFor="lease-term">Lease Term (Months)</Label>
              <Select defaultValue="36">
                <SelectTrigger id="lease-term">
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24">24 months</SelectItem>
                  <SelectItem value="36">36 months</SelectItem>
                  <SelectItem value="48">48 months</SelectItem>
                  <SelectItem value="60">60 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="annual-mileage">Annual Mileage (km)</Label>
              <Select defaultValue="10000">
                <SelectTrigger id="annual-mileage">
                  <SelectValue placeholder="Select mileage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5000">5,000 km</SelectItem>
                  <SelectItem value="10000">10,000 km</SelectItem>
                  <SelectItem value="15000">15,000 km</SelectItem>
                  <SelectItem value="20000">20,000 km</SelectItem>
                  <SelectItem value="25000">25,000 km</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label htmlFor="initial-payment">Initial Payment (Months)</Label>
                <span className="text-sm text-muted-foreground">3 months</span>
              </div>
              <Slider id="initial-payment" defaultValue={[3]} max={9} min={1} step={1} className="mb-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 month</span>
                <span>9 months</span>
              </div>
            </div>
          </div>
          <div className="bg-background p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-6 text-center">Your Estimated Lease</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/10 p-4 rounded-md text-center">
                  <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
                  <p className="text-2xl font-bold">KES 45,000</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-md text-center">
                  <p className="text-sm text-muted-foreground mb-1">Initial Payment</p>
                  <p className="text-2xl font-bold">KES 135,000</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Lease Cost:</span>
                  <span className="font-medium">KES 1,755,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lease Term:</span>
                  <span className="font-medium">36 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Annual Mileage:</span>
                  <span className="font-medium">10,000 km</span>
                </div>
              </div>
              <Button className="w-full">
                Apply for This Lease
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                This is an estimate only. Final lease terms may vary based on credit approval and vehicle selection.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="bg-primary text-primary-foreground p-8 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Ready to Start Your Leasing Journey?</h2>
          <p className="max-w-2xl mx-auto">
            Browse our available lease deals or contact our leasing specialists to find the perfect vehicle for your
            needs.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/car-leasing/all-deals">
            <Button variant="secondary" size="lg">
              Browse Lease Deals
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/contact-us">
            <Button
              variant="outline"
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Contact a Specialist
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

