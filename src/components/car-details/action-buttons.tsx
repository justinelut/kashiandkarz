"use client"

import type React from "react"

import { useState } from "react"
import { Info, Phone, Mail, Calendar, Clock, MapPin, User, MessageSquare, Car, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ActionButtonsProps {
  carId: string
  carTitle: string
}

export function ActionButtons({ carId, carTitle }: ActionButtonsProps) {
  const [enquirySubmitted, setEnquirySubmitted] = useState(false)
  const [testDriveScheduled, setTestDriveScheduled] = useState(false)

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEnquirySubmitted(true)
    // In a real app, you would submit the form data to your backend here
  }

  const handleTestDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTestDriveScheduled(true)
    // In a real app, you would submit the form data to your backend here
  }

  const resetForm = () => {
    setEnquirySubmitted(false)
    setTestDriveScheduled(false)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-4 md:sticky md:top-4 md:border-none md:bg-transparent md:p-0">
      <div className="space-y-3">
        <Dialog onOpenChange={resetForm}>
          <DialogTrigger asChild>
            <Button className="w-full bg-[#00e1e1] text-black hover:bg-[#00e1e1]/90 font-medium">
              <MessageSquare className="mr-2 h-4 w-4" />
              Enquire now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            {!enquirySubmitted ? (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center text-xl">
                    <MessageSquare className="mr-2 h-5 w-5 text-[#00e1e1]" />
                    Enquire about this car
                  </DialogTitle>
                  <DialogDescription>
                    <div className="mt-2 flex items-center text-sm">
                      <Car className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{carTitle}</span>
                    </div>
                    <div className="mt-1 flex items-center text-sm">
                      <Info className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Car ID: {carId}</span>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleEnquirySubmit} className="space-y-4 py-4">
                  <Tabs defaultValue="message" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="message">Message</TabsTrigger>
                      <TabsTrigger value="callback">Request Callback</TabsTrigger>
                    </TabsList>
                    <TabsContent value="message" className="space-y-4 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name" className="flex items-center">
                            <User className="mr-1 h-3 w-3" /> Name
                          </Label>
                          <Input id="name" placeholder="Enter your name" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="phone" className="flex items-center">
                            <Phone className="mr-1 h-3 w-3" /> Phone
                          </Label>
                          <Input id="phone" type="tel" placeholder="Enter your phone number" required />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email" className="flex items-center">
                          <Mail className="mr-1 h-3 w-3" /> Email
                        </Label>
                        <Input id="email" type="email" placeholder="Enter your email" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="message" className="flex items-center">
                          <MessageSquare className="mr-1 h-3 w-3" /> Message
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="I'm interested in this car and would like more information..."
                          className="min-h-[100px]"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label className="flex items-center">
                          <Info className="mr-1 h-3 w-3" /> Contact preference
                        </Label>
                        <RadioGroup defaultValue="email" className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="email-pref" />
                            <Label htmlFor="email-pref" className="cursor-pointer">
                              Email
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="phone" id="phone-pref" />
                            <Label htmlFor="phone-pref" className="cursor-pointer">
                              Phone
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="both" id="both-pref" />
                            <Label htmlFor="both-pref" className="cursor-pointer">
                              Both
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </TabsContent>
                    <TabsContent value="callback" className="space-y-4 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="callback-name" className="flex items-center">
                            <User className="mr-1 h-3 w-3" /> Name
                          </Label>
                          <Input id="callback-name" placeholder="Enter your name" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="callback-phone" className="flex items-center">
                            <Phone className="mr-1 h-3 w-3" /> Phone
                          </Label>
                          <Input id="callback-phone" type="tel" placeholder="Enter your phone number" required />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="callback-time" className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" /> Best time to call
                        </Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning (9am - 12pm)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12pm - 5pm)</SelectItem>
                            <SelectItem value="evening">Evening (5pm - 8pm)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="callback-notes" className="flex items-center">
                          <MessageSquare className="mr-1 h-3 w-3" /> Additional notes
                        </Label>
                        <Textarea
                          id="callback-notes"
                          placeholder="Any specific questions or concerns..."
                          className="min-h-[100px]"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                  <DialogFooter>
                    <Button type="submit" className="w-full bg-[#00e1e1] text-black hover:bg-[#00e1e1]/90">
                      Submit enquiry
                    </Button>
                  </DialogFooter>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="mb-4 rounded-full bg-[#00e1e1]/20 p-3">
                  <CheckCircle className="h-8 w-8 text-[#00e1e1]" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Enquiry Submitted!</h3>
                <p className="mb-6 text-center text-muted-foreground">
                  Thank you for your interest. Our team will get back to you shortly.
                </p>
                <Button onClick={resetForm} variant="outline">
                  Close
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-[#00e1e1] text-black hover:bg-[#00e1e1]/90 font-medium">
              <Phone className="mr-2 h-4 w-4" />
              Call now
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center text-xl">
                <Phone className="mr-2 h-5 w-5 text-[#00e1e1]" />
                Call dealer
              </DialogTitle>
              <DialogDescription>
                <div className="mt-2 flex items-center text-sm">
                  <Car className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">{carTitle}</span>
                </div>
                <div className="mt-1 flex items-center text-sm">
                  <Info className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Car ID: {carId}</span>
                </div>
                <p className="mt-2">The dealer is currently online and available to take your call.</p>
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="flex items-center justify-center rounded-full bg-[#00e1e1]/10 p-4">
                <Phone className="h-8 w-8 text-[#00e1e1]" />
              </div>
              <div className="text-2xl font-bold">01234 567890</div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                Lines open Monday to Friday 9am - 6pm, Saturday 9am - 5pm
              </div>
              <div className="mt-2 rounded-md bg-gray-50 p-3 text-sm">
                <p className="font-medium">When calling, please mention:</p>
                <p className="text-muted-foreground">Car ID: {carId}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog onOpenChange={resetForm}>
          <DialogTrigger asChild>
            <Button className="w-full bg-white text-black hover:bg-gray-100 border border-gray-200 font-medium">
              <Calendar className="mr-2 h-4 w-4 text-[#00e1e1]" />
              Schedule test drive
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            {!testDriveScheduled ? (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center text-xl">
                    <Calendar className="mr-2 h-5 w-5 text-[#00e1e1]" />
                    Schedule a test drive
                  </DialogTitle>
                  <DialogDescription>
                    <div className="mt-2 flex items-center text-sm">
                      <Car className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{carTitle}</span>
                    </div>
                    <div className="mt-1 flex items-center text-sm">
                      <Info className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Car ID: {carId}</span>
                    </div>
                    <p className="mt-2">Select your preferred date and time for a test drive.</p>
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleTestDriveSubmit} className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="test-name" className="flex items-center">
                        <User className="mr-1 h-3 w-3" /> Name
                      </Label>
                      <Input id="test-name" placeholder="Enter your name" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="test-phone" className="flex items-center">
                        <Phone className="mr-1 h-3 w-3" /> Phone
                      </Label>
                      <Input id="test-phone" type="tel" placeholder="Enter your phone number" required />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="test-email" className="flex items-center">
                      <Mail className="mr-1 h-3 w-3" /> Email
                    </Label>
                    <Input id="test-email" type="email" placeholder="Enter your email" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="test-date" className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" /> Preferred date
                      </Label>
                      <Input id="test-date" type="date" required min={new Date().toISOString().split("T")[0]} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="test-time" className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" /> Preferred time
                      </Label>
                      <Select>
                        <SelectTrigger id="test-time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="13:00">1:00 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="test-location" className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3" /> Preferred location
                    </Label>
                    <Select>
                      <SelectTrigger id="test-location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Dealership - Nairobi</SelectItem>
                        <SelectItem value="south">South Branch - Mombasa</SelectItem>
                        <SelectItem value="west">West Branch - Kisumu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="test-notes" className="flex items-center">
                      <MessageSquare className="mr-1 h-3 w-3" /> Special requests
                    </Label>
                    <Textarea
                      id="test-notes"
                      placeholder="Any specific requests or questions about the test drive..."
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="rounded-md bg-[#00e1e1]/10 p-3 text-sm">
                    <p className="flex items-start">
                      <Info className="mr-2 h-4 w-4 mt-0.5 text-[#00e1e1]" />
                      <span>
                        Please bring your driver's license for the test drive. A refundable deposit may be required.
                      </span>
                    </p>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="w-full bg-[#00e1e1] text-black hover:bg-[#00e1e1]/90">
                      Schedule test drive
                    </Button>
                  </DialogFooter>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="mb-4 rounded-full bg-[#00e1e1]/20 p-3">
                  <CheckCircle className="h-8 w-8 text-[#00e1e1]" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Test Drive Scheduled!</h3>
                <p className="mb-6 text-center text-muted-foreground">
                  Thank you for scheduling a test drive. We'll confirm your appointment shortly.
                </p>
                <Button onClick={resetForm} variant="outline">
                  Close
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
          <Info className="h-4 w-4" />
          Enquire to check location and availability
        </div>
      </div>
    </div>
  )
}

