import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, Award, Users, Heart, Car, MapPin } from "lucide-react"

export const metadata = {
  title: "About Us | KashiAndKarz",
  description: "Learn about KashiAndKarz, our mission, and how we're transforming the car buying experience.",
}

export default function AboutUsPage() {
  return (
    <div className="bg-background min-h-screen max-w-5xl mx-auto container py-20">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70">
          <Image
            src="/placeholder.svg?height=1000&width=2000"
            alt="Team at KashiAndKarz"
            fill
            className="object-cover mix-blend-overlay opacity-50"
            priority
          />
        </div>
        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">About KashiAndKarz</h1>
          <p className="mx-auto max-w-2xl text-xl">
            We're revolutionizing the car buying experience with transparency, trust, and technology.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Our Story</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Founded in 2023, KashiAndKarz was born from a simple idea: car buying should be transparent, fair, and
              even enjoyable. Our founders experienced firsthand the frustration of traditional car shopping—the
              pressure, the hidden fees, the uncertainty.
            </p>
          </div>
          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Transparency</h3>
              <p className="text-muted-foreground">
                We believe in complete transparency in pricing, vehicle history, and the buying process.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Quality</h3>
              <p className="text-muted-foreground">
                Every vehicle on our platform meets our rigorous standards for quality and reliability.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Customer-First</h3>
              <p className="text-muted-foreground">
                Our decisions are guided by what's best for our customers, not what's best for our bottom line.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted py-20">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Our Mission</h2>
              <p className="mb-6 text-lg text-muted-foreground">
                At KashiAndKarz, we're transforming how people buy and sell cars by creating the most transparent,
                trusted automotive marketplace. We believe everyone deserves a fair deal and a stress-free experience
                when buying or selling a vehicle.
              </p>
              <ul className="space-y-4">
                {[
                  "Provide transparent pricing with no hidden fees",
                  "Offer comprehensive vehicle information and history",
                  "Create a pressure-free buying environment",
                  "Connect buyers with trusted dealers and sellers",
                  "Simplify the car buying process from search to purchase",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-xl md:h-auto">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Our mission in action"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">Our Impact</h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="rounded-lg bg-background p-6 text-center shadow-sm">
              <p className="text-4xl font-bold text-primary">50K+</p>
              <p className="mt-2 text-muted-foreground">Happy Customers</p>
            </div>
            <div className="rounded-lg bg-background p-6 text-center shadow-sm">
              <p className="text-4xl font-bold text-primary">£15M+</p>
              <p className="mt-2 text-muted-foreground">Customer Savings</p>
            </div>
            <div className="rounded-lg bg-background p-6 text-center shadow-sm">
              <p className="text-4xl font-bold text-primary">1,200+</p>
              <p className="mt-2 text-muted-foreground">Dealer Partners</p>
            </div>
            <div className="rounded-lg bg-background p-6 text-center shadow-sm">
              <p className="text-4xl font-bold text-primary">4.8/5</p>
              <p className="mt-2 text-muted-foreground">Customer Rating</p>
            </div>
          </div>
          <div className="mt-16">
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="mb-6 text-2xl font-bold">Customer Success Stories</h3>
              <div className="relative rounded-xl bg-muted p-8">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform text-4xl">"</div>
                <p className="mb-6 text-lg italic">
                  KashiAndKarz completely changed my car buying experience. The process was transparent, I saved
                  thousands, and I found exactly what I was looking for without the usual dealership pressure.
                </p>
                <div className="flex items-center justify-center">
                  <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="Customer"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Purchased a BMW 3 Series</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-muted py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">Meet Our Leadership Team</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Alex Thompson",
                role: "CEO & Co-Founder",
                image: "/placeholder.svg?height=300&width=300",
                bio: "Former automotive executive with 15+ years of industry experience.",
              },
              {
                name: "Samantha Chen",
                role: "CTO & Co-Founder",
                image: "/placeholder.svg?height=300&width=300",
                bio: "Tech innovator with background in AI and machine learning.",
              },
              {
                name: "Michael Rodriguez",
                role: "Chief Operating Officer",
                image: "/placeholder.svg?height=300&width=300",
                bio: "Operations expert who previously scaled three successful startups.",
              },
              {
                name: "Priya Patel",
                role: "Chief Marketing Officer",
                image: "/placeholder.svg?height=300&width=300",
                bio: "Digital marketing strategist with expertise in automotive sector.",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-lg bg-background shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                  <p className="mb-3 text-primary">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              View Full Team
            </Button>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Where to Find Us</h2>
            <p className="mb-12 text-lg text-muted-foreground">
              With offices across the UK and expanding into Europe, we're bringing our revolutionary car buying
              experience to more customers every day.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">London HQ</h3>
              </div>
              <p className="mb-4 text-muted-foreground">
                2nd Floor, Verde Building
                <br />
                10 Bressenden Place
                <br />
                London, SW1E 5DH
              </p>
              <Button variant="link" className="px-0">
                Get Directions
              </Button>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Manchester Office</h3>
              </div>
              <p className="mb-4 text-muted-foreground">
                Spinningfields
                <br />1 Hardman Square
                <br />
                Manchester, M3 3EB
              </p>
              <Button variant="link" className="px-0">
                Get Directions
              </Button>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Birmingham Office</h3>
              </div>
              <p className="mb-4 text-muted-foreground">
                The Colmore Building
                <br />
                20 Colmore Circus
                <br />
                Birmingham, B4 6AT
              </p>
              <Button variant="link" className="px-0">
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Join Our Journey</h2>
            <p className="mb-8 text-lg opacity-90">
              We're just getting started. As we continue to grow, we remain committed to our core values and to
              constantly improving our platform based on your feedback. Whether you're looking to buy, sell, or just
              browse, we're here to make your automotive journey better.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg">
                <Car className="mr-2 h-5 w-5" />
                Find Your Car
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Heart className="mr-2 h-5 w-5" />
                Join Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

