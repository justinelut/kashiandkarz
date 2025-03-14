"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { updatePricingPayment } from "@/lib/actions";
import { CarInformation } from "@/types/types";

// Form validation schema
const formSchema = z.object({
  price: z.string().min(1, "Price is required"),
  price_currency: z.enum(["USD", "KES"], {
    errorMap: () => ({ message: "Currency is required" }),
  }),
  price_negotiable: z.boolean().default(false),
  financing_available: z.boolean().default(false),
  leasing_available: z.boolean().default(false),
  deposit_required: z.boolean().default(false),
  deposit_amount: z.string().optional(),
  payment_methods: z.array(z.string()).min(1, "At least one payment method is required"),
  price_notes: z.string().optional(),
  price_discount: z.string().optional(),
  include_insurance: z.boolean().default(false),
  include_warranty: z.boolean().default(false),
  tax_included: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface EditPricingFormProps {
  car: CarInformation;
}

// Payment methods options
const paymentMethodOptions = [
  { id: "cash", label: "Cash" },
  { id: "bank_transfer", label: "Bank Transfer" },
  { id: "credit_card", label: "Credit Card" },
  { id: "mobile_money", label: "Mobile Money" },
  { id: "cheque", label: "Cheque" },
  { id: "cryptocurrency", label: "Cryptocurrency" },
  { id: "financing", label: "Financing" },
  { id: "trade_in", label: "Trade-in" },
];

export default function EditPricingForm({ car }: EditPricingFormProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Extract pricing data or initialize empty object
  const pricing = car.pricing_payment || {};

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: pricing.price || "",
      price_currency: (pricing.price_currency as "USD" | "KES") || "KES",
      price_negotiable: pricing.price_negotiable || false,
      financing_available: pricing.financing_available || false,
      leasing_available: pricing.leasing_available || false,
      deposit_required: pricing.deposit_required || false,
      deposit_amount: pricing.deposit_amount || "",
      payment_methods: pricing.payment_methods || ["cash"],
      price_notes: pricing.price_notes || "",
      price_discount: pricing.price_discount || "",
      include_insurance: pricing.include_insurance || false,
      include_warranty: pricing.include_warranty || false,
      tax_included: pricing.tax_included || false,
    },
  });

  // Watch deposit_required to conditionally show deposit_amount
  const depositRequired = form.watch("deposit_required");

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      // Add car ID to the data for relationship
      const dataWithCarId = {
        ...data,
        car_id: car.$id,
      };
      
      console.log("Submitting pricing data:", dataWithCarId);

      // Update in the database
      const result = await updatePricingPayment(dataWithCarId);

      if (result.success) {
        return result;
      }
      throw new Error(result.error || "Failed to update pricing information");
    },
    onSuccess: () => {
      setIsDialogOpen(true);
    },
    onError: (error: Error) => {
      toast.error("Error updating pricing information", {
        description: error.message || "An error occurred while updating pricing information.",
      });
    },
  });

  function onSubmit(data: FormValues) {
    mutate(data);
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Pricing & Payment</CardTitle>
          <CardDescription>
            Update the pricing and payment details for this vehicle.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Price*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., 25000"
                          className="h-11"
                          type="number"
                          min="0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price_currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Currency*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="KES">Kenyan Shilling (KES)</SelectItem>
                          <SelectItem value="USD">US Dollar (USD)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price_discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Discount (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., 10% off"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="price_negotiable"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Price Negotiable</FormLabel>
                        <FormDescription>
                          Indicates if the price is negotiable
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="financing_available"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Financing Available</FormLabel>
                        <FormDescription>
                          Offer financing options
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="leasing_available"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Leasing Available</FormLabel>
                        <FormDescription>
                          Offer leasing options
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="deposit_required"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Deposit Required</FormLabel>
                        <FormDescription>
                          Require a deposit from buyers
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {depositRequired && (
                  <FormField
                    control={form.control}
                    name="deposit_amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Deposit Amount</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="E.g., 5000 or 10%"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <FormField
                control={form.control}
                name="payment_methods"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Accepted Payment Methods*</FormLabel>
                      <FormDescription>
                        Select all payment methods you accept for this vehicle
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {paymentMethodOptions.map((method) => (
                        <FormField
                          key={method.id}
                          control={form.control}
                          name="payment_methods"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={method.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(method.id)}
                                    onCheckedChange={(checked) => {
                                      const currentValue = field.value || [];
                                      return checked
                                        ? field.onChange([...currentValue, method.id])
                                        : field.onChange(
                                            currentValue.filter(
                                              (value) => value !== method.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {method.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="include_insurance"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Include Insurance</FormLabel>
                        <FormDescription>
                          Insurance is included in price
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="include_warranty"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Include Warranty</FormLabel>
                        <FormDescription>
                          Warranty is included in price
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tax_included"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Tax Included</FormLabel>
                        <FormDescription>
                          Tax is included in price
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="price_notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Additional Pricing Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional information about pricing, financing, or payment options"
                        className="min-h-32 resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                type="button" 
                disabled={isPending}
                onClick={() => router.push(`/dashboard/cars/${car.$id}`)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  "Saving..."
                ) : (
                  <>
                    Update Pricing Information
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {/* Success Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pricing Information Updated</DialogTitle>
            <DialogDescription>
              The car pricing information has been successfully updated.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              onClick={() => {
                setIsDialogOpen(false);
                router.push(`/dashboard/cars/${car.$id}`);
                router.refresh();
              }}
            >
              View Car Details
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false);
                router.push(`/dashboard/cars`);
                router.refresh();
              }}
            >
              Return to Cars List
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
