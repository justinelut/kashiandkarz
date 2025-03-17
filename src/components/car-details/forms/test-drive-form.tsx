"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Info, Mail, MapPin, MessageSquare, Phone, User } from "lucide-react"
import { testDriveFormSchema } from "@/lib/validations/action-buttons-schemas"
import { scheduleTestDrive } from "@/lib/action-buttons-actions"

interface TestDriveFormProps {
  car_id: string
  onSuccess: () => void
}

export function TestDriveForm({ car_id, onSuccess }: TestDriveFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split("T")[0]

  // Define form with Zod validation
  const form = useForm<z.infer<typeof testDriveFormSchema>>({
    resolver: zodResolver(testDriveFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      preferred_date: "",
      preferred_time: "",
      preferred_location: "",
      special_requests: "",
    },
  })

  // Handle form submission
  async function onSubmit(values: z.infer<typeof testDriveFormSchema>) {
    setIsSubmitting(true)
    try {
      const result = await scheduleTestDrive(values, car_id)
      if (result.success) {
        onSuccess()
      } else {
        form.setError("root", {
          type: "manual",
          message: result.message || "Failed to schedule test drive. Please try again.",
        })
      }
    } catch (error) {
      form.setError("root", {
        type: "manual",
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <User className="mr-1 h-3 w-3" /> Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Phone className="mr-1 h-3 w-3" /> Phone
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <Mail className="mr-1 h-3 w-3" /> Email
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="preferred_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Calendar className="mr-1 h-3 w-3" /> Preferred date
                </FormLabel>
                <FormControl>
                  <Input type="date" min={today} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preferred_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" /> Preferred time
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                  </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="preferred_location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <MapPin className="mr-1 h-3 w-3" /> Preferred location
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="main">Main Dealership - Nairobi</SelectItem>
                  <SelectItem value="south">South Branch - Mombasa</SelectItem>
                  <SelectItem value="west">West Branch - Kisumu</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="special_requests"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <MessageSquare className="mr-1 h-3 w-3" /> Special requests
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any specific requests or questions about the test drive..."
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="rounded-md bg-[#00e1e1]/10 p-3 text-sm">
          <p className="flex items-start">
            <Info className="mr-2 h-4 w-4 mt-0.5 text-[#00e1e1]" />
            <span>Please bring your driver's license for the test drive. A refundable deposit may be required.</span>
          </p>
        </div>

        {form.formState.errors.root && (
          <div className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</div>
        )}

        <Button type="submit" className="w-full bg-[#00e1e1] text-black hover:bg-[#00e1e1]/90" disabled={isSubmitting}>
          {isSubmitting ? "Scheduling..." : "Schedule test drive"}
        </Button>
      </form>
    </Form>
  )
}

