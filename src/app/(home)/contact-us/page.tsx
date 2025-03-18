"use client"

import type React from "react"

import { useState } from "react"
import { PageLayout } from "@/components/layouts/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactUsPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
  }

  return (
    <PageLayout
      title="Contact Us"
      description="Have a question or need assistance? We're here to help."
      breadcrumbs={[{ label: "Contact Us", href: "/contact-us" }]}
    >
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
              <p className="text-green-700">
                Your message has been received. We'll get back to you as soon as possible.
              </p>
              <Button variant="outline" className="mt-4" onClick={() => setIsSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number (optional)
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formState.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <Select value={formState.subject} onValueChange={handleSelectChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="support">Customer Support</SelectItem>
                    <SelectItem value="sales">Sales Question</SelectItem>
                    <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  rows={5}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <Mail className="h-5 w-5 text-primary mr-3 mt-1" />
              <div>
                <h3 className="font-medium">Email Us</h3>
                <p className="text-muted-foreground mt-1">For general inquiries:</p>
                <a href="mailto:info@kashiandkarz.com" className="text-primary hover:underline">
                  info@kashiandkarz.com
                </a>
                <p className="text-muted-foreground mt-1">For customer support:</p>
                <a href="mailto:support@kashiandkarz.com" className="text-primary hover:underline">
                  support@kashiandkarz.com
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-5 w-5 text-primary mr-3 mt-1" />
              <div>
                <h3 className="font-medium">Call Us</h3>
                <p className="text-muted-foreground mt-1">Customer Service:</p>
                <a href="tel:+441234567890" className="text-primary hover:underline">
                  +44 (0) 123 456 7890
                </a>
                <p className="text-muted-foreground mt-1">Monday to Friday: 9:00 - 18:00</p>
                <p className="text-muted-foreground">Saturday: 9:00 - 17:30</p>
                <p className="text-muted-foreground">Sundays and Bank Holidays: CLOSED</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-primary mr-3 mt-1" />
              <div>
                <h3 className="font-medium">Visit Us</h3>
                <p className="text-muted-foreground mt-1">KashiAndKarz Ltd</p>
                <p className="text-muted-foreground">2nd Floor, Verde Building</p>
                <p className="text-muted-foreground">10 Bressenden Place</p>
                <p className="text-muted-foreground">London, England, SW1E 5DH</p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="h-5 w-5 text-primary mr-3 mt-1" />
              <div>
                <h3 className="font-medium">Business Hours</h3>
                <p className="text-muted-foreground mt-1">Monday to Friday: 9:00 - 18:00</p>
                <p className="text-muted-foreground">Saturday: 9:00 - 17:30</p>
                <p className="text-muted-foreground">Sundays and Bank Holidays: CLOSED</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-muted rounded-lg p-6">
            <h3 className="font-semibold mb-2">Connect With Us</h3>
            <p className="text-muted-foreground mb-4">
              Follow us on social media for the latest updates, car news, and special offers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary hover:text-primary/80">
                Facebook
              </a>
              <a href="#" className="text-primary hover:text-primary/80">
                Twitter
              </a>
              <a href="#" className="text-primary hover:text-primary/80">
                Instagram
              </a>
              <a href="#" className="text-primary hover:text-primary/80">
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

