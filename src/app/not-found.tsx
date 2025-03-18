import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>
          <Button asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Home Page
            </Link>
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="mb-4 text-sm text-muted-foreground">Looking for something specific? Try searching our site:</p>
          <div className="relative max-w-sm mx-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-7">
              Search
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm text-muted-foreground">Popular pages:</p>
          <div className="mt-2 flex flex-wrap gap-2 justify-center">
            <Link href="/new-cars" className="text-sm text-primary hover:underline">
              New Cars
            </Link>
            <Link href="/used-cars" className="text-sm text-primary hover:underline">
              Used Cars
            </Link>
            <Link href="/sell-my-car" className="text-sm text-primary hover:underline">
              Sell My Car
            </Link>
            <Link href="/car-reviews" className="text-sm text-primary hover:underline">
              Car Reviews
            </Link>
            <Link href="/finance-calculator" className="text-sm text-primary hover:underline">
              Finance Calculator
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

