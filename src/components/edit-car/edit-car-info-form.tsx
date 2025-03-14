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
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { updateBasicCarInfo } from "@/lib/actions";
import { CarMakeSelector } from "@/components/sell-car/car-make-selector";
import { CarTypeSelector } from "@/components/sell-car/car-type-selector";
import { ColorSelector } from "@/components/sell-car/color-selector";
import { CarInformation } from "@/types/types";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());

// Helper function to create slug from title
const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/&/g, '-and-')      // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')    // Remove all non-word characters
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
};

const formSchema = z.object({
  car_make: z.string().min(1, "Car make is required"),
  car_model: z.string().min(1, "Car model is required"),
  year: z.string().regex(/^\d{4}$/, "Year must be a 4-digit number"),
  car_type: z.string().min(1, "Vehicle type is required"),
  condition: z.enum(["Brand New", "Used", "Certified Pre-Owned"], {
    errorMap: () => ({ message: "Condition is required" }),
  }),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description must be less than 1000 characters"),
  title: z.string().min(10, "Title must be at least 10 characters").max(100, "Title must be less than 100 characters"),
  color: z.string().min(1, "Color is required"),
  big_deal: z.boolean().default(false),
  status: z.enum(["published", "draft"]).default("draft"),
  availability: z.boolean().default(true),
  featured: z.boolean().default(false),
  category: z.enum(["sport", "family", "luxury"]).optional(),
  commercial: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface EditCarInfoFormProps {
  car: CarInformation;
}

export default function EditCarInfoForm({ car }: EditCarInfoFormProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: car.title || "",
      car_make: car.car_make?.$id || "",
      car_model: car.car_model || "",
      year: car.year || "",
      car_type: car.car_type || "",
      condition: (car.condition as "Brand New" | "Used" | "Certified Pre-Owned") || undefined,
      description: car.description || "",
      color: car.color || "",
      big_deal: car.big_deal || false,
      status: car.status || "draft",
      availability: car.availability || true,
      featured: car.featured || false,
      category: car.category || undefined,
      commercial: car.commercial || false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      // Generate slug from title before submission if title has changed
      let slug = car.slug;
      if (data.title !== car.title) {
        slug = slugify(data.title);
      }
      
      // Add slug and id to data
      const dataWithSlug = {
        ...data,
        slug,
        id: car.$id
      };
      
      console.log("Submitting data:", dataWithSlug);

      // Update the car info
      const result = await updateBasicCarInfo(dataWithSlug);

      if (result.success) {
        return result;
      }
      throw new Error(result.error || "Failed to update car information");
    },
    onSuccess: () => {
      setIsDialogOpen(true);
    },
    onError: (error: Error) => {
      toast.error("Error updating car information", {
        description: error.message || "An error occurred while updating car information.",
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
          <CardTitle className="text-2xl font-bold">Basic Car Information</CardTitle>
          <CardDescription>
            Edit the basic information about your car. These changes will be immediately visible to potential buyers.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-8">
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a catchy title for your listing (e.g., 2018 Rolls-Royce Ghost in Jet Black)"
                        className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="car_make"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-base">Make (Brand)</FormLabel>
                      <FormControl>
                        <CarMakeSelector
                          onSelect={(make) => {
                            if (make) {
                              field.onChange(make.$id); // Use the database ID
                            }
                          }}
                          defaultValue={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="car_model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Model</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter car model"
                          className="h-11 rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Year</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="car_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Vehicle Type</FormLabel>
                      <FormControl>
                        <CarTypeSelector
                          onSelect={(type) => {
                            if (type) {
                              field.onChange(type);
                            }
                          }}
                          defaultValue={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Condition</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Brand New">Brand New</SelectItem>
                          <SelectItem value="Used">Used</SelectItem>
                          <SelectItem value="Certified Pre-Owned">Certified Pre-Owned</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Color</FormLabel>
                    <FormControl>
                      <ColorSelector
                        onSelect={(color) => {
                          if (color) {
                            field.onChange(color);
                          }
                        }}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a detailed description of your vehicle..."
                        className="min-h-[120px] w-full rounded-md border-muted-foreground/20 bg-background px-4 py-3 shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="big_deal"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Big Deal</FormLabel>
                        <p className="text-sm text-muted-foreground">Mark this car as a Big Deal</p>
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
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Featured</FormLabel>
                        <p className="text-sm text-muted-foreground">Mark this car as Featured</p>
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
                  name="availability"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Availability</FormLabel>
                        <p className="text-sm text-muted-foreground">Is this car currently available?</p>
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

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Listing Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sport">Sport</SelectItem>
                          <SelectItem value="family">Family</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="commercial"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Commercial</FormLabel>
                      <p className="text-sm text-muted-foreground">Is this a commercial vehicle?</p>
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
                    Update Information
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
            <DialogTitle>Car Information Updated</DialogTitle>
            <DialogDescription>
              The car information has been successfully updated.
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
