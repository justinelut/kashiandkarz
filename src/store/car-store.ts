import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { toast } from "sonner"

// Define the car data types
interface CarMake {
  $id: string
  name: string
  slug: string
  image: string
}

interface CarApiData {
  fuel_type?: string
  transmission_type?: string
  drivetrain?: string
  engine_capacity?: string
  horsepower?: string
  torque?: string
}

interface BasicCarInfo {
  make_id: string
  make_name?: string
  make_image?: string
  model: string
  year: string
  vehicle_type: string
  condition: string
}

interface CarSpecifications {
  fuel_type: string
  transmission_type: string
  drivetrain: string
  engine_capacity: string
  horsepower: string
  torque: string
  mileage?: string
  mileage_unit: "km" | "miles"
}

interface CarFeatures {
  exterior_features?: string[]
  interior_features?: string[]
  safety_features?: string[]
}

interface OwnershipDocumentation {
  vin: string
  registration_number: string
  logbook_availability: "yes" | "no"
  previous_owners: string
  insurance_status: "valid" | "expired" | "none"
}

interface PricingPayment {
  selling_price: string
  currency: string
  negotiable: "yes" | "no"
  installment_plans: "yes" | "no"
  payment_methods: string[]
}

// Define the store state
interface CarState {
  // Car data
  car_id: string | null
  api_data: CarApiData | null
  basic_info: BasicCarInfo | null
  specifications: CarSpecifications | null
  features: CarFeatures | null
  ownership: OwnershipDocumentation | null
  pricing: PricingPayment | null

  // Selected make for UI
  selected_make: CarMake | null

  // Actions
  setCarId: (id: string) => void
  setApiData: (data: CarApiData) => void
  setBasicInfo: (data: BasicCarInfo) => void
  setSpecifications: (data: CarSpecifications) => void
  setFeatures: (data: CarFeatures) => void
  setOwnership: (data: OwnershipDocumentation) => void
  setPricing: (data: PricingPayment) => void
  setSelectedMake: (make: CarMake | null) => void

  // Clear store
  clearStore: () => void
}

// Create the store with persistence
export const useCarStore = create<CarState>()(
  persist(
    (set) => ({
      // Initial state
      car_id: null,
      api_data: null,
      basic_info: null,
      specifications: null,
      features: null,
      ownership: null,
      pricing: null,
      selected_make: null,

      // Actions
      setCarId: (id) => set({ car_id: id }),
      setApiData: (data) => set({ api_data: data }),
      setBasicInfo: (data) => set({ basic_info: data }),
      setSpecifications: (data) => set({ specifications: data }),
      setFeatures: (data) => set({ features: data }),
      setOwnership: (data) => set({ ownership: data }),
      setPricing: (data) => set({ pricing: data }),
      setSelectedMake: (make) => set({ selected_make: make }),

      // Clear store
      clearStore: () =>
        set({
          car_id: null,
          api_data: null,
          basic_info: null,
          specifications: null,
          features: null,
          ownership: null,
          pricing: null,
          selected_make: null,
        }),
    }),
    {
      name: "car-store", // name of the item in storage
      storage: createJSONStorage(() => localStorage), // use localStorage
    },
  ),
)

// Helper functions
export function validateCarData(router: any): boolean {
  const carId = useCarStore.getState().car_id

  if (!carId) {
    toast.error("No car information found", {
      description: "Please start from the beginning to add a new car.",
    })
    router.push("/dashboard/cars/new")
    return false
  }

  return true
}

