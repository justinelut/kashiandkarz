import { PageLayout } from "@/components/layouts/page-layout"
import Image from "next/image"
import Link from "next/link"
import { Linkedin, Twitter } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  linkedin?: string
  twitter?: string
}

const leadershipTeam: TeamMember[] = [
  {
    name: "Sarah Johnson",
    role: "Chief Executive Officer",
    bio: "Sarah brings over 20 years of experience in the automotive industry. Before founding KashiAndKarz, she served as VP of Operations at AutoTrader and led digital transformation initiatives at BMW UK. Sarah is passionate about creating transparent, customer-focused experiences in the automotive sector.",
    image: "/placeholder.svg?height=400&width=400",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Michael Chen",
    role: "Chief Technology Officer",
    bio: "Michael leads our technology and engineering teams. With a background in computer science and previous roles at Google and Uber, he brings extensive experience in building scalable platforms. Michael is focused on leveraging AI and data analytics to create personalized car buying experiences.",
    image: "/placeholder.svg?height=400&width=400",
    linkedin: "#",
  },
  {
    name: "Olivia Patel",
    role: "Chief Marketing Officer",
    bio: "Olivia oversees our brand strategy and marketing initiatives. With previous leadership roles at Jaguar Land Rover and Audi, she brings deep automotive marketing expertise. Olivia is dedicated to building the KashiAndKarz brand and connecting with car buyers through innovative campaigns.",
    image: "/placeholder.svg?height=400&width=400",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "James Wilson",
    role: "Chief Financial Officer",
    bio: "James manages our financial strategy and operations. With 15 years of experience in financial leadership at companies like Enterprise Holdings and Hertz, he brings valuable industry knowledge. James is committed to building a sustainable business model that delivers value to customers and shareholders.",
    image: "/placeholder.svg?height=400&width=400",
    linkedin: "#",
  },
  {
    name: "Emma Rodriguez",
    role: "Chief Operating Officer",
    bio: "Emma leads our day-to-day operations and dealer partnerships. Previously, she served as Regional Director at CarMax and Operations Lead at Auto Trader. Emma is focused on creating seamless processes that connect car buyers with the right vehicles at the right price.",
    image: "/placeholder.svg?height=400&width=400",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "David Kim",
    role: "Head of Customer Experience",
    bio: "David oversees our customer support and experience initiatives. With previous roles at Tesla and Toyota, he brings a deep understanding of automotive customer service. David is passionate about creating exceptional experiences at every touchpoint of the car buying journey.",
    image: "/placeholder.svg?height=400&width=400",
    linkedin: "#",
  },
]

export const metadata = {
  title: "Leadership Team | KashiAndKarz",
  description: "Meet the experienced team leading KashiAndKarz's mission to transform car buying.",
}

export default function LeadershipTeamPage() {
  return (
    <PageLayout
      title="Our Leadership Team"
      description="Meet the experienced professionals driving KashiAndKarz forward."
      breadcrumbs={[{ label: "Leadership Team", href: "/leadership-team" }]}
    >
      <section className="mb-12">
        <p>
          Our leadership team brings together decades of experience from the automotive, technology, and consumer
          service industries. United by a passion for transforming car buying, they're committed to building a platform
          that puts customers first.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-x-12 gap-y-16">
        {leadershipTeam.map((member) => (
          <div key={member.name} className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="relative h-48 w-48 rounded-lg overflow-hidden">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="mt-3 flex space-x-3">
                {member.linkedin && (
                  <Link href={member.linkedin} className="text-muted-foreground hover:text-primary">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                )}
                {member.twitter && (
                  <Link href={member.twitter} className="text-muted-foreground hover:text-primary">
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">{member.name}</h2>
              <p className="text-primary font-medium mb-3">{member.role}</p>
              <p className="text-muted-foreground">{member.bio}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Join Our Team</h2>
        <p>
          We're always looking for talented individuals who share our passion for transforming the automotive industry.
          If you're interested in joining our team, check out our current openings.
        </p>
        <div className="mt-4">
          <Link
            href="/careers"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
          >
            View Career Opportunities
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}

