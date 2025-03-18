import { PageLayout } from "@/components/layouts/page-layout"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input" // Added missing import
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Clock, ArrowRight, Tag } from "lucide-react"

// Mock data for articles
const featuredArticles = [
  {
    id: 1,
    title: "The Future of Electric Vehicles: What to Expect in 2025",
    excerpt:
      "With rapid advancements in battery technology and charging infrastructure, the electric vehicle landscape is set to transform dramatically in the coming year.",
    image: "/placeholder.svg?height=600&width=1200",
    date: "March 10, 2025",
    readTime: "8 min read",
    category: "Electric Vehicles",
    slug: "future-of-electric-vehicles-2025",
  },
  {
    id: 2,
    title: "Top 10 Family SUVs for 2025: Space, Safety, and Style",
    excerpt:
      "Looking for the perfect family SUV? Our experts have tested the latest models to bring you the top contenders that excel in space, safety features, and design.",
    image: "/placeholder.svg?height=600&width=1200",
    date: "March 5, 2025",
    readTime: "10 min read",
    category: "SUVs",
    slug: "top-family-suvs-2025",
  },
  {
    id: 3,
    title: "Car Finance Explained: Finding the Best Deal in Today's Market",
    excerpt:
      "Navigating car finance options can be confusing. Our comprehensive guide breaks down PCP, HP, and leasing to help you make the right financial decision.",
    image: "/placeholder.svg?height=600&width=1200",
    date: "February 28, 2025",
    readTime: "12 min read",
    category: "Car Finance",
    slug: "car-finance-explained-2025",
  },
]

const latestNews = [
  {
    id: 4,
    title: "New Emissions Standards Set to Impact Car Prices",
    excerpt:
      "The government has announced stricter emissions standards starting next year. Here's how it might affect new car prices and what it means for buyers.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 12, 2025",
    readTime: "5 min read",
    category: "Industry News",
    slug: "new-emissions-standards-impact",
  },
  {
    id: 5,
    title: "Major Manufacturer Announces Revolutionary Self-Driving Technology",
    excerpt:
      "One of the world's largest automakers has unveiled breakthrough autonomous driving features that could be available in consumer vehicles as early as next year.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 11, 2025",
    readTime: "6 min read",
    category: "Technology",
    slug: "revolutionary-self-driving-technology",
  },
  {
    id: 6,
    title: "UK Car Market Shows Strong Recovery in First Quarter",
    excerpt:
      "After years of uncertainty, the UK automotive market is showing signs of robust growth with sales figures exceeding pre-pandemic levels.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 9, 2025",
    readTime: "4 min read",
    category: "Market Analysis",
    slug: "uk-car-market-recovery-q1",
  },
  {
    id: 7,
    title: "New Safety Ratings System Launches for Electric Vehicles",
    excerpt:
      "A specialized safety rating system for electric vehicles has been introduced, focusing on battery safety and charging-related hazards.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 7, 2025",
    readTime: "7 min read",
    category: "Safety",
    slug: "new-ev-safety-ratings",
  },
]

const buyingGuides = [
  {
    id: 8,
    title: "Complete Guide to Buying Your First Electric Car",
    excerpt:
      "Everything you need to know before making the switch to electric, from range considerations to charging options and available incentives.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 1, 2025",
    readTime: "15 min read",
    category: "Buying Guide",
    slug: "first-electric-car-buying-guide",
  },
  {
    id: 9,
    title: "How to Negotiate the Best Price When Buying a New Car",
    excerpt:
      "Our expert negotiation tactics will help you secure the best possible deal on your next new car purchase, potentially saving thousands.",
    image: "/placeholder.svg?height=400&width=600",
    date: "February 25, 2025",
    readTime: "9 min read",
    category: "Buying Guide",
    slug: "car-price-negotiation-guide",
  },
  {
    id: 10,
    title: "Used Car Buying Checklist: What to Look For",
    excerpt:
      "Don't get caught out when buying a used car. Our comprehensive checklist covers everything from documentation to mechanical inspections.",
    image: "/placeholder.svg?height=400&width=600",
    date: "February 20, 2025",
    readTime: "11 min read",
    category: "Buying Guide",
    slug: "used-car-buying-checklist",
  },
  {
    id: 11,
    title: "Car Insurance Guide: Finding the Right Coverage",
    excerpt:
      "Understanding the different types of car insurance and how to find the best coverage for your specific needs and budget.",
    image: "/placeholder.svg?height=400&width=600",
    date: "February 15, 2025",
    readTime: "8 min read",
    category: "Insurance",
    slug: "car-insurance-guide",
  },
]

