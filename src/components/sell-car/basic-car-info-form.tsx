"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { saveBasicCarInfo } from "@/lib/actions";
import { CarMakeSelector } from "@/components/sell-car/car-make-selector";
import { CarTypeSelector } from "@/components/sell-car/car-type-selector";
import { ColorSelector } from "@/components/sell-car/color-selector";


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
});

type FormValues = z.infer<typeof formSchema>;

export default function BasicCarInfoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      car_make: "",
      car_model: "",
      year: "",
      car_type: "",
      condition: undefined,
      description: "",
      color: "",
      big_deal: false,
      status: "draft",
      availability: true,
    },
  });

  // Pre-fill form with data from URL params if available
  useEffect(() => {
    const urlMake = searchParams.get("make");
    const urlType = searchParams.get("type");
    const urlColor = searchParams.get("color");

    if (urlMake) form.setValue("car_make", urlMake);
    if (urlType) form.setValue("car_type", urlType);
    if (urlColor) form.setValue("color", urlColor);
  }, [form, searchParams]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      // Generate slug from title before submission
      const slug = slugify(data.title);
      
      // Add slug to data
      const dataWithSlug = {
        ...data,
        slug
      };
      
      console.log("Submitting data:", dataWithSlug);

      // Save to the database
      const result = await saveBasicCarInfo(dataWithSlug);

      if (result.success && result.carId) {
        return result;
      }
      throw new Error(result.error || "Failed to save car information");
    },
    onSuccess: (data) => {
      toast.success("Success!", {
        description: "Basic car information has been saved successfully.",
      });
      // Navigate to the next step with carId in URL
      router.push(`/dashboard/cars/new/car-specification?carId=${data.carId}`);
    },
    onError: (error: Error) => {
      toast.error("Error saving car information", {
        description: error.message || "An error occurred while saving car information.",
      });
    },
  });

  function onSubmit(data: FormValues) {
    mutate(data);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Basic Car Information</CardTitle>
        <CardDescription>
          Let&apos;s start with the basic information about your car. This will help buyers find your listing more easily.
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
                      <FormLabel className="text-base">Featured Listing</FormLabel>
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
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                "Saving..."
              ) : (
                <>
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}