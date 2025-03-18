import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, ChevronRight, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "How We Test Cars | KashiAndKarz",
  description:
    "Learn about our comprehensive car testing methodology and how we evaluate vehicles to provide you with the most accurate reviews.",
}

const testingCategories = [
  {
    id: "performance",
    title: "Performance Testing",
    description: "How we evaluate acceleration, braking, handling, and overall driving dynamics.",
    image: "/placeholder.svg?height=600&width=800",
    tests: [
      {
        name: "0-60 MPH Acceleration",
        description:
          "We measure the time it takes for a vehicle to accelerate from a standstill to 60 mph using professional timing equipment.",
        methodology: "Each vehicle is tested multiple times in different conditions to ensure accuracy.",
      },
      {
        name: "Braking Distance",
        description: "We measure the distance required to bring a vehicle to a complete stop from 60 mph.",
        methodology:
          "Tests are conducted on both dry and wet surfaces to evaluate braking performance in different conditions.",
      },
      {
        name: "Handling Course",
        description:
          "Vehicles navigate through a standardized slalom course to evaluate steering response, body control, and overall agility.",
        methodology: "Professional drivers assess both objective measurements and subjective feel.",
      },
      {
        name: "Highway Cruising",
        description: "We evaluate stability, noise levels, and comfort at highway speeds.",
        methodology: "Tests include lane-change maneuvers and long-distance driving assessments.",
      },
    ],
  },
  {
    id: "comfort",
    title: "Comfort & Practicality",
    description: "How we assess ride quality, interior space, ergonomics, and everyday usability.",
    image: "/placeholder.svg?height=600&width=800",
    tests: [
      {
        name: "Ride Quality Assessment",
        description:
          "We evaluate how well the suspension absorbs bumps and maintains composure over different road surfaces.",
        methodology: "Testing includes city streets, highways, and rough roads to provide a comprehensive assessment.",
      },
      {
        name: "Noise Level Measurement",
        description:
          "We use professional equipment to measure interior noise levels at various speeds and road conditions.",
        methodology: "Measurements include idle, city driving, and highway cruising scenarios.",
      },
      {
        name: "Seating Comfort",
        description:
          "We assess seat comfort, support, and adjustability for drivers and passengers of different sizes.",
        methodology: "Multiple testers spend extended time in all seating positions.",
      },
      {
        name: "Cargo Capacity",
        description: "We measure cargo space and evaluate loading ease, flexibility, and storage solutions.",
        methodology: "Testing includes real-world luggage and standardized measurement protocols.",
      },
    ],
  },
  {
    id: "technology",
    title: "Technology & Features",
    description: "How we evaluate infotainment systems, driver assistance features, and connectivity options.",
    image: "/placeholder.svg?height=600&width=800",
    tests: [
      {
        name: "Infotainment Usability",
        description: "We assess the intuitiveness, responsiveness, and functionality of the infotainment system.",
        methodology: "Testing includes screen quality, menu structure, and ease of use while driving.",
      },
      {
        name: "Smartphone Integration",
        description: "We evaluate Apple CarPlay, Android Auto, and native connectivity features.",
        methodology: "Multiple devices are tested for compatibility and performance.",
      },
      {
        name: "Driver Assistance Systems",
        description:
          "We test the effectiveness and user-friendliness of features like adaptive cruise control, lane-keeping assist, and automated parking.",
        methodology: "Real-world testing in various traffic and environmental conditions.",
      },
      {
        name: "Voice Command Testing",
        description: "We assess the accuracy and capabilities of voice recognition systems.",
        methodology: "Multiple testers with different accents perform standardized command sequences.",
      },
    ],
  },
  {
    id: "efficiency",
    title: "Fuel Efficiency & Environmental Impact",
    description: "How we measure real-world fuel economy and evaluate environmental credentials.",
    image: "/placeholder.svg?height=600&width=800",
    tests: [
      {
        name: "Real-World Fuel Economy",
        description:
          "We measure actual fuel consumption across various driving conditions and compare it to manufacturer claims.",
        methodology: "Standardized routes including city, highway, and mixed driving scenarios.",
      },
      {
        name: "Electric Range Testing",
        description: "For EVs and plug-in hybrids, we verify range claims and charging performance.",
        methodology: "Testing includes various speeds, climate conditions, and charging scenarios.",
      },
      {
        name: "Emissions Assessment",
        description: "We evaluate published emissions data and verify compliance with current standards.",
        methodology: "Analysis of official test results and real-world implications.",
      },
      {
        name: "Eco Mode Effectiveness",
        description: 'We test how effectively "eco" driving modes reduce fuel consumption.',
        methodology: "Comparative testing with and without eco features engaged.",
      },
    ],
  },
]

