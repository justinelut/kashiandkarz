"use client";
import { type FormEvent, useState } from "react";
import { SearchIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const CONSTANTS = {
  MIN_BUDGET: 500_000,
  MAX_BUDGET: 10_000_000,
  BUDGET_STEP: 100_000,
  MIN_YEAR: 1995,
  DEFAULT_BUDGET: 2_000_000,
} as const;

const BRANDS = [
  "Toyota",
  "Honda",
  "Mazda",
  "Nissan",
  "Volkswagen",
  "Subaru",
  "Mitsubishi",
  "Suzuki",
  "Mercedes-Benz",
  "BMW",
] as const;

const BODY_TYPES = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Truck",
  "Van",
  "Wagon",
  "Convertible",
] as const;

type Brand = (typeof BRANDS)[number];
type BodyType = (typeof BODY_TYPES)[number];

interface FormData {
  brand: Brand | "";
  bodyType: BodyType | "";
  budget: number[];
  year: string;
}

const CarSearchForm = () => {
  const [formData, setFormData] = useState<FormData>({
    brand: "",
    bodyType: "",
    budget: [CONSTANTS.DEFAULT_BUDGET],
    year: "",
  });

  const formatPrice = (value: number) => {
    return `KSh ${value.toLocaleString()}`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const currentYear = new Date().getFullYear();

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-white/95 p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl backdrop-blur-md border border-white/10 z-30 w-full max-w-7xl mx-auto h-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <FormField label="Car Brand" htmlFor="brand">
          <Select
            value={formData.brand}
            onValueChange={(value: Brand) =>
              setFormData({ ...formData, brand: value })
            }
          >
            <SelectTrigger id="brand" className="w-full h-9">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent className="z-[60]">
              {BRANDS.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Body Type" htmlFor="bodyType">
          <Select
            value={formData.bodyType}
            onValueChange={(value: BodyType) =>
              setFormData({ ...formData, bodyType: value })
            }
          >
            <SelectTrigger id="bodyType" className="w-full h-9">
              <SelectValue placeholder="Select body type" />
            </SelectTrigger>
            <SelectContent className="z-[60]">
              {BODY_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Year" htmlFor="year">
          <Input
            id="year"
            type="number"
            placeholder="Enter year"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            min={CONSTANTS.MIN_YEAR}
            max={currentYear}
            className="w-full h-9"
          />
        </FormField>

        <FormField label="Price Range" htmlFor="budget">
          <div className="flex flex-col h-9 justify-center">
            <Slider
              id="budget"
              min={CONSTANTS.MIN_BUDGET}
              max={CONSTANTS.MAX_BUDGET}
              step={CONSTANTS.BUDGET_STEP}
              value={formData.budget}
              onValueChange={(value) =>
                setFormData({ ...formData, budget: value })
              }
            />
            <span className="text-xs text-gray-700 font-medium mt-1">
              Budget: {formatPrice(formData.budget[0])}
            </span>
          </div>
        </FormField>
      </div>

      <div className="mt-4">
        <Button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-blue-700/20 h-9 px-4"
        >
          <SearchIcon className="w-4 h-4" />
          <span>Find Cars</span>
        </Button>
      </div>
    </motion.form>
  );
};

const FormField = ({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col space-y-1">
    <label className="text-xs font-medium text-gray-700" htmlFor={htmlFor}>
      {label}
    </label>
    {children}
  </div>
);

export default CarSearchForm;
