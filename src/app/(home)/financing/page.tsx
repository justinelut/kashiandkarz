"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Bell, Calendar, CreditCard, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FinancingComingSoonPage() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // In a real implementation, you would send this to your API
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 5000)
      setEmail("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <header className="bg-white shadow">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center text-primary">
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="text-lg font-bold">KASHI</div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <div className="relative mb-16 overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-blue-700 shadow-xl lg:mb-24">
          <div className="grid grid-cols-1 items-center gap-8 px-8 py-12 md:grid-cols-2 md:px-12 md:py-16 lg:px-20 lg:py-20">
            <div className="text-white">
              <div className="inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
                Coming Soon
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Car Financing <br />Made <span className="text-yellow-300">Simple</span>
              </h1>
              <p className="mt-6 text-lg text-white/80 md:text-xl">
                We're working on flexible financing options to help you drive your dream car without breaking the bank. 
                Be the first to know when we launch!
              </p>
              
              {/* Notification Form */}
              <form onSubmit={handleSubscribe} className="mt-8">
                <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                  <div className="relative flex-grow">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="h-12 w-full rounded-lg border-0 bg-white/10 text-white placeholder-white/60 backdrop-blur-sm focus:ring-2 focus:ring-white/50"
                      required
                    />
                    <Bell className="absolute right-3 top-3 h-6 w-6 text-white/60" />
                  </div>
                  <Button 
                    type="submit"
                    className="h-12 bg-white px-6 text-primary hover:bg-white/90"
                  >
                    {subscribed ? "Subscribed!" : "Notify Me"}
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="relative hidden md:block">
              <div className="relative h-80 w-full lg:h-96">
                <Image
                  src="/api/placeholder/500/400"
                  alt="Car financing illustration"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-yellow-300 opacity-70 blur-3xl"></div>
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-blue-300 opacity-60 blur-3xl"></div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800 md:text-4xl">
            What to Expect from KASHI Financing
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <CreditCard className="h-10 w-10" />,
                title: "Flexible Terms",
                description: "Choose payment terms that work with your financial situation."
              },
              {
                icon: <Calendar className="h-10 w-10" />,
                title: "Quick Approval",
                description: "Get approved within hours, not days."
              },
              {
                icon: <MessageCircle className="h-10 w-10" />,
                title: "Personalized Advice",
                description: "Financial advisors to help find the best options for you."
              },
              {
                icon: (
                  <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 16.5V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14.5 16.5V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.5 11V17C3.5 20 4.5 22 8.5 22H15.5C19.5 22 20.5 20 20.5 17V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.5 2H6.5C2.5 2 2.5 3.5 2.5 6V8.5C2.5 10 3 11 6 11H18C21 11 21.5 10 21.5 8.5V6C21.5 3.5 21.5 2 17.5 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 7H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Competitive Rates",
                description: "Access to competitive market rates and special offers."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group rounded-xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-5 inline-flex rounded-full bg-primary/10 p-4 text-primary group-hover:bg-primary group-hover:text-white">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
            Frequently Asked Questions
          </h2>

          <Tabs defaultValue="eligibility" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
              <TabsTrigger value="process">Process</TabsTrigger>
              <TabsTrigger value="terms">Terms</TabsTrigger>
            </TabsList>
            
            <TabsContent value="eligibility" className="space-y-6 rounded-xl bg-white p-6 shadow-md">
              {[
                {
                  q: "Who can apply for KASHI financing?",
                  a: "Our financing will be available to residents with valid identification, proof of income, and a good credit history. Specific requirements will be shared at launch."
                },
                {
                  q: "Is there a minimum income requirement?",
                  a: "Details will be provided upon launch, but we're designing flexible options for various income levels."
                },
                {
                  q: "Will you finance both new and used cars?",
                  a: "Yes, our financing solutions will cover both new and pre-owned vehicles available through KASHI."
                }
              ].map((item, i) => (
                <div key={i} className="border-b border-gray-200 pb-4 last:border-0">
                  <h3 className="mb-2 text-lg font-medium text-gray-900">{item.q}</h3>
                  <p className="text-gray-600">{item.a}</p>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="process" className="space-y-6 rounded-xl bg-white p-6 shadow-md">
              {[
                {
                  q: "How will the application process work?",
                  a: "The process will be simple: select your vehicle, choose your financing option, complete the application online, and receive a decision quickly."
                },
                {
                  q: "How long will approval take?",
                  a: "We're building a system that aims to provide approvals within hours for most applicants."
                },
                {
                  q: "Will I need to provide documents?",
                  a: "Yes, typical documents will include ID, proof of income, and address verification. We'll make document submission easy through our platform."
                }
              ].map((item, i) => (
                <div key={i} className="border-b border-gray-200 pb-4 last:border-0">
                  <h3 className="mb-2 text-lg font-medium text-gray-900">{item.q}</h3>
                  <p className="text-gray-600">{item.a}</p>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="terms" className="space-y-6 rounded-xl bg-white p-6 shadow-md">
              {[
                {
                  q: "What financing terms will be available?",
                  a: "We plan to offer flexible terms ranging from 12 to 72 months, depending on the vehicle and your eligibility."
                },
                {
                  q: "Will there be early repayment penalties?",
                  a: "We're designing our financing to be customer-friendly with minimal or no early repayment penalties."
                },
                {
                  q: "Can I refinance my existing car loan with KASHI?",
                  a: "Refinancing options will be considered in future phases of our financing program."
                }
              ].map((item, i) => (
                <div key={i} className="border-b border-gray-200 pb-4 last:border-0">
                  <h3 className="mb-2 text-lg font-medium text-gray-900">{item.q}</h3>
                  <p className="text-gray-600">{item.a}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Call To Action */}
        <div className="mt-20 rounded-xl bg-gray-900 p-8 text-center shadow-xl md:p-12">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Stay in the Loop
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
            Be the first to access our financing options when they launch. We'll notify you with exclusive early-access offers.
          </p>
          
          <form onSubmit={handleSubscribe} className="mx-auto flex max-w-md flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="h-12 border-0 bg-white/10 text-white placeholder-white/60 backdrop-blur-sm focus:ring-2 focus:ring-primary"
              required
            />
            <Button 
              type="submit"
              className="group h-12 bg-primary px-6 text-white hover:bg-primary/90"
            >
              <span>Notify Me</span>
              <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
          
          <p className="mt-6 text-sm text-gray-400">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  )
}