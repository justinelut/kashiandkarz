"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Subscribed!",
      description: "You've successfully subscribed to our newsletter.",
    })
    setEmail("")
  }

  return (
    <section className="py-12 bg-muted">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Stay Updated</h2>
          <p className="text-muted-foreground max-w-md mb-6">
            Subscribe to our newsletter for the latest car deals, automotive news, and exclusive offers.
          </p>
          <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit">Subscribe</Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our privacy policy and consent to receive marketing emails.
          </p>
        </div>
      </div>
    </section>
  )
}

