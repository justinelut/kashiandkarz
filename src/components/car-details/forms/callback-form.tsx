"use client"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MessageSquare, Phone, User } from "lucide-react"
import { callbackFormSchema } from "@/lib/validations/action-buttons-schemas"
import { requestCallback } from "@/lib/action-buttons-actions"

interface CallbackFormProps {
  carId: string
  onSuccess: () => void
  dealerId: string
}

export function CallbackForm({ carId, onSuccess, dealerId }: CallbackFormProps) {
  // Define form with Zod validation
  const form = useForm<z.infer<typeof callbackFormSchema>>({
    resolver: zodResolver(callbackFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      best_time: "morning",
      notes: "",
    },
  })

  // Setup mutation using TanStack Query v5
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof callbackFormSchema>) => {
      return requestCallback(values, carId, dealerId)
    },
    onSuccess: (data) => {
      if (data.success) {
        form.reset()
        onSuccess()
      } else {
        form.setError("root", {
          type: "manual",
          message: data.message || "Failed to request callback. Please try again.",
        })
      }
    },
    onError: (error) => {
      form.setError("root", {
        type: "manual",
        message: "An unexpected error occurred. Please try again.",
      })
    }
  })

  // Handle form submission
  function onSubmit(values: z.infer<typeof callbackFormSchema>) {
    mutation.mutate(values)
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
          name="best_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <Clock className="mr-1 h-3 w-3" /> Best time to call
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="morning">Morning (9am - 12pm)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12pm - 5pm)</SelectItem>
                  <SelectItem value="evening">Evening (5pm - 8pm)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <MessageSquare className="mr-1 h-3 w-3" /> Additional notes
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Any specific questions or concerns..." className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <div className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</div>
        )}

        <Button 
          type="submit" 
          className="w-full bg-[#00e1e1] text-black hover:bg-[#00e1e1]/90" 
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Submitting..." : "Request callback"}
        </Button>
      </form>
    </Form>
  )
}