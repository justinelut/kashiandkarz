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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { updateCarSpecifications } from "@/lib/actions";
import { CarInformation } from "@/types/types";

// Form validation schema
const formSchema = z.object({
  fuel_type: z.enum(["petrol", "diesel", "electric", "hybrid", "plugin_hybrid", "alternative"], {
    errorMap: () => ({ message: "Fuel type is required" }),
  }),
  transmission_type: z.enum(["manual", "automatic", "semi_automatic", "cvt", "dual_clutch"], {
    errorMap: () => ({ message: "Transmission type is required" }),
  }),
  drive_train: z.enum(["fwd", "rwd", "awd", "4wd"], {
    errorMap: () => ({ message: "Drive train is required" }),
  }),
  engine_capacity: z.string().min(1, "Engine capacity is required"),
  cylinder_count: z.string().min(1, "Cylinder count is required"),
  mileage: z.string().min(1, "Mileage is required"),
  mileage_unit: z.enum(["km", "mi"], {
    errorMap: () => ({ message: "Mileage unit is required" }),
  }),
  horse_power: z.string().min(1, "Horse power is required"),
  torque: z.string().min(1, "Torque is required"),
  top_speed: z.string().min(1, "Top speed is required"),
  acceleration: z.string().min(1, "Acceleration is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface EditCarSpecificationsFormProps {
  car: CarInformation;
}

export default function EditCarSpecificationsForm({ car }: EditCarSpecificationsFormProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Extract specifications or initialize empty object
  const specs = car.car_specifications || {};

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fuel_type: (specs.fuel_type as "petrol" | "diesel" | "electric" | "hybrid" | "plugin_hybrid" | "alternative") || undefined,
      transmission_type: (specs.transmission_type as "manual" | "automatic" | "semi_automatic" | "cvt" | "dual_clutch") || undefined,
      drive_train: (specs.drive_train as "fwd" | "rwd" | "awd" | "4wd") || undefined,
      engine_capacity: specs.engine_capacity || "",
      cylinder_count: specs.cylinder_count || "",
      mileage: specs.mileage || "",
      mileage_unit: (specs.mileage_unit as "km" | "mi") || "km",
      horse_power: specs.horse_power || "",
      torque: specs.torque || "",
      top_speed: specs.top_speed || "",
      acceleration: specs.acceleration || "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      // Add car ID to the data for relationship
      const dataWithCarId = {
        ...data,
        car_id: car.$id,
      };
      
      console.log("Submitting specs data:", dataWithCarId);

      // Update in the database
      const result = await updateCarSpecifications(dataWithCarId);

      if (result.success) {
        return result;
      }
      throw new Error(result.error || "Failed to update car specifications");
    },
    onSuccess: () => {
      setIsDialogOpen(true);
    },
    onError: (error: Error) => {
      toast.error("Error updating car specifications", {
        description: error.message || "An error occurred while updating car specifications.",
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
          <CardTitle className="text-2xl font-bold">Technical Specifications</CardTitle>
          <CardDescription>
            Update the detailed technical specifications of your vehicle.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fuel_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Fuel Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select fuel type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="petrol">Petrol</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="plugin_hybrid">Plug-in Hybrid</SelectItem>
                          <SelectItem value="alternative">Alternative Fuel</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="transmission_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Transmission Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select transmission type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="manual">Manual</SelectItem>
                          <SelectItem value="automatic">Automatic</SelectItem>
                          <SelectItem value="semi_automatic">Semi-Automatic</SelectItem>
                          <SelectItem value="cvt">CVT</SelectItem>
                          <SelectItem value="dual_clutch">Dual-Clutch</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="drive_train"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Drive Train</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select drive train" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="fwd">Front-Wheel Drive (FWD)</SelectItem>
                          <SelectItem value="rwd">Rear-Wheel Drive (RWD)</SelectItem>
                          <SelectItem value="awd">All-Wheel Drive (AWD)</SelectItem>
                          <SelectItem value="4wd">Four-Wheel Drive (4WD)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="engine_capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Engine Capacity (L)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., 2.0"
                          className="h-11"
                          type="number"
                          step="0.1"
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
                  name="cylinder_count"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Number of Cylinders</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., 4, 6, 8"
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

                <div className="flex gap-4">
                  <div className="flex-grow">
                    <FormField
                      control={form.control}
                      name="mileage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Mileage</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="E.g., 15000"
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
                  <div className="w-1/3">
                    <FormField
                      control={form.control}
                      name="mileage_unit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Unit</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="km">Kilometers</SelectItem>
                              <SelectItem value="mi">Miles</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="horse_power"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Horsepower (hp)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., 150"
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
                  name="torque"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Torque (Nm)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., 200"
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
                  name="top_speed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Top Speed (km/h)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., 220"
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
                  name="acceleration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">0-100 km/h (seconds)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., 8.5"
                          className="h-11"
                          type="number"
                          step="0.1"
                          min="0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                    Update Specifications
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
            <DialogTitle>Specifications Updated</DialogTitle>
            <DialogDescription>
              The car specifications have been successfully updated.
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
