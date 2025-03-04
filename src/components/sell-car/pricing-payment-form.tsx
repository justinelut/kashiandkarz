"use client"

import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ChevronLeft, ChevronRight, DollarSignIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { savePricingPayment } from "@/lib/actions"

const currencies = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "KES", label: "KES (KSh)" },
]

const paymentMethods = [
  { id: "cash", label: "Cash" },
  { id: "bank-transfer", label: "Bank Transfer" },
  { id: "mobile-money", label: "Mobile Money" },
  { id: "financing", label: "Financing" },
]

const formSchema = z.object({
  price: z.string().min(1, "Price is required"),
  currency: z.string().min(1, "Currency is required"),
  negotiable: z.enum(["yes", "no"]),
  installmentPlans: z.enum(["yes", "no"]),
  paymentMethods: z.array(z.string()).min(1, "Select at least one payment method"),
})

type FormValues = z.infer<typeof formSchema>

export default function PricingPaymentForm() {
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: "",
      currency: "USD",
      negotiable: "no",
      installmentPlans: "no",
      paymentMethods: ["cash"],
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      await savePricingPayment(data)
    },
    onSuccess: () => {
      router.push("/sell-car/step-6")
    },
  })

  function onSubmit(data: FormValues) {
    mutate(data)
  }

  return (
    <Card className="overflow-hidden border-none bg-gradient-to-br from-background to-muted/50 shadow-lg">
      <CardHeader className="space-y-1 bg-muted/30 px-6 py-5">
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-primary/10 p-1.5">
            <DollarSignIcon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl">Pricing & Payment Options</CardTitle>
        </div>
        <CardDescription>Set your selling price and preferred payment methods</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Selling Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.value} value={currency.value}>
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="negotiable"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">Is the price negotiable?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="installmentPlans"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">Are installment plans available?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethods"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Payment Methods Accepted</FormLabel>
                    <FormDescription>Select all payment methods you're willing to accept</FormDescription>
                  </div>
                  {paymentMethods.map((method) => (
                    <FormField
                      key={method.id}
                      control={form.control}
                      name="paymentMethods"
                      render={({ field }) => {
                        return (
                          <FormItem key={method.id} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(method.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, method.id])
                                    : field.onChange(field.value?.filter((value) => value !== method.id))
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{method.label}</FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-4">
        <Button variant="outline" onClick={() => router.push("/sell-car/step-4")} className="gap-2">
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={isPending}
          className="gap-2 bg-primary px-6 text-primary-foreground hover:bg-primary/90"
        >
          {isPending ? "Saving..." : "Continue"}
          {!isPending && <ChevronRight className="h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  )
}

