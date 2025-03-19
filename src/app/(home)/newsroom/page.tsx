import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ChevronRight, Download, ExternalLink, FileText, Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Newsroom | KashiAndKarz",
  description: "The latest news, press releases, and media resources from KashiAndKarz.",
}

interface PressReleaseProps {
  id: string
  title: string
  date: string
  excerpt: string
  category: string
  image?: string
}

interface MediaContactProps {
  name: string
  role: string
  email: string
  phone: string
  image: string
}

interface MediaResourceProps {
  title: string
  description: string
  type: "image" | "document" | "video"
  url: string
  fileSize?: string
}

const pressReleases: PressReleaseProps[] = [
  {
    id: "expansion-east-africa",
    title: "KashiAndKarz Announces Expansion into East African Markets",
    date: "March 15, 2025",
    excerpt:
      "KashiAndKarz is expanding its operations to Kenya, Tanzania, and Uganda, bringing its innovative car marketplace to East Africa.",
    category: "Corporate",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "new-ceo-appointment",
    title: "KashiAndKarz Appoints New Chief Executive Officer",
    date: "February 28, 2025",
    excerpt:
      "Industry veteran Sarah Johnson has been appointed as the new CEO of KashiAndKarz, bringing over 20 years of automotive and tech experience.",
    category: "Corporate",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "ev-marketplace-launch",
    title: "KashiAndKarz Launches Dedicated Electric Vehicle Marketplace",
    date: "February 10, 2025",
    excerpt: "New dedicated platform offers specialized tools and resources for buying and selling electric vehicles.",
    category: "Product",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "q4-2024-results",
    title: "KashiAndKarz Reports Record Growth in Q4 2024",
    date: "January 25, 2025",
    excerpt: "Company reports 45% year-over-year growth in transactions and 60% increase in active users.",
    category: "Financial",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "dealer-network-milestone",
    title: "KashiAndKarz Dealer Network Reaches 1,000 Partners",
    date: "January 12, 2025",
    excerpt:
      "Major milestone reached as dealer network expands across all regions, offering unprecedented vehicle selection.",
    category: "Partners",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "mobile-app-redesign",
    title: "KashiAndKarz Unveils Redesigned Mobile App with AI Features",
    date: "December 5, 2024",
    excerpt:
      "New mobile experience includes AI-powered vehicle recommendations and enhanced virtual showroom features.",
    category: "Product",
    image: "/placeholder.svg?height=400&width=600",
  },
]

const mediaContacts: MediaContactProps[] = [
  {
    name: "Michael Odhiambo",
    role: "Head of Public Relations",
    email: "michael.odhiambo@kashiandkarz.com",
    phone: "+254 712 345 678",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Priya Sharma",
    role: "Media Relations Manager",
    email: "priya.sharma@kashiandkarz.com",
    phone: "+254 723 456 789",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "David Mwangi",
    role: "Corporate Communications Director",
    email: "david.mwangi@kashiandkarz.com",
    phone: "+254 734 567 890",
    image: "/placeholder.svg?height=200&width=200",
  },
]

const mediaResources: MediaResourceProps[] = [
  {
    title: "KashiAndKarz Logo Package",
    description: "Official logos in various formats and resolutions",
    type: "image",
    url: "#",
    fileSize: "15 MB",
  },
  {
    title: "Company Fact Sheet",
    description: "Key facts and figures about KashiAndKarz",
    type: "document",
    url: "#",
    fileSize: "2 MB",
  },
  {
    title: "Executive Team Photos",
    description: "High-resolution images of KashiAndKarz leadership",
    type: "image",
    url: "#",
    fileSize: "25 MB",
  },
  {
    title: "Brand Guidelines",
    description: "Official brand guidelines and usage policies",
    type: "document",
    url: "#",
    fileSize: "8 MB",
  },
  {
    title: "Company Overview Video",
    description: "A short video introducing KashiAndKarz and our mission",
    type: "video",
    url: "#",
    fileSize: "45 MB",
  },
  {
    title: "Annual Report 2024",
    description: "Comprehensive report on company performance and strategy",
    type: "document",
    url: "#",
    fileSize: "12 MB",
  },
]

