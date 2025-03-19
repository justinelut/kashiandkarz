"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createTestDrive, updateTestDrive, getAvailableTimeSlots } from "@/lib/test-drive-actions"
import { type TestDrive, testDriveSchema } from "@/types/dashboard"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"

interface TestDriveFormProps {
  testDrive?: TestDrive
  isEdit?: boolean
}

export function TestDriveForm({ testDrive, isEdit = false }: TestDriveFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    testDrive?.scheduledDate ? new Date(testDrive.scheduledDate) : undefined,
  )
  const [selectedCarId, setSelectedCarId] = useState<string>(testDrive?.carId || "")

  const form = useForm<TestDrive>({
    resolver: zodResolver(testDriveSchema),
    defaultValues: testDrive || {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      carId: "",
      carTitle: "",
      scheduledDate: "",
      scheduledTime: "",
      status: "scheduled",
      notes: "",
    },
  })

  // Get available time slots when date or car changes
  const { data: timeSlots, isLoading: isLoadingTimeSlots } = useQuery({
    queryKey: ["timeSlots", selectedDate, selectedCarId],
    queryFn: () => {
      if (!selectedDate || !selectedCarId) return []
      return getAvailableTimeSlots(format(selectedDate, "yyyy-MM-dd"), selectedCarId)
    },
    enabled: !!selectedDate && !!selectedCarId,
  })

  // Update form values when date changes
  useEffect(() => {
    if (selectedDate) {
      form.setValue("scheduledDate", format(selectedDate, "yyyy-MM-dd"))
    }
  }, [selectedDate, form])

  // Update selectedCarId when form value changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "carId" && value.carId) {
        setSelectedCarId(value.carId as string)
      }
    })
    return () => subscription.unsubscribe()
  }, [form.watch])

  const createMutation = useMutation({
    mutationFn: createTestDrive,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Test drive scheduled successfully",
      })
      router.push("/dashboard/test-drives")
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to schedule test drive",
        variant: "destructive",
      })
      setIsSubmitting(false)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TestDrive> }) => updateTestDrive(id, data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Test drive updated successfully",
      })
      router.push("/dashboard/test-drives")
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update test drive",
        variant: "destructive",
      })
      setIsSubmitting(false)
    },
  })

  const onSubmit = async (data: TestDrive) => {
    setIsSubmitting(true)

    if (isEdit && testDrive?.id) {
      updateMutation.mutate({ id: testDrive.id, data })
    } else {
      createMutation.mutate(data)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Test Drive" : "Schedule Test Drive"}</CardTitle>
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
                name="carId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Car ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Car ID" {...field} />
                    </FormControl>
                    <FormDescription>Enter the ID of the car for the test drive</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="carTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Car Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Car Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scheduledDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <DatePicker date={selectedDate} setDate={setSelectedDate} placeholder="Select date" />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scheduledTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <Select
                      disabled={!selectedDate || !selectedCarId || isLoadingTimeSlots}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingTimeSlots ? (
                          <SelectItem value="loading" disabled>
                            Loading available times...
                          </SelectItem>
                        ) : timeSlots && timeSlots.length > 0 ? (
                          timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="none" disabled>
                            No available times
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select an available time slot</FormDescription>
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
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                          <SelectItem value="no-show">No Show</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional notes about the test drive"
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
                <Button type="button" variant="outline" onClick={() => router.push("/dashboard/test-drives")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : isEdit ? "Update Test Drive" : "Schedule Test Drive"}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

