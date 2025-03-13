"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface CarMakesSearchProps {
  initialSearch?: string
}

export function CarMakesSearch({ initialSearch = "" }: CarMakesSearchProps) {
  const [search, setSearch] = useState(initialSearch)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Update search state when URL changes
  useEffect(() => {
    setSearch(searchParams.get("search") || "")
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (search) {
      router.push(`/makes?search=${encodeURIComponent(search)}`)
    } else {
      router.push("/makes")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg mx-auto">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search car manufacturers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2 w-full"
        />
      </div>
      <Button type="submit" className="ml-2">
        Search
      </Button>
    </form>
  )
}

