"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "./ui/input"

export function CarSearch() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?s=${encodeURIComponent(query)}`)
    }
  }

  return (
    <section className="bg-white py-8 -mt-10 z-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-4 shadow-lg md:p-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search for cars by make, model, or features..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="rounded-full py-5"
              />
            </div>
            <Button onClick={handleSearch} className="flex items-center gap-2 px-6">
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
