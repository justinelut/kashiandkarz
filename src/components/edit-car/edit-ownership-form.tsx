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
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateOwnershipDocumentation } from "@/lib/actions";
import { CarInformation } from "@/types/types";

// Form validation schema
const formSchema = z.object({
  accident_history: z.enum(["Yes", "No", "Unknown"], {
    errorMap: () => ({ message: "Accident history is required" }),
  }),
  previous_owners: z.string().min(1, "Number of previous owners is required"),
  service_history: z.enum(["Full Service History", "Partial Service History", "No Service History", "Not Applicable"], {
    errorMap: () => ({ message: "Service history is required" }),
  }),
  warranty_information: z.string().optional(),
  vehicle_report: z.enum(["Available", "Not Available"], {
    errorMap: () => ({ message: "Vehicle report availability is required" }),
  }),
  registration_details: z.string().min(1, "Registration details are required"),
  imported_vehicle: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "Please specify if this is an imported vehicle" }),
  }),
  ownership_notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EditOwnershipFormProps {
  car: CarInformation;
}

export default function EditOwnershipForm({ car }: EditOwnershipFormProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Extract ownership data or initialize empty object
  const ownership = car.ownership_documentation || {};

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accident_history: (ownership.accident_history as "Yes" | "No" | "Unknown") || undefined,
      previous_owners: ownership.previous_owners || "",
      service_history: (ownership.service_history as "Full Service History" | "Partial Service History" | "No Service History" | "Not Applicable") || undefined,
      warranty_information: ownership.warranty_information || "",
      vehicle_report: (ownership.vehicle_report as "Available" | "Not Available") || undefined,
      registration_details: ownership.registration_details || "",
      imported_vehicle: (ownership.imported_vehicle as "Yes" | "No") || undefined,
      ownership_notes: ownership.ownership_notes || "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      // Add car ID to the data for relationship
      const dataWithCarId = {
        ...data,
        car_id: car.$id,
      };
      
      console.log("Submitting ownership data:", dataWithCarId);

      // Update in the database
      const result = await updateOwnershipDocumentation(dataWithCarId);

      if (result.success) {
        return result;
      }
      throw new Error(result.error || "Failed to update ownership information");
    },
    onSuccess: () => {
      setIsDialogOpen(true);
    },
    onError: (error: Error) => {
      toast.error("Error updating ownership information", {
        description: error.message || "An error occurred while updating ownership information.",
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
          <CardTitle className="text-2xl font-bold">Ownership & Documentation</CardTitle>
          <CardDescription>
            Update the ownership details and documentation for this vehicle.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="accident_history"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base">Accident History</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Yes" />
                            </FormControl>
                            <FormLabel className="font-normal">Yes</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="No" />
                            </FormControl>
                            <FormLabel className="font-normal">No</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Unknown" />
                            </FormControl>
                            <FormLabel className="font-normal">Unknown</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="previous_owners"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Number of Previous Owners</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., 2"
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="service_history"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Service History</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select service history" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Full Service History">Full Service History</SelectItem>
                          <SelectItem value="Partial Service History">Partial Service History</SelectItem>
                          <SelectItem value="No Service History">No Service History</SelectItem>
                          <SelectItem value="Not Applicable">Not Applicable</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="warranty_information"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Warranty Information</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., Manufacturer warranty until 2025"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="vehicle_report"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base">Vehicle Report</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Available" />
                            </FormControl>
                            <FormLabel className="font-normal">Available</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Not Available" />
                            </FormControl>
                            <FormLabel className="font-normal">Not Available</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="registration_details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Registration Details</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., First registered in 2020"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="imported_vehicle"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base">Imported Vehicle</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="No" />
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
                name="ownership_notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Additional Ownership Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional information about the vehicle's ownership or documentation"
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
                    Update Ownership Information
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
            <DialogTitle>Ownership Information Updated</DialogTitle>
            <DialogDescription>
              The car ownership information has been successfully updated.
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
