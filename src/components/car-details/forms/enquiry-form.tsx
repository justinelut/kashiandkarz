"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Mail, MessageSquare, Phone, User } from "lucide-react"
import { enquiryFormSchema } from "@/lib/validations/action-buttons-schemas"
import { submitEnquiry } from "@/lib/action-buttons-actions"

interface EnquiryFormProps {
  carId: string
  onSuccess: () => void
  dealerId: string
  dealerName: string
  dealerPhone: string
  dealerLocation: string
  isAvailable: boolean
}

export function EnquiryForm({ carId, onSuccess, dealerId, dealerName, dealerPhone, dealerLocation, isAvailable }: EnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Define form with Zod validation
  const form = useForm<z.infer<typeof enquiryFormSchema>>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      contact_preference: "email",
    },
  })

  // Handle form submission
  async function onSubmit(values: z.infer<typeof enquiryFormSchema>) {
    setIsSubmitting(true)
    try {
      const result = await submitEnquiry(values, carId, dealerId)
      if (result.success) {
        onSuccess()
      } else {
        form.setError("root", {
          type: "manual",
          message: result.message || "Failed to submit enquiry. Please try again.",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <MessageSquare className="mr-1 h-3 w-3" /> Message
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="I'm interested in this car and would like more information..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact_preference"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Contact preference</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="email" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">Email</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="phone" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">Phone</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="both" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">Both</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <div className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</div>
        )}

        <Button type="submit" className="w-full bg-[#00e1e1] text-black hover:bg-[#00e1e1]/90" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit enquiry"}
        </Button>
      </form>
    </Form>
  )
}

