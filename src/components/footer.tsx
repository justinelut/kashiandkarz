import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Music2 } from "lucide-react"
import { Star } from "lucide-react"

const footerLinks = {
  carInfo: [
    { title: "Car news and advice", href: "#" },
    { title: "Car reviews", href: "#" },
    { title: "Compare cars", href: "#" },
    { title: "Find a car", href: "#" },
    { title: "New car deals", href: "#" },
    { title: "Nearly new cars", href: "#" },
    { title: "Used cars", href: "#" },
    { title: "Car leasing", href: "#" },
    { title: "Sell my car", href: "#" },
    { title: "Carwow Leasing", href: "#" },
  ],
  company: [
    { title: "About us", href: "#" },
    { title: "Contact us", href: "#" },
    { title: "Leadership team", href: "#" },
    { title: "Authors and experts", href: "#" },
    { title: "How we test cars", href: "#" },
    { title: "Carwow newsroom", href: "#" },
    { title: "Careers", href: "#" },
    { title: "Dealer & brand partners", href: "#" },
    { title: "Refer a friend", href: "#" },
  ],
  legal: [
    { title: "Terms & conditions", href: "#" },
    { title: "Manage cookies & privacy", href: "#" },
    { title: "Fraud disclaimer", href: "#" },
    { title: "ESG Policy", href: "#" },
    { title: "Privacy policy", href: "#" },
    { title: "Modern slavery statement", href: "#" },
    { title: "Sitemap", href: "#" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Youtube, href: "#" },
  { icon: Music2, href: "#" }, // TikTok icon substitute
]

export function Footer() {
  return (
    <footer className="bg-[#1C1C1C] text-white">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <h3 className="mb-6 text-lg font-bold">Help Centre</h3>
            <div className="space-y-2 text-gray-300">
              <p>Monday to Friday 9.00 - 18.00</p>
              <p>Saturday 9.00 - 17.30</p>
              <p>Sundays and Bank Holidays CLOSED</p>
            </div>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <Link key={index} href={social.href} className="rounded-full bg-white/10 p-2 hover:bg-white/20">
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{social.icon.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
          <div>
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
              <p className="text-lg font-bold">Rated 4.5/5 from 66,161 reviews</p>
              <div className="mt-2 flex">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-[#00e1e1] text-[#00e1e1]" />
                ))}
                <Star className="h-5 w-5 fill-[#00e1e1]/50 text-[#00e1e1]" />
              </div>
            </div>
            <img src="/placeholder.svg?height=30&width=100" alt="Trustpilot" className="h-8" />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 bg-black">
        <div className="container px-4 py-6 md:px-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-gray-400">© 2025 Carwow Ltd. All rights reserved</p>
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
          <div className="mb-6 flex gap-4">
            <Link href="#" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
              <img src="/placeholder.svg?height=20&width=30" alt="UK flag" className="h-5" />
              UK
            </Link>
            <Link href="#" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
              <img src="/placeholder.svg?height=20&width=30" alt="Germany flag" className="h-5" />
              Germany
            </Link>
            <Link href="#" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
              <img src="/placeholder.svg?height=20&width=30" alt="Spain flag" className="h-5" />
              Spain
            </Link>
          </div>
          <div className="space-y-4 text-xs text-gray-400">
            <p>
              * Please contact the dealer for a personalised quote, including terms and conditions. Quote is subject to
              dealer requirements, including status and availability. Illustrations are based on personal contract hire,
              9 month upfront fee, 48 month term, 8000 miles annually, inc VAT, excluding fees. Vehicle returned at term
              end.
            </p>
            <p>
              **{" "}
              <Link href="#" className="underline">
                Our marketing claims explained.
              </Link>
            </p>
            <p className="leading-relaxed">
              <Link href="#" className="underline">
                Average savings
              </Link>{" "}
              are calculated daily based on the best dealer prices on Carwow vs manufacturer RRP. Carwow is the trading
              name of Carwow Ltd, which is authorised and regulated by the Financial Conduct Authority for credit
              broking and insurance distribution activities (firm reference number: 767155). Carwow Leasey Limited is an
              appointed representative of ITC Compliance Limited which is authorised and regulated by the Financial
              Conduct Authority for credit broking (firm reference number: 313486) Carwow and Carwow Leasey Limited are
              each credit brokers and not a lenders. Carwow and Carwow Leasey Limited may receive a fee from retailers
              advertising finance and may receive a commission from partners (including dealers) for introducing
              customers. All finance offers and monthly payments shown are subject to application and status. Carwow is
              covered by the Financial Ombudsman Service (please see{" "}
              <Link href="http://www.financial-ombudsman.org.uk" className="underline">
                www.financial-ombudsman.org.uk
              </Link>{" "}
              for more information). Carwow Ltd is registered in England (company number 07103079), registered office
              2nd Floor, Verde Building, 10 Bressenden Place, London, England, SW1E 5DH. Carwow Limited is registered in
              England (company number 13601714), registered office 2nd Floor, Verde Building, 10 Bressenden Place,
              London, England, SW1E 5DH and is a wholly owned subsidiary of Carwow Ltd.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#1C1C1C] p-4 text-center">
        <Link href="#" className="text-[#00e1e1] hover:underline">
          Spring Sale - Save up to £7,550 off RRP*
        </Link>
      </div>
    </footer>
  )
}

