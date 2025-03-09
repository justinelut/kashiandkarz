"use client"

import Link from "next/link"
import { Heart, Menu, User, ShoppingCart } from "lucide-react"

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
    href: "#",
    content: [
      {
        title: "Popular Makes",
        items: [
          { title: "BMW", href: "#" },
          { title: "Audi", href: "#" },
          { title: "Mercedes", href: "#" },
          { title: "Volkswagen", href: "#" },
          { title: "Toyota", href: "#" },
          { title: "Ford", href: "#" },
        ],
      },
      {
        title: "Car Types",
        items: [
          { title: "SUVs", href: "#" },
          { title: "Hatchbacks", href: "#" },
          { title: "Saloons", href: "#" },
          { title: "Electric Cars", href: "#" },
          { title: "Hybrid Cars", href: "#" },
        ],
      },
      {
        title: "Buying Options",
        items: [
          { title: "PCP Finance", href: "#" },
          { title: "Cash Purchase", href: "#" },
          { title: "Car Leasing", href: "#" },
          { title: "Business Leasing", href: "#" },
        ],
      },
    ],
  },
  {
    title: "Used",
    href: "#",
    content: [
      {
        title: "Browse Used Cars",
        items: [
          { title: "All Used Cars", href: "#" },
          { title: "Nearly New Cars", href: "#" },
          { title: "Used Car Deals", href: "#" },
          { title: "Sell Your Car", href: "#" },
        ],
      },
      {
        title: "Popular Used Makes",
        items: [
          { title: "Used BMW", href: "#" },
          { title: "Used Audi", href: "#" },
          { title: "Used Mercedes", href: "#" },
          { title: "Used Volkswagen", href: "#" },
          { title: "Used Ford", href: "#" },
        ],
      },
    ],
  },
  {
    title: "Sell",
    href: "#",
    content: [
      {
        title: "Selling Options",
        items: [
          { title: "Instant Offer", href: "#" },
          { title: "Part Exchange", href: "#" },
          { title: "Sell at Auction", href: "#" },
          { title: "Car Valuation", href: "#" },
        ],
      },
      {
        title: "Selling Guides",
        items: [
          { title: "How to Sell Your Car", href: "#" },
          { title: "Best Time to Sell", href: "#" },
          { title: "Preparing Your Car for Sale", href: "#" },
        ],
      },
    ],
  },
  {
    title: "Electric",
    href: "#",
    content: [
      {
        title: "Electric Cars",
        items: [
          { title: "All Electric Cars", href: "#" },
          { title: "Electric Car Leasing", href: "#" },
          { title: "Electric Car Guides", href: "#" },
          { title: "Charging Guide", href: "#" },
        ],
      },
      {
        title: "Popular Electric Models",
        items: [
          { title: "Tesla Model 3", href: "#" },
          { title: "BMW i4", href: "#" },
          { title: "Kia EV6", href: "#" },
          { title: "Hyundai Ioniq 5", href: "#" },
        ],
      },
    ],
  },
  {
    title: "Leasing",
    href: "#",
    content: [
      {
        title: "Leasing Options",
        items: [
          { title: "Personal Car Leasing", href: "#" },
          { title: "Business Car Leasing", href: "#" },
          { title: "Leasing Deals", href: "#" },
          { title: "Leasing Guides", href: "#" },
        ],
      },
      {
        title: "Popular Lease Cars",
        items: [
          { title: "BMW Leasing", href: "#" },
          { title: "Audi Leasing", href: "#" },
          { title: "Mercedes Leasing", href: "#" },
          { title: "Tesla Leasing", href: "#" },
        ],
      },
    ],
  },
  {
    title: "Reviews",
    href: "#",
    content: [
      {
        title: "Car Reviews",
        items: [
          { title: "Latest Reviews", href: "#" },
          { title: "Top 10 Lists", href: "#" },
          { title: "Car Comparisons", href: "#" },
          { title: "Owner Reviews", href: "#" },
        ],
      },
      {
        title: "Popular Reviews",
        items: [
          { title: "BMW M5", href: "#" },
          { title: "Audi RS6", href: "#" },
          { title: "Tesla Model 3", href: "#" },
          { title: "Volkswagen Golf", href: "#" },
        ],
      },
    ],
  },
  {
    title: "News",
    href: "#",
    content: [
      {
        title: "Car News",
        items: [
          { title: "Latest News", href: "#" },
          { title: "New Car Releases", href: "#" },
          { title: "Industry News", href: "#" },
          { title: "Car Technology", href: "#" },
        ],
      },
      {
        title: "Guides & Advice",
        items: [
          { title: "Buying Guides", href: "#" },
          { title: "Selling Guides", href: "#" },
          { title: "Car Finance Guides", href: "#" },
          { title: "Car Insurance Guides", href: "#" },
        ],
      },
    ],
  },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                  <span className="text-xl font-bold text-primary">Kashi&Karz</span>
                </Link>
                {navItems.map((item) => (
                  <Link key={item.title} href={item.href} className="hover:text-primary">
                    {item.title}
                  </Link>
                ))}
                <div className="mt-4 grid gap-2">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Log in
                  </Button>
                  <Button className="w-full justify-start">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Buying
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="mr-2 h-4 w-4" />
                    Selling
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">Kashi&Karz</span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
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
          <div className="hidden md:flex md:gap-2">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Favorites</span>
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Buying</span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </div>
          <Button variant="outline" className="hidden md:flex">
            Menu
          </Button>
        </div>
      </div>
    </header>
  )
}

