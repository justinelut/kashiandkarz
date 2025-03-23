"use client"

import Link from "next/link"
import { Heart, Menu, User, ShoppingCart, UserPlus, LogOut, Bell, Settings, ChevronDown, Home, Search, Bookmark, Car, CreditCard, Newspaper } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import { useAuth } from "@/lib/appwrite-provider"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const navItems = [
  {
    title: "New",
    href: "/new-cars",
    icon: <Car className="h-5 w-5" />,
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
    icon: <Car className="h-5 w-5" />,
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
    icon: <CreditCard className="h-5 w-5" />,
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
    icon: <Car className="h-5 w-5" />,
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
    icon: <CreditCard className="h-5 w-5" />,
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
    icon: <Bookmark className="h-5 w-5" />,
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
    icon: <Newspaper className="h-5 w-5" />,
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
  const { user, isSignedIn } = useAuth()
  const [activeTab, setActiveTab] = useState("browse")

  // Transform blur based on scroll position
  const headerBlur = useTransform(scrollY, [0, 100], [0, 8])

  // Update isScrolled state based on scroll position
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50)
    })
    return () => unsubscribe()
  }, [scrollY])

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user || !user.name) return "KK";
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

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
              backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.8)",
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
              <SheetContent side="left" className="w-full sm:max-w-md p-0 flex flex-col h-full overflow-hidden">
                <div className="flex flex-col h-full overflow-hidden">
                  <SheetHeader className="px-4 py-4 border-b">
                    <SheetTitle>
                      <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Kashi&Karz</span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>

                  {/* Mobile search */}
                  <div className="px-4 py-3 border-b">
                    <div className="relative">
                      {/* Center the icon vertically */}
                      <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search cars, makes or models..."
                        className="pl-8 bg-muted/50"
                      />
                    </div>
                  </div>

                  {/* Tabs navigation for mobile */}
                  <Tabs defaultValue="browse" className="flex-1 overflow-hidden" onValueChange={setActiveTab}>
                    <div className="border-b">
                      <TabsList className="w-full justify-start rounded-none bg-transparent border-b px-2 h-12">
                        <TabsTrigger value="browse" className="data-[state=active]:border-b-2 rounded-none border-primary data-[state=active]:shadow-none">
                          Browse
                        </TabsTrigger>
                        <TabsTrigger value="account" className="data-[state=active]:border-b-2 rounded-none border-primary data-[state=active]:shadow-none">
                          Account
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <div className="flex-1 overflow-auto">
                      <TabsContent value="browse" className="h-full overflow-auto mt-0 p-0">
                        <div className="p-4 space-y-6">
                          {navItems.map((item) => (
                            <div key={item.title} className="space-y-3">
                              <div className="flex items-center gap-2">
                                {item.icon}
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {item.content.flatMap(section =>
                                  section.items.slice(0, 4).map(subItem => (
                                    <Link
                                      key={subItem.title}
                                      href={subItem.href}
                                      className="flex items-center rounded-md px-3 py-2 text-sm bg-muted/50 hover:bg-muted hover:text-primary transition-colors"
                                    >
                                      {subItem.title}
                                    </Link>
                                  ))
                                )}
                              </div>
                              <Link
                                href={item.href}
                                className="text-sm text-primary font-medium inline-flex mt-1"
                              >
                                View all {item.title.toLowerCase()} options
                              </Link>
                              <Separator className="mt-4" />
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="account" className="h-full overflow-auto mt-0 p-0">
                        <div className="p-4 space-y-6">
                          {isSignedIn ? (
                            <div className="space-y-6">
                              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                <Avatar className="h-14 w-14">
                                  <AvatarImage src={user?.avatarUrl} />
                                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">{getUserInitials()}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-semibold text-lg">{user?.name || "User"}</p>
                                  <p className="text-sm text-muted-foreground">{user?.email || ""}</p>
                                </div>
                              </div>

                              <div className="space-y-1">
                                <h3 className="text-md font-medium mb-2">Your Account</h3>
                                <Link href="/profile" className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors">
                                  <User className="h-5 w-5 text-primary" />
                                  <div>
                                    <p className="font-medium">Profile</p>
                                    <p className="text-sm text-muted-foreground">Manage your details</p>
                                  </div>
                                </Link>
                                <Link href="/saved-cars" className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors">
                                  <Heart className="h-5 w-5 text-primary" />
                                  <div>
                                    <p className="font-medium">Saved Cars</p>
                                    <p className="text-sm text-muted-foreground">View your favorites</p>
                                  </div>
                                  <Badge className="ml-auto">3</Badge>
                                </Link>
                                <Link href="/notifications" className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors">
                                  <Bell className="h-5 w-5 text-primary" />
                                  <div>
                                    <p className="font-medium">Notifications</p>
                                    <p className="text-sm text-muted-foreground">Updates & alerts</p>
                                  </div>
                                  <Badge className="ml-auto">2</Badge>
                                </Link>
                                <Link href="/my-cars" className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors">
                                  <Car className="h-5 w-5 text-primary" />
                                  <div>
                                    <p className="font-medium">My Cars</p>
                                    <p className="text-sm text-muted-foreground">Manage your vehicles</p>
                                  </div>
                                </Link>
                              </div>

                              <div className="space-y-1">
                                <h3 className="text-md font-medium mb-2">Settings</h3>
                                <Link href="/settings" className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors">
                                  <Settings className="h-5 w-5 text-muted-foreground" />
                                  <p className="font-medium">Account Settings</p>
                                </Link>
                              </div>

                              <Button variant="destructive" className="w-full mt-6">
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign Out
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-6">
                              <div className="bg-muted/30 rounded-lg p-4 text-center space-y-4">
                                <h3 className="text-lg font-semibold">Welcome to Kashi&Karz</h3>
                                <p className="text-muted-foreground">Sign in to save your favorite cars, get personalized recommendations, and more.</p>

                                <div className="grid gap-3 pt-2">
                                  <Link href="/sign-in">
                                    <Button className="w-full" size="lg">
                                      Sign In
                                    </Button>
                                  </Link>
                                  <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                      <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                      <span className="bg-background px-2 text-muted-foreground">
                                        Or
                                      </span>
                                    </div>
                                  </div>
                                  <Link href="/sign-up">
                                    <Button variant="outline" className="w-full" size="lg">
                                      Create Account
                                    </Button>
                                  </Link>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <h3 className="text-md font-medium">Quick Links</h3>
                                <div className="grid grid-cols-2 gap-3">
                                  <Link href="/browse">
                                    <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                                      <Car className="h-8 w-8 mb-2 text-primary" />
                                      <span className="text-center font-medium">Browse Cars</span>
                                    </div>
                                  </Link>
                                  <Link href="/saved">
                                    <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                                      <Heart className="h-8 w-8 mb-2 text-primary" />
                                      <span className="text-center font-medium">Saved Cars</span>
                                    </div>
                                  </Link>
                                  <Link href="/sell">
                                    <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                                      <CreditCard className="h-8 w-8 mb-2 text-primary" />
                                      <span className="text-center font-medium">Sell Your Car</span>
                                    </div>
                                  </Link>
                                  <Link href="/help">
                                    <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                                      <Settings className="h-8 w-8 mb-2 text-primary" />
                                      <span className="text-center font-medium">Help & Support</span>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2">
              <motion.span
                initial={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Link href="/" className="flex items-center gap-2">
                  <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Kashi&Karz</span>
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
                      <div className="grid w-[600px] grid-cols-2 gap-3 p-4 bg-white shadow-lg rounded-lg text-black">
                        {item.content.map((section) => (
                          <div key={section.title} className="space-y-2">
                            <h3 className="font-medium text-primary">{section.title}</h3>
                            <ul className="space-y-1">
                              {section.items.map((subItem) => (
                                <li key={subItem.title}>
                                  <NavigationMenuLink asChild>
                                    <Link href={subItem.href} className="block rounded-md p-2 text-sm hover:bg-muted transition-colors">
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
            <motion.div
              initial={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="hidden md:flex md:gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="transition-colors duration-300 relative"
                >
                  {/* <Heart className="h-5 w-5" /> */}
                  {/* {isSignedIn && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">2</Badge>
                  )} */}
                  <span className="sr-only">Favorites</span>
                </Button>

                {isSignedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-2 transition-colors duration-300">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user?.avatarUrl} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">{getUserInitials()}</AvatarFallback>
                        </Avatar>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium">{user?.name || "User"}</p>
                          <p className="text-xs text-muted-foreground">{user?.email || ""}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bell className="mr-2 h-4 w-4" />
                        <span>Notifications</span>
                        <Badge className="ml-auto">3</Badge>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        <span>My Cars</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Saved Cars</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500 focus:text-red-500">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex gap-2">
                    <Link href="/sign-in">
                      <Button variant="outline" size="sm" className="hidden lg:flex">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/sign-up">
                      <Button size="sm" className="hidden lg:flex">
                        Register
                      </Button>
                    </Link>
                    <Link href="/sign-in">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="transition-colors duration-300 lg:hidden"
                      >
                        <User className="h-5 w-5" />
                        <span className="sr-only">Account</span>
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Quick Actions */}
              <div className="flex gap-2 md:hidden">
                <Link href="/search">
                  <Button variant="ghost" size="icon" className="transition-colors duration-300">
                    <Search className="h-5 w-5" />
                  </Button>
                </Link>
                {/* <Link href={isSignedIn ? "/saved" : "/sign-in"}>
                  <Button variant="ghost" size="icon" className="transition-colors duration-300 relative">
                    <Heart className="h-5 w-5" />
                    {isSignedIn && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">2</Badge>
                    )}
                  </Button>
                </Link> */}
                {isSignedIn ? (
                  <Button variant="ghost" size="icon" className="transition-colors duration-300">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatarUrl} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                ) : (
                  <Link href="/sign-in">
                    <Button variant="ghost" size="icon" className="transition-colors duration-300">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}