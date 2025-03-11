"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { saveCarFeatures } from "@/lib/actions";

// Define the schema for all 12 feature fields.
const formSchema = z.object({
  interior_features: z.array(z.string()).min(1, "Select at least one interior feature"),
  engine: z.array(z.string()).min(1, "Select at least one engine feature"),
  wheels: z.array(z.string()).min(1, "Select at least one wheels feature"),
  exterior_features: z.array(z.string()).min(1, "Select at least one exterior feature"),
  safety_features: z.array(z.string()).min(1, "Select at least one safety feature"),
  entertainment_features: z.array(z.string()).min(1, "Select at least one entertainment feature"),
  convenience_features: z.array(z.string()).min(1, "Select at least one convenience feature"),
  security_features: z.array(z.string()).min(1, "Select at least one security feature"),
  sports_car_features: z.array(z.string()).min(1, "Select at least one sports car feature"),
  family_car_features: z.array(z.string()).min(1, "Select at least one family car feature"),
  ecofriendly_features: z.array(z.string()).min(1, "Select at least one ecofriendly feature"),
  commercial_car_features: z.array(z.string()).min(1, "Select at least one commercial car feature"),
});

type FormSchemaType = z.infer<typeof formSchema>;

// List of fields to render with display labels.
const featureFields = [
  { key: "interior_features", label: "Interior Features" },
  { key: "engine", label: "Engine" },
  { key: "wheels", label: "Wheels" },
  { key: "exterior_features", label: "Exterior Features" },
  { key: "safety_features", label: "Safety Features" },
  { key: "entertainment_features", label: "Entertainment Features" },
  { key: "convenience_features", label: "Convenience Features" },
  { key: "security_features", label: "Security Features" },
  { key: "sports_car_features", label: "Sports Car Features" },
  { key: "family_car_features", label: "Family Car Features" },
  { key: "ecofriendly_features", label: "Ecofriendly Features" },
  { key: "commercial_car_features", label: "Commercial Car Features" },
];

export function CarFeaturesForm({ data = {} }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carId = searchParams.get("carId");

  console.log(data)

  // Use the provided data for initial values and options
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interior_features: [],
      engine: [],
      wheels: [],
      exterior_features: [],
      safety_features: [],
      entertainment_features: [],
      convenience_features: [],
      security_features: [],
      sports_car_features: [],
      family_car_features: [],
      ecofriendly_features: [],
      commercial_car_features: [],
    },
  });

  // Set form values from data if provided
  useEffect(() => {
    if (data) {
      // Set each field with the data from API
      featureFields.forEach(({ key }) => {
        const fieldKey = key as keyof FormSchemaType;
        if (data[fieldKey] && Array.isArray(data[fieldKey])) {
          form.setValue(fieldKey, data[fieldKey]);
        }
      });
    }
  }, [data, form]);

  const onSubmit = async (values: FormSchemaType) => {
    if (!carId) {
      console.error("No car ID found");
      return;
    }
    const result = await saveCarFeatures(values, carId);
    if (result.success) {
      router.push(`/dashboard/cars/new/pricing?carId=${carId}`);
    } else {
      console.error("Failed to save car features:", result.error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureFields.map(({ key, label }) => {
            // Access the features array for the current category
            const features = data[key] || [];
            
            return (
              <div key={key} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <FormField
                  control={form.control}
                  name={key as keyof FormSchemaType}
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold mb-4 block">{label}</FormLabel>
                      <div className="space-y-3">
                        {features.map((feature: string) => (
                          <FormField
                            key={feature}
                            control={form.control}
                            name={key as keyof FormSchemaType}
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={feature}
                                  className="flex items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(feature)}
                                      onCheckedChange={(checked) => {
                                        const currentValues = [...field.value || []];
                                        if (checked) {
                                          field.onChange([...currentValues, feature]);
                                        } else {
                                          field.onChange(
                                            currentValues.filter((value) => value !== feature)
                                          );
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal text-sm cursor-pointer">
                                    {feature}
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
              </div>
            );
          })}
        </div>
        <div className="flex justify-end mt-8">
          <Button type="submit" className="px-8 py-2">Next: Pricing</Button>
        </div>
      </form>
    </Form>
  );
}