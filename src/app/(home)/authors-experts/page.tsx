import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Mail, Twitter, Linkedin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Authors and Experts | KashiAndKarz",
  description:
    "Meet our team of automotive experts and writers who bring you the latest car reviews, news, and advice.",
}

interface ExpertProps {
  id: string
  name: string
  role: string
  bio: string
  expertise: string[]
  image: string
  articles: number
  reviews: number
  social: {
    twitter?: string
    linkedin?: string
    email?: string
  }
}

const experts: ExpertProps[] = [
  {
    id: "john-smith",
    name: "John Smith",
    role: "Senior Automotive Editor",
    bio: "John has been reviewing cars for over 15 years. He previously worked as a mechanic before moving into automotive journalism.",
    expertise: ["SUVs", "Luxury Cars", "Electric Vehicles"],
    image: "/placeholder.svg?height=400&width=400",
    articles: 342,
    reviews: 189,
    social: {
      twitter: "https://twitter.com/johnsmith",
      linkedin: "https://linkedin.com/in/johnsmith",
      email: "john@kashiandkarz.com",
    },
  },
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    role: "Technical Specialist",
    bio: "Sarah has a background in mechanical engineering and specializes in analyzing the technical aspects of vehicles.",
    expertise: ["Hybrid Technology", "Performance Cars", "Car Technology"],
    image: "/placeholder.svg?height=400&width=400",
    articles: 215,
    reviews: 127,
    social: {
      twitter: "https://twitter.com/sarahjohnson",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      email: "sarah@kashiandkarz.com",
    },
  },
  {
    id: "michael-wong",
    name: "Michael Wong",
    role: "Consumer Advice Editor",
    bio: "Michael focuses on helping consumers make smart car buying decisions with practical advice and financial insights.",
    expertise: ["Car Buying", "Finance", "Family Cars"],
    image: "/placeholder.svg?height=400&width=400",
    articles: 278,
    reviews: 94,
    social: {
      twitter: "https://twitter.com/michaelwong",
      linkedin: "https://linkedin.com/in/michaelwong",
      email: "michael@kashiandkarz.com",
    },
  },
  {
    id: "amara-patel",
    name: "Amara Patel",
    role: "EV Specialist",
    bio: "Amara is our electric vehicle expert, covering everything from the latest EV technology to charging infrastructure.",
    expertise: ["Electric Vehicles", "Sustainability", "Future Mobility"],
    image: "/placeholder.svg?height=400&width=400",
    articles: 187,
    reviews: 76,
    social: {
      twitter: "https://twitter.com/amarapatel",
      linkedin: "https://linkedin.com/in/amarapatel",
      email: "amara@kashiandkarz.com",
    },
  },
  {
    id: "david-chen",
    name: "David Chen",
    role: "Performance Car Specialist",
    bio: "David specializes in sports cars and performance vehicles, with a focus on driving dynamics and track testing.",
    expertise: ["Sports Cars", "Supercars", "Track Testing"],
    image: "/placeholder.svg?height=400&width=400",
    articles: 203,
    reviews: 112,
    social: {
      twitter: "https://twitter.com/davidchen",
      linkedin: "https://linkedin.com/in/davidchen",
      email: "david@kashiandkarz.com",
    },
  },
  {
    id: "olivia-rodriguez",
    name: "Olivia Rodriguez",
    role: "Family Car Expert",
    bio: "Olivia specializes in family vehicles, focusing on practicality, safety features, and value for money.",
    expertise: ["Family SUVs", "MPVs", "Child Safety"],
    image: "/placeholder.svg?height=400&width=400",
    articles: 156,
    reviews: 83,
    social: {
      twitter: "https://twitter.com/oliviarodriguez",
      linkedin: "https://linkedin.com/in/oliviarodriguez",
      email: "olivia@kashiandkarz.com",
    },
  },
]

const ExpertCard = ({ expert }: { expert: ExpertProps }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="relative w-full aspect-square rounded-md overflow-hidden mb-4">
          <Image
            src={expert.image || "/placeholder.svg"}
            alt={expert.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardTitle className="text-xl">{expert.name}</CardTitle>
        <CardDescription className="text-base font-medium text-primary">{expert.role}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{expert.bio}</p>
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Expertise:</h4>
          <div className="flex flex-wrap gap-2">
            {expert.expertise.map((item) => (
              <span key={item} className="text-xs bg-muted px-2 py-1 rounded-full">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-muted p-2 rounded-md text-center">
            <p className="text-lg font-bold">{expert.articles}</p>
            <p className="text-xs text-muted-foreground">Articles</p>
          </div>
          <div className="bg-muted p-2 rounded-md text-center">
            <p className="text-lg font-bold">{expert.reviews}</p>
            <p className="text-xs text-muted-foreground">Reviews</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex space-x-2">
          {expert.social.twitter && (
            <Link href={expert.social.twitter} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
          )}
          {expert.social.linkedin && (
            <Link href={expert.social.linkedin} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
          )}
          {expert.social.email && (
            <Link href={`mailto:${expert.social.email}`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Button>
            </Link>
          )}
        </div>
        <Link href={`/authors-experts/${expert.id}`}>
          <Button variant="outline" size="sm">
            View Profile
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default function AuthorsExpertsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Meet Our Automotive Experts</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Our team of experienced automotive journalists and industry experts bring you the most reliable car reviews,
          news, and advice.
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-12">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="all">All Experts</TabsTrigger>
            <TabsTrigger value="reviewers">Reviewers</TabsTrigger>
            <TabsTrigger value="technical">Technical Experts</TabsTrigger>
            <TabsTrigger value="consumer">Consumer Advice</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviewers">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts
              .filter((e) => e.role.includes("Editor") || e.expertise.includes("Sports Cars"))
              .map((expert) => (
                <ExpertCard key={expert.id} expert={expert} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="technical">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts
              .filter((e) => e.role.includes("Technical") || e.role.includes("Specialist"))
              .map((expert) => (
                <ExpertCard key={expert.id} expert={expert} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="consumer">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts
              .filter((e) => e.role.includes("Consumer") || e.expertise.includes("Car Buying"))
              .map((expert) => (
                <ExpertCard key={expert.id} expert={expert} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-muted p-8 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Join Our Expert Team</h2>
          <p className="text-muted-foreground">
            Are you an automotive expert interested in joining our team? We're always looking for talented writers and
            industry specialists.
          </p>
        </div>
        <div className="flex justify-center">
          <Link href="/careers">
            <Button size="lg">
              View Career Opportunities
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

