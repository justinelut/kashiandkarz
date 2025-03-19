"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { createCallbackRequest, updateCallbackRequest } from "@/lib/callback-actions"
import { type CallbackRequest, callbackRequestSchema } from "@/types/dashboard"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface CallbackFormProps {
  callback?: CallbackRequest
  isEdit?: boolean
}

export function CallbackForm({ callback, isEdit = false }: CallbackFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CallbackRequest>({
    resolver: zodResolver(callbackRequestSchema),
    defaultValues: callback || {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      preferredTime: "",
      status: "pending",
      notes: "",
    },
  })

  const createMutation = useMutation({
    mutationFn: createCallbackRequest,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Callback request created successfully",
      })
      router.push("/dashboard/callbacks")
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create callback request",
        variant: "destructive",
      })
      setIsSubmitting(false)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CallbackRequest> }) => updateCallbackRequest(id, data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Callback request updated successfully",
      })
      router.push("/dashboard/callbacks")
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update callback request",
        variant: "destructive",
      })
      setIsSubmitting(false)
    },
  })

  const onSubmit = async (data: CallbackRequest) => {
    setIsSubmitting(true)

    if (isEdit && callback?.id) {
      updateMutation.mutate({ id: callback.id, data })
    } else {
      createMutation.mutate(data)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Callback Request" : "New Callback Request"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Time</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                          <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isEdit && (
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="carTitle"
                render={({ field }) => (
                  <FormItem className={isEdit ? "" : "md:col-span-2"}>
                    <FormLabel>Car</FormLabel>
                    <FormControl>
                      <Input placeholder="Car Title" {...field} />
                    </FormControl>
                    <FormDescription>Enter the car the customer is interested in</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional notes about the callback request"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="px-0 pb-0 pt-6">
              <div className="flex justify-between w-full">
                <Button type="button" variant="outline" onClick={() => router.push("/dashboard/callbacks")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : isEdit ? "Update Callback" : "Create Callback"}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