const PressReleaseCard = ({ pressRelease }: { pressRelease: PressReleaseProps }) => {
  return (
    <Card className="h-full flex flex-col">
      {pressRelease.image && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={pressRelease.image || "/placeholder.svg"}
            alt={pressRelease.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">{pressRelease.category}</Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {pressRelease.date}
          </div>
        </div>
        <CardTitle className="text-xl line-clamp-2">{pressRelease.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{pressRelease.excerpt}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/newsroom/press-releases/${pressRelease.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            Read Full Release
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

const MediaContactCard = ({ contact }: { contact: MediaContactProps }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="text-center">
        <div className="mx-auto relative w-24 h-24 rounded-full overflow-hidden mb-4">
          <Image
            src={contact.image || "/placeholder.svg"}
            alt={contact.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
        <CardTitle className="text-lg">{contact.name}</CardTitle>
        <CardDescription>{contact.role}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-3">
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
            <a href={`mailto:${contact.email}`} className="text-sm hover:underline">
              {contact.email}
            </a>
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-sm hover:underline">
              {contact.phone}
            </a>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Contact
        </Button>
      </CardFooter>
    </Card>
  )
}

const MediaResourceCard = ({ resource }: { resource: MediaResourceProps }) => {
  const getIcon = () => {
    switch (resource.type) {
      case "image":
        return <Image className="h-5 w-5" />
      case "document":
        return <FileText className="h-5 w-5" />
      case "video":
        return <ExternalLink className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="capitalize">
            {resource.type}
          </Badge>
          {resource.fileSize && <span className="text-xs text-muted-foreground">{resource.fileSize}</span>}
        </div>
        <CardTitle className="text-base">{resource.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{resource.description}</p>
      </CardContent>
      <CardFooter>
        <Link href={resource.url} className="w-full">
          <Button variant="outline" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default function NewsroomPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">KashiAndKarz Newsroom</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          The latest news, press releases, and media resources from KashiAndKarz.
        </p>
      </div>

      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Latest Press Releases</h2>
          <Link href="/newsroom/press-releases">
            <Button variant="outline">
              View All
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all">
          <div className="flex justify-start mb-8 overflow-x-auto pb-2">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="corporate">Corporate</TabsTrigger>
              <TabsTrigger value="product">Product</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="partners">Partners</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pressReleases.slice(0, 6).map((pressRelease) => (
                <PressReleaseCard key={pressRelease.id} pressRelease={pressRelease} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="corporate">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pressReleases
                .filter((pr) => pr.category === "Corporate")
                .map((pressRelease) => (
                  <PressReleaseCard key={pressRelease.id} pressRelease={pressRelease} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="product">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pressReleases
                .filter((pr) => pr.category === "Product")
                .map((pressRelease) => (
                  <PressReleaseCard key={pressRelease.id} pressRelease={pressRelease} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="financial">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pressReleases
                .filter((pr) => pr.category === "Financial")
                .map((pressRelease) => (
                  <PressReleaseCard key={pressRelease.id} pressRelease={pressRelease} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="partners">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pressReleases
                .filter((pr) => pr.category === "Partners")
                .map((pressRelease) => (
                  <PressReleaseCard key={pressRelease.id} pressRelease={pressRelease} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Separator className="my-16" />

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Media Contacts</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
          For press inquiries, interview requests, or additional information, please contact our media relations team.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mediaContacts.map((contact, index) => (
            <MediaContactCard key={index} contact={contact} />
          ))}
        </div>
      </div>

      <div className="bg-muted p-8 rounded-lg mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Media Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaResources.map((resource, index) => (
            <MediaResourceCard key={index} resource={resource} />
          ))}
        </div>
      </div>

      <div className="bg-primary text-primary-foreground p-8 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Media Kit Request</h2>
          <p className="max-w-2xl mx-auto">
            Need a comprehensive media kit or have specific resource requests? Fill out our media kit request form and
            our team will get back to you promptly.
          </p>
        </div>
        <div className="flex justify-center">
          <Link href="/newsroom/media-kit-request">
            <Button variant="secondary" size="lg">
              Request Media Kit
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

