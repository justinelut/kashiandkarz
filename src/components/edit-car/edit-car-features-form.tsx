"use client";

import { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCarFeatures, updateCarFeatures } from "@/lib/actions";
import { CarInformation } from "@/types/types";

// Define schema for car features (all fields are optional arrays of strings)
const formSchema = z.object({
  interior_features: z.array(z.string()).optional(),
  exterior_features: z.array(z.string()).optional(),
  safety_features: z.array(z.string()).optional(),
  engine_features: z.array(z.string()).optional(),
  wheels_features: z.array(z.string()).optional(),
  convenience_features: z.array(z.string()).optional(),
  entertainment_features: z.array(z.string()).optional(),
  security_features: z.array(z.string()).optional(),
  sports_car_features: z.array(z.string()).optional(),
  family_car_features: z.array(z.string()).optional(),
  ecofriendly_features: z.array(z.string()).optional(),
  commercial_car_features: z.array(z.string()).optional()
});

type FormValues = z.infer<typeof formSchema>;

interface EditCarFeaturesFormProps {
  car: CarInformation;
}

export default function EditCarFeaturesForm({ car }: EditCarFeaturesFormProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [availableFeatures, setAvailableFeatures] = useState<Record<string, string[]> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Extract existing car features or initialize empty object
  const carFeatures = car.car_features || {};

  // Form initialization
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interior_features: carFeatures.interior_features || [],
      exterior_features: carFeatures.exterior_features || [],
      safety_features: carFeatures.safety_features || [],
      engine_features: carFeatures.engine_features || [],
      wheels_features: carFeatures.wheels_features || [],
      convenience_features: carFeatures.convenience_features || [],
      entertainment_features: carFeatures.entertainment_features || [],
      security_features: carFeatures.security_features || [],
      sports_car_features: carFeatures.sports_car_features || [],
      family_car_features: carFeatures.family_car_features || [],
      ecofriendly_features: carFeatures.ecofriendly_features || [],
      commercial_car_features: carFeatures.commercial_car_features || []
    },
  });

  // Fetch all available features on component mount
  useEffect(() => {
    const fetchFeatures = async () => {
      setIsLoading(true);
      try {
        const result = await getCarFeatures();
        if (result.success && result.data) {
          setAvailableFeatures(result.data);
        } else {
          toast.error("Error fetching available features");
        }
      } catch (error) {
        console.error("Error fetching features:", error);
        toast.error("Failed to load available features");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  // Update features mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      // Add car ID to the data
      const dataWithCarId = {
        ...data,
        car_id: car.$id,
      };
      
      console.log("Submitting features data:", dataWithCarId);

      // Update in the database
      const result = await updateCarFeatures(dataWithCarId);

      if (result.success) {
        return result;
      }
      throw new Error(result.error || "Failed to update car features");
    },
    onSuccess: () => {
      setIsDialogOpen(true);
    },
    onError: (error: Error) => {
      toast.error("Error updating car features", {
        description: error.message || "An error occurred while updating car features.",
      });
    },
  });

  function onSubmit(data: FormValues) {
    mutate(data);
  }

  // Helper to render checkboxes for each feature category
  const renderFeatureCheckboxes = (category: string, fieldName: keyof FormValues) => {
    if (!availableFeatures || !availableFeatures[category]) return null;
    
    return (
      <FormField
        control={form.control}
        name={fieldName}
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base font-semibold">{formatCategoryName(category)}</FormLabel>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {availableFeatures[category].map((feature: string) => (
                <FormField
                  key={feature}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={feature}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(feature)}
                            onCheckedChange={(checked) => {
                              const currentValue = field.value || [];
                              return checked
                                ? field.onChange([...currentValue, feature])
                                : field.onChange(
                                    currentValue.filter(
                                      (value) => value !== feature
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          {feature}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
          </FormItem>
        )}
      />
    );
  };

  // Helper to format category names for display
  const formatCategoryName = (category: string) => {
    return category
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
      .replace("Features", " Features");
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Car Features & Equipment</CardTitle>
          <CardDescription>Loading available features...</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Car Features & Equipment</CardTitle>
          <CardDescription>
            Update the features and equipment available in your vehicle.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <Tabs defaultValue="interior" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                  <TabsTrigger value="interior">Interior</TabsTrigger>
                  <TabsTrigger value="exterior">Exterior</TabsTrigger>
                  <TabsTrigger value="safety">Safety</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="interior" className="space-y-8">
                  {renderFeatureCheckboxes("interior_features", "interior_features")}
                  {renderFeatureCheckboxes("convenience_features", "convenience_features")}
                  {renderFeatureCheckboxes("entertainment_features", "entertainment_features")}
                </TabsContent>
                
                <TabsContent value="exterior" className="space-y-8">
                  {renderFeatureCheckboxes("exterior_features", "exterior_features")}
                  {renderFeatureCheckboxes("wheels_features", "wheels_features")}
                </TabsContent>
                
                <TabsContent value="safety" className="space-y-8">
                  {renderFeatureCheckboxes("safety_features", "safety_features")}
                  {renderFeatureCheckboxes("security_features", "security_features")}
                </TabsContent>
                
                <TabsContent value="performance" className="space-y-8">
                  {renderFeatureCheckboxes("engine_features", "engine_features")}
                  {renderFeatureCheckboxes("sports_car_features", "sports_car_features")}
                  {renderFeatureCheckboxes("family_car_features", "family_car_features")}
                  {renderFeatureCheckboxes("ecofriendly_features", "ecofriendly_features")}
                  {renderFeatureCheckboxes("commercial_car_features", "commercial_car_features")}
                </TabsContent>
              </Tabs>
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
                    Update Features
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
            <DialogTitle>Features Updated</DialogTitle>
            <DialogDescription>
              The car features have been successfully updated.
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
