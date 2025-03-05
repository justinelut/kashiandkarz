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

interface BasicCarInfo {
  car_make: string;
	car_model: string;
	year: string;
	vehicle_type: string;
	condition: string;
  description: string;
  title: string;
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
  color: any
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

interface PhotosData {
  images: string[];
  video?: string;
}

// Define the store state
interface CarState {
  // Car data
  car_id: string | null
  basic_info: BasicCarInfo | null
  specifications: CarSpecifications | null
  features: CarFeatures | null
  ownership: OwnershipDocumentation | null
  pricing: PricingPayment | null
  photos: PhotosData | null

  // Selected make for UI
  selected_make: CarMake | null

  // Actions
  setCarId: (id: string) => void
  setBasicInfo: (data: BasicCarInfo) => void
  setSpecifications: (data: CarSpecifications) => void
  setFeatures: (data: CarFeatures) => void
  setOwnership: (data: OwnershipDocumentation) => void
  setPricing: (data: PricingPayment) => void
  setSelectedMake: (make: CarMake | null) => void
  setPhotos: (data: PhotosData) => void
  

  // Clear store
  clearStore: () => void
}




// Create the store with persistence
export const useCarStore = create<CarState>()(
  persist(
    (set) => ({
      // Initial state
      car_id: null,
      basic_info: null,
      specifications: null,
      features: null,
      ownership: null,
      pricing: null,
      selected_make: null,
      photos: null,

      // Actions
      setCarId: (id) => set({ car_id: id }),
      setBasicInfo: (data) => set({ basic_info: data }),
      setSpecifications: (data) => set({ specifications: data }),
      setFeatures: (data) => set({ features: data }),
      setOwnership: (data) => set({ ownership: data }),
      setPricing: (data) => set({ pricing: data }),
      setSelectedMake: (make) => set({ selected_make: make }),
      setPhotos: (data) => set((state) => {
        // Only update if data is different
        if (JSON.stringify(state.photos) === JSON.stringify(data)) {
          return state
        }
        return { photos: data }
      }),

      // Clear store
      clearStore: () =>
        set({
          car_id: null,
          basic_info: null,
          specifications: null,
          features: null,
          ownership: null,
          pricing: null,
          selected_make: null,
          photos: null,
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
    router.push("/sell-car")
    return false
  }

  return true
}
