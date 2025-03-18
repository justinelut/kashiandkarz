"use client"

import Link from "next/link"
import { Heart, Menu, User, ShoppingCart, UserPlus } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  {
    title: "New",
    href: "/new-cars",
    content: [
      {
        title: "Popular Makes",
        items: [
          { title: "BMW", href: "/makes/bmw" },
          { title: "Audi", href: "/makes/audi" },
          { title: "Mercedes", href: "/makes/mercedes" },
          { title: "Volkswagen", href: "/makes/volkswagen" },
          { title: "Toyota", href: "/makes/toyota" },
          { title: "Ford", href: "/makes/ford" },
        ],
      },
      {
        title: "Car Types",
        items: [
          { title: "SUVs", href: "/categories/suv" },
          { title: "Hatchbacks", href: "/categories/hatchback" },
          { title: "Saloons", href: "/categories/saloon" },
          { title: "Electric Cars", href: "/categories/electric" },
          { title: "Hybrid Cars", href: "/categories/hybrid" },
        ],
      },
      {
        title: "Buying Options",
        items: [
          { title: "PCP Finance", href: "/finance/pcp" },
          { title: "Cash Purchase", href: "/finance/cash" },
          { title: "Car Leasing", href: "/finance/leasing" },
          { title: "Business Leasing", href: "/finance/business-leasing" },
        ],
      },
    ],
  },
  {
    title: "Used",
    href: "/used-cars",
    content: [
      {
        title: "Browse Used Cars",
        items: [
          { title: "All Used Cars", href: "/used-cars" },
          { title: "Nearly New Cars", href: "/used-cars?condition=nearly-new" },
          { title: "Used Car Deals", href: "/used-cars?deals=true" },
          { title: "Sell Your Car", href: "/sell" },
        ],
      },
      {
        title: "Popular Used Makes",
        items: [
          { title: "Used BMW", href: "/makes/bmw?condition=used" },
          { title: "Used Audi", href: "/makes/audi?condition=used" },
          { title: "Used Mercedes", href: "/makes/mercedes?condition=used" },
          { title: "Used Volkswagen", href: "/makes/volkswagen?condition=used" },
          { title: "Used Ford", href: "/makes/ford?condition=used" },
        ],
      },
    ],
  },
  {
    title: "Sell",
    href: "/sell",
    content: [
      {
        title: "Selling Options",
        items: [
          { title: "Instant Offer", href: "/sell/instant-offer" },
          { title: "Part Exchange", href: "/sell/part-exchange" },
          { title: "Sell at Auction", href: "/sell/auction" },
          { title: "Car Valuation", href: "/sell/valuation" },
        ],
      },
      {
        title: "Selling Guides",
        items: [
          { title: "How to Sell Your Car", href: "/guides/how-to-sell" },
          { title: "Best Time to Sell", href: "/guides/best-time-to-sell" },
          { title: "Preparing Your Car for Sale", href: "/guides/preparing-for-sale" },
        ],
      },
    ],
  },
  {
    title: "Electric",
    href: "/categories/electric",
    content: [
      {
        title: "Electric Cars",
        items: [
          { title: "All Electric Cars", href: "/categories/electric" },
          { title: "Electric Car Leasing", href: "/finance/leasing?fuel=electric" },
          { title: "Electric Car Guides", href: "/guides/electric-cars" },
          { title: "Charging Guide", href: "/guides/ev-charging" },
        ],
      },
      {
        title: "Popular Electric Models",
        items: [
          { title: "Tesla Model 3", href: "/car/tesla-model-3" },
          { title: "BMW i4", href: "/car/bmw-i4" },
          { title: "Kia EV6", href: "/car/kia-ev6" },
          { title: "Hyundai Ioniq 5", href: "/car/hyundai-ioniq-5" },
        ],
      },
    ],
  },
  {
    title: "Leasing",
    href: "/finance/leasing",
    content: [
      {
        title: "Leasing Options",
        items: [
          { title: "Personal Car Leasing", href: "/finance/leasing/personal" },
          { title: "Business Car Leasing", href: "/finance/leasing/business" },
          { title: "Leasing Deals", href: "/finance/leasing/deals" },
          { title: "Leasing Guides", href: "/guides/leasing" },
        ],
      },
      {
        title: "Popular Lease Cars",
        items: [
          { title: "BMW Leasing", href: "/finance/leasing/makes/bmw" },
          { title: "Audi Leasing", href: "/finance/leasing/makes/audi" },
          { title: "Mercedes Leasing", href: "/finance/leasing/makes/mercedes" },
          { title: "Tesla Leasing", href: "/finance/leasing/makes/tesla" },
        ],
      },
    ],
  },
  {
    title: "Reviews",
    href: "/reviews",
    content: [
      {
        title: "Car Reviews",
        items: [
          { title: "Latest Reviews", href: "/reviews/latest" },
          { title: "Top 10 Lists", href: "/reviews/top-10" },
          { title: "Car Comparisons", href: "/reviews/comparisons" },
          { title: "Owner Reviews", href: "/reviews/owners" },
        ],
      },
      {
        title: "Popular Reviews",
        items: [
          { title: "BMW M5", href: "/reviews/bmw-m5" },
          { title: "Audi RS6", href: "/reviews/audi-rs6" },
          { title: "Tesla Model 3", href: "/reviews/tesla-model-3" },
          { title: "Volkswagen Golf", href: "/reviews/volkswagen-golf" },
        ],
      },
    ],
  },
  {
    title: "News",
    href: "/news",
    content: [
      {
        title: "Car News",
        items: [
          { title: "Latest News", href: "/news/latest" },
          { title: "New Car Releases", href: "/news/new-releases" },
          { title: "Industry News", href: "/news/industry" },
          { title: "Car Technology", href: "/news/technology" },
        ],
      },
      {
        title: "Guides & Advice",
        items: [
          { title: "Buying Guides", href: "/guides/buying" },
          { title: "Selling Guides", href: "/guides/selling" },
          { title: "Car Finance Guides", href: "/guides/finance" },
          { title: "Car Insurance Guides", href: "/guides/insurance" },
        ],
      },
    ],
  },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  
  // Transform blur based on scroll position
  const headerBlur = useTransform(scrollY, [0, 100], [0, 8])
  
  // Update isScrolled state based on scroll position
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50)
    })
    return () => unsubscribe()
  }, [scrollY])

  return (
    <div className="fixed top-0 z-50 w-full">
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background layer with dynamic opacity */}
        <div className="absolute inset-0 border-b backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.8)",
              backdropFilter: `blur(${headerBlur.get()}px)`,
              borderColor: isScrolled ? "rgba(0, 0, 0, 0.1)" : "transparent"
            }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        <div className="container relative flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                    <span className="text-xl font-bold text-primary">Kashi&Karz</span>
                  </Link>
                  
                  <div className="space-y-2">
                    {navItems.map((item) => (
                      <div key={item.title} className="pb-4">
                        <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {item.content.flatMap(section => 
                            section.items.slice(0, 3).map(subItem => (
                              <Link 
                                key={subItem.title} 
                                href={subItem.href} 
                                className="rounded-md px-3 py-2 text-sm hover:bg-muted hover:text-primary transition-colors"
                              >
                                {subItem.title}
                              </Link>
                            ))
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 grid gap-2">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">Account</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start">
                        <User className="mr-2 h-4 w-4" />
                        Sign in
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Register
                      </Button>
                      <Button className="justify-start">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Buying
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Heart className="mr-2 h-4 w-4" />
                        Selling
                      </Button>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2">
              <motion.span
                initial={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Link href="/" className="flex items-center gap-2">
                  <span className="text-xl font-bold">Kashi&Karz</span>
                </Link>
              </motion.span>
            </div>
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger 
                      className="transition-colors duration-300 data-[state=open]:bg-transparent"
                    >
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[600px] grid-cols-2 gap-3 p-4 bg-white text-black">
                        {item.content.map((section) => (
                          <div key={section.title} className="space-y-2">
                            <h3 className="font-medium">{section.title}</h3>
                            <ul className="space-y-1">
                              {section.items.map((subItem) => (
                                <li key={subItem.title}>
                                  <NavigationMenuLink asChild>
                                    <Link href={subItem.href} className="block rounded-md p-2 text-sm hover:bg-muted">
                                      {subItem.title}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="hidden md:flex md:gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="transition-colors duration-300"
                  >
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Favorites</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="transition-colors duration-300"
                  >
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