const faqs = [
  {
    question: "How long do you typically spend testing each car?",
    answer:
      "We typically spend a minimum of one week with each vehicle, covering at least 500 miles across various road types and driving conditions. For more comprehensive reviews, we may extend this to two weeks or more.",
  },
  {
    question: "Do manufacturers know you're testing their cars?",
    answer:
      "Yes, we typically receive press vehicles directly from manufacturers for testing purposes. However, our testing methodology and evaluation criteria remain completely independent, and we maintain full editorial control over our reviews.",
  },
  {
    question: "How do you ensure your reviews are unbiased?",
    answer:
      "We maintain strict editorial independence from advertisers and manufacturers. Our testing procedures are standardized across all vehicles, and we have multiple team members evaluate each car to provide balanced perspectives.",
  },
  {
    question: "Do you test cars in different weather conditions?",
    answer:
      "Whenever possible, we test vehicles in various weather conditions to evaluate performance across different scenarios. For certain vehicles like SUVs with off-road capabilities, we conduct additional testing in appropriate environments.",
  },
  {
    question: "How do you compare cars across different price ranges?",
    answer:
      "While we apply the same testing methodology to all vehicles, our final assessments take into account price point and vehicle category. We evaluate how well a vehicle performs relative to its competitors in the same segment and price range.",
  },
  {
    question: "Do you test the long-term reliability of cars?",
    answer:
      "Our standard reviews are based on short-term testing. However, we do maintain a fleet of long-term test vehicles that we evaluate over 12+ months to assess durability, reliability, and ownership experience.",
  },
]

export default function HowWeTestCarsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">How We Test Cars</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Our comprehensive testing methodology ensures we provide you with accurate, reliable, and useful car reviews.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Our Testing Philosophy</CardTitle>
            <CardDescription>Thorough, consistent, and consumer-focused</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              At KashiAndKarz, we believe car reviews should be comprehensive, consistent, and relevant to real-world
              usage. Our testing methodology has been developed over years of experience and is continuously refined to
              ensure we're providing you with the most accurate and useful information.
            </p>
            <p className="mb-4">
              Every vehicle we test undergoes the same rigorous evaluation process, allowing for fair comparisons across
              different makes and models. Our team of experienced automotive journalists combines objective measurements
              with subjective assessments to give you a complete picture of each vehicle's strengths and weaknesses.
            </p>
            <p>
              We prioritize the aspects of vehicle performance and ownership that matter most to consumers, focusing on
              real-world usability rather than just specifications or marketing claims.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Testing By The Numbers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <p className="text-3xl font-bold text-primary">100+</p>
                <p className="text-sm text-muted-foreground">Cars tested annually</p>
              </div>
              <div className="border-b pb-3">
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Miles driven per test</p>
              </div>
              <div className="border-b pb-3">
                <p className="text-3xl font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground">Evaluation criteria</p>
              </div>
              <div className="border-b pb-3">
                <p className="text-3xl font-bold text-primary">3-5</p>
                <p className="text-sm text-muted-foreground">Expert reviewers per vehicle</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">15+</p>
                <p className="text-sm text-muted-foreground">Years of testing experience</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Testing Process</h2>
        <Tabs defaultValue="performance">
          <div className="flex justify-center mb-8 overflow-x-auto pb-2">
            <TabsList>
              {testingCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {testingCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
                  <p className="text-muted-foreground mb-6">{category.description}</p>

                  <div className="space-y-6">
                    {category.tests.map((test, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <h4 className="font-bold mb-2">{test.name}</h4>
                        <p className="text-sm mb-2">{test.description}</p>
                        <div className="flex items-start text-xs text-muted-foreground">
                          <Info className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                          <p>{test.methodology}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="bg-muted p-8 rounded-lg mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Rating System</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Overall Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Our comprehensive score that considers all aspects of a vehicle's performance, quality, and value.
              </p>
              <div className="flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary-foreground">8.5/10</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Category Scores</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                We rate vehicles across key categories to highlight specific strengths and weaknesses.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Performance</span>
                  <span className="font-bold">8/10</span>
                </li>
                <li className="flex justify-between">
                  <span>Comfort</span>
                  <span className="font-bold">9/10</span>
                </li>
                <li className="flex justify-between">
                  <span>Technology</span>
                  <span className="font-bold">7/10</span>
                </li>
                <li className="flex justify-between">
                  <span>Value</span>
                  <span className="font-bold">8/10</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pros & Cons</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                We clearly highlight the most significant advantages and disadvantages of each vehicle.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold mb-2">Pros:</h4>
                  <ul className="space-y-1 text-xs">
                    <li className="flex items-start">
                      <CheckCircle className="h-3 w-3 mr-1 mt-0.5 text-green-500" />
                      <span>Excellent fuel economy</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-3 w-3 mr-1 mt-0.5 text-green-500" />
                      <span>Spacious interior</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-2">Cons:</h4>
                  <ul className="space-y-1 text-xs">
                    <li className="flex items-start">
                      <CheckCircle className="h-3 w-3 mr-1 mt-0.5 text-red-500" />
                      <span>Limited cargo space</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-3 w-3 mr-1 mt-0.5 text-red-500" />
                      <span>Outdated infotainment</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                We provide clear guidance on which models and trims offer the best value and experience.
              </p>
              <div className="bg-primary/10 p-3 rounded-md text-sm">
                <p className="font-bold mb-1">Our Pick:</p>
                <p className="text-xs mb-2">SE Trim with Technology Package</p>
                <p className="text-xs text-muted-foreground">
                  Best balance of features, performance, and value in the lineup.
                </p>
              </div>
            </CardContent>
          </Card>
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
          <h2 className="text-2xl font-bold mb-2">Meet Our Testing Team</h2>
          <p className="max-w-2xl mx-auto">
            Our team of experienced automotive journalists and engineers brings decades of combined expertise to our
            testing process. Each member specializes in different aspects of vehicle evaluation.
          </p>
        </div>
        <div className="flex justify-center">
          <Link href="/authors-experts">
            <Button variant="secondary" size="lg">
              Meet Our Experts
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

