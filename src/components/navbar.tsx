"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Moon, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMobileMenuOpen])

  const NavItems = () => (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-1 font-normal">
            Vehicles <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem>New Vehicles</DropdownMenuItem>
          <DropdownMenuItem>Used Vehicles</DropdownMenuItem>
          <DropdownMenuItem>Special Offers</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-1 font-normal">
            Bikes <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem>Road Bikes</DropdownMenuItem>
          <DropdownMenuItem>Mountain Bikes</DropdownMenuItem>
          <DropdownMenuItem>Electric Bikes</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link href="/sell" className="text-sm font-normal">
        Sell Your Car
      </Link>

      <Link href="/about" className="text-sm font-normal">
        About
      </Link>

      <Link href="/contact" className="text-sm font-normal">
        Contact
      </Link>

      <Link href="/faq" className="text-sm font-normal">
        FAQ
      </Link>
    </>
  )

  return (
    <header className="w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-medium tracking-wider">
            Kashi&Karz
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-8">
          <NavItems />
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="hidden sm:inline-flex"
          >
            <Moon className="h-5 w-5" />
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                <NavItems />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDarkMode}
                  aria-label="Toggle dark mode"
                  className="sm:hidden self-start"
                >
                  <Moon className="h-5 w-5" />
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

