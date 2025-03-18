import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Music2, MapPin, Phone, Mail, Clock, Shield, Car, FileText } from "lucide-react"
import { Star } from "lucide-react"

const footerLinks = {
  carInfo: [
    { title: "Car news and advice", href: "/car-news-advice" },
    { title: "Car reviews", href: "/car-reviews" },
    { title: "Compare cars", href: "/compare-cars" },
    { title: "Find a car", href: "/find-a-car" },
    { title: "New car deals", href: "/new-cars" },
    { title: "Nearly new cars", href: "/used-cars?condition=nearly-new" },
    { title: "Used cars", href: "/used-cars" },
    { title: "Car leasing", href: "/car-leasing" },
    { title: "Sell my car", href: "/sell-my-car" },
    { title: "KashiAndKarz Leasing", href: "/leasing" },
  ],
  company: [
    { title: "About us", href: "/about-us" },
    { title: "Contact us", href: "/contact-us" },
    { title: "Leadership team", href: "/leadership-team" },
    { title: "Authors and experts", href: "/authors-experts" },
    { title: "How we test cars", href: "/how-we-test-cars" },
    { title: "KashiAndKarz newsroom", href: "/newsroom" },
    { title: "Careers", href: "/careers" },
    { title: "Dealer & brand partners", href: "/partners" },
    { title: "Refer a friend", href: "/refer-a-friend" },
  ],
  legal: [
    { title: "Terms & conditions", href: "/terms-conditions" },
    { title: "Manage cookies & privacy", href: "/cookies" },
    { title: "Fraud disclaimer", href: "/fraud-disclaimer" },
    { title: "ESG Policy", href: "/esg-policy" },
    { title: "Privacy policy", href: "/privacy-policy" },
    { title: "Modern slavery statement", href: "/modern-slavery-statement" },
    { title: "Sitemap", href: "/sitemap" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Youtube, href: "#" },
  { icon: Music2, href: "#", label: "TikTok" }, // Using Music2 as TikTok substitute
]

export function Footer() {
  return (
    <footer className="bg-[#1C1C1C] text-white">
      <div className="container px-4 py-12 md:px-6 mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <h3 className="mb-6 text-lg font-bold">Contact Us</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-white shrink-0 mt-0.5" />
                <p>Nairobi, Kenya<br />Mombasa Road, Business Park</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-white shrink-0" />
                <p>+254 700 123 456</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-white shrink-0" />
                <p>info@kashiandkarz.co.ke</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-white shrink-0" />
                <div>
                  <p>Monday to Friday: 8:00 - 18:00</p>
                  <p>Saturday: 9:00 - 15:00</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <Link key={index} href={social.href} className="rounded-full bg-white/10 p-2 hover:bg-white/20">
                    <Icon className="h-5 w-5 text-white" />
                    <span className="sr-only">{social.label || social.icon.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
          <div>
            <h3 className="mb-6 text-lg font-bold">Car Services</h3>
            <ul className="grid gap-3">
              {footerLinks.carInfo.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-gray-300 hover:text-white hover:underline">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-lg font-bold">Company</h3>
            <ul className="grid gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-gray-300 hover:text-white hover:underline">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-4">
              <p className="text-lg font-bold">Trusted by Kenyans</p>
              <div className="mt-2 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-[#ffb400] text-[#ffb400]" />
                ))}
              </div>
              <p className="mt-2 text-sm">Based on 500+ verified reviews</p>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-white" />
                <p className="text-sm">Secure payments</p>
              </div>
              <div className="flex items-center gap-3">
                <Car className="h-5 w-5 text-white" />
                <p className="text-sm">Quality assured vehicles</p>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-white" />
                <p className="text-sm">Transparent documentation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 bg-black">
        <div className="container px-4 py-6 md:px-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-gray-400"> 2025 Kashi & Karz Ltd. All rights reserved</p>
            <div className="flex gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white hover:underline"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-4 text-xs text-gray-400">
            <p>
              Kashi & Karz is a premier car dealership in Kenya, offering a wide selection of quality new and used vehicles.
              Our mission is to provide exceptional service and transparent car buying experience for all our customers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