const carReviews = [
  {
    id: 12,
    title: "2025 Tesla Model 3 Long Range Review",
    excerpt:
      "We put the latest Tesla Model 3 through its paces to see if the updates make it the best electric sedan on the market.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 8, 2025",
    readTime: "14 min read",
    category: "Car Review",
    slug: "2025-tesla-model-3-review",
  },
  {
    id: 13,
    title: "BMW i5 vs Mercedes EQE: Executive Electric Showdown",
    excerpt:
      "Two German luxury giants face off in the electric executive sedan segment. Which offers the better blend of luxury, technology, and range?",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 3, 2025",
    readTime: "16 min read",
    category: "Comparison",
    slug: "bmw-i5-vs-mercedes-eqe",
  },
  {
    id: 14,
    title: "2025 Range Rover Sport PHEV: First Drive",
    excerpt:
      "The latest plug-in hybrid Range Rover Sport promises to combine luxury, performance, and efficiency. Does it deliver?",
    image: "/placeholder.svg?height=400&width=600",
    date: "February 27, 2025",
    readTime: "12 min read",
    category: "Car Review",
    slug: "2025-range-rover-sport-phev-review",
  },
  {
    id: 15,
    title: "Budget Hatchback Comparison: The Best Under £20,000",
    excerpt:
      "We compare the top five affordable hatchbacks to find which offers the best value, practicality, and driving experience.",
    image: "/placeholder.svg?height=400&width=600",
    date: "February 22, 2025",
    readTime: "13 min read",
    category: "Comparison",
    slug: "budget-hatchback-comparison",
  },
]

const popularTopics = [
  "Electric Vehicles",
  "SUVs",
  "Car Finance",
  "Hybrid Cars",
  "Safety",
  "Car Insurance",
  "Maintenance",
  "Fuel Economy",
  "Family Cars",
  "Luxury Vehicles",
  "Sports Cars",
  "Car Technology",
]

export const metadata = {
  title: "Car News & Advice | KashiAndKarz",
  description: "Stay informed with the latest automotive news, expert advice, buying guides, and in-depth car reviews.",
}

export default function CarNewsAdvicePage() {
  return (
    <PageLayout
      title="Car News & Advice"
      description="Stay informed with the latest automotive news, expert advice, buying guides, and in-depth car reviews."
      breadcrumbs={[{ label: "Car News & Advice", href: "/car-news-advice" }]}
    >
      {/* Featured Articles Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Tag className="h-4 w-4" />
                  <span>{article.category}</span>
                </div>
                <CardTitle className="line-clamp-2">
                  <Link href={`/car-news-advice/${article.slug}`} className="hover:text-primary">
                    {article.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Tabbed Content Section */}
      <section className="mb-16">
        <Tabs defaultValue="latest-news">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="latest-news">Latest News</TabsTrigger>
            <TabsTrigger value="buying-guides">Buying Guides</TabsTrigger>
            <TabsTrigger value="car-reviews">Car Reviews</TabsTrigger>
            <TabsTrigger value="popular-topics">Popular Topics</TabsTrigger>
          </TabsList>

          {/* Latest News Tab */}
          <TabsContent value="latest-news" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8">
              {latestNews.map((article) => (
                <div key={article.id} className="flex gap-4">
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="font-semibold mb-1 line-clamp-2">
                      <Link href={`/car-news-advice/${article.slug}`} className="hover:text-primary">
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline">
                View All News <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Buying Guides Tab */}
          <TabsContent value="buying-guides" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8">
              {buyingGuides.map((guide) => (
                <div key={guide.id} className="flex gap-4">
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <Image
                      src={guide.image || "/placeholder.svg"}
                      alt={guide.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <span>{guide.category}</span>
                      <span>•</span>
                      <span>{guide.date}</span>
                    </div>
                    <h3 className="font-semibold mb-1 line-clamp-2">
                      <Link href={`/car-news-advice/${guide.slug}`} className="hover:text-primary">
                        {guide.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{guide.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline">
                View All Buying Guides <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Car Reviews Tab */}
          <TabsContent value="car-reviews" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8">
              {carReviews.map((review) => (
                <div key={review.id} className="flex gap-4">
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <Image
                      src={review.image || "/placeholder.svg"}
                      alt={review.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <span>{review.category}</span>
                      <span>•</span>
                      <span>{review.date}</span>
                    </div>
                    <h3 className="font-semibold mb-1 line-clamp-2">
                      <Link href={`/car-news-advice/${review.slug}`} className="hover:text-primary">
                        {review.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{review.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline">
                View All Car Reviews <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Popular Topics Tab */}
          <TabsContent value="popular-topics" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {popularTopics.map((topic) => (
                <Link
                  key={topic}
                  href={`/car-news-advice/topics/${topic.toLowerCase().replace(/\s+/g, "-")}`}
                  className="bg-muted hover:bg-muted/80 p-4 rounded-lg text-center transition-colors"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-muted p-8 rounded-lg mb-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6">
            Subscribe to our newsletter to receive the latest automotive news, reviews, and advice directly in your
            inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input type="email" placeholder="Your email address" className="flex-grow" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Expert Authors Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Meet Our Automotive Experts</h2>
        <p className="mb-8">
          Our content is written by experienced automotive journalists and industry experts who are passionate about
          cars and committed to providing accurate, insightful information.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((expert) => (
            <div key={expert} className="text-center">
              <div className="relative h-32 w-32 mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src={`/placeholder.svg?height=200&width=200`}
                  alt={`Automotive Expert ${expert}`}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold">Expert Name</h3>
              <p className="text-sm text-muted-foreground">Automotive Journalist</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline">
            View All Experts <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </PageLayout>
  )
}

