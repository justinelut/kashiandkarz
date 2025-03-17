"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CheckCircle, Clock, Info, MessageSquare, Phone } from "lucide-react"
import type { ActionButtonsProps } from "@/types/action-buttons"
import { EnquiryForm } from "./forms/enquiry-form"
import { CallbackForm } from "./forms/callback-form"
import { TestDriveForm } from "./forms/test-drive-form"

export function ActionButtons({
  carId,
  carTitle,
  dealerId,
  dealerName,
  dealerPhone = "01234 567890",
  dealerLocation = "Main Dealership",
  isAvailable = true,
}: ActionButtonsProps) {
  
  const [enquirySubmitted, setEnquirySubmitted] = useState(false)
  const [callbackRequested, setCallbackRequested] = useState(false)
  const [testDriveScheduled, setTestDriveScheduled] = useState(false)
  const [activeDialog, setActiveDialog] = useState<string | null>(null)

  const resetForms = () => {
    setEnquirySubmitted(false)
    setCallbackRequested(false)
    setTestDriveScheduled(false)
  }

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      resetForms()
      setActiveDialog(null)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-4 md:sticky md:top-4 md:border-none md:bg-transparent md:p-0">
      <div className="space-y-3">
        {/* Enquire Now Button */}
        <Dialog
          open={activeDialog === "enquiry"}
          onOpenChange={(open) => {
            handleDialogChange(open)
            if (open) setActiveDialog("enquiry")
          }}
        >
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
                      <Info className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{carTitle}</span>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="message" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="message">Message</TabsTrigger>
                    <TabsTrigger value="callback">Request Callback</TabsTrigger>
                  </TabsList>
                  <TabsContent value="message" className="space-y-4 pt-4">
                    <EnquiryForm
                      carId={carId}
                      onSuccess={() => {
                        setEnquirySubmitted(true)
                        toast( "Enquiry Submitted",{
                        
                          description: "We'll get back to you shortly.",
                        })
                      }}
                    />
                  </TabsContent>
                  <TabsContent value="callback" className="space-y-4 pt-4">
                    <CallbackForm
                      carId={carId}
                      dealerId={dealerId}
                      onSuccess={() => {
                        setCallbackRequested(true)
                        toast("Callback Requested",{
                         
                          description: "We'll call you at your preferred time.",
                        })
                      }}
                    />
                  </TabsContent>
                </Tabs>
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
                <Button onClick={resetForms} variant="outline">
                  Close
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Call Now Button */}
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
                  <Info className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">{carTitle}</span>
                </div>
                <p className="mt-2">The dealer is currently online and available to take your call.</p>
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="flex items-center justify-center rounded-full bg-[#00e1e1]/10 p-4">
                <Phone className="h-8 w-8 text-[#00e1e1]" />
              </div>
              <div className="text-2xl font-bold">{dealerPhone}</div>
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

        {/* Schedule Test Drive Button */}
        <Dialog
          open={activeDialog === "testDrive"}
          onOpenChange={(open) => {
            handleDialogChange(open)
            if (open) setActiveDialog("testDrive")
          }}
        >
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
                      <Info className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{carTitle}</span>
                    </div>
                    <p className="mt-2">Select your preferred date and time for a test drive.</p>
                  </DialogDescription>
                </DialogHeader>
                <TestDriveForm
                  carId={carId}
                  onSuccess={() => {
                    setTestDriveScheduled(true)
                    toast("Test Drive Scheduled",{
                      description: "We'll confirm your appointment shortly.",
                    })
                  }}
                />
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
                <Button onClick={resetForms} variant="outline">
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

