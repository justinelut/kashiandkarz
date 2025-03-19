"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Bell, CheckCircle, Clock, DollarSign, Send, Star, ChevronDown, ChevronUp, Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

export default function SellComingSoonPage() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [progress, setProgress] = useState(78)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    // Simulate progress update
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 0.5
        return next > 95 ? 95 : next
      })
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // In a real implementation, you would send this to your API
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 5000)
      setEmail("")
    }
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
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
        {/* Progress Banner */}
        <div className="mb-12 rounded-xl bg-white p-6 shadow-md">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-primary/10 p-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Sell Your Car Feature Status</h3>
                <p className="text-sm text-gray-500">We're working hard to bring this to you soon</p>
              </div>
            </div>
            
            <div className="w-full md:w-1/3">
              <div className="flex items-center justify-between text-sm">
                <span>In Development</span>
                <span className="font-medium">{Math.floor(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div className="order-2 md:order-1">
            <div className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              Coming Soon
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Sell Your Car <br/>
              <span className="text-primary">Faster & Easier</span>
            </h1>
            
            <p className="mb-8 text-lg text-gray-600">
              We're building a better way to sell your car. No hassles, no lowball offers, 
              just a straightforward process that gets you the best price with minimal effort.
            </p>
            
            <div className="mb-8 space-y-6">
              {[
                {
                  icon: <CheckCircle className="h-5 w-5 text-green-500" />,
                  title: "Free Valuation",
                  description: "Get an accurate market value for your vehicle in minutes"
                },
                {
                  icon: <CheckCircle className="h-5 w-5 text-green-500" />,
                  title: "Fast Payment",
                  description: "Receive payment promptly once your car is verified"
                },
                {
                  icon: <CheckCircle className="h-5 w-5 text-green-500" />,
                  title: "Convenient Process",
                  description: "We handle the paperwork and make selling stress-free"
                }
              ].map((feature, index) => (
                <div key={index} className="flex">
                  <div className="mr-4 mt-1">{feature.icon}</div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Notification Form */}
            <div className="rounded-xl bg-white p-6 shadow-lg" id="notify-form">
              <h3 className="mb-4 text-lg font-medium">Be the First to Know</h3>
              <p className="mb-4 text-gray-600">
                Get notified when our sell feature launches and receive exclusive early access.
              </p>
              
              <form onSubmit={handleSubscribe}>
                <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                  <div className="relative flex-grow">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="h-12 w-full rounded-lg border-gray-300"
                      required
                    />
                    <Bell className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                  <Button 
                    type="submit"
                    className="h-12 bg-primary px-6 text-white hover:bg-primary/90"
                  >
                    {subscribed ? "Subscribed!" : "Notify Me"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative h-[400px] overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-gray-100 shadow-lg md:h-[600px]">
              <Image
                src="/api/placeholder/600/800"
                alt="Sell Your Car"
                fill
                className="object-contain p-6"
              />
              
              {/* Floating Elements */}
              <div className="absolute -right-6 top-12 h-32 w-32 animate-pulse rounded-full bg-primary opacity-20 blur-xl"></div>
              <div className="absolute -left-6 bottom-12 h-24 w-24 animate-pulse rounded-full bg-yellow-400 opacity-20 blur-xl"></div>
              
              {/* Testimonial Card */}
              <div className="absolute -bottom-6 left-1/2 w-64 -translate-x-1/2 transform rounded-lg bg-white p-4 shadow-lg md:bottom-12 md:left-auto md:right-0 md:translate-x-0">
                <div className="mb-2 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-2 text-sm italic text-gray-600">
                  "Can't wait for this feature! Selling my car has always been such a hassle."
                </p>
                <div className="flex items-center">
                  <div className="mr-3 h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                    <Image
                      src="/api/placeholder/32/32"
                      alt="User"
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className="text-xs">
                    <p className="font-medium">John D.</p>
                    <p className="text-gray-500">Future Customer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Will Work Section */}
        <div className="my-20">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">
            How It Will Work
          </h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Enter Your Details",
                description: "Provide basic information about your car including make, model, year, and condition.",
                icon: (
                  <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.5 9.09H20.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.6947 13.7H15.7037" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.6947 16.7H15.7037" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.9955 13.7H12.0045" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.9955 16.7H12.0045" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.29431 13.7H8.30329" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.29431 16.7H8.30329" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )
              },
              {
                number: "02",
                title: "Get an Instant Offer",
                description: "Receive a competitive, market-based valuation for your vehicle within minutes.",
                icon: <DollarSign className="h-12 w-12" />
              },
              {
                number: "03",
                title: "Complete the Sale",
                description: "Schedule an inspection and finalize the deal with convenient payment options.",
                icon: <CheckCircle className="h-12 w-12" />
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className="group relative rounded-xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  {step.icon}
                </div>
                <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-lg font-bold text-gray-800 group-hover:bg-primary group-hover:text-white">
                  {step.number}
                </div>
                <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20 rounded-xl bg-gray-900 p-8 text-white md:p-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                Why Sell With KASHI?
              </h2>
              <p className="mb-8 text-lg text-gray-300">
                Our upcoming sell feature will transform the way you sell your car, offering advantages that put you in control.
              </p>
              
              <Button 
                className="group flex items-center bg-white px-6 py-3 text-primary hover:bg-gray-100"
                onClick={() => {
                  const formElement = document.getElementById('notify-form')
                  if (formElement) formElement.scrollIntoView({ behavior: 'smooth' })
                }} 
              >
                <span>Get Early Access</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-all group-hover:translate-x-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                "No Middleman Fees",
                "Transparent Pricing",
                "Quick Payment",
                "Secure Transactions",
                "Free Vehicle Inspection",
                "Hassle-Free Paperwork",
                "Verified Buyers",
                "Dedicated Support"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center rounded-lg bg-white/10 p-4">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-400" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                q: "What types of vehicles will you accept?",
                a: "We'll accept most passenger vehicles in good working condition. This includes cars, SUVs, trucks, and vans less than 15 years old."
              },
              {
                q: "How is the car value determined?",
                a: "Our system will use current market data, vehicle condition, history, mileage, and features to generate competitive offers."
              },
              {
                q: "Will you buy cars with existing loans?",
                a: "Yes, we plan to purchase vehicles with existing loans. We'll handle the payoff process to make it seamless for you."
              },
              {
                q: "How will the inspection process work?",
                a: "After accepting an offer, you'll schedule a brief inspection to verify the vehicle's condition. This can be done at one of our partner locations."
              },
              {
                q: "How quickly will I receive payment?",
                a: "Once the inspection is complete and paperwork is finalized, payment is typically processed within 1-2 business days."
              },
              {
                q: "Do I need to provide service records?",
                a: "While not required, service records can help establish your vehicle's condition and potentially increase its value."
              },
              {
                q: "What areas will this service be available in?",
                a: "We're planning to launch initially in major metropolitan areas with expansion to additional regions shortly after."
              },
              {
                q: "Are there any fees for using this service?",
                a: "No, our service will be completely free for sellers. We don't charge any hidden fees or commissions."
              }
            ].map((faq, index) => (
              <div key={index} className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <button
                  className="flex w-full items-center justify-between p-4 text-left font-medium hover:bg-gray-50 focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                <div
                  className={`bg-gray-50 px-4 transition-all duration-300 ${
                    openFaq === index ? 'max-h-40 py-4' : 'max-h-0 overflow-hidden py-0'
                  }`}
                >
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
            What Our Users Are Saying
          </h2>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                quote: "I've been waiting for KASHI to offer this feature. Their buying experience was fantastic, so I have high expectations for selling!",
                name: "Sarah K.",
                title: "KASHI Customer",
                rating: 5
              },
              {
                quote: "Selling my last car was such a nightmare. Really looking forward to a streamlined process with KASHI's upcoming feature.",
                name: "Michael T.",
                title: "Car Enthusiast",
                rating: 5
              },
              {
                quote: "Already set up my notification. If it's anything like their other services, this will be a game-changer for selling cars.",
                name: "Priya R.",
                title: "Repeat Customer",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="rounded-xl bg-white p-6 shadow-lg">
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="mb-6 text-gray-600 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                    <Image src={`/api/placeholder/${50 + index}/${50 + index}`} alt={testimonial.name} width={48} height={48} />
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mb-20 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-blue-600 p-8 text-white md:p-12">
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white opacity-10"></div>
            <div className="absolute -left-16 bottom-0 h-32 w-32 rounded-full bg-white opacity-10"></div>
            
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Transform How You Sell Your Car?</h2>
              <p className="mb-8 text-lg">Join our waitlist today and be the first to access our revolutionary car selling platform when it launches.</p>
              
              <Button 
                className="group mx-auto flex items-center bg-white px-8 py-3 text-primary hover:bg-opacity-90"
                onClick={() => {
                  const formElement = document.getElementById('notify-form')
                  if (formElement) formElement.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <Bell className="mr-2 h-5 w-5" />
                <span>Get Notified</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

   
    </div>
  )
}