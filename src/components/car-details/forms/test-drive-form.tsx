"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import type { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as ShadCalendar } from "@/components/ui/calendar"
import { Calendar, Clock, Info, Mail, MapPin, MessageSquare, Phone, User } from "lucide-react"
import { testDriveFormSchema } from "@/lib/validations/action-buttons-schemas"
import { scheduleTestDrive } from "@/lib/action-buttons-actions"
import { format } from "date-fns"

interface TestDriveFormProps {
  carId: string
  dealerId: string
  dealerName: string
  dealerPhone: string
  dealerLocation: string
  isAvailable: boolean
  onSuccess: () => void
}

const counties = [
  "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita-Taveta", "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru", "Tharaka-Nithi", "Embu", "Kitui", "Machakos", "Makueni", "Nyandarua", "Nyeri", "Kirinyaga", "Murang'a", "Kiambu", "Turkana", "West Pokot", "Samburu", "Trans Nzoia", "Uasin Gishu", "Elgeyo Marakwet", "Nandi", "Baringo", "Laikipia", "Nakuru", "Narok", "Kajiado", "Kericho", "Bomet", "Kakamega", "Vihiga", "Bungoma", "Busia", "Siaya", "Kisumu", "Homa Bay", "Migori", "Kisii", "Nyamira", "Nairobi"
]

export function TestDriveForm({ carId, dealerId, dealerName, dealerPhone, dealerLocation, isAvailable, onSuccess }: TestDriveFormProps) {
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

  // TanStack mutation setup
  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof testDriveFormSchema>) => {
      return scheduleTestDrive(values, carId, dealerId)
    },
    onSuccess: (data) => {
      if (data.success) {
        onSuccess()
      } else {
        form.setError("root", {
          type: "manual",
          message: data.message || "Failed to schedule test drive. Please try again.",
        })
      }
    },
    onError: () => {
      form.setError("root", {
        type: "manual",
        message: "An unexpected error occurred. Please try again.",
      })
    }
  })

  function onSubmit(values: z.infer<typeof testDriveFormSchema>) {
    mutation.mutate(values)
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
                <FormLabel className="flex items-center"><User className="mr-1 h-3 w-3" /> Name</FormLabel>
                <FormControl><Input placeholder="Enter your name" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center"><Phone className="mr-1 h-3 w-3" /> Phone</FormLabel>
                <FormControl><Input placeholder="Enter your phone number" {...field} /></FormControl>
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
              <FormLabel className="flex items-center"><Mail className="mr-1 h-3 w-3" /> Email</FormLabel>
              <FormControl><Input placeholder="Enter your email" {...field} /></FormControl>
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
                <FormLabel className="flex items-center"><Calendar className="mr-1 h-3 w-3" /> Preferred date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" className="w-full justify-start">
                        {field.value ? format(new Date(field.value), "PPP") : "Pick a date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <ShadCalendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          field.onChange(format(date, "yyyy-MM-dd"));
                        }
                      }}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
              <FormLabel className="flex items-center"><MapPin className="mr-1 h-3 w-3" /> Preferred location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select county" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {counties.map((county) => (
                    <SelectItem key={county} value={county}>{county}</SelectItem>
                  ))}
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

        {form.formState.errors.root && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
            <p className="flex items-start">
              <Info className="mr-2 h-4 w-4 mt-0.5 text-red-500" />
              <span>{form.formState.errors.root.message}</span>
            </p>
          </div>
        )}

        <div className="rounded-md bg-[#00e1e1]/10 p-3 text-sm">
          <p className="flex items-start">
            <Info className="mr-2 h-4 w-4 mt-0.5 text-[#00e1e1]" />
            <span>Please bring your driver's license for the test drive. A refundable deposit may be required.</span>
          </p>
        </div>

        <Button type="submit" className="w-full bg-[#00e1e1] text-black hover:bg-[#00e1e1]/90" disabled={mutation.isPending}>
          {mutation.isPending ? "Scheduling..." : "Schedule test drive"}
        </Button>
      </form>
    </Form>
  )
}